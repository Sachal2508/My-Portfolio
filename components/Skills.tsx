"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

/* ── Data ─────────────────────────────────────── */
const proSkills = [
  { name: "C / C++",      level: 90, icon: "⚡", tag: "Systems"     },
  { name: "Python",       level: 85, icon: "🐍", tag: "Scripting"   },
  { name: "T-SQL",        level: 90, icon: "🗄️",  tag: "Database"    },
  { name: "Assembly x86", level: 88, icon: "🔩", tag: "Low-level"   },
  { name: "ASP.NET Core", level: 80, icon: "⚙️",  tag: "Backend"     },
  { name: "HTML5",        level: 82, icon: "🌐", tag: "Frontend"    },
  { name: "CSS3",         level: 75, icon: "🎨", tag: "Frontend"    },
  { name: "Bootstrap",    level: 78, icon: "📦", tag: "UI"          },
  { name: "C#",           level: 80, icon: "💎", tag: "OOP"         },
  { name: "PostgreSQL",   level: 72, icon: "🐘", tag: "Database"    },
];

const learningSkills = [
  { name: "JavaScript",  level: 32, icon: "✨", tag: "In Progress"  },
  { name: "React.js",    level: 45, icon: "⚛️",  tag: "In Progress"  },
  { name: "Julia",       level: 30, icon: "📊", tag: "In Progress"  },
  { name: "Next.js",     level: 35, icon: "🔺", tag: "In Progress"  },
  { name: "AI / ML",     level: 28, icon: "🤖", tag: "In Progress"  },
  { name: "TypeScript",  level: 30, icon: "📘", tag: "In Progress"  },
  { name: "Framer Motion",level:25, icon: "🎞️",  tag: "In Progress"  },
  { name: "GSAP",        level: 22, icon: "💫", tag: "In Progress"  },
];

const tools = [
  { name: "Git",          icon: "🌿" },
  { name: "GitHub",       icon: "🐙" },
  { name: "VS Code",      icon: "💙" },
  { name: "Jupyter",      icon: "📓" },
  { name: "Pygame",       icon: "🎮" },
  { name: "Capacitor",    icon: "📱" },
  { name: "CMake",        icon: "🔨" },
  { name: "SSMS",         icon: "🗃️"  },
  { name: "Koyeb",        icon: "☁️"  },
  { name: "Vercel",       icon: "▲"  },
];

/* ── Single Skill Pill ────────────────────────── */
type Skill = { name: string; level?: number; icon: string; tag: string };

function SkillPill({ skill, accent }: { skill: Skill; accent: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The pill */}
      <motion.div
        animate={
          hovered
            ? { scale: 1.08, y: -6 }
            : { scale: 1, y: 0 }
        }
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={`
          flex items-center gap-2.5 px-5 py-3 mx-2
          border transition-colors duration-200
          ${hovered
            ? accent
              ? "border-[#0BE7FF] bg-[#0BE7FF]/10"
              : "border-[#FF3A5C] bg-[#FF3A5C]/10"
            : "border-[#1e1e1e] bg-[#0a0a0a]"
          }
        `}
        style={{
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        <span className="text-base leading-none">{skill.icon}</span>
        <span
          className={`font-syne font-semibold text-sm tracking-wide transition-colors ${
            hovered
              ? accent
                ? "text-[#0BE7FF]"
                : "text-[#FF3A5C]"
              : "text-[#e8e8e8]"
          }`}
          style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
        >
          {skill.name}
        </span>
        <span
          className="text-[10px] font-mono text-[#444] tracking-widest hidden md:inline"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          {skill.tag}
        </span>
      </motion.div>

      {/* Tooltip that pops above on hover */}
      <AnimatePresence>
        {hovered && skill.level !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ minWidth: "140px" }}
          >
            <div
              className="border border-[#1e1e1e] bg-[#0f0f0f] px-4 py-3 shadow-xl"
              style={{
                boxShadow: accent
                  ? "0 8px 24px rgba(11,231,255,0.15)"
                  : "0 8px 24px rgba(255,58,92,0.15)",
              }}
            >
              {/* Skill name */}
              <p
                className="font-syne font-bold text-[#e8e8e8] text-xs mb-2"
                style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
              >
                {skill.name}
              </p>
              {/* Level bar */}
              <div className="w-full h-[3px] bg-[#111] mb-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{
                    background: accent ? "#0BE7FF" : "#FF3A5C",
                    boxShadow: accent
                      ? "0 0 6px rgba(11,231,255,0.6)"
                      : "0 0 6px rgba(255,58,92,0.6)",
                  }}
                />
              </div>
              {/* Percentage */}
              <p
                className="font-mono text-[10px] tracking-widest"
                style={{
                  fontFamily: "var(--font-mono, DM Mono, monospace)",
                  color: accent ? "#0BE7FF" : "#FF3A5C",
                }}
              >
                {skill.level}%
              </p>
            </div>
            {/* Arrow tip */}
            <div
              className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-[#0f0f0f] border-r border-b"
              style={{ borderColor: "#1e1e1e" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Marquee Row ──────────────────────────────── */
function MarqueeRow({
  skills,
  direction,
  accent,
}: {
  skills: Skill[];
  direction: "left" | "right";
  accent: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];

  return (
    <div className="marquee-row overflow-hidden relative py-2" style={{ willChange: "transform" }}>
      <div
        className={
          direction === "left" ? "marquee-track-left" : "marquee-track-right"
        }
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} accent={accent} />
        ))}
      </div>
    </div>
  );
}

/* ── Tool Chip (no tooltip needed) ───────────── */
function ToolChip({ tool, index }: { tool: { name: string; icon: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, borderColor: "#0BE7FF" }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="flex items-center gap-2 px-4 py-2.5 border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#0BE7FF] transition-colors"
      style={{ cursor: "none" }}
    >
      <span className="text-base leading-none">{tool.icon}</span>
      <span
        className="font-mono text-xs text-[#777] tracking-wider"
        style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
      >
        {tool.name}
      </span>
    </motion.div>
  );
}

/* ── Main Export ─────────────────────────────── */
export default function Skills() {
  return (
    <section id="skills" className="py-32 overflow-hidden">

      {/* Padded heading area */}
      <div className="px-8 md:px-16 max-w-[1400px] mx-auto mb-16">
        <ScrollReveal>
          <p
            className="text-[10px] tracking-[0.4em] text-[#0BE7FF] uppercase mb-6 font-mono"
            style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
          >
            02 · Skills
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <ScrollReveal delay={0.05}>
            <h2
              className="font-syne font-extrabold text-5xl md:text-6xl leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              What I work
              <br />
              <span className="text-[#0BE7FF]">with.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p
              className="text-[#555] text-sm max-w-xs font-mono"
              style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
            >
              Hover any skill to see
              <br className="hidden md:block" /> proficiency level.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Marquee Rows ── */}
      <div className="space-y-3 mb-6">
        {/* Row 1 — Proficient, scrolls left */}
        <ScrollReveal delay={0.08}>
          <div>
            <div className="px-8 md:px-16 max-w-[1400px] mx-auto mb-2">
              <span
                className="text-[10px] font-mono text-[#444] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
              >
                Proficient ↔
              </span>
            </div>
            <MarqueeRow
              skills={proSkills as Skill[]}
              direction="left"
              accent={true}
            />
          </div>
        </ScrollReveal>

        {/* Row 2 — Learning, scrolls right */}
        <ScrollReveal delay={0.14}>
          <div>
            <div className="px-8 md:px-16 max-w-[1400px] mx-auto mb-2">
              <span
                className="text-[10px] font-mono text-[#444] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
              >
                Currently learning ↔
              </span>
            </div>
            <MarqueeRow
              skills={learningSkills as Skill[]}
              direction="right"
              accent={false}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* ── Tools Grid ── */}
      <div className="px-8 md:px-16 max-w-[1400px] mx-auto mt-16">
        <ScrollReveal delay={0.18}>
          <div className="pt-10 border-t border-[#1e1e1e]">
            <p
              className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-6 font-mono"
              style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
            >
              Tools &amp; Environment
            </p>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool, i) => (
                <ToolChip key={tool.name} tool={tool} index={i} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
