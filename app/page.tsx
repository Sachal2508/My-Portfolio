"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <SmoothScroll>
        {/* Grain texture overlay */}
        <div className="grain" />

        {/* Custom trailing cursor */}
        <CustomCursor />

        {/* Main content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />

        <ScrollToTop />
      </SmoothScroll>
    </>
  );
}
