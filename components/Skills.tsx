"use client";

import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const EASE = "cubic-bezier(.51,.92,.24,1.15)";

interface SkillDomain {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: { num: string; name: string; details: string }[];
  zIndex: number;
}

const skillDomains: SkillDomain[] = [
  {
    id: "01",
    number: "(01)",
    title: "Programming Languages",
    description: "Core languages for low-level systems, enterprise applications, web development, and data science.",
    skills: [
      { num: "01", name: "C / C++", details: "Memory management, Data Structures, OOP" },
      { num: "02", name: "C#", details: ".NET Core, Enterprise Apps, Object-Oriented Design" },
      { num: "03", name: "Python", details: "Scripting, Automation, AI/ML, Data Processing" },
      { num: "04", name: "JavaScript & TypeScript", details: "ES6+, Async/Await, Strict Typing, Web & Native" },
      { num: "05", name: "SQL, HTML5 & CSS3", details: "Relational Queries, Semantic Web, Modern Styling" },
    ],
    zIndex: 10,
  },
  {
    id: "02",
    number: "(02)",
    title: "Frontend Development",
    description: "Building responsive, high-performance, and interactive web and mobile interfaces.",
    skills: [
      { num: "01", name: "React.js & Next.js", details: "App Router, SSR, Custom Hooks, State Management" },
      { num: "02", name: "Responsive Web Design", details: "Mobile-First, Flexible Grid Systems, CSS Utilities" },
      { num: "03", name: "Capacitor", details: "Cross-Platform Native Apps, Mobile Plugins, Offline Mode" },
      { num: "04", name: "Modern Web APIs", details: "DOM Manipulation, Canvas, Web Storage, Fetch API" },
    ],
    zIndex: 20,
  },
  {
    id: "03",
    number: "(03)",
    title: "Backend Development",
    description: "Architecting scalable APIs, microservices, secure authentication, and cloud backends.",
    skills: [
      { num: "01", name: "ASP.NET Core / .NET", details: "Enterprise Web APIs, MVC Architecture, C#" },
      { num: "02", name: "Node.js & Express.js", details: "Asynchronous Microservices, REST APIs" },
      { num: "03", name: "Flask & FastAPI", details: "High-Performance Python Web Services & AI Endpoints" },
      { num: "04", name: "REST APIs & Serverless", details: "HTTP Endpoints, Edge Execution, JSON Data" },
      { num: "05", name: "Auth & Security", details: "JWT, OAuth, Role-Based Access Control (RBAC)" },
    ],
    zIndex: 30,
  },
  {
    id: "04",
    number: "(04)",
    title: "AI & Machine Learning",
    description: "Deep learning models, computer vision, natural language processing, and AI automation.",
    skills: [
      { num: "01", name: "TensorFlow & PyTorch / Keras", details: "Neural Networks, CNNs, Deep Learning Models" },
      { num: "02", name: "Scikit-learn & OpenCV", details: "Machine Learning, Image Processing, Object Detection" },
      { num: "03", name: "NLP & Computer Vision", details: "Text Classification, Feature Extraction, Image Recognition" },
      { num: "04", name: "Recommendation Systems", details: "Collaborative & Content-Based Filtering" },
      { num: "05", name: "AI API Integration", details: "OpenAI & Gemini APIs, Chatbots & AI Agents" },
    ],
    zIndex: 40,
  },
  {
    id: "05",
    number: "(05)",
    title: "Databases",
    description: "Relational schema design, ORM integration, real-time BaaS, and database migrations.",
    skills: [
      { num: "01", name: "SQL Server & PostgreSQL", details: "Relational Schemas, Stored Procedures, Indexing" },
      { num: "02", name: "Supabase", details: "Real-time Postgres BaaS, Auth, Storage, Edge Functions" },
      { num: "03", name: "Entity Framework Core", details: "C# ORM, Code-First Migrations, LINQ Queries" },
      { num: "04", name: "Database Design", details: "Schema Normalization, Performance Optimization" },
    ],
    zIndex: 50,
  },
  {
    id: "06",
    number: "(06)",
    title: "Tools & DevOps",
    description: "Developer tooling, containerization, API testing, IDEs, and continuous integration/deployment.",
    skills: [
      { num: "01", name: "Git & GitHub", details: "Version Control, Branching Strategies, CI Workflows" },
      { num: "02", name: "Docker", details: "Containerization, Multi-Stage Builds, Isolated Environments" },
      { num: "03", name: "Postman & API Testing", details: "Endpoint Validation, Automated Collection Testing" },
      { num: "04", name: "Visual Studio & VS Code", details: "Full IDE Debugging, Profiling, Extensions" },
      { num: "05", name: "Jupyter & Data Notebooks", details: "Interactive Data Exploration, ML Prototyping" },
      { num: "06", name: "Vercel & Render", details: "Cloud Hosting, Edge Deployment, Continuous Integration" },
    ],
    zIndex: 60,
  },
];

// ─── Split-flap hover skill item component ───
function SplitFlapItem({ num, name, details }: { num: string; name: string; details: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 border-b border-[#1c1c1c] group cursor-default gap-1">
      <div className="flex items-center gap-3.5">
        <span
          className="font-mono text-xs text-[#666] group-hover:text-[#0BE7FF] transition-colors shrink-0"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {num}
        </span>

        {/* Split-flap container */}
        <span className="relative block overflow-hidden h-[1.5em] select-none">
          {/* Top text (default) */}
          <span
            className="block font-syne font-semibold text-base sm:text-lg text-white transition-transform duration-400 ease-[cubic-bezier(.51,.92,.24,1.15)] group-hover:-translate-y-full"
            style={{ fontFamily: "var(--font-syne, sans-serif)", transitionTimingFunction: EASE }}
          >
            {name}
          </span>

          {/* Bottom text (hover reveal in cyan) */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 block font-syne font-semibold text-base sm:text-lg text-[#0BE7FF] transition-transform duration-400 ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0"
            style={{ fontFamily: "var(--font-syne, sans-serif)", transitionTimingFunction: EASE }}
          >
            {name}
          </span>
        </span>
      </div>

      <span
        className="font-mono text-xs text-[#888] sm:text-right"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
      >
        {details}
      </span>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="section-padding bg-[#080808] relative">
      {/* Section Header */}
      <div className="relative flex w-full flex-col gap-y-4 mb-12 md:mb-20">
        <ScrollReveal>
          <p
            className="text-xs sm:text-sm tracking-[0.3em] text-[#0BE7FF] uppercase font-mono"
            style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
          >
            02 · SKILLS
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="section-heading text-white">
            WHAT I DO /
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="max-w-[40ch] font-sans leading-relaxed text-[#aaa] text-sm sm:text-base">
            Structured technical capabilities across 6 core engineering domains.
          </p>
        </ScrollReveal>
      </div>

      {/* Full-Card Deck Overlay Stacking (Each new card covers the previous one) */}
      <div ref={containerRef} className="flex flex-col relative w-full pb-16">
        {skillDomains.map((domain, index) => (
          <div
            key={domain.id}
            className="sticky top-20 sm:top-24 border border-[#222] bg-[#0c0c0c] p-6 sm:p-10 rounded-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.95)] transition-all duration-300 mb-28 sm:mb-40"
            style={{
              zIndex: domain.zIndex,
            }}
          >
            {/* Header Row */}
            <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#1c1c1c]">
              <span
                className="font-mono text-base sm:text-xl font-bold text-[#0BE7FF] shrink-0"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {domain.number}
              </span>
              <h3
                className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {domain.title}
              </h3>
            </div>

            {/* Content Row */}
            <div className="grid grid-cols-12 pt-6 sm:pt-8 gap-4 sm:gap-6">
              <div className="col-span-12 lg:col-span-4">
                <p className="text-sm text-[#999] leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-8 flex flex-col divide-y divide-[#1c1c1c]">
                {domain.skills.map((skill) => (
                  <SplitFlapItem
                    key={skill.name}
                    num={skill.num}
                    name={skill.name}
                    details={skill.details}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
