import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DeskBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-denim-texture flex items-center justify-center select-none">
      {/* Precision Studio Coordinate Grid (Fades out softly towards edges) */}
      <div 
        className="absolute inset-0 bg-studio-grid pointer-events-none opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* Atmospheric Aurora Ambient Glow Nodes */}
      {/* 1. Golden Amber Glow (Top-Right) */}
      <motion.div
        animate={{
          x: mousePos.x * 20,
          y: mousePos.y * 20,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 25 }}
        className="absolute -top-32 -right-32 w-[48vw] h-[48vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-amber-500/15 via-orange-600/8 to-transparent blur-3xl pointer-events-none animate-aurora-1"
      />

      {/* 2. Cyber Emerald / Cyan Aurora Glow (Top-Left) */}
      <motion.div
        animate={{
          x: mousePos.x * -18,
          y: mousePos.y * -18,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 25 }}
        className="absolute -top-28 -left-28 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-br from-teal-400/16 via-emerald-600/8 to-transparent blur-3xl pointer-events-none animate-aurora-2"
      />

      {/* 3. Deep Sapphire / Blue Glow (Bottom-Right) */}
      <motion.div
        animate={{
          x: mousePos.x * 15,
          y: mousePos.y * 15,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 25 }}
        className="absolute -bottom-32 -right-24 w-[50vw] h-[50vw] max-w-[620px] max-h-[620px] rounded-full bg-gradient-to-tl from-sky-500/14 via-indigo-600/8 to-transparent blur-3xl pointer-events-none"
      />

      {/* 4. Indigo / Violet Studio Glow (Bottom-Left) */}
      <motion.div
        animate={{
          x: mousePos.x * -15,
          y: mousePos.y * -15,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 25 }}
        className="absolute -bottom-28 -left-28 w-[44vw] h-[44vw] max-w-[520px] max-h-[520px] rounded-full bg-gradient-to-tr from-indigo-500/14 via-purple-600/6 to-transparent blur-3xl pointer-events-none"
      />

      {/* Central Focused Studio Spotlight on the paper canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.09)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Top-Right: Architectural Precision Cutting Mat with Parallax */}
      <motion.div
        animate={{
          x: mousePos.x * 12,
          y: mousePos.y * 12,
          rotate: 12 + mousePos.x * 1.5,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 28 }}
        className="absolute -top-12 -right-12 w-[38vw] h-[38vw] min-w-[260px] min-h-[260px] max-w-[500px] max-h-[500px] bg-cutting-mat rounded-3xl shadow-2xl opacity-75 border border-teal-400/25 pointer-events-none"
        style={{
          boxShadow: '-20px 25px 60px rgba(0, 0, 0, 0.75), inset 0 0 35px rgba(0, 0, 0, 0.45)',
          clipPath: 'polygon(6% 0%, 100% 0%, 100% 94%, 90% 100%, 0% 16%)',
        }}
      >
        {/* Subtle angle guide lines */}
        <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-teal-300/30 rotate-45 pointer-events-none" />
      </motion.div>

      {/* Bottom-Left: Sapphire Blueprint Drafting Canvas with Parallax */}
      <motion.div
        animate={{
          x: mousePos.x * -10,
          y: mousePos.y * -10,
          rotate: -6 + mousePos.y * -1.2,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 28 }}
        className="absolute -bottom-14 -left-14 w-[36vw] h-[36vw] min-w-[240px] min-h-[240px] max-w-[460px] max-h-[460px] bg-blueprint-mat rounded-3xl shadow-2xl opacity-70 border border-sky-400/25 pointer-events-none"
        style={{
          boxShadow: '20px -20px 55px rgba(0, 0, 0, 0.75), inset 0 0 30px rgba(0, 0, 0, 0.45)',
          clipPath: 'polygon(0% 10%, 88% 0%, 100% 88%, 12% 100%, 0% 90%)',
        }}
      >
        {/* Drafting Compass Ring Accent */}
        <div className="absolute bottom-12 left-12 w-28 h-28 rounded-full border border-sky-300/30 pointer-events-none" />
      </motion.div>

      {/* Subtle Studio Corner Coordinates (Architectural Watermark) */}
      <div className="absolute top-4 left-6 hidden sm:flex items-center gap-2 font-mono text-[10px] text-white/20 uppercase tracking-widest pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400/40" />
        <span>WORKSPACE // TACTILE STUDIO CANVAS</span>
      </div>

      <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 font-mono text-[10px] text-white/20 uppercase tracking-widest pointer-events-none">
        <span>ORIGAMI PROTO // REACT • 3D</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
      </div>

      {/* Centered Content Stage Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};
