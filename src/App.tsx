import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DeskBackground } from './components/DeskBackground';
import { PaperBall3D } from './components/PaperBall3D';
import { Navigation } from './components/Navigation';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { paperAudio } from './utils/audio';
import { Sparkles, MoveUpRight } from 'lucide-react';

type AppState = 'folded' | 'unfolding' | 'unfolded' | 'folding';
type PaperTheme = 'cream' | 'kraft' | 'blueprint' | 'charcoal';

export function App() {
  const [appState, setAppState] = useState<AppState>('folded');
  const [isBallHovered, setIsBallHovered] = useState(false);
  const [theme, setTheme] = useState<PaperTheme>('cream');
  const [activeSection, setActiveSection] = useState('about');
  const [unfoldProgress, setUnfoldProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut handlers: Space/Enter to unfold, Esc/F to fold
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (appState === 'folded' && (e.code === 'Space' || e.key === 'Enter')) {
        e.preventDefault();
        handleUnfold();
      } else if (appState === 'unfolded' && (e.key === 'Escape' || e.key.toLowerCase() === 'f')) {
        e.preventDefault();
        handleFold();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState]);

  // Scroll spy to track active section inside the paper container
  useEffect(() => {
    if (appState !== 'unfolded') return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = ['about', 'skills', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPos = container.scrollTop + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [appState]);

  // Navigate to section inside the paper container cleanly without moving the window
  const handleNavigate = (id: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (id === 'about') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(id);
    if (targetEl) {
      const targetTop = targetEl.offsetTop;
      container.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }
  };

  // Trigger unfold animation sequence
  const handleUnfold = () => {
    if (appState !== 'folded') return;
    paperAudio.playUnfold();
    setAppState('unfolding');
    setUnfoldProgress(0);

    const startTime = Date.now();
    const duration = 1000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setUnfoldProgress(progress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setAppState('unfolded');
      }
    }, 20);
  };

  // Trigger fold animation sequence
  const handleFold = () => {
    if (appState !== 'unfolded') return;
    paperAudio.playFold();
    setAppState('folding');

    setTimeout(() => {
      setAppState('folded');
      setUnfoldProgress(0);
    }, 400);
  };

  return (
    <div 
      data-theme={theme} 
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0d1527] text-[var(--color-paper-text)] font-sans antialiased selection:bg-amber-300 selection:text-amber-950"
    >
      <DeskBackground>
        {/* SCENE 1: LANDING (Folded State) */}
        {appState === 'folded' && (
          <motion.div
            key="landing-scene"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg flex flex-col items-center justify-center select-none mx-auto"
          >
            {/* Central Deckled Torn-Paper Stage Silhouette */}
            <div 
              className="w-full p-6 sm:p-9 rounded-3xl bg-[var(--color-paper-bg)] shadow-2xl border border-black/10 torn-paper-edge flex flex-col items-center justify-center text-center transition-transform duration-300 hover:shadow-paper-lg"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {/* Washi Tape at Top of Landing Card */}
              <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 rotate-[-1.5deg] z-20 shadow-sm" />

              <h1 className="font-hand text-4xl sm:text-5xl font-bold text-[var(--color-paper-text)] tracking-tight mb-0.5 mt-1">
                Kashyap Chaudhari
              </h1>
              <p className="font-mono text-[11px] sm:text-xs text-[var(--color-paper-muted)] tracking-wider uppercase mb-3">
                Creative Technologist & Full-Stack Engineer
              </p>

              {/* 3D Crumpled Paper Ball */}
              <div className="relative my-1 flex items-center justify-center">
                <PaperBall3D
                  onClick={handleUnfold}
                  isHovered={isBallHovered}
                  onHoverChange={setIsBallHovered}
                  isUnfolding={false}
                />

                {/* Soft animated pulsing ring behind ball on hover */}
                {isBallHovered && (
                  <motion.div
                    layoutId="pulse-glow"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.35 }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 -m-8 rounded-full border-2 border-dashed border-amber-600/40 pointer-events-none"
                  />
                )}
              </div>

              {/* Directly on/below the ball: "click to unfold" with secondary line */}
              <div 
                onClick={handleUnfold}
                className="mt-2 flex flex-col items-center cursor-pointer group"
              >
                <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/[0.05] border border-black/10 group-hover:bg-amber-900 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-300 transition-colors animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="font-sans text-xs sm:text-sm font-bold tracking-wide uppercase">
                    Click to Unfold
                  </span>
                  <MoveUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <p className="mt-1.5 font-sans text-xs text-[var(--color-paper-muted)] font-medium">
                  Tactile portfolio experience.
                </p>

                {/* Keyboard hint badge */}
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-paper-muted)]/70 bg-black/[0.03] px-2 py-0.5 rounded">
                  <span>or press</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/70 border border-black/15 shadow-2xs font-semibold text-[var(--color-paper-text)]">
                    Space
                  </kbd>
                  <span>/</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/70 border border-black/15 shadow-2xs font-semibold text-[var(--color-paper-text)]">
                    Enter
                  </kbd>
                </div>
              </div>
            </div>
          </motion.div>
        )}

            {/* TRANSITION: In-Place Smooth Expansion */}
            {appState === 'unfolding' && (
              <motion.div
                key="unfolding-transition"
                initial={{ scale: 0.5, opacity: 0.95, borderRadius: '40px' }}
                animate={{ scale: 1, opacity: 1, borderRadius: '16px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl h-[calc(100dvh-1.25rem)] sm:h-[calc(100vh-4.5rem)] max-h-[880px] bg-[var(--color-paper-bg)] torn-paper-edge shadow-2xl flex flex-col items-center justify-center relative mx-auto"
              >
                <div className="paper-crease-overlay absolute inset-0 pointer-events-none" />
                <div className="font-mono text-xs sm:text-sm text-amber-900 tracking-widest uppercase animate-pulse flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
                  <span>[ UNFOLDING PHYSICAL CANVAS • {unfoldProgress}% ]</span>
                </div>
              </motion.div>
            )}

            {/* SCENE 2: UNFOLDED SITE (Dead-Center in Viewport) */}
            {(appState === 'unfolded' || appState === 'folding') && (
              <motion.div
                key="unfolded-scene"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl h-[calc(100dvh-1.25rem)] sm:h-[calc(100vh-4.5rem)] max-h-[880px] flex flex-col rounded-2xl bg-[var(--color-paper-bg)] text-[var(--color-paper-text)] torn-paper-edge shadow-2xl border border-black/10 overflow-hidden mx-auto relative z-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.035) 1.2px, transparent 1.2px)',
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Authentic Fold Crease Line Overlay */}
                <div className="paper-crease-overlay absolute inset-0 z-30 pointer-events-none" />

                {/* Subtle Grain Overlay */}
                <div className="paper-grain absolute inset-0 z-20 pointer-events-none" />

                {/* Decorative Washi Tapes on Corners */}
                <div className="washi-tape absolute -top-3 left-16 w-32 h-6 rotate-[-1.5deg] z-40 hidden sm:block" />
                <div className="washi-tape-teal absolute -top-3 right-16 w-28 h-6 rotate-2 z-40 hidden sm:block" />

                {/* On-Sheet Top Navigation Bar */}
                <Navigation
                  onFold={handleFold}
                  activeSection={activeSection}
                  theme={theme}
                  onThemeChange={setTheme}
                  onNavigate={handleNavigate}
                />

                {/* Scrollable Paper Sheet Content */}
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto paper-scroll relative z-10 scroll-smooth"
                >
                  <main className="pb-8">
                    <AboutSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <ContactSection />
                  </main>
                </div>
              </motion.div>
            )}
      </DeskBackground>
    </div>
  );
}

export default App;
