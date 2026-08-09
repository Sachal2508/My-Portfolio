"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 8;

type Position = { x: number; y: number };

export default function CustomCursor() {
  const mainDotRef  = useRef<HTMLDivElement>(null);
  const trailRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const mouse       = useRef<Position>({ x: -300, y: -300 });
  const trailPos    = useRef<Position[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 }))
  );
  const isHovered   = useRef(false);
  const rafId       = useRef<number>();
  const [enabled, setEnabled] = useState(false);
  const [visible,  setVisible]  = useState(false);

  /* ── Device check ─────────────────────────────── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const touchDevice  = navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;

    if (!finePointer || reduceMotion || touchDevice) return;

    setEnabled(true);
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, []);

  /* ── Render loop ───────────────────────────────── */
  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-magnetic], input, textarea, select")) {
        isHovered.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-magnetic], input, textarea, select")) {
        isHovered.current = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    const render = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      /* Main dot — snaps instantly to mouse */
      if (mainDotRef.current) {
        const scale = isHovered.current ? 1.6 : 1.0;
        mainDotRef.current.style.transform =
          `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      /* First trail dot follows the mouse with a slight lag */
      trailPos.current[0].x += (mx - trailPos.current[0].x) * 0.28;
      trailPos.current[0].y += (my - trailPos.current[0].y) * 0.28;

      /* Each subsequent dot follows the previous one — snake chain */
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPos.current[i].x += (trailPos.current[i - 1].x - trailPos.current[i].x) * 0.28;
        trailPos.current[i].y += (trailPos.current[i - 1].y - trailPos.current[i].y) * 0.28;
      }

      /* Apply to trail elements */
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          const { x, y } = trailPos.current[i];
          dot.style.transform =
            `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ── Main leading dot — sharp & bright ── */}
      <div
        ref={mainDotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width:  "18px",
          height: "18px",
          backgroundColor: "#0BE7FF",
          boxShadow: "0 0 14px 4px rgba(11,231,255,0.65), 0 0 4px 1px #0BE7FF",
          willChange: "transform",
          transition: "transform 0.06s ease",
        }}
      />

      {/* ── Lagging trail dots — shrink & fade ── */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        // Starts at 14px, tapers to ~4px
        const size    = Math.max(4, 14 - i * 1.4);
        // Starts at 0.75 opacity, fades to 0.1
        const opacity = Math.max(0.10, 0.75 - i * 0.09);

        return (
          <div
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              width:           `${size}px`,
              height:          `${size}px`,
              backgroundColor: "#0BE7FF",
              opacity,
              boxShadow:       i < 3 ? `0 0 ${8 - i * 2}px rgba(11,231,255,0.4)` : "none",
              willChange:      "transform",
            }}
          />
        );
      })}
    </div>
  );
}
