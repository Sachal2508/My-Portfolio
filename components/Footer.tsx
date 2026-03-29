"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1c1c1c] py-10 px-8 md:px-16 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#333] text-xs font-mono tracking-widest"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          © {year} MUHAMMAD SACHAL — ALL RIGHTS RESERVED
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 text-[10px] text-[#222] font-mono tracking-widest"
          style={{ fontFamily: "var(--font-mono, DM Mono, monospace)" }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0BE7FF] animate-pulse" />
          AVAILABLE FOR WORK
        </motion.div>
      </div>
    </footer>
  );
}
