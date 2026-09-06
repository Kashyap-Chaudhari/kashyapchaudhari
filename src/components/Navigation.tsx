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
    { id: 'blueprint', name: 'Cyan Blueprint', color: '#0e2744' },
    { id: 'charcoal', name: 'Dark Charcoal', color: '#181b20' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-8 py-3 sm:py-4 backdrop-blur-md border-b border-[var(--color-paper-line)] bg-inherit/95 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Name with handwritten flourish */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => handleNavClick('about')}
            className="group text-left flex flex-col min-w-0"
          >
            <span className="font-hand text-xl sm:text-3xl font-bold tracking-tight text-[var(--color-paper-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight truncate">
              Kashyap Chaudhari
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--color-paper-muted)] uppercase truncate">
              Developer • Creative
            </span>
          </button>
        </div>

        {/* Center: Tactile Desktop Navigation Links (Visible on MD screens and above) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-[var(--color-paper-line)] bg-[var(--color-tag-bg)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--color-pill-active-text)] shadow-xs bg-[var(--color-pill-active-bg)] font-bold'
                    : 'text-[var(--color-pill-inactive-text)] hover:text-[var(--color-paper-text)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[var(--color-accent)] rounded-full" />
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
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] transition-all active:scale-95"
            title={isMuted ? 'Enable paper audio' : 'Mute paper audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-accent)]" />}
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
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] text-[var(--color-paper-muted)] hover:text-[var(--color-paper-text)] transition-all active:scale-95"
              title="Paper styles"
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-accent)]" />
            </button>

            {isThemeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsThemeMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[var(--color-dropdown-border)] bg-[var(--color-dropdown-bg)] text-[var(--color-dropdown-text)] backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold text-[var(--color-dropdown-muted)] uppercase tracking-wider flex items-center gap-1.5 border-b border-[var(--color-dropdown-border)] pb-2 mb-1.5">
                    <Palette className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>Paper Textures</span>
                  </div>
                  <div className="space-y-1">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          paperAudio.playClick();
                          onThemeChange(t.id);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                          theme === t.id
                            ? 'bg-[var(--color-tag-bg)] shadow-xs ring-1 ring-[var(--color-accent)]/40 font-bold'
                            : 'hover:bg-[var(--color-dropdown-hover)] opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs flex-shrink-0"
                            style={{ backgroundColor: t.color }}
                          />
                          <span>{t.name}</span>
                        </div>
                        {theme === t.id && <Check className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ↺ Prominently Visible Fold Button (Visible on ALL devices: Mobile, Tablet & Desktop) */}
          <button
            onClick={onFold}
            aria-label="Re-fold site back into paper ball"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] hover:bg-[var(--color-card-bg)] text-[var(--color-paper-text)] font-mono text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Press Esc or click to crumple paper back"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform hover:-rotate-90 duration-300 text-[var(--color-accent)]" />
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
                ? 'bg-[var(--color-badge-bg)] border-[var(--color-badge-border)] text-[var(--color-paper-text)] font-bold'
                : 'bg-[var(--color-tag-bg)] border-[var(--color-card-border)] text-[var(--color-paper-text)]'
            }`}
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-4 h-4 text-[var(--color-accent)]" />
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
        <div className="md:hidden mt-3 pt-3 border-t border-[var(--color-paper-line)] animate-in fade-in slide-in-from-top-2 duration-200">
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
                      ? 'bg-[var(--color-badge-bg)] border-[var(--color-badge-border)] text-[var(--color-paper-text)] shadow-xs font-bold'
                      : 'bg-[var(--color-tag-bg)] border-[var(--color-card-border)] text-[var(--color-paper-text)] hover:bg-[var(--color-card-bg)]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-[var(--color-accent)] text-[var(--color-btn-primary-text)]' : 'bg-[var(--color-tag-bg)] text-[var(--color-paper-muted)]'
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
