"use client";

import { useEffect, useState } from "react";

import BubbleMenu from "./BubbleMenu";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersLight = stored === "light";

    setIsDark(!prefersLight);
    document.documentElement.classList.toggle("light", prefersLight);

    return undefined;
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    document.documentElement.classList.toggle("light", !nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <>
      <BubbleMenu
        logo={
          <button
            type="button"
            onClick={() => {
              document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-syne text-sm md:text-base font-extrabold tracking-[0.32em] uppercase text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            aria-label="Go to home"
          >
            MS
          </button>
        }
        useFixedPosition
        menuAriaLabel="Toggle navigation"
        menuBg="rgba(12, 12, 12, 0.72)"
        menuContentColor="#f5f5f5"
        rightAccessory={
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-[52px] min-w-[52px] items-center justify-center rounded-full border border-white/10 bg-[rgba(12,12,12,0.72)] text-[#f5f5f5] shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-[#0BE7FF] hover:text-[#0BE7FF]"
            aria-label="Toggle theme"
          >
            <span className="text-sm leading-none">{isDark ? "☾" : "☀"}</span>
          </button>
        }
      />
    </>
  );
}
