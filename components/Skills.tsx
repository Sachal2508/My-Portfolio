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
  stickyTop: string;
  marginBottom: string;
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
    stickyTop: "12vh",
    marginBottom: "28rem",
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
    stickyTop: "calc(12vh + 5.5rem)",
    marginBottom: "24rem",
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
    stickyTop: "calc(12vh + 11rem)",
    marginBottom: "20rem",
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
    stickyTop: "calc(12vh + 16.5rem)",
    marginBottom: "16rem",
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
    stickyTop: "calc(12vh + 22rem)",
    marginBottom: "12rem",
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
    stickyTop: "calc(12vh + 27.5rem)",
    marginBottom: "6rem",
  },
];

// ─── Split-flap hover skill item component ───
function SplitFlapItem({ num, name, details }: { num: string; name: string; details: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#222] group cursor-default gap-1">
      <div className="flex items-center gap-4">
        <span
          className="font-mono text-xs text-[#666] group-hover:text-[#0BE7FF] transition-colors"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {num}
        </span>

        {/* Split-flap container */}
        <span className="relative block overflow-hidden h-[1.5em] select-none">
          {/* Top text (default) */}
          <span
            className="block font-syne font-semibold text-lg text-white transition-transform duration-400 ease-[cubic-bezier(.51,.92,.24,1.15)] group-hover:-translate-y-full"
            style={{ fontFamily: "var(--font-syne, sans-serif)", transitionTimingFunction: EASE }}
          >
            {name}
          </span>

          {/* Bottom text (hover reveal in cyan) */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 block font-syne font-semibold text-lg text-[#0BE7FF] transition-transform duration-400 ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0"
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
      <div className="relative flex w-full flex-col gap-y-8 md:gap-y-16 mb-16 md:mb-24">
        <ScrollReveal>
          <h1 className="section-heading text-[var(--c-accent,#0BE7FF)] overflow-hidden">
            <span className="inline-block">WHAT I DO /</span>
          </h1>
        </ScrollReveal>

        <div className="flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-start md:col-start-6">
          <span className="font-medium uppercase text-nowrap text-[#aaa] text-sm tracking-widest">
            (SERVICES & SKILLS)
          </span>
          <p className="max-w-[32ch] text-balance font-medium leading-relaxed text-[#888] text-base">
            Structured technical capabilities across 6 core engineering domains.
          </p>
        </div>
      </div>

      {/* Sticky Stacking Accordion Sections */}
      <div ref={containerRef} className="flex flex-col relative w-full">
        {skillDomains.map((domain) => (
          <div
            key={domain.id}
            className="sticky border-t border-[#222] bg-[#0c0c0c] p-6 sm:p-10 rounded-2xl shadow-2xl transition-shadow duration-300"
            style={{
              top: domain.stickyTop,
              marginBottom: domain.marginBottom,
            }}
          >
            {/* Header row */}
            <div className="grid grid-cols-12 items-center gap-4 text-left">
              <span
                className="col-span-2 font-mono text-xl font-bold text-[#0BE7FF]"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {domain.number}
              </span>
              <h3
                className="col-span-10 text-2xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {domain.title}
              </h3>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-12 pt-6 sm:pt-10 gap-6">
              <div className="col-span-12 lg:col-span-4 lg:col-start-3">
                <p className="text-sm text-[#888] leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col divide-y divide-[#1e1e1e]">
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
