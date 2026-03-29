"use client";

import ScrollReveal from "./ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const education = [
  {
    degree: "B.S. Computer Science",
    school: "FAST NUCES, Lahore",
    year: "2023 – 2027",
    note: "5th Semester · HCI, AI/ML, Data Science",
  },
  {
    degree: "FSc Pre-Engineering",
    school: "Govt. College Graduate of Science",
    year: "2021 – 2023",
    note: "Grade: A",
  },
  {
    degree: "Matriculation (Science)",
    school: "Govt. Chishtia High School",
    year: "2019 – 2021",
    note: "Grade: A+",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof education)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1c1c1c]" />
      {/* Dot */}
      <div className="absolute left-[-4px] top-[6px] w-[9px] h-[9px] rounded-full bg-[#0BE7FF] shadow-[0_0_8px_rgba(11,231,255,0.6)]" />

      <p
        className="text-[10px] tracking-[0.25em] text-[#0BE7FF] uppercase mb-1 font-mono"
        style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
      >
        {item.year}
      </p>
      <h4
        className="font-syne font-bold text-base text-white mb-1"
        style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
      >
        {item.degree}
      </h4>
      <p className="text-[#555] text-sm">{item.school}</p>
      <p className="text-[#333] text-xs mt-1 font-mono">{item.note}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Section label */}
      <ScrollReveal>
        <p
          className="text-[10px] tracking-[0.4em] text-[#0BE7FF] uppercase mb-6 font-mono"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          01 · About
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left: Bio */}
        <div>
          <ScrollReveal delay={0.05}>
            <h2
              className="font-syne font-extrabold text-5xl md:text-6xl leading-[1.05] tracking-tight text-white mb-10"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Building things
              <br />
              <span className="text-[#0BE7FF]">that matter.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-[#666] leading-relaxed mb-5 text-[15px]">
              I&apos;m Muhammad Sachal, a developer specializing in Python and
              C/C++ who loves solving real-world problems with technology.
              Fast, clean, and scalable — that&apos;s how I build.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[#555] leading-relaxed mb-5 text-[15px]">
              With experience across C/C++, Assembly (Intel 8086), ASP.NET Core,
              and Python, I continuously explore emerging tech like AI/ML and
              cloud computing. I thrive in collaborative environments and love
              working across the full stack.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[#444] leading-relaxed text-[15px]">
              Beyond code, I enjoy learning languages (Indonesian, Japanese,
              Arabic), reading about AI advancements, and building personal side
              projects that scratch my curiosity.
            </p>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal delay={0.28}>
            <div className="flex gap-10 mt-12 pt-10 border-t border-[#1c1c1c]">
              {[
                { num: "8+", label: "Projects" },
                { num: "5+", label: "Languages" },
                { num: "3+", label: "Frameworks" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-syne font-bold text-3xl text-white"
                    style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-[#444] text-xs tracking-widest uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Photo + Education Timeline */}
        <div className="space-y-10">
          {/* Profile photo — circular with border, shadow & pulse (like HTML layout) */}
          <ScrollReveal delay={0.05}>
            <div className="flex justify-center md:justify-end">
              <div className="hero-profile-wrapper">
                <Image
                  src="/images/sachal.jpg"
                  alt="Muhammad Sachal"
                  width={300}
                  height={300}
                  priority
                  className="hero-profile-img"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Education Timeline */}
          <ScrollReveal delay={0.08}>
            <h3
              className="font-syne font-bold text-xs tracking-[0.3em] uppercase text-[#444] mb-10"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              Education
            </h3>
          </ScrollReveal>

          {education.map((item, i) => (
            <TimelineItem key={item.degree} item={item} index={i} />
          ))}

          {/* Currently learning tag */}
          <ScrollReveal delay={0.35}>
            <div className="mt-12 p-5 border border-[#1c1c1c] bg-[#0f0f0f]">
              <p className="text-[10px] tracking-[0.25em] text-[#0BE7FF] uppercase mb-3 font-mono">
                Currently exploring
              </p>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React.js", "Julia", "Next.js", "AI/ML"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs border border-[#222] text-[#444] font-mono"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
