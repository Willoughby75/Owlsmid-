import React from 'react';
import { motion } from 'motion/react';
import { playOwlHoot } from '../utils/audio';

interface SmidOwlLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function SmidOwlLogo({
  size = 'hero',
  showSubtitle = true,
  className = '',
  onClick,
}: SmidOwlLogoProps) {
  const handleClick = () => {
    playOwlHoot();
    if (onClick) onClick();
  };

  // Size scaling
  const scaleClasses = {
    sm: 'text-3xl font-black gap-1',
    md: 'text-5xl font-black gap-1.5',
    lg: 'text-6xl font-black gap-2',
    hero: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black gap-2 sm:gap-3 md:gap-4',
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* --- Main SMID Emblem with integrated Owl-M --- */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          filter: [
            'drop-shadow(0 10px 25px rgba(255,255,255,0.15)) drop-shadow(0 0 15px rgba(168,85,247,0.2))',
            'drop-shadow(0 20px 35px rgba(255,255,255,0.25)) drop-shadow(0 0 30px rgba(192,132,252,0.4))',
            'drop-shadow(0 10px 25px rgba(255,255,255,0.15)) drop-shadow(0 0 15px rgba(168,85,247,0.2))',
          ],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.05,
          transition: { type: 'spring', stiffness: 300, damping: 15 },
        }}
        className={`flex items-center justify-center font-orbitron tracking-tight ${scaleClasses[size]}`}
      >
        {/* Letter S */}
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"
        >
          S
        </motion.span>

        {/* Integrated Owl Face 'M' Emblem */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          {/* Custom SVG Owl Mask that forms the 'M' letter */}
          <svg
            viewBox="0 0 100 80"
            className={
              size === 'hero'
                ? 'w-16 h-14 sm:w-20 sm:h-18 md:w-28 md:h-24 lg:w-36 lg:h-30'
                : size === 'lg'
                ? 'w-16 h-14'
                : size === 'md'
                ? 'w-12 h-10'
                : 'w-8 h-7'
            }
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Silver Gradient */}
              <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#E2E8F0" />
                <stop offset="70%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Luminous Owl Eye Glow */}
              <radialGradient id="owlEyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#F8FAFC" />
                <stop offset="70%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#334155" />
              </radialGradient>

              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* M Outer Wings / Brow Wings */}
            <path
              d="M 5,75 L 5,20 L 30,5 L 50,38 L 70,5 L 95,20 L 95,75 L 80,75 L 80,32 L 62,18 L 50,45 L 38,18 L 20,32 L 20,75 Z"
              fill="url(#silverGradient)"
              stroke="#F8FAFC"
              strokeWidth="1.5"
            />

            {/* Owl Brow Crest Mask Angle */}
            <path
              d="M 22,12 L 50,32 L 78,12 L 88,18 L 50,44 L 12,18 Z"
              fill="url(#silverGradient)"
              opacity="0.9"
            />

            {/* Beak Point */}
            <path d="M 45,36 L 55,36 L 50,52 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />

            {/* Left Owl Eye Socket & Ring */}
            <circle cx="33" cy="38" r="13" fill="#020617" stroke="url(#silverGradient)" strokeWidth="2.5" />
            <circle cx="33" cy="38" r="9" fill="url(#owlEyeGlow)" />
            <circle cx="33" cy="38" r="5" fill="#020617" />
            {/* Pupil reflection dot */}
            <circle cx="31" cy="36" r="2" fill="#FFFFFF" />

            {/* Right Owl Eye Socket & Ring */}
            <circle cx="67" cy="38" r="13" fill="#020617" stroke="url(#silverGradient)" strokeWidth="2.5" />
            <circle cx="67" cy="38" r="9" fill="url(#owlEyeGlow)" />
            <circle cx="67" cy="38" r="5" fill="#020617" />
            {/* Pupil reflection dot */}
            <circle cx="65" cy="36" r="2" fill="#FFFFFF" />
          </svg>

          {/* Animated Eye Glow Aura Overlay */}
          <motion.div
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-slate-300/10 blur-md" />
          </motion.div>
        </motion.div>

        {/* Letter I */}
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"
        >
          I
        </motion.span>

        {/* Letter D */}
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"
        >
          D
        </motion.span>
      </motion.div>

      {/* --- Subtitles matching the Reference Artwork --- */}
      {showSubtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 sm:mt-4 text-center space-y-2 w-full max-w-xl px-2"
        >
          {/* Main Subtitle with Line Dividers */}
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm md:text-base font-bold font-orbitron tracking-[0.25em] text-slate-200 uppercase">
            <span className="w-8 sm:w-12 md:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-slate-400 to-slate-200" />
            <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">SOCIAL MEDIA IDENTITY</span>
            <span className="w-8 sm:w-12 md:w-16 h-[1.5px] bg-gradient-to-l from-transparent via-slate-400 to-slate-200" />
          </div>

          {/* Secondary Slogan */}
          <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] font-mono text-slate-300/80 uppercase flex items-center justify-center gap-2 flex-wrap">
            <span>ONE IDENTITY</span>
            <span className="text-slate-400 font-bold">•</span>
            <span>MANY PLATFORMS</span>
            <span className="text-slate-400 font-bold">•</span>
            <span>ENDLESS TRUST</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
