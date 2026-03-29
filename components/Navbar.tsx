"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticElement from "./MagneticElement";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? "py-3 border-b border-[#1c1c1c] backdrop-blur-md bg-[#080808]/80"
            : "py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <MagneticElement>
            <button
              onClick={() => scrollTo("#home")}
              className="font-syne font-bold text-xl tracking-widest text-[#0BE7FF] hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              MS
            </button>
          </MagneticElement>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <MagneticElement strength={0.2}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="nav-link font-dm text-sm tracking-widest uppercase text-[#888] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-dm, DM Sans, sans-serif)" }}
                  >
                    {link.label}
                  </button>
                </MagneticElement>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <MagneticElement>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#1c1c1c] hover:border-[#0BE7FF] transition-colors text-sm"
                aria-label="Toggle theme"
              >
                {isDark ? "☀" : "☾"}
              </button>
            </MagneticElement>

            {/* Hamburger (mobile + desktop menu) */}
            <MagneticElement>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex flex-col items-center justify-center gap-[6px] group"
                aria-label="Open menu"
              >
                <span
                  className={`menu-line block h-px w-6 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`menu-line block h-px transition-all duration-300 ${
                    menuOpen ? "opacity-0 w-0" : "w-4"
                  }`}
                />
                <span
                  className={`menu-line block h-px w-6 transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>
            </MagneticElement>
          </div>
        </div>
      </nav>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            {/* Decorative accent line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1c1c1c] -translate-y-1/2 pointer-events-none" />

            <nav className="relative z-10">
              <ul className="flex flex-col items-center gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: menuOpen ? 0.1 + i * 0.07 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="block text-[13vw] md:text-[9vw] font-syne font-bold leading-none tracking-tight text-white hover:text-[#0BE7FF] transition-colors duration-300 overflow-hidden"
                      style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-8 right-8 flex justify-between items-end text-xs text-[#444] font-mono"
            >
              <span>SACHAL · 2024</span>
              <span>LAHORE, PK</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
