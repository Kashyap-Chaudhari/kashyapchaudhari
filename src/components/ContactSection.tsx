import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { paperAudio } from '../utils/audio';
import { GithubIcon, ThreadsIcon, InstagramIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'kashyap3037@gmail.com';
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    paperAudio.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);

    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.85 },
      colors: ['#0d9488', '#d97706', '#6366f1', '#231e17'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section id="contact" className="relative py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-paper-line)] pb-2.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest uppercase font-semibold text-[var(--color-badge-text)] bg-[var(--color-badge-bg)] px-2.5 py-0.5 rounded border border-[var(--color-badge-border)]">
              04 — REACH OUT
            </span>
            <span className="h-px w-8 sm:w-16 bg-[var(--color-badge-border)]" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--color-paper-muted)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            SAY HELLO
          </span>
        </div>

        {/* Main Pitch Card Styled as Pinned Letter */}
        <div className="relative p-7 sm:p-12 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-card-border)] shadow-sm mb-12">
          {/* Washi tape accents */}
          <div className="washi-tape-teal absolute -top-3 left-12 w-28 h-6 rotate-[-1deg] z-10" />
          <div className="washi-tape-pink absolute -bottom-3 right-12 w-28 h-6 rotate-2 z-10" />

          {/* Heading */}
          <h2 className="font-hand text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-paper-text)] tracking-tight mb-4">
            Let's Build Something
          </h2>

          {/* Prompt Copy */}
          <p className="text-base sm:text-lg leading-relaxed text-[var(--color-paper-text)]/90 max-w-2xl mb-8">
            I'm interested in building useful products, experimenting with new technologies, and working on interesting ideas. Whether you have a project in mind, a freelance inquiry, or just want to discuss creative code — my inbox is open!
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mb-8">
            <div className="relative flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-tag-bg)] border border-[var(--color-card-border)] shadow-inner">
              <Mail className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--color-paper-text)] truncate select-all">
                {email}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-sm active:scale-95 border border-[var(--color-card-border)] ${copied
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:opacity-90'
                }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-card-border)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-paper-muted)] mr-2">
              CONNECT:
            </span>

            <a
              href="https://github.com/Kashyap-Chaudhari"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => paperAudio.playClick()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] hover:bg-[var(--color-card-bg)] text-xs font-mono font-medium text-[var(--color-paper-text)] hover:shadow-xs transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.instagram.com/_._kashyap_3037?igsi=MWtyanJuYWhxaWRmdA=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => paperAudio.playClick()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] hover:bg-[var(--color-card-bg)] text-xs font-mono font-medium text-[var(--color-paper-text)] hover:shadow-xs transition-all"
            >
              <ThreadsIcon className="w-3.5 h-3.5 text-current" />
              <span>Threads</span>
            </a>

            <a
              href="https://www.instagram.com/_._kashyap_3037?igsi=MWtyanJuYWhxaWRmdA=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => paperAudio.playClick()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-tag-bg)] hover:bg-[var(--color-card-bg)] text-xs font-mono font-medium text-[var(--color-paper-text)] hover:shadow-xs transition-all"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Handwritten Closing Line in Corner */}
          <div className="absolute bottom-4 right-6 hidden sm:block">
            <p className="font-hand text-2xl text-[var(--color-accent)] opacity-85 -rotate-2 select-none">
              “Folding ideas into something real.” ✨
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-6 border-t border-[var(--color-paper-line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-xs text-[var(--color-paper-muted)]">
            © {currentYear} Kashyap Chaudhari
          </p>
        </footer>
      </div>
    </section>
  );
};
