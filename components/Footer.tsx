"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Pakistan Standard Time (UTC+5)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1e1e1e] bg-[#060606] pt-20 pb-12 px-8 md:px-16 text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-y-16">

        {/* Top Footer Section: Giant Branding + Quick Links */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start">
          
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-y-4">
            <h2
              className="font-syne font-extrabold text-2xl sm:text-4xl md:text-6xl tracking-tight text-white uppercase leading-tight"
              style={{ fontFamily: "var(--font-syne, Syne, sans-serif)" }}
            >
              MUHAMMAD SACHAL
            </h2>
            <p className="text-sm text-[#aaa] max-w-md leading-relaxed font-sans">
              Full-Stack Developer & AI/ML Engineer based in Lahore, Pakistan. Crafting scalable applications and modern digital experiences.
            </p>

            {/* Pakistan Local Time Stamp */}
            <div className="mt-2 flex items-center gap-3 text-xs font-mono text-[#aaa] border border-[#222] bg-[#0d0d0d] px-3.5 py-2 rounded-lg w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0BE7FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0BE7FF]" />
              </span>
              <span>Lahore, PK (PST): <span className="text-[#0BE7FF] font-semibold">{timeStr || "UTC+5"}</span></span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="col-span-6 lg:col-span-3 flex flex-col gap-y-3 font-mono text-xs text-[#aaa]">
            <span className="text-white font-bold uppercase tracking-widest mb-2 font-syne text-sm">
              Navigation
            </span>
            <button
              onClick={() => scrollTo("#home")}
              className="text-left hover:text-[#0BE7FF] transition-colors py-1 w-fit"
            >
              00 // HOME
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="text-left hover:text-[#0BE7FF] transition-colors py-1 w-fit"
            >
              01 // ABOUT
            </button>
            <button
              onClick={() => scrollTo("#skills")}
              className="text-left hover:text-[#0BE7FF] transition-colors py-1 w-fit"
            >
              02 // SKILLS
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              className="text-left hover:text-[#0BE7FF] transition-colors py-1 w-fit"
            >
              03 // PROJECTS
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left hover:text-[#0BE7FF] transition-colors py-1 w-fit"
            >
              04 // CONTACT
            </button>
          </div>

          {/* Socials Column */}
          <div className="col-span-6 lg:col-span-3 flex flex-col gap-y-3 font-mono text-xs text-[#aaa]">
            <span className="text-white font-bold uppercase tracking-widest mb-2 font-syne text-sm">
              Social Connection
            </span>
            <a
              href="https://github.com/Sachal2508"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0BE7FF] transition-colors py-1 w-fit flex items-center gap-1"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-sachal-9a929136a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0BE7FF] transition-colors py-1 w-fit flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.instagram.com/muhammad.sachal.773/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0BE7FF] transition-colors py-1 w-fit flex items-center gap-1"
            >
              Instagram ↗
            </a>
            <a
              href="mailto:sachalm58@gmail.com"
              className="hover:text-[#0BE7FF] transition-colors py-1 w-fit flex items-center gap-1"
            >
              Email ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-[#777] leading-relaxed">
          <p>© {year} MUHAMMAD SACHAL. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-2">
            <span>BUILT WITH NEXT.JS & TAILWIND CSS</span>
            <span className="text-[#0BE7FF]">●</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
