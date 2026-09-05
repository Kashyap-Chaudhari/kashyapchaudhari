import React from 'react';
import { Sparkles, Code2, Cpu, Compass, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative pt-4 pb-10 sm:pt-6 sm:pb-12 px-4 sm:px-8 border-b border-black/5">
      {/* Subtle coffee stain background detail in corner */}
      <div className="coffee-stain -top-4 right-6 opacity-40 hidden md:block" />

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-amber-800/80 bg-amber-100/60 px-2.5 py-0.5 rounded border border-amber-900/10">
            01 — BACKGROUND
          </span>
          <span className="h-px w-12 bg-amber-900/15" />
        </div>

        {/* Big Handwritten Heading with SVG Scribble Underline */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <h1 className="font-hand text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-paper-text)] tracking-tight">
            About Me
          </h1>
          {/* Hand-drawn SVG underline scribble */}
          <svg
            className="absolute -bottom-3 left-0 w-full h-4 text-amber-600/75 overflow-visible"
            viewBox="0 0 250 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11C45 3.5 110 4 247 9M18 14C80 8 160 8.5 235 13"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-[var(--color-paper-text)] font-sans">
              <span>I'm Kashyap Chaudhari</span>
              <span className="animate-bounce text-3xl">👋</span>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-[var(--color-paper-text)]/90 font-normal">
              Computer Engineering student and Frontend Developer who enjoys taking an idea from
              <span className="highlight-yellow font-semibold"> “What if we built this?” → “It actually works.”</span>
            </p>

            <p className="text-base leading-relaxed text-[var(--color-paper-muted)]">
              I like turning <span className="font-semibold">ideas into things people can actually use</span> — from
              real-world business websites and API-driven products to interactive interfaces and experiments that push what’s possible on the web.
              Every project teaches me something new about <span className="font-semibold">building, designing, and thinking like a product creator</span>.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--color-paper-text)]/90 font-normal">
              I’m not just here to write code; I’m here to <span className="font-semibold">make ideas useful, experiences memorable, and products worth using.</span>
            </p>

            {/* Micro Badges / Personal Principles */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-black/[0.04] border border-black/10 text-[var(--color-paper-text)]">
                <Code2 className="w-3.5 h-3.5 text-teal-700" />
                Frontend Development
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-black/[0.04] border border-black/10 text-[var(--color-paper-text)]">
                <Code2 className="w-3.5 h-3.5 text-teal-700" />
                API Integration
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-black/[0.04] border border-black/10 text-[var(--color-paper-text)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                UI/UX Engineering
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-black/[0.04] border border-black/10 text-[var(--color-paper-text)]">
                <Cpu className="w-3.5 h-3.5 text-purple-700" />
                Production & Deployment
              </span>
            </div>
          </div>

          {/* Right Column: Boxed "Info Card" styled as pinned card */}
          <div className="lg:col-span-5 relative">
            {/* Top Washi Tape */}
            <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-1 z-10" />

            <div className="p-6 sm:p-7 rounded-2xl bg-black/[0.025] border border-black/10 shadow-sm space-y-5 relative">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-black/10 pb-3.5">
                <div>
                  <span className="font-mono text-[11px] text-amber-800 font-bold uppercase tracking-wider block">
                    CURRENT FOCUS
                  </span>
                  <span className="font-sans font-bold text-sm text-[var(--color-paper-text)]">
                    Software Engineer & UI Technologist
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-200/60 border border-amber-900/20 flex items-center justify-center font-hand text-lg font-bold text-amber-950">
                  KC
                </div>
              </div>

              {/* Focus Areas List */}
              <div className="space-y-2.5">
                <div className="font-mono text-xs text-[var(--color-paper-muted)] flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  <span>CORE DISCIPLINES</span>
                </div>
                <div className="text-sm font-medium text-[var(--color-paper-text)] pl-5 border-l-2 border-amber-600/30">
                  Web Development • AI Integration • UI/UX Architecture
                </div>
              </div>

              {/* Two Stat Blocks at Bottom */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/10">
                <div className="p-3 rounded-xl bg-white/40 border border-black/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-muted)] block mb-1">
                    RECENT ACTIVITY
                  </span>
                  <span className="font-sans text-xs font-bold text-[var(--color-paper-text)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Real-World Client Projects
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/40 border border-black/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-muted)] block mb-1">
                    CURRENTLY BUILDING
                  </span>
                  <span className="font-sans text-xs font-bold text-[var(--color-paper-text)] flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-purple-600" />
                    Women’s Safety Website
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
