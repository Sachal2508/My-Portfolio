"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
    ctaLabel?: string;
  };
  emoji?: string;
  logo?: string;
  logoAlt?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: "09",
    title: "StudyTrove Website",
    description:
      "A focused website for StudyTrove with a clean landing experience and quick access to the live product.",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
    links: {
      live: "https://studytrove.vercel.app/",
      ctaLabel: "Visit Website →",
    },
    logo: "/images/ST%20logo.png",
    logoAlt: "StudyTrove logo",
    featured: true,
  },
  {
    id: "10",
    title: "FlexPro App",
    description:
      "A companion app for FlexPro with its branded logo, download access, and the source repository for the app.",
    tags: ["Mobile App", "React Native", "Firebase"],
    links: {
      live: "https://github.com/Sachal2508/FlexPro-App/releases/tag/v1.0.2",
      ctaLabel: "Download →",
      github: "https://github.com/Sachal2508/FlexPro-App",
    },
    logo: "/images/FP%20logo.jpg",
    logoAlt: "FlexPro logo",
    featured: true,
  },
  {
    id: "01",
    title: "Al-Qur'an Android App",
    description:
      "Feature-rich Qur'an app for Android — full Arabic text with translations, tafsir, bookmarks, prayer times, Qibla direction, and nearby masjids. Offline-accessible.",
    tags: ["React.js", "Capacitor", "Tailwind CSS", "JavaScript"],
    links: {
      github: "https://github.com/Sachal2508/AL-Quran",
      live: "https://drive.google.com/uc?export=download&id=1g9JoQBjF4X4KwmW6rkTVT2o1JRBPIJ6B",
    },
    logo: "/images/ALQuran.png",
    logoAlt: "Al Quran logo",
    featured: true
  },
  {
    id: "02",
    title: "Tailor Shop Web App",
    description:
      "Professional full-stack .NET web app — manage customers, employees, invoices, and suit orders. Deployed on Koyeb with PostgreSQL.",
    tags: [".NET", "C#", "Bootstrap", "PostgreSQL"],
    links: { github: "https://github.com/Sachal2508/Tailor-Shop-Web-App" },
    emoji: "✂️",
    featured: true,
  },
  {
    id: "03",
    title: "Student Face Recognition",
    description:
      "Attendance system using real-time face detection via PC camera. Marks attendance locally in a CSV file using dlib + CMake.",
    tags: ["Python", "CMake", "dlib", "OpenCV"],
    links: { github: "https://github.com/Sachal2508/Attendance-with-face-recognition" },
    emoji: "👤",
    featured: false,
  },
  {
    id: "04",
    title: "Voice Assistant",
    description:
      "Voice-activated Python assistant supporting commands, web search, and app control via speech recognition.",
    tags: ["Python", "SpeechRecognition", "AI"],
    links: { github: "https://github.com/Sachal2508/Google-Assistant" },
    emoji: "🎤",
    featured: false,
  },
  {
    id: "05",
    title: "Snake Game",
    description:
      "Classic Snake game in Python/Pygame with fruit collection, graphical movement, and dynamic difficulty modes.",
    tags: ["Python", "Pygame"],
    links: { github: "https://github.com/Sachal2508/Snake-Game" },
    emoji: "🐍",
    featured: false,
  },
  {
    id: "06",
    title: "Portfolio Website (.NET)",
    description:
      "Responsive portfolio built with ASP.NET Core and Razor Pages for professional project showcasing.",
    tags: [".NET", "C#", "Razor Pages", "Bootstrap"],
    links: { github: "https://github.com/Sachal2508/Sachal-Portfolio" },
    emoji: "💻",
    featured: false,
  },
  {
    id: "07",
    title: "Candy Crush Clone",
    description:
      "Tile-matching game in C++ with custom graphics and grid logic, mimicking core Candy Crush gameplay.",
    tags: ["C++", "Game Dev", "Graphics"],
    links: { github: "https://github.com/Sachal2508/Candy-Crush-Game" },
    emoji: "🍬",
    featured: false,
  },
  {
    id: "08",
    title: "Alphabet Catcher",
    description:
      "Assembly-based arcade game — letters fall, user catches the right ones via keyboard. Speed and precision tested.",
    tags: ["Assembly", "Intel 8086", "DOS"],
    links: { github: "https://github.com/Sachal2508/Alphabet-Catcher-Game" },
    emoji: "🔤",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06 + 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative group border border-[#1c1c1c] bg-[#0a0a0a] p-8 hover:border-[#333] transition-colors will-change-transform ${
        project.featured ? "md:col-span-1" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Project number */}
        <span
          className="font-mono text-[10px] text-[#222] tracking-widest"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          {project.id}
        </span>

        {/* Logo or emoji */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#1c1c1c] bg-[#101010] p-2">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.logoAlt ?? project.title}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl select-none">
              {project.emoji}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-syne font-bold text-xl text-white mt-5 mb-3 group-hover:text-[#0BE7FF] transition-colors leading-tight"
        style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#444] text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-[10px] border border-[#1a1a1a] text-[#444] font-mono tracking-wider"
            style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover-lift text-xs text-[#555] hover:text-white transition-colors font-mono tracking-wider uppercase"
          >
            GitHub →
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="hover-lift text-xs text-[#0BE7FF] hover:text-white transition-colors font-mono tracking-wider uppercase"
          >
            {project.links.ctaLabel ?? "Live / Download →"}
          </a>
        )}
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0BE7FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      {/* Section label */}
      <ScrollReveal>
        <p
          className="text-[10px] tracking-[0.4em] text-[#0BE7FF] uppercase mb-6 font-mono"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          03 · Projects
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <h2
          className="font-syne font-extrabold text-5xl md:text-6xl leading-[1.05] tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
        >
          Things I've
          <br />
          <span className="text-[#0BE7FF]">built.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-[#444] text-sm mb-16 max-w-md">
          A selection of projects spanning web apps, games, AI tools, and
          mobile development.
        </p>
      </ScrollReveal>

      {/* Project grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
        {projects.map((project, i) => (
          <div key={project.id} className="bg-[#080808]">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* GitHub link */}
      <ScrollReveal delay={0.2} className="mt-16 text-center">
        <a
          href="https://github.com/Sachal2508"
          target="_blank"
          rel="noreferrer"
          className="hover-lift inline-flex items-center gap-3 text-sm text-[#444] hover:text-white transition-colors font-mono border-b border-[#1c1c1c] pb-1 hover:border-white"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          View all on GitHub ↗
        </a>
      </ScrollReveal>
    </section>
  );
}
