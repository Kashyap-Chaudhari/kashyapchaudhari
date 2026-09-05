import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Palette,
  Check,
  Menu,
  X,
  User,
  Sparkles,
  FolderGit2,
  Mail,
} from 'lucide-react';
import { paperAudio } from '../utils/audio';

interface NavigationProps {
  onFold: () => void;
  activeSection: string;
  theme: 'cream' | 'kraft' | 'blueprint' | 'charcoal';
  onThemeChange: (theme: 'cream' | 'kraft' | 'blueprint' | 'charcoal') => void;
  onNavigate?: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onFold,
  activeSection,
  theme,
  onThemeChange,
  onNavigate,
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(paperAudio.getMuted());

  const navLinks = [
    { id: 'about', label: 'About', num: '01', icon: User },
    { id: 'skills', label: 'Skills', num: '02', icon: Sparkles },
    { id: 'projects', label: 'Projects', num: '03', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', num: '04', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    paperAudio.playClick();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const toggleSound = () => {
    const muted = paperAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      paperAudio.playClick();
    }
  };

  const themes: { id: 'cream' | 'kraft' | 'blueprint' | 'charcoal'; name: string; color: string }[] = [
    { id: 'cream', name: 'Cream Bond', color: '#fbf9f4' },
    { id: 'kraft', name: 'Vintage Kraft', color: '#dcc8a4' },
    { id: 'blueprint', name: 'Cyan Blueprint', color: '#1e3a5f' },
    { id: 'charcoal', name: 'Dark Charcoal', color: '#1f2227' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-8 py-3 sm:py-4 backdrop-blur-md border-b border-black/5 bg-inherit/95 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Name with handwritten flourish */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => handleNavClick('about')}
            className="group text-left flex flex-col min-w-0"
          >
            <span className="font-hand text-xl sm:text-3xl font-bold tracking-tight text-[var(--color-paper-text)] group-hover:text-amber-800 transition-colors leading-tight truncate">
              Kashyap Chaudhari
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--color-paper-muted)] uppercase truncate">
              Developer • Creative
            </span>
          </button>
        </div>

        {/* Center: Tactile Desktop Navigation Links (Visible on MD screens and above) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-black/5 bg-black/[0.03]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--color-paper-text)] shadow-sm bg-white/70'
                    : 'text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sound toggle, Theme picker, PROMINENT FOLD BUTTON, and Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute paper sound effects' : 'Mute paper sound effects'}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-black/10 bg-black/[0.02] text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] hover:bg-black/[0.05] transition-all active:scale-95"
            title={isMuted ? 'Enable paper audio' : 'Mute paper audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700" />}
          </button>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                paperAudio.playClick();
                setIsThemeMenuOpen(!isThemeMenuOpen);
                setIsMobileMenuOpen(false);
              }}
              aria-label="Change paper style"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-black/10 bg-black/[0.02] text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] hover:bg-black/[0.05] transition-all active:scale-95"
              title="Paper styles"
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
            </button>

            {isThemeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsThemeMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 bg-white/95 backdrop-blur-md shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                  <div className="px-2 py-1 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5 mb-1">
                    <Palette className="w-3 h-3 text-amber-600" />
                    Paper Texture
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        paperAudio.playClick();
                        onThemeChange(t.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
                          style={{ backgroundColor: t.color }}
                        />
                        <span>{t.name}</span>
                      </div>
                      {theme === t.id && <Check className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ↺ Prominently Visible Fold Button (Visible on ALL devices: Mobile, Tablet & Desktop) */}
          <button
            onClick={onFold}
            aria-label="Re-fold site back into paper ball"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-amber-900/25 bg-amber-950/10 hover:bg-amber-950/15 text-[var(--color-paper-text)] font-mono text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Press Esc or click to crumple paper back"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform hover:-rotate-90 duration-300 text-amber-800" />
            <span>↺ Fold</span>
          </button>

          {/* Mobile Navigation Menu Toggle Button */}
          <button
            onClick={() => {
              paperAudio.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsThemeMenuOpen(false);
            }}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile navigation menu'}
            className={`md:hidden flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all active:scale-95 ${
              isMobileMenuOpen
                ? 'bg-amber-100 border-amber-900/30 text-amber-950'
                : 'bg-black/[0.04] border-black/10 text-[var(--color-paper-text)] hover:bg-black/[0.08]'
            }`}
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-4 h-4 text-amber-800" />
                <span className="text-[11px]">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4" />
                <span className="text-[11px]">Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu (Single Clean Navigation on Mobile) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-amber-100/90 border-amber-900/30 text-amber-950 shadow-xs font-bold'
                      : 'bg-black/[0.02] border-black/5 text-[var(--color-paper-text)] hover:bg-black/[0.05]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-amber-600 text-white' : 'bg-black/5 text-[var(--color-paper-muted)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-paper-muted)] leading-none mb-0.5">
                      {link.num}
                    </span>
                    <span className="font-sans text-xs font-semibold truncate leading-tight">
                      {link.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
