import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, QrCode, Lock, CheckCircle2, RefreshCw, Key, Award, Fingerprint } from 'lucide-react';
import owlBgImage from '../assets/images/owl_feather_bg_1784762026936.jpg';
import SmidOwlLogo from './SmidOwlLogo';
import { playOwlHoot } from '../utils/audio';

interface HolographicHeroCardProps {
  onNavigate?: (tab: string) => void;
}

export default function HolographicHeroCard({ onNavigate }: HolographicHeroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'TSMID' | 'TASMID' | 'ASMID' | 'BSMID' | 'mini BSMID'>('ASMID');
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-12deg to +12deg)
    const rX = ((y / rect.height) - 0.5) * -16;
    const rY = ((x / rect.width) - 0.5) * 16;
    
    setRotateX(rX);
    setRotateY(rY);
    setSheenPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleFlipCard = () => {
    playOwlHoot();
    setIsFlipped(!isFlipped);
  };

  const handleScanCard = () => {
    playOwlHoot();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const categoryDetails = {
    TSMID: { label: 'Teen SMID', tag: 'Ages 13-17', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/80' },
    TASMID: { label: 'Teacher & Student', tag: 'Academic Tier', color: 'text-amber-400 border-amber-500/50 bg-amber-950/80' },
    ASMID: { label: 'Adult SMID', tag: 'Global Trust Pass', color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/80' },
    BSMID: { label: 'Business SMID', tag: 'Enterprise Grade', color: 'text-purple-400 border-purple-500/50 bg-purple-950/80' },
    'mini BSMID': { label: 'mini BSMID', tag: 'Creator & Startup', color: 'text-pink-400 border-pink-500/50 bg-pink-950/80' },
  };

  return (
    <div className="relative flex flex-col items-center select-none" style={{ perspective: '1200px' }}>
      
      {/* 3D Holographic Tilt Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="relative w-80 h-[480px] sm:w-[350px] sm:h-[500px] md:w-[380px] md:h-[520px] rounded-[32px] overflow-hidden p-[2px] cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated Cyber Neon Border Gradients (Cyan & Violet) */}
        <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-60 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-hologram pointer-events-none" />

        {/* Card Body Interior */}
        <div className="relative w-full h-full rounded-[30px] bg-slate-950 overflow-hidden flex flex-col justify-between p-6 border border-slate-700/80 z-10">
          
          {/* Silver Feather Owl Background Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src={owlBgImage}
              alt="SMID Silver Owl Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Vignette Overlay for Crisp Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 pointer-events-none" />
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
          </div>

          {/* Dynamic Holographic Specular Sheen Layer that moves with cursor */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(0, 240, 255, 0.4) 0%, rgba(168, 85, 247, 0.25) 30%, transparent 70%)`,
            }}
          />

          {/* Laser Scanner Bar effect when scan is triggered */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff] animate-laser-scan z-30 pointer-events-none" />
          )}

          {/* ================= CARD FRONT ================= */}
          {!isFlipped ? (
            <div className="relative z-20 h-full flex flex-col justify-between text-left">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-orbitron font-extrabold text-xs tracking-wider text-white block">
                      SMID TRUST CARD
                    </span>
                    <span className="text-[9px] font-mono text-cyan-300 block">
                      DECENTRALIZED PASSKEY
                    </span>
                  </div>
                </div>

                {/* Live Verified Seal */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Center Hologram Owl Watermark */}
              <div className="my-auto py-4 text-center">
                <div className="inline-block p-4 rounded-3xl bg-slate-950/70 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 transition-colors">
                  <SmidOwlLogo size="sm" showSubtitle={false} className="mb-2" />
                  <p className="text-[9px] font-orbitron tracking-[0.2em] text-slate-300 uppercase">
                    ONE IDENTITY • ENDLESS TRUST
                  </p>
                </div>

                {/* Active Category Tag */}
                <div className="mt-3 flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-orbitron font-bold border backdrop-blur-md shadow-lg ${categoryDetails[activeCategory].color}`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{activeCategory} — {categoryDetails[activeCategory].label}</span>
                  </span>
                </div>
              </div>

              {/* Card Footer: Credential Hash & QR Code */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 block">CARDHOLDER ID</span>
                    <span className="font-bold text-white tracking-wide">SMID-8890-7721-SEC</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block">EXPIRATION</span>
                    <span className="font-bold text-cyan-300">NEVER • IMMUTABLE</span>
                  </div>
                </div>

                {/* Interactive Action Bar on Card */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScanCard();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>{isScanning ? 'AUTHENTICATING...' : 'VERIFY BIOMETRICS'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlipCard();
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer transition-all"
                    title="Flip Card for QR Code"
                  >
                    Flip ↺
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* ================= CARD BACK (QR Code & Cryptographic Seals) ================= */
            <div className="relative z-20 h-full flex flex-col justify-between text-center">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-orbitron font-bold text-xs text-white">QR AUTHENTICATION</span>
                <button
                  onClick={handleFlipCard}
                  className="text-[10px] font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Front View ↺
                </button>
              </div>

              {/* QR Code Graphic Container */}
              <div className="my-auto flex flex-col items-center">
                <div className="w-40 h-40 p-3 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
                <span className="text-[10px] font-mono text-cyan-300 mt-3 block">
                  Scan to Cross-Verify SMID Signature
                </span>
                <span className="text-[9px] font-mono text-slate-400 block">
                  SHA-256 Hash: 0x892a...c01f
                </span>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={handleFlipCard}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-orbitron font-bold text-xs tracking-wider cursor-pointer"
                >
                  Return to Hologram Face
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>

      {/* Orbiting Category Switchers below Card */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-sm">
        {(['TSMID', 'TASMID', 'ASMID', 'BSMID', 'mini BSMID'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playOwlHoot();
              setActiveCategory(cat);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-orbitron font-bold transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105' 
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
        Select category above to recalibrate card hologram
      </p>
    </div>
  );
}
