import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, UserCheck, Sparkles, Shield, Cloud, CheckCircle, 
  ChevronRight, ArrowRight, Eye, QrCode, Lock, Key, RefreshCw
} from 'lucide-react';
import { playOwlHoot } from '../utils/audio';

interface MilestoneJourneyProps {
  onNavigate: (tab: string) => void;
  lang?: string;
}

export default function MilestoneJourney({ onNavigate, lang }: MilestoneJourneyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<'TSMID' | 'TASMID' | 'ASMID' | 'BSMID' | 'mini BSMID'>('ASMID');
  const [isScanningSim, setIsScanningSim] = useState(false);
  const [scanVerified, setScanVerified] = useState(true);

  const categories = [
    { id: 'TSMID', label: 'TSMID', tag: 'Ages 13–17', desc: 'Teen Social Media Identity with parental consent verification and anti-predator protection.', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
    { id: 'TASMID', label: 'TASMID', tag: 'Academic', desc: 'Teacher & Student SMID verifying school credentials, research networks, and campus safety.', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
    { id: 'ASMID', label: 'ASMID', tag: 'Ages 18+', desc: 'Standard Adult SMID for verified professional trust, dating safety, and creator authenticity.', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30' },
    { id: 'BSMID', label: 'BSMID', tag: 'Enterprise', desc: 'Business Social Media Identity for corporate brands, executive signers, and fraud elimination.', color: 'text-purple-400 border-purple-500/40 bg-purple-950/30' },
    { id: 'mini BSMID', label: 'mini BSMID', tag: 'Startups', desc: 'Designed for solopreneurs, indie hackers, and local creators establishing official presence.', color: 'text-pink-400 border-pink-500/40 bg-pink-950/30' },
  ];

  const milestones = [
    {
      num: '01',
      title: 'Verification Category',
      subtitle: 'Select Tier & Establish Boundary',
      desc: 'Choose the dedicated verification tier that matches your legal age, academic standing, or corporate entity. Every tier enforces customized safety parameters.',
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      accentColor: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40',
      actionText: 'Explore Category Rules'
    },
    {
      num: '02',
      title: 'Biometric Scan & Liveness',
      subtitle: 'Zero-Knowledge Physical Binding',
      desc: 'Our circular geometric sensor extracts physical biometric coordinates without storing raw photographic files. Your face geometry is hashed into a one-way ZK-Proof.',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      actionText: 'Test Live Scanner'
    },
    {
      num: '03',
      title: 'Digital ID Generation',
      subtitle: 'Cryptographic Hologram Pass',
      desc: 'Receive your tamper-proof SMID ID Card embedded with a dynamic rotating QR token, cryptographic signature, and instant cross-platform trust seals.',
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      accentColor: 'from-purple-500 to-indigo-500',
      badgeColor: 'text-purple-400 border-purple-500/40 bg-purple-950/40',
      actionText: 'View Holographic Card'
    },
    {
      num: '04',
      title: 'Encrypted Cloud Vault',
      subtitle: 'Universal Single Sign-On',
      desc: 'Access your sharded identity cabinet and authenticate into Meta, X, TikTok, LinkedIn, Google Workspace, and Web3 dApps with a single authorized handshake.',
      icon: <Cloud className="w-6 h-6 text-pink-400" />,
      accentColor: 'from-pink-500 to-rose-500',
      badgeColor: 'text-pink-400 border-pink-500/40 bg-pink-950/40',
      actionText: 'Open Cloud Vault'
    }
  ];

  const handleStepClick = (idx: number) => {
    playOwlHoot();
    setActiveStep(idx);
  };

  const handleRunSimScan = () => {
    playOwlHoot();
    setIsScanningSim(true);
    setScanVerified(false);
    setTimeout(() => {
      setIsScanningSim(false);
      setScanVerified(true);
    }, 1500);
  };

  return (
    <div className="w-full my-16 text-left">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>FOUR-STAGE VERIFICATION PROTOCOL</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-black font-orbitron text-white">
          How SMID Works
        </h3>
        <p className="text-sm text-slate-300 font-sans mt-2">
          From category classification to decentralized biometric vaulting — explore the interactive milestone pathway.
        </p>
      </div>

      {/* Interactive Milestone Navigation Bar (Tabs & Progress) */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl">
          {milestones.map((ms, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={ms.num}
                onClick={() => handleStepClick(idx)}
                className={`p-3.5 rounded-xl transition-all cursor-pointer text-left relative overflow-hidden flex items-center gap-3 ${
                  isActive 
                    ? 'bg-slate-900 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-white' 
                    : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span className={`font-orbitron font-black text-lg ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {ms.num}
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-bold block truncate font-orbitron">{ms.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">{ms.subtitle}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage for Selected Milestone */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-6 sm:p-8 md:p-10 bg-slate-950/85 backdrop-blur-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${milestones[activeStep].accentColor} opacity-10 rounded-full blur-3xl pointer-events-none`} />
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Milestone Details & Description (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                    {milestones[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      MILESTONE {milestones[activeStep].num}
                    </span>
                    <h4 className="text-2xl font-bold font-orbitron text-white">
                      {milestones[activeStep].title}
                    </h4>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {milestones[activeStep].desc}
                </p>

                {/* Milestone Specific Quick Facts */}
                <div className="space-y-2 pt-2 font-mono text-xs text-slate-300">
                  {activeStep === 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Tailored parental oversight framework for minors (TSMID).</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Institutional academic badge matching for universities (TASMID).</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Commercial brand authenticity sealing for enterprises (BSMID).</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Zero biometric images uploaded — only one-way cryptographic hashes.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>99.98% anti-spoofing liveness model protects against AI deepfakes.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Quantum-resistant cryptographic proof matches physical identity.</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Holographic specular passkey renders on any mobile or desktop screen.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Rotating QR authorization code regenerates every 60 seconds.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>One-click credential sharing for partner social media platforms.</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Sharded multi-node storage distributes key shares across 3 continents.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Unified SSO login into Meta, X, TikTok, YouTube, and Google Workspace.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Immediate revocation button clears cached tokens across all platforms.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Milestone Next / Action Button */}
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (activeStep < 3) {
                        handleStepClick(activeStep + 1);
                      } else {
                        onNavigate('register');
                      }
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{activeStep < 3 ? 'Proceed to Next Milestone' : 'Begin SMID Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate(activeStep === 0 ? 'categories' : activeStep === 1 ? 'register' : activeStep === 2 ? 'idcard' : 'cloud')}
                    className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-orbitron font-semibold tracking-wider transition-all cursor-pointer"
                  >
                    {milestones[activeStep].actionText}
                  </button>
                </div>
              </div>

              {/* Right Column: Dynamic Interactive Sandbox Component (6 Cols) */}
              <div className="lg:col-span-6">
                
                {/* SANDBOX 01: Category Selector */}
                {activeStep === 0 && (
                  <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-5 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-orbitron font-bold text-white">Interactive Tier Matrix</span>
                      <span className="text-[10px] font-mono text-cyan-400">Click to preview tier</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            playOwlHoot();
                            setSelectedCategory(cat.id as any);
                          }}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedCategory === cat.id 
                              ? `${cat.color} shadow-lg ring-1 ring-cyan-400/40` 
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold font-orbitron block">{cat.label}</span>
                          <span className="text-[9px] font-mono opacity-80 block">{cat.tag}</span>
                        </button>
                      ))}
                    </div>

                    {/* Tier Description Card */}
                    {(() => {
                      const curr = categories.find(c => c.id === selectedCategory) || categories[0];
                      return (
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-orbitron font-bold text-sm text-white">{curr.label} Profile</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                              Active Tier Selection
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {curr.desc}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* SANDBOX 02: Biometric Liveness Scanner */}
                {activeStep === 1 && (
                  <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-5 text-center space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-orbitron font-bold text-white">Live Liveness Radar</span>
                      <span className="text-[10px] font-mono text-emerald-400">Zero-Knowledge Attestation</span>
                    </div>

                    {/* Circular simulated reticle */}
                    <div className="relative w-40 h-40 mx-auto rounded-full border-2 border-emerald-500/40 flex items-center justify-center overflow-hidden bg-slate-950">
                      {/* Laser scanner line */}
                      {isScanningSim && (
                        <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-laser-scan z-20 pointer-events-none" />
                      )}

                      <div className="text-center">
                        <Eye className="w-10 h-10 mx-auto text-emerald-400 mb-1" />
                        <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase block">
                          {isScanningSim ? 'COMPUTING HASH...' : scanVerified ? 'VERIFIED LIVENESS' : 'READY TO SCAN'}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 block">
                          {isScanningSim ? 'CALIBRATING...' : '99.98% MATCH'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleRunSimScan}
                      disabled={isScanningSim}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-orbitron font-bold text-xs tracking-wider cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                    >
                      {isScanningSim ? 'SCANNING GEOMETRY...' : 'TEST BIOMETRIC PULSE'}
                    </button>
                  </div>
                )}

                {/* SANDBOX 03: Holographic Digital ID Preview */}
                {activeStep === 2 && (
                  <div className="rounded-2xl bg-slate-900/90 border border-purple-500/30 p-5 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-orbitron font-bold text-white">Holographic ID Pass</span>
                      <span className="text-[10px] font-mono text-purple-400">Cryptographic Badge</span>
                    </div>

                    {/* Card Mockup */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/60 border border-purple-500/40 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-orbitron font-black text-sm text-white tracking-wider">SMID PASS</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                            VERIFIED
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300">ASMID-2026-990</span>
                      </div>

                      <div className="flex items-center justify-between gap-4 py-2">
                        <div>
                          <span className="text-xs font-bold text-white block">Oluwatosin A. Willoughby</span>
                          <span className="text-[10px] text-slate-400 font-mono">Founder & Verified Architect</span>
                          <div className="flex gap-1.5 mt-2">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Meta</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">X</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">TikTok</span>
                          </div>
                        </div>

                        <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-lg">
                          <QrCode className="w-14 h-14 text-slate-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SANDBOX 04: Cloud Vault & SSO Shards */}
                {activeStep === 3 && (
                  <div className="rounded-2xl bg-slate-900/90 border border-pink-500/30 p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-orbitron font-bold text-white">Sharded Cloud Consensus</span>
                      <span className="text-[10px] text-pink-400">3/3 Sync</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Google Drive Document Shard</span>
                        <span className="text-emerald-400 font-bold">Encrypted 🔒</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Microsoft 365 Enterprise Bridge</span>
                        <span className="text-cyan-400 font-bold">Active Sync ⚡</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Decentralized IPFS Attestation</span>
                        <span className="text-purple-400 font-bold">Consensus 100%</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
