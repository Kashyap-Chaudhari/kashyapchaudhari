import React, { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { paperAudio } from '../utils/audio';
import { GithubIcon } from './Icons';

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  rotation: string;
  clipClass: string;
  tapeColor: 'washi-tape' | 'washi-tape-teal' | 'washi-tape-pink';
  tapeRotation: string;
  demoUrl: string;
  githubUrl: string;
  featuredBadge?: string;
  category: string;
}

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 'artbythread',
      name: 'ArtByThread',
      tagline: 'Where Every Stitch Tells a Story',
      description: 'A handcrafted digital storefront built for a real small business — turning a handmade brand into an engaging online experience where customers can discover, explore, and order with ease. ',
      tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel', 'Responsive UI', 'UI/UX', 'Production'],
      rotation: 'rotate-[-1.5deg]',
      clipClass: 'torn-card-edge-1',
      tapeColor: 'washi-tape-teal',
      tapeRotation: 'rotate-2',
      demoUrl: 'https://artbythread.vercel.app/',
      githubUrl: 'https://github.com/Kashyap-Chaudhari/artbythread',
      featuredBadge: 'REAL CLIENT',
      category: 'client',
    },
    {
      id: 'prepwise',
      name: 'PrepWise',
      tagline: 'Turn everyday practice into stronger skills, sharper thinking, and better interview performance.',
      description: 'A complete preparation platform to practice coding, aptitude, mock interviews, and track your progress.',
      tags: [
        'React',
        'Node.js',
        'Express',
        'MongoDB',
        'JWT',
        'REST API',
        'Tailwind CSS',
        'Chart.js',
        'Full-Stack'
      ],
      rotation: 'rotate-[1.9deg]',
      clipClass: 'torn-card-edge-2',
      tapeColor: 'washi-tape',
      tapeRotation: '-rotate-1',
      demoUrl: 'https://get-prep-wise.vercel.app/',
      githubUrl: 'https://github.com/Kashyap-Chaudhari/PrepWise',
      category: 'full-stack',
    },
    {
      id: 'resume-iq',
      name: 'ResumeIQ',
      tagline: 'Turn your resume into your next opportunity.',
      description: 'A smart career toolkit built to make your resume stronger and job-ready. Analyze ATS performance, improve your resume, discover better job matches, and prepare for interviews with focused career insights.',
      tags: ['Django', 'Python', 'PostgreSQL', 'Gemini', 'Scikit-learn', 'ATS'],
      rotation: 'rotate-[-1.2deg]',
      clipClass: 'torn-card-edge-3',
      tapeColor: 'washi-tape-pink',
      tapeRotation: 'rotate-3',
      demoUrl: 'https://resume-iq.vercel.app/',
      githubUrl: 'https://github.com/kashyapchaudhari/nexus-orchestrator',
      featuredBadge: 'AI ARCHITECTURE',
      category: 'ai',
    },
    {
      id: 'fix-my-tone',
      name: 'Fix My Tone',
      tagline: 'Same Thought. Better Tone.',
      description: 'A smart writing tool that turns rough thoughts into clear, polished messages without changing what you mean. Choose the tone, refine your words, and make every message sound more confident, professional, or natural.',
      tags: ['JavaScript', 'Express', 'Gemini', 'Groq', 'Text Processing', 'Tone Detection', 'API Integration'],
      rotation: 'rotate-[-1.6deg]',
      clipClass: 'torn-card-edge-3',
      tapeColor: 'washi-tape-pink',
      tapeRotation: 'rotate-2',
      demoUrl: 'https://fix-my-tone.onrender.com/',
      githubUrl: 'https://github.com/Kashyap-Chaudhari/Fix-My-Tone',
      featuredBadge: 'SMART WRITING',
      category: 'web',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-8 sm:py-12 px-4 sm:px-8 border-b border-black/5">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-purple-800 bg-purple-100/70 px-2.5 py-0.5 rounded border border-purple-900/15">
            03 — SELECTED WORK
          </span>
          <span className="h-px w-12 bg-purple-900/15" />
        </div>

        {/* Section Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-hand text-5xl sm:text-6xl font-bold text-[var(--color-paper-text)] tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-1 text-base text-[var(--color-paper-muted)] max-w-xl">
              Index cards and physical prototypes built with modern frontend engineering and tactile interactions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/[0.04] border border-black/10 font-mono text-xs max-w-full">
            {['all', 'client', 'web', 'ai', 'full-stack'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  paperAudio.playClick();
                  setActiveFilter(filter);
                }}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg uppercase tracking-wider font-semibold text-[11px] sm:text-xs transition-all ${activeFilter === filter
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {filter === 'all' ? 'All Projects' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Torn Index Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`relative group ${project.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 ease-out`}
            >
              {/* Pinned Washi Tape */}
              <div
                className={`${project.tapeColor} ${project.tapeRotation} absolute -top-3.5 left-8 w-24 h-6 z-20 pointer-events-none transition-transform group-hover:rotate-0`}
              />

              {/* Torn Card Body */}
              <div
                className={`relative p-6 sm:p-7 rounded-lg bg-white/80 border border-black/10 shadow-paper-md group-hover:shadow-paper-lg transition-all duration-300 ${project.clipClass}`}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              >
                {/* Header with category and featured badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/5 text-[var(--color-paper-muted)]">
                    SPEC // {project.category.toUpperCase()}
                  </span>

                  {project.featuredBadge && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/70 border border-amber-900/20 text-amber-900 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      {project.featuredBadge}
                    </span>
                  )}
                </div>

                {/* Project Name (Handwritten display style) */}
                <h3 className="font-hand text-3xl sm:text-4xl font-bold text-[var(--color-paper-text)] group-hover:text-amber-900 transition-colors">
                  {project.name}
                </h3>

                {/* One-Line Tagline */}
                <p className="font-sans text-sm font-medium text-[var(--color-paper-text)]/90 mt-1 mb-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Longer Description */}
                <p className="text-xs leading-relaxed text-[var(--color-paper-muted)] mb-5">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/[0.04] text-[var(--color-paper-text)]/80 border border-black/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links: Live Demo & GitHub */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-black/15">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => paperAudio.playClick()}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-amber-900 hover:text-amber-700 group/link"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => paperAudio.playClick()}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
