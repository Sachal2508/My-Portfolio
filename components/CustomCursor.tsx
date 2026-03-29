"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 22;
const EASING = 0.16;
const HOVER_EASING = 0.36;

type Dot = { x: number; y: number };

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef<Dot>({ x: -300, y: -300 });
  const trailPositions = useRef<Dot[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 }))
  );
  const hovering = useRef(false);
  const rafRef = useRef<number>();
  const [visible, setVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const check = () =>
      setIsLight(document.documentElement.classList.contains("light"));
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("a, button, [data-magnetic], label, input, textarea, select")) {
        hovering.current = true;
      }
    };

    const onOut = () => { hovering.current = false; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const tick = () => {
      const ease = hovering.current ? HOVER_EASING : EASING;
      const mouse = mouseRef.current;

      // Main cursor — instant
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%) scale(${hovering.current ? 2.4 : 1})`;
      }

      // Trail chain — each dot lerps toward the previous
      trailPositions.current[0].x += (mouse.x - trailPositions.current[0].x) * (ease + 0.1);
      trailPositions.current[0].y += (mouse.y - trailPositions.current[0].y) * (ease + 0.1);

      for (let i = 1; i < TRAIL_COUNT; i++) {
        const prev = trailPositions.current[i - 1];
        const curr = trailPositions.current[i];
        curr.x += (prev.x - curr.x) * ease;
        curr.y += (prev.y - curr.y) * ease;
      }

      trailRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const pos = trailPositions.current[i];
        const progress = 1 - i / TRAIL_COUNT;
        const size = Math.max(1.5, 9 * progress);
        dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${Math.max(0, progress * 0.8)}`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dot color: cyan in dark, dark ink in light
  const trailColor = isLight ? "#1a1a1a" : "#ffffff";
  const cursorColor = isLight ? "#0099bb" : "#0BE7FF";
  const cursorGlow = isLight
    ? "0 0 6px rgba(0,153,187,0.5)"
    : "0 0 8px rgba(11,231,255,0.8), 0 0 18px rgba(11,231,255,0.3)";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: cursorColor,
          willChange: "transform",
          transition: "transform 0.05s linear, background-color 0.3s ease",
          mixBlendMode: isLight ? "multiply" : "difference",
          boxShadow: cursorGlow,
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          style={{
            backgroundColor: trailColor,
            willChange: "transform, width, height, opacity",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
