import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, CheckCircle, ArrowRight, Activity, Zap, Lock, Globe, Cpu } from 'lucide-react';
import SmidOwlLogo from './SmidOwlLogo';
import HolographicHeroCard from './HolographicHeroCard';
import SciFiCommandHud from './SciFiCommandHud';
import UniversalNodeNetwork from './UniversalNodeNetwork';
import MilestoneJourney from './MilestoneJourney';
import { playOwlHoot } from '../utils/audio';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function HomeView({ onNavigate, lang }: HomeViewProps) {
  const handleActionClick = (tab: string) => {
    playOwlHoot();
    onNavigate(tab);
  };

  return (
    <div className="py-6 sm:py-10 relative z-10 text-white">
      
      {/* ======================================================== */}
      {/* 1. FUTURISTIC HERO SECTION                               */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        
        {/* Left Column: Typography, Animated Logo & Primary CTAs */}
        <div className="flex-1 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cyber Kicker Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Gen Biometric Identity Protocol</span>
            </div>

            {/* --- Animated SMID Owl Emblem Logo (Preserved & Enhanced) --- */}
            <div className="mb-6 flex justify-start">
              <SmidOwlLogo size="hero" showSubtitle={true} className="items-start text-left" />
            </div>

            {/* Hero Value Proposition */}
            <p className="text-slate-300 max-w-xl text-base sm:text-lg mb-8 leading-relaxed font-sans pt-2">
              SMID is the decentralized trust standard unifying your physical biometric verification with all your social platforms. 
              Zero identity exposure, quantum-shielded passkeys, and universal anti-impersonation protection.
            </p>

            {/* Primary Action Button Cluster with Glowing Neon Accents */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleActionClick('register')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.35)] transform hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer font-orbitron tracking-wider text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Issue My SMID</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => handleActionClick('dashboard')}
                className="px-8 py-4 bg-slate-950/80 hover:bg-slate-900 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 font-bold rounded-2xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer font-orbitron tracking-wider text-sm shadow-lg flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Open Dashboard</span>
              </button>
            </div>

            {/* Trust Anchors / Live Telemetry Strip */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Photo Storage (ZK-Proof)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Cross-Platform SSO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>AES-256 Cloud Vault</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Holographic Identity Card with Specular Sheen */}
        <div className="flex-1 flex justify-center relative w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex justify-center"
          >
            <HolographicHeroCard onNavigate={onNavigate} />
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. REAL-TIME TELEMETRY METRIC STRIP                      */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 p-4 rounded-3xl bg-slate-950/70 border border-slate-800 backdrop-blur-xl"
      >
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-left">
          <span className="text-[11px] font-mono text-cyan-400 block mb-1">VERIFIED HANDSHAKES</span>
          <span className="font-orbitron font-extrabold text-2xl text-white tabular-nums">1.2M+</span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">Cross-platform auth queries</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-left">
          <span className="text-[11px] font-mono text-emerald-400 block mb-1">AVERAGE LATENCY</span>
          <span className="font-orbitron font-extrabold text-2xl text-emerald-400 tabular-nums">&lt;14ms</span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">Instant decentralized verification</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-left">
          <span className="text-[11px] font-mono text-purple-400 block mb-1">SUPPORTED NETWORKS</span>
          <span className="font-orbitron font-extrabold text-2xl text-purple-300 tabular-nums">100%</span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">Meta, X, TikTok, REST APIs</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-left">
          <span className="text-[11px] font-mono text-pink-400 block mb-1">SECURITY RECORD</span>
          <span className="font-orbitron font-extrabold text-2xl text-pink-300 tabular-nums">0 Breaches</span>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">Zero-Knowledge attestation</span>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 3. ACTIVE SCI-FI COMMAND HUD: BIOMETRIC & CLOUD SYNC     */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <SciFiCommandHud onNavigate={onNavigate} lang={lang} />
      </motion.div>

      {/* ======================================================== */}
      {/* 4. UNIVERSAL INTEGRATION PROTOCOL INTERACTIVE NODE MESH  */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <UniversalNodeNetwork onNavigate={onNavigate} />
      </motion.div>

      {/* ======================================================== */}
      {/* 5. HOW IT WORKS: INTERACTIVE MILESTONE JOURNEY           */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <MilestoneJourney onNavigate={onNavigate} lang={lang} />
      </motion.div>

      {/* ======================================================== */}
      {/* 6. FOUNDER'S SAFETY MISSION CALLOUT                      */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-500/20 text-center overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
            <span>FOUNDER'S MISSION</span>
            <span>•</span>
            <span>IDENTITY TODAY, SAFETY TOMORROW</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-orbitron text-white">
            Built to Eliminate Online Impersonation & Protect Vulnerable Users
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Founded by <strong>Oluwatosin Abraham Willoughby</strong>, SMID is anchored on uncompromising digital safety. 
            By shielding youth with verified parental protocols (TSMID) and providing adults, students, and businesses 
            with cryptographic passkeys, we replace insecure passwords and unverified profiles with one enduring trust signature.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleActionClick('founder')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-orbitron font-bold transition-all cursor-pointer"
            >
              Read Founder Note & Verification Manifesto →
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
