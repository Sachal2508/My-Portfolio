"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticElement from "./MagneticElement";

const socials = [
  {
    label: "GitHub",
    handle: "Sachal2508",
    href: "https://github.com/Sachal2508",
  },
  {
    label: "LinkedIn",
    handle: "Muhammad Sachal",
    href: "https://www.linkedin.com/in/muhammad-sachal-9a929136a/",
  },
  {
    label: "Instagram",
    handle: "@muhammad.sachal.773",
    href: "https://www.instagram.com/muhammad.sachal.773/",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto bg-[#080808]"
    >
      {/* Section label */}
      <ScrollReveal>
        <p
          className="text-xs sm:text-sm tracking-[0.3em] text-[#0BE7FF] uppercase mb-4 font-mono"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          04 · CONTACT
        </p>
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal delay={0.05}>
        <h2
          className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight text-white uppercase mb-8"
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
          }}
        >
          Let&apos;s work together.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-[#aaa] text-sm md:text-base mb-16 max-w-md leading-relaxed">
          Open to collaborations, freelance projects, full-stack opportunities, and interesting technical conversations. Reach out anytime.
        </p>
      </ScrollReveal>

      {/* Big email link */}
      <ScrollReveal delay={0.15}>
        <MagneticElement strength={0.12}>
          <a
            href="mailto:sachalm58@gmail.com"
            className="group inline-flex items-center gap-4 hover-lift"
          >
            <span
              className="font-syne font-bold text-white group-hover:text-[#0BE7FF] transition-colors duration-500"
              style={{
                fontFamily: "var(--font-syne, Syne, sans-serif)",
                fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                borderBottom: "1px solid #333",
              }}
            >
              sachalm58@gmail.com
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#0BE7FF] text-2xl opacity-80 group-hover:opacity-100 transition-opacity"
            >
              ↗
            </motion.span>
          </a>
        </MagneticElement>
      </ScrollReveal>

      {/* Divider */}
      <div className="my-20 h-px bg-[#1c1c1c]" />

      {/* Socials */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex flex-col gap-6">
          {socials.map((social, i) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -30px 0px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1 + 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-6 group"
            >
              <span
                className="text-[10px] tracking-widest text-[#777] uppercase font-mono w-20"
                style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
              >
                {social.label}
              </span>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover-lift font-syne font-semibold text-[#ccc] hover:text-white transition-colors text-base group-hover:text-[#0BE7FF]"
                style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
              >
                {social.handle} ↗
              </a>
            </motion.div>
          ))}
        </div>

        {/* Location stamp */}
        <ScrollReveal delay={0.3}>
          <div className="text-right">
            <p
              className="text-[10px] tracking-[0.3em] text-[#777] uppercase mb-2 font-mono"
              style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
            >
              Based in
            </p>
            <p
              className="font-syne font-bold text-2xl text-white"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Lahore, Pakistan
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
