"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// ─── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: 0,
    category: "Web Application",
    title: "StudyTrove",
    description: "A comprehensive digital resource platform for students, providing organized study materials, past papers, and structured course notes.",
    video: "/videos/StudyTrove.mp4",
    logo: "/images/ST%20logo.png",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
    year: "2025",
    live: "https://studytrove.vercel.app/",
    github: null,
    btnLabel: "Visit Website ↗",
    bgGradient: "from-cyan-950/40 via-neutral-900 to-black",
    isMobileApp: false,
  },
  {
    id: 1,
    category: "Mobile App",
    title: "FlexPro",
    description: "Personalized fitness tracking and workout management application built for high-performance exercise routines and goal tracking.",
    video: "/videos/FlexPro.mp4",
    logo: "/images/FP%20logo.jpg",
    tags: ["React Native", "Firebase", "Expo"],
    year: "2025",
    live: "https://github.com/Sachal2508/FlexPro-App/releases/tag/v1.0.2",
    github: "https://github.com/Sachal2508/FlexPro-App",
    btnLabel: "Download APK ↓",
    bgGradient: "from-blue-950/40 via-neutral-900 to-black",
    isMobileApp: true,
  },
  {
    id: 2,
    category: "Android App",
    title: "Al-Qur'an",
    description: "Feature-rich offline Quranic application with verse-by-verse recitation, translations, prayer times, Qibla compass, and nearby Masjid finder.",
    video: "/videos/AlQuran.mp4",
    logo: "/images/ALQuran.png",
    tags: ["React.js", "Capacitor", "JavaScript"],
    year: "2024",
    live: "https://drive.google.com/uc?export=download&id=1g9JoQBjF4X4KwmW6rkTVT2o1JRBPIJ6B",
    github: "https://github.com/Sachal2508/AL-Quran",
    btnLabel: "Download APK ↓",
    bgGradient: "from-emerald-950/40 via-neutral-900 to-black",
    isMobileApp: true,
  },
  {
    id: 3,
    category: "Web Platform & Utilities",
    title: "Nutter Tools",
    description: "An all-in-one developer and web utility suite featuring image converters, text manipulators, color toolkits, and web utility helpers.",
    video: "/videos/NutterTools.mp4",
    logo: null,
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    year: "2025",
    live: "https://nutter-tools.vercel.app/",
    github: "https://github.com/Sachal2508/NutterTools",
    btnLabel: "Visit Website ↗",
    bgGradient: "from-indigo-950/40 via-neutral-900 to-black",
    isMobileApp: false,
  },
  {
    id: 4,
    category: "Full-Stack Web App",
    title: "Tailor Shop Management",
    description: "Enterprise web system for custom tailoring operations: customer measurement records, order processing, inventory, and automated invoicing.",
    logo: "/images/TailorShop.png",
    tags: [".NET", "C#", "PostgreSQL"],
    year: "2024",
    live: null,
    github: "https://github.com/Sachal2508/Tailor-Shop-Web-App",
    btnLabel: "View Repository ↗",
    bgGradient: "from-purple-950/40 via-neutral-900 to-black",
    isMobileApp: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const digitColRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (digitColRef.current) {
      const pct = (activeIndex / projects.length) * 100;
      digitColRef.current.style.transform = `translateY(-${pct}%)`;
    }
  }, [activeIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-index") ?? "0");
            setActiveIndex(idx);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="section-padding bg-[var(--bg-dark,#080808)] relative"
    >
      {/* ── Section header ── */}
      <div className="relative flex w-full flex-col gap-y-8 md:gap-y-16">
        <h1 className="section-heading text-[var(--c-accent,#0BE7FF)] overflow-hidden">
          <span className="inline-block">SELECTED WORKS /</span>
        </h1>

        <div className="flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-start md:col-start-6">
          <span className="font-medium uppercase text-nowrap text-[var(--c-text2,#555)] text-sm tracking-widest">
            (PROJECTS)
          </span>
          <p className="max-w-[28ch] text-balance font-medium leading-relaxed text-[var(--c-text3,#888)] text-base">
            Thoughtfully crafted digital experiences that blend utility, performance, and modern aesthetics.
          </p>
        </div>
      </div>

      {/* ── Grid: sticky counter + scrollable cards ── */}
      <div className="grid grid-cols-12 gap-x-8 pt-12 md:pt-20">

        {/* ── Left: sticky giant 0N counter ── */}
        <div
          className="sticky top-24 col-span-5 hidden h-fit md:flex items-baseline select-none z-0 pr-2"
          style={{
            fontSize: "clamp(7rem, 14.5vw, 13.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            letterSpacing: "-0.04em",
          }}
        >
          {/* Static "0" in dark gray */}
          <span className="relative leading-none text-[#262626] select-none">0</span>

          {/* Sliding digit column in cyan */}
          <div className="relative overflow-hidden h-[1.1em] w-[0.85em]">
            <div
              ref={digitColRef}
              className="absolute top-0 left-0 flex flex-col w-full"
              style={{
                transform: "translateY(0%)",
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                color: "#0BE7FF",
              }}
            >
              {projects.map((_, i) => (
                <span
                  key={i}
                  className="h-[1.1em] leading-none flex items-center justify-center select-none shrink-0"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: stacked project cards ── */}
        <aside className="relative col-span-12 flex flex-col gap-y-16 md:col-span-7 md:gap-y-28">
          {projects.map((project, i) => {
            const targetUrl = project.live || project.github || "#";

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                className="group flex flex-col gap-y-6"
              >
                {/* Image / Video Frame Container */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative flex aspect-[4/3] sm:aspect-square w-full items-center justify-center overflow-hidden rounded-2xl p-3 sm:p-8 xl:p-10 border border-[#1e1e1e] bg-gradient-to-br ${project.bgGradient} transition-all duration-500 hover:border-[#0BE7FF]/40 group/card`}
                >
                  {/* Inner Preview Window */}
                  <div
                    className="z-10 w-full h-full overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-md transition-transform duration-500 group-hover/card:scale-[1.02] flex items-center justify-center relative"
                  >
                    {/* Browser top chrome bar for web apps */}
                    {!project.isMobileApp && (
                      <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 px-3 py-1.5 sm:py-2 border-b border-white/10 bg-black/60 backdrop-blur-md">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-2 flex-1 h-3.5 sm:h-4 rounded-full border border-white/10 bg-black/40 px-2 font-mono text-[8px] sm:text-[9px] text-[#666] flex items-center truncate">
                          {project.live ? project.live.replace("https://", "") : "github.com"}
                        </span>
                      </div>
                    )}

                    {"video" in project && project.video ? (
                      project.isMobileApp ? (
                        /* Mobile App: Sleek portrait phone mockup */
                        <div className="relative h-[90%] aspect-[9/19] rounded-[1.5rem] sm:rounded-[2rem] border-2 sm:border-4 border-[#282828] bg-black overflow-hidden shadow-2xl flex items-center justify-center my-auto">
                          {/* Notch / Dynamic Island */}
                          <div className="absolute top-1.5 w-12 sm:w-16 h-2.5 sm:h-3 bg-[#181818] rounded-full z-30" />
                          <video
                            src={project.video as string}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                          />
                        </div>
                      ) : (
                        /* Web App: Full un-zoomed container preview */
                        <div className="w-full h-full pt-6 sm:pt-8 flex items-center justify-center bg-black/90 p-1.5 sm:p-2 overflow-hidden">
                          <video
                            src={project.video as string}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105 rounded-md"
                          />
                        </div>
                      )
                    ) : (
                      /* Static Image Preview */
                      <div className="flex h-full w-full flex-col items-center justify-center relative">
                        {project.logo ? (
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-6 sm:pt-8">
                            <Image
                              src={project.logo}
                              alt={project.title}
                              width={800}
                              height={600}
                              className="w-full h-full object-contain p-2 transition-all duration-500 group-hover/card:scale-105"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Overlay badge */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#aaa] bg-black/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                      <span>{project.category}</span>
                      <span className="text-[#0BE7FF]">{project.year}</span>
                    </div>
                  </div>
                </a>

                {/* Card Meta & Action Bar */}
                <div className="flex flex-col gap-y-3 sm:gap-y-4 pt-1">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Mobile Step Counter Tag */}
                        <span className="md:hidden font-mono text-xs font-bold text-[#0BE7FF] bg-[#0BE7FF]/10 px-2 py-0.5 rounded border border-[#0BE7FF]/20">
                          0{i + 1}
                        </span>
                        <span
                          className="font-mono text-xs text-[#777] uppercase tracking-widest"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          {project.category}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-[#0BE7FF] bg-[#0BE7FF]/10 px-2 py-0.5 rounded border border-[#0BE7FF]/20">
                        {project.year}
                      </span>
                    </div>

                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title inline-block"
                    >
                      <h3
                        className="font-bold text-white leading-tight group-hover/title:text-[#0BE7FF] transition-colors"
                        style={{
                          fontFamily: "var(--font-syne, sans-serif)",
                          fontSize: "clamp(1.5rem, 5vw, 2.75rem)",
                        }}
                      >
                        {project.title}
                      </h3>
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#999] max-w-[55ch]">
                    {project.description}
                  </p>

                  {/* Tags & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1a1a1a]">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono border border-[#222] bg-[#111] text-[#888] rounded-md"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Explicit Visit / Download / GitHub Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto pt-1 sm:pt-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-md border border-[#333] bg-[#151515] text-xs font-mono text-white hover:border-[#0BE7FF] hover:text-[#0BE7FF] transition-all"
                        >
                          GitHub ↗
                        </a>
                      )}

                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-md bg-[#0BE7FF] text-black font-semibold text-xs font-mono hover:bg-[#33efff] transition-all"
                      >
                        {project.btnLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}
