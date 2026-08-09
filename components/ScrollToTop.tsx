"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Visibility threshold: show after 300px of scrolling
      setVisible(currentScroll > 300);

      // Calculate scroll progress percentage (0 to 100)
      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // SVG Circular Progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[900] transition-all duration-400 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to top"
        className="group relative flex items-center gap-2 h-13 px-3 sm:px-4 py-2 rounded-full border border-[#0BE7FF]/30 bg-black/80 backdrop-blur-md text-[#0BE7FF] shadow-2xl hover:border-[#0BE7FF] hover:bg-[#0BE7FF] hover:text-black hover:shadow-[0_0_25px_rgba(11,231,255,0.5)] transition-all duration-300 active:scale-95"
      >
        {/* SVG Circular Progress Ring */}
        <div className="relative flex items-center justify-center w-8 h-8">
          <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 50 50">
            {/* Background track */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-20"
              fill="transparent"
            />
            {/* Animated progress stroke */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Center Arrow Icon */}
          <span className="absolute font-bold text-sm leading-none transition-transform duration-300 group-hover:-translate-y-0.5">
            ↑
          </span>
        </div>

        {/* Text Label (Always legible, expands on hover / mobile) */}
        <span
          className="font-mono text-xs font-semibold tracking-widest uppercase transition-colors"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          TOP
        </span>
      </button>
    </div>
  );
}
