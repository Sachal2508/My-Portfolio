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
      className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto"
    >
      {/* Section label */}
      <ScrollReveal>
        <p
          className="text-[10px] tracking-[0.4em] text-[#0BE7FF] uppercase mb-6 font-mono"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          04 · Contact
        </p>
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal delay={0.05}>
        <h2
          className="font-syne font-extrabold leading-[1.0] tracking-tight text-white mb-8"
          style={{
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
          }}
        >
          Let&apos;s work
          <br />
          <span className="text-[#0BE7FF]">together.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-[#444] text-sm mb-16 max-w-sm">
          Open to collaborations, freelance projects, and interesting
          conversations. Reach out anytime.
        </p>
      </ScrollReveal>

      {/* Big email link */}
      <ScrollReveal delay={0.15}>
        <MagneticElement strength={0.12}>
          <a
            href="mailto:sachalkool@gmail.com"
            className="group inline-flex items-center gap-4"
          >
            <span
              className="font-syne font-bold text-[#222] group-hover:text-white transition-colors duration-500"
              style={{
                fontFamily: "var(--font-syne, Syne, sans-serif)",
                fontSize: "clamp(1.2rem, 3.5vw, 2.8rem)",
                borderBottom: "1px solid #1c1c1c",
              }}
            >
              sachalkool@gmail.com
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#0BE7FF] text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="text-[10px] tracking-widest text-[#333] uppercase font-mono w-20"
                style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
              >
                {social.label}
              </span>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-syne font-semibold text-[#555] hover:text-white transition-colors text-base group-hover:text-[#0BE7FF]"
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
              className="text-[10px] tracking-[0.3em] text-[#222] uppercase mb-2 font-mono"
              style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
            >
              Based in
            </p>
            <p
              className="font-syne font-bold text-2xl text-[#1a1a1a]"
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
