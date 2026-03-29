"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MagneticElement from "./MagneticElement";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROLES = [
  ".NET Developer",
  "Python Engineer",
  "AI/ML Enthusiast",
  "Full Stack Dev",
];

const NAME_CHARS = "SACHAL".split("");

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    const nextSection =
      document.querySelector("#about") ||
      document.querySelector("#projects") ||
      document.querySelector("#skills") ||
      document.querySelector("#contact");

    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax on scroll
  useEffect(() => {
    if (!parallaxRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(parallaxRef.current, {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-start justify-end pb-20 px-8 md:px-16 overflow-hidden"
    >
      {/* Big parallax bg text */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[20vw] font-syne font-black tracking-tighter leading-none"
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          }}
        >
          SACHAL
        </span>
      </div>

      {/* Decorative accent line top-left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[30%] left-8 md:left-16 w-14 h-px bg-[#0BE7FF] origin-left"
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-[900px]">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[#0BE7FF] text-sm tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          Hi, I am
        </motion.p>

        {/* Name — characters stagger in */}
        <div
          className="overflow-hidden"
          aria-label="Muhammad Sachal"
        >
          <div className="flex flex-wrap">
            {NAME_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-syne font-extrabold leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-syne, Syne, sans-serif)",
                  fontSize: "clamp(4rem, 14vw, 13rem)",
                  color: "var(--c-text, #f0f0f0)",
                  display: "inline-block",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-2 mt-4 mb-10"
        >
          <span
            className="font-syne text-xl md:text-2xl text-[#888] font-medium"
            style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
          >
            {role}
            <span className="inline-block w-[2px] h-[1.1em] bg-[#0BE7FF] ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#555] text-base md:text-lg leading-relaxed max-w-lg mb-10"
        >
          Passionate about building modern, scalable applications and
          exploring the frontiers of AI/ML.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4"
        >
          <MagneticElement>
            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-[#0BE7FF] text-[#080808] font-syne font-bold text-sm tracking-widest uppercase rounded-none hover:bg-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Projects
            </button>
          </MagneticElement>

          <MagneticElement>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border border-[#333] text-[#888] font-syne font-bold text-sm tracking-widest uppercase hover:border-white hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Contact
            </button>
          </MagneticElement>

          <MagneticElement>
            <a
              href="/Resume.pdf"
              download
              className="px-8 py-3 border border-[#333] text-[#888] font-syne font-bold text-sm tracking-widest uppercase hover:border-[#0BE7FF] hover:text-[#0BE7FF] transition-colors duration-300 inline-block"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Resume ↓
            </a>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-2 text-[#444] hover:text-[#0BE7FF] transition-colors group"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-mono writing-mode-vertical"
          style={{
            fontFamily: "var(--font-mono, DM Mono, monospace)",
            writingMode: "vertical-rl",
            letterSpacing: "0.2em",
          }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.button>

      {/* Corner label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute top-28 right-8 md:right-16 text-right"
      >
        <p
          className="text-[10px] text-[#333] tracking-[0.2em] uppercase font-mono"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          Full Stack Developer
          <br />
          FAST NUCES · Lahore
        </p>
      </motion.div>
    </section>
  );
}
