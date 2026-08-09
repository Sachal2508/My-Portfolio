"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 8;
const LERP_FACTOR = 0.35;

type Position = { x: number; y: number };

export default function CustomCursor() {
  const mainDotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef<Position>({ x: -200, y: -200 });
  const headPos = useRef<Position>({ x: -200, y: -200 });
  const trailPositions = useRef<Position[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );
  const isHovered = useRef(false);
  const rafId = useRef<number>();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const touchDevice = navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
    
    if (!finePointer || reduceMotion || touchDevice) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");
    document.body.style.cursor = "none";
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-magnetic], input, textarea, select, .group")) {
        isHovered.current = true;
      }
    };

    const onMouseOut = () => {
      isHovered.current = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Ultra-Fast Buttery Render Loop
    const render = () => {
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;

      // Instant responsive lead dot
      headPos.current.x += (targetX - headPos.current.x) * 0.7;
      headPos.current.y += (targetY - headPos.current.y) * 0.7;

      if (mainDotRef.current) {
        const scale = isHovered.current ? 2.0 : 1.0;
        mainDotRef.current.style.transform = `translate3d(${headPos.current.x}px, ${headPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // First trail dot follows the head dot
      trailPositions.current[0].x += (headPos.current.x - trailPositions.current[0].x) * LERP_FACTOR;
      trailPositions.current[0].y += (headPos.current.y - trailPositions.current[0].y) * LERP_FACTOR;

      // Lagging snake chain effect
      for (let i = 1; i < TRAIL_COUNT; i++) {
        const prev = trailPositions.current[i - 1];
        const curr = trailPositions.current[i];
        curr.x += (prev.x - curr.x) * LERP_FACTOR;
        curr.y += (prev.y - curr.y) * LERP_FACTOR;
      }

      // Apply transforms to all lagging trail dots
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          const pos = trailPositions.current[i];
          dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
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
      {/* Main Leading Dot */}
      <div
        ref={mainDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#0BE7FF] shadow-[0_0_10px_#0BE7FF] pointer-events-none transition-transform duration-75"
        style={{ willChange: "transform" }}
      />

      {/* Series of Lagging Trail Dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const size = Math.max(1.5, 6 - i * 0.6);
        const opacity = Math.max(0.15, 0.7 - i * 0.07);

        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="fixed top-0 left-0 rounded-full bg-[#0BE7FF] pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
