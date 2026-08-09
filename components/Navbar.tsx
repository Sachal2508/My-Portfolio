"use client";

import BubbleMenu from "./BubbleMenu";

export default function Navbar() {
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
        useFixedPosition={false}
        menuAriaLabel="Toggle navigation"
        menuBg="rgba(12, 12, 12, 0.72)"
        menuContentColor="#f5f5f5"
        fixedActions
      />
    </>
  );
}
