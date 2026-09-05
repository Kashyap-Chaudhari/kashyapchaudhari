import React from 'react';
import { ExternalLink, Terminal, Sparkles, Brain, Lightbulb, Workflow } from 'lucide-react';
import { paperAudio } from '../utils/audio';
import { GithubIcon } from './Icons';

export const SkillsSection: React.FC = () => {
  const skillTraits = [
    {
      num: '01',
      title: 'Frontend Craft & React',
      tagline: 'Pixel-perfection meets fluid 60fps animations and resilient state architecture.',
      icon: Terminal,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      color: 'border-l-amber-600',
    },
    {
      num: '02',
      title: 'Creativity & Problem Solving',
      tagline: 'I enjoy turning random ideas into something real — exploring new designs, solving tricky problems, building interactive experiences, and seeing an idea finally come to life.',
      icon: Lightbulb,
      skills: [
        'Creative Thinking',
        'Problem Solving',
        'Canva',
        'UI/UX Design',
        'Visual Design',
        'Product Thinking',
        'Canva Design'
      ],
      color: 'border-l-teal-600',
    },
    {
      num: '03',
      title: 'APIs, Integration & Architecture',
      tagline: 'I enjoy making systems work together — connecting apps, routing data smoothly, and building clean backend logic.',
      icon: Brain,
      skills: [
        'API Integration',
        'Application Architecture',
        'System Design',
        'Data Flow',
        'REST APIs',
        'Backend Integration'
      ],
      color: 'border-l-indigo-600',
    },
    {
      num: '04',
      title: 'From Idea to Production',
      tagline: 'From idea sketches to live deployment — I enjoy taking a project from first concept through design, building, testing, and releasing it into the world.',
      icon: Workflow,
      skills: [
        'Git & GitHub',
        'Deployment',
        'Performance',
        'Debugging',
        'Analytics',
        'Continuous Improvement'
      ],
      color: 'border-l-emerald-600',
    },
  ];

  return (
    <section id="skills" className="relative py-8 sm:py-12 px-4 sm:px-8 border-b border-black/5 bg-black/[0.01]">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded border border-teal-900/15">
            STATUS: LEARNING & EXPLORATION
          </span>
          <span className="h-px w-12 bg-teal-900/15" />
        </div>

        {/* Header Row with Sticky Note Callout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-hand text-5xl sm:text-6xl font-bold text-[var(--color-paper-text)] tracking-tight">
              Building in Public
            </h2>
            <p className="mt-2 text-base text-[var(--color-paper-muted)] max-w-xl">
              Continuously iterating, documenting technical breakthroughs, and sharing experiments open-source on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* "Independent Developer" Callout Styled as a Torn Sticky Note */}
            <div className="relative rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rotate-2 z-10" />
              <div className="bg-amber-100 text-amber-950 p-3 sm:px-4 sm:py-2.5 rounded-sm shadow-sticky border border-amber-300/80 font-hand text-lg font-bold flex items-center gap-2 select-none">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Independent Developer ✍️</span>
              </div>
            </div>

            {/* GitHub Action Button */}
            <a
              href="https://github.com/Kashyap-Chaudhari"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => paperAudio.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/15 bg-[var(--color-paper-text)] text-white hover:opacity-90 font-mono text-xs font-semibold shadow-sm transition-transform active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Numbered Skill / Trait Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillTraits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group relative p-6 rounded-2xl bg-black/[0.02] border border-black/10 hover:border-black/20 hover:bg-white/60 transition-all duration-200 shadow-sm"
              >
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/5 text-[var(--color-paper-muted)]">
                    {item.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[var(--color-paper-text)] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Handwritten Subheading */}
                <h3 className="font-hand text-2xl sm:text-3xl font-bold text-[var(--color-paper-text)] mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--color-paper-muted)] mb-4 font-sans">
                  {item.tagline}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-black/[0.04] text-[var(--color-paper-text)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
