import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
} from 'lucide-react';
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
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileViewMode, setMobileViewMode] = useState<'deck' | 'list'>('deck');
  const [dragDirection, setDragDirection] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 'artbythread',
      name: 'ArtByThread',
      tagline: 'Where Every Stitch Tells a Story',
      description:
        'A handcrafted digital storefront built for a real small business — turning a handmade brand into an engaging online experience where customers can discover, explore, and order with ease.',
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
      description:
        'A complete preparation platform to practice coding, aptitude, mock interviews, and track your progress.',
      tags: [
        'React',
        'Node.js',
        'Express',
        'MongoDB',
        'JWT',
        'REST API',
        'Tailwind CSS',
        'Chart.js',
        'Full-Stack',
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
      description:
        'A smart career toolkit built to make your resume stronger and job-ready. Analyze ATS performance, improve your resume, discover better job matches, and prepare for interviews with focused career insights.',
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
      description:
        'A smart writing tool that turns rough thoughts into clear, polished messages without changing what you mean. Choose the tone, refine your words, and make every message sound more confident, professional, or natural.',
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
    {
      id: 'safar-e-yaadein',
      name: 'Safar-e-Yaadein',
      tagline: 'Step Into the 90s. Feel the Memories.',
      description:
        'Before Everything Went Digital, Memories Felt Different. An immersive journey through 90s India, bringing forgotten moments to life with nostalgic scenes, vintage music, ambient sounds, and interactive experiences.',
      tags: ['React', 'Vite', 'Web Audio API', 'HTML5 Audio', 'Vanilla CSS', 'Animations'],
      rotation: 'rotate-[1.3deg]',
      clipClass: 'torn-card-edge-2',
      tapeColor: 'washi-tape',
      tapeRotation: '-rotate-2',
      demoUrl: 'https://safar-e-yaadein.vercel.app/',
      githubUrl: 'https://github.com/Kashyap-Chaudhari/Safar-e-Yaadein',
      featuredBadge: 'EXPERIMENTAL EXPERIENCE',
      category: 'web',
    },
    {
      id: 'maze-escape',
      name: 'Maze Escape',
      tagline: 'Get Lost. Find Your Way Out',
      description:
        'A fast-paced maze adventure with procedurally generated challenges, progressive difficulty, unlockable skins, custom themes, and responsive controls built for every device.',
      tags: ['JavaScript', 'HTML5 Canvas', 'CSS', 'Procedural Generation', 'Game Logic', 'LocalStorage'],
      rotation: 'rotate-[-1.4deg]',
      clipClass: 'torn-card-edge-1',
      tapeColor: 'washi-tape',
      tapeRotation: 'rotate-2',
      demoUrl: 'https://maze-escape-delta.vercel.app/',
      githubUrl: 'https://github.com/Kashyap-Chaudhari/MazeEscape',
      featuredBadge: 'WEB GAME',
      category: 'game',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = (filter: string) => {
    paperAudio.playClick();
    setActiveFilter(filter);
    setMobileIndex(0);
    setDragDirection(0);
  };

  const safeMobileIndex =
    filteredProjects.length === 0
      ? 0
      : Math.min(mobileIndex, filteredProjects.length - 1);

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    paperAudio.playClick();
    setDragDirection(-1);
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    paperAudio.playClick();
    setDragDirection(1);
    setMobileIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const activeMobileProject = filteredProjects[safeMobileIndex] || filteredProjects[0];

  // Render individual project card component
  const renderCardContent = (project: Project, isMobile: boolean = false) => (
    <div
      className={`relative group ${isMobile ? 'rotate-0' : project.rotation} hover:rotate-0 hover:scale-[1.01] transition-all duration-300 ease-out`}
    >
      {/* Pinned Washi Tape */}
      <div
        className={`${project.tapeColor} ${project.tapeRotation} absolute -top-3 left-6 sm:left-8 w-20 sm:w-24 h-5 sm:h-6 z-20 pointer-events-none transition-transform group-hover:rotate-0 shadow-xs`}
      />

      {/* Torn Card Body */}
      <div
        className={`relative p-5 sm:p-7 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-card-border)] shadow-paper-md group-hover:shadow-paper-lg transition-all duration-300 ${project.clipClass}`}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* Header with category and featured badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--color-tag-bg)] text-[var(--color-paper-muted)] border border-[var(--color-tag-border)]">
            SPEC // {project.category.toUpperCase()}
          </span>

          {project.featuredBadge && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-badge-bg)] border border-[var(--color-badge-border)] text-[var(--color-badge-text)] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
              {project.featuredBadge}
            </span>
          )}
        </div>

        {/* Project Name (Handwritten display style) */}
        <h3 className="font-hand text-2xl sm:text-4xl font-bold text-[var(--color-paper-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.name}
        </h3>

        {/* One-Line Tagline */}
        <p className="font-sans text-xs sm:text-sm font-medium text-[var(--color-paper-text)]/90 mt-1 mb-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Longer Description */}
        <p className="text-xs leading-relaxed text-[var(--color-paper-muted)] mb-4">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-[var(--color-tag-bg)] text-[var(--color-tag-text)] border border-[var(--color-tag-border)] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links: Live Demo & GitHub */}
        <div className="flex items-center justify-between pt-3.5 border-t border-dashed border-[var(--color-card-border)]">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => paperAudio.playClick()}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] group/link py-1 px-1 -mx-1 transition-colors"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => paperAudio.playClick()}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] py-1 px-1 -mx-1 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="relative py-8 sm:py-12 px-3 sm:px-8 border-b border-[var(--color-paper-line)]">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase font-semibold text-[var(--color-badge-text)] bg-[var(--color-badge-bg)] px-2.5 py-0.5 rounded border border-[var(--color-badge-border)]">
            03 — SELECTED WORK
          </span>
          <span className="h-px w-12 bg-[var(--color-badge-border)]" />
        </div>

        {/* Section Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-hand text-4xl sm:text-6xl font-bold text-[var(--color-paper-text)] tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-1 text-xs sm:text-base text-[var(--color-paper-muted)] max-w-xl">
              Index cards and physical prototypes built with modern frontend engineering and tactile interactions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-tag-bg)] border border-[var(--color-card-border)] font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
            {['all', 'client', 'web', 'ai', 'full-stack', 'game'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg uppercase tracking-wider font-semibold text-[10px] sm:text-xs whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-[var(--color-pill-active-bg)] text-[var(--color-pill-active-text)] shadow-xs font-bold'
                    : 'text-[var(--color-pill-inactive-text)] hover:text-[var(--color-paper-text)]'
                }`}
              >
                {filter === 'all' ? 'All Projects' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE VIEW (< md): Tactile Deck Carousel + Expandable Toggle */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden">
          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center bg-[var(--color-tag-bg)] rounded-xl border border-dashed border-[var(--color-card-border)] font-mono text-xs text-[var(--color-paper-muted)]">
              No projects found for this filter.
            </div>
          ) : (
            <>
              {/* Mobile Controls Bar: Index Counter & View Toggle */}
              <div className="flex items-center justify-between gap-2 mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--color-tag-bg)] text-[var(--color-paper-text)] border border-[var(--color-tag-border)]">
                    {mobileViewMode === 'deck'
                      ? `CARD ${String(safeMobileIndex + 1).padStart(2, '0')} / ${String(
                          filteredProjects.length
                        ).padStart(2, '0')}`
                      : `SHOWING ALL ${filteredProjects.length} SPEC(S)`}
                  </span>
                </div>

                {/* Switch between Single Deck & Unfolded List */}
                <button
                  onClick={() => {
                    if (mobileViewMode === 'deck') {
                      paperAudio.playUnfold();
                      setMobileViewMode('list');
                    } else {
                      paperAudio.playFold();
                      setMobileViewMode('deck');
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] hover:bg-[var(--color-tag-bg)] text-[var(--color-paper-text)] font-mono text-[11px] font-bold shadow-xs transition-all active:scale-95"
                >
                  {mobileViewMode === 'deck' ? (
                    <>
                      <LayoutGrid className="w-3 h-3 text-[var(--color-accent)]" />
                      <span>View All ({filteredProjects.length})</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3 h-3 text-[var(--color-accent)]" />
                      <span>Deck View</span>
                    </>
                  )}
                </button>
              </div>

              {/* MODE 1: DECK VIEW (Focused, swipeable single card) */}
              {mobileViewMode === 'deck' && (
                <div className="space-y-4">
                  {/* Swipeable Card Stage */}
                  <div className="relative touch-pan-y overflow-hidden px-1 py-1">
                    <AnimatePresence mode="wait" initial={false}>
                      {activeMobileProject && (
                        <motion.div
                          key={activeMobileProject.id}
                          initial={{ opacity: 0, x: dragDirection > 0 ? 40 : -40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: dragDirection > 0 ? -40 : 40 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={(_, info) => {
                            if (info.offset.x < -40) {
                              handleNext();
                            } else if (info.offset.x > 40) {
                              handlePrev();
                            }
                          }}
                          className="w-full cursor-grab active:cursor-grabbing"
                        >
                          {renderCardContent(activeMobileProject, true)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Footer: Prev / Dots / Next */}
                  <div className="flex items-center justify-between gap-3 pt-2 px-1">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Project"
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-card-border)] text-[var(--color-paper-text)] font-mono text-xs font-bold shadow-xs hover:bg-[var(--color-tag-bg)] active:scale-95 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>Prev</span>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex items-center gap-1.5">
                      {filteredProjects.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            paperAudio.playClick();
                            setDragDirection(idx > safeMobileIndex ? 1 : -1);
                            setMobileIndex(idx);
                          }}
                          aria-label={`Go to project ${p.name}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            safeMobileIndex === idx
                              ? 'w-6 bg-[var(--color-accent)]'
                              : 'w-2 bg-[var(--color-card-border)] hover:bg-[var(--color-accent)]/50'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      aria-label="Next Project"
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-card-border)] text-[var(--color-paper-text)] font-mono text-xs font-bold shadow-xs hover:bg-[var(--color-tag-bg)] active:scale-95 transition-all"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 text-[var(--color-accent)]" />
                    </button>
                  </div>

                  {/* Tactile Swipe Hint */}
                  <p className="text-center font-mono text-[10px] text-[var(--color-paper-muted)]/70 uppercase tracking-widest pt-1">
                    ← Swipe or tap arrows to flip cards →
                  </p>
                </div>
              )}

              {/* MODE 2: EXPANDED LIST (Unfolded when user asks to view all) */}
              {mobileViewMode === 'list' && (
                <div className="space-y-6">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {renderCardContent(project, true)}
                    </motion.div>
                  ))}

                  {/* Collapse back button */}
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => {
                        paperAudio.playFold();
                        setMobileViewMode('deck');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-tag-bg)] hover:bg-[var(--color-card-bg)] border border-[var(--color-card-border)] font-mono text-xs font-bold text-[var(--color-paper-text)] transition-all active:scale-95 shadow-xs"
                    >
                      <Layers className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span>Collapse to Card Deck</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP VIEW (>= md): Authentic 2-Column Torn Index Card Grid */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div key={project.id}>
              {renderCardContent(project, false)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
