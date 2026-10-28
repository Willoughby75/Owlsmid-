import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Unlock, Cloud, RefreshCw, Cpu, Activity, 
  CheckCircle2, Fingerprint, Eye, Sparkles, Key, Radio, Zap,
  Server, HardDrive, Wifi, ArrowUpRight
} from 'lucide-react';
import { playOwlHoot } from '../utils/audio';

interface SciFiCommandHudProps {
  onNavigate?: (tab: string) => void;
  lang?: string;
  className?: string;
}

export default function SciFiCommandHud({ onNavigate, lang, className = '' }: SciFiCommandHudProps) {
  // HUD Mode: Biometric Radar or Cloud Telemetry
  const [activeHudTab, setActiveHudTab] = useState<'biometric' | 'cloud' | 'both'>('both');
  
  // Biometric Scan State
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('verified');
  const [scanProgress, setScanProgress] = useState(100);
  const [scanStepText, setScanStepText] = useState('BIOMETRIC LOCK: ACTIVE');
  const [selectedBioMode, setSelectedBioMode] = useState<'facial' | 'iris' | 'fingerprint'>('facial');
  
  // Live simulated telemetry stream
  const [hashNonce, setHashNonce] = useState('0x7f8a9e...c412');
  const [latency, setLatency] = useState(14);
  const [consensusRate, setConsensusRate] = useState(99.98);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('00:00:12 ago');

  // Generate dynamic cryptographic hash ticks
  useEffect(() => {
    const timer = setInterval(() => {
      const hex = Math.random().toString(16).substring(2, 8);
      const hex2 = Math.random().toString(16).substring(2, 6);
      setHashNonce(`0x${hex}...${hex2}`);
      setLatency(Math.floor(12 + Math.random() * 5));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleTriggerBiometricScan = () => {
    playOwlHoot();
    setScanState('scanning');
    setScanProgress(0);
    setScanStepText('CALIBRATING SENSOR ARRAYS...');

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setScanStepText('ZERO-KNOWLEDGE PROOF VALIDATED');
        setScanState('verified');
      } else {
        setScanProgress(current);
        if (current === 30) setScanStepText('EXTRACTING FACIAL IRIS LANDMARKS...');
        if (current === 60) setScanStepText('GENERATING SHA-256 ZERO-KNOWLEDGE PROOF...');
        if (current === 85) setScanStepText('LINKING SMID CRYPTOGRAPHIC SHIELD...');
      }
    }, 240);
  };

  const handleTriggerCloudSync = () => {
    playOwlHoot();
    setIsCloudSyncing(true);
    setTimeout(() => {
      setIsCloudSyncing(false);
      setLastSyncTime('Just now');
      setConsensusRate(99.99);
    }, 1800);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* HUD Header Bar with Cyber Status Markers */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                SMID COMMAND HUD
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                TELEMETRY LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Quantum-Shielded Decentralized Identity Node
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            onClick={() => setActiveHudTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeHudTab === 'both' 
                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white border border-cyan-500/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Command Deck
          </button>
          <button
            onClick={() => setActiveHudTab('biometric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeHudTab === 'biometric' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Biometric Lock
          </button>
          <button
            onClick={() => setActiveHudTab('cloud')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeHudTab === 'cloud' 
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cloud Shards
          </button>
        </div>
      </div>

      {/* Main Dual Grid: Biometric Lock & Cloud Sync Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ======================================================== */}
        {/* WIDGET 1: ACTIVE SCI-FI BIOMETRIC LOCK HUD              */}
        {/* ======================================================== */}
        {(activeHudTab === 'both' || activeHudTab === 'biometric') && (
          <div className="relative rounded-3xl p-6 sm:p-7 bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.12)] overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow & Cyber Grid lines */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

            {/* Corner Decorative HUD Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

            {/* Top Bar of Biometric Card */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-sm tracking-wider text-white">
                    BIOMETRIC LOCK ENGINE
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">
                    ANTI-SPOOF • ZERO-KNOWLEDGE PROOF
                  </span>
                </div>
              </div>

              {/* Mode Selectors */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-mono">
                <button
                  onClick={() => setSelectedBioMode('facial')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedBioMode === 'facial' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Facial Symmetry Geometry"
                >
                  Face
                </button>
                <button
                  onClick={() => setSelectedBioMode('iris')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedBioMode === 'iris' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Iris Cryptographic Retina"
                >
                  Iris
                </button>
                <button
                  onClick={() => setSelectedBioMode('fingerprint')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedBioMode === 'fingerprint' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Hardware Key Fingerprint"
                >
                  Passkey
                </button>
              </div>
            </div>

            {/* Middle Scanner Radar & Visual HUD Target */}
            <div className="relative z-10 my-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Circular Holographic Reticle Radar */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                {/* Rotating Outer Radar Ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-radar" />
                <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
                
                {/* Glowing Concentric Tick Ring */}
                <div className="absolute inset-6 rounded-full border-2 border-cyan-500/40 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-cyan-500/20" />
                  <div className="absolute w-0.5 h-full bg-cyan-500/20" />
                </div>

                {/* Laser Scanline Beam moving up/down */}
                {scanState === 'scanning' && (
                  <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff] animate-laser-scan z-20 pointer-events-none" />
                )}

                {/* Center Target Icon */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900/90 border border-cyan-400/60 flex flex-col items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                  {selectedBioMode === 'facial' && (
                    <div className="relative flex flex-col items-center">
                      <Eye className="w-8 h-8 text-cyan-400" />
                      <span className="text-[9px] font-mono tracking-widest text-cyan-300 mt-1 uppercase font-bold">
                        {scanState === 'scanning' ? `${scanProgress}%` : 'LOCK ACTIVE'}
                      </span>
                    </div>
                  )}
                  {selectedBioMode === 'iris' && (
                    <div className="relative flex flex-col items-center">
                      <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                      <span className="text-[9px] font-mono tracking-widest text-cyan-300 mt-1 uppercase font-bold">
                        {scanState === 'scanning' ? `${scanProgress}%` : 'RETINA SECURE'}
                      </span>
                    </div>
                  )}
                  {selectedBioMode === 'fingerprint' && (
                    <div className="relative flex flex-col items-center">
                      <Fingerprint className="w-8 h-8 text-cyan-400" />
                      <span className="text-[9px] font-mono tracking-widest text-cyan-300 mt-1 uppercase font-bold">
                        {scanState === 'scanning' ? `${scanProgress}%` : 'FIDO2 TOKEN'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Corner reticles */}
                <span className="absolute top-1 left-1 text-[9px] font-mono text-cyan-500/80">X:124.9</span>
                <span className="absolute top-1 right-1 text-[9px] font-mono text-cyan-500/80">Y:882.1</span>
                <span className="absolute bottom-1 left-1 text-[9px] font-mono text-cyan-500/80">Z:009.4</span>
                <span className="absolute bottom-1 right-1 text-[9px] font-mono text-emerald-400 font-bold">99.98%</span>
              </div>

              {/* Real-time Telemetry Readout Fields */}
              <div className="w-full space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">CRYPTOGRAPHIC HASH</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{hashNonce}</span>
                </div>
                
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">LIVENESS ACCURACY</span>
                  <span className="text-emerald-400 font-bold tabular-nums">99.98% Authenticity</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">ZERO-KNOWLEDGE PROOF</span>
                  <span className="text-purple-300 font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Shielded Blake3</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">HARDWARE ATTESTATION</span>
                  <span className="text-slate-200 font-bold">Secure Enclave Valid</span>
                </div>
              </div>
            </div>

            {/* Bottom Scan Progress & Trigger Button */}
            <div className="relative z-10 pt-4 border-t border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{scanStepText}</span>
                </span>
                <span className="text-slate-400">{scanProgress}%</span>
              </div>

              {/* Glowing Laser Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30 p-[1px]">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_10px_#00f0ff] transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleTriggerBiometricScan}
                  disabled={scanState === 'scanning'}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{scanState === 'scanning' ? 'SCANNING BIOMETRICS...' : 'TRIGGER BIOMETRIC SCAN'}</span>
                </button>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Open Full Vault"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 2: ACTIVE SCI-FI CLOUD SYNC & SHARD TELEMETRY    */}
        {/* ======================================================== */}
        {(activeHudTab === 'both' || activeHudTab === 'cloud') && (
          <div className="relative rounded-3xl p-6 sm:p-7 bg-slate-950/85 backdrop-blur-2xl border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.12)] overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow & Cyber Grid lines */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

            {/* Corner Decorative HUD Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-purple-400/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-purple-400/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-purple-400/60 pointer-events-none" />

            {/* Top Bar of Cloud Card */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-sm tracking-wider text-white">
                    DISTRIBUTED CLOUD SYNC
                  </h4>
                  <span className="text-[10px] font-mono text-purple-300">
                    SHARDED LEDGER • ZERO EXPOSURE
                  </span>
                </div>
              </div>

              {/* Pulse status indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-[10px] font-mono text-purple-300 font-bold">
                <Radio className={`w-3 h-3 text-purple-400 ${isCloudSyncing ? 'animate-ping' : 'animate-pulse'}`} />
                <span>{isCloudSyncing ? 'SYNCING SHARDS' : 'CONSENSUS SYNCED'}</span>
              </div>
            </div>

            {/* Distributed Multi-Node Relay Cluster List */}
            <div className="relative z-10 my-4 space-y-3 font-mono">
              {/* Node 1: US Relay */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-purple-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Cluster Node Alpha (US-East)</span>
                    <span className="text-[10px] text-slate-400">Primary Cryptographic Handshake</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold tabular-nums">{latency}ms</span>
                  <span className="text-[9px] text-slate-500 block">100% HEALTH</span>
                </div>
              </div>

              {/* Node 2: EU Encryption Shard */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-purple-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Cluster Node Beta (EU-West)</span>
                    <span className="text-[10px] text-slate-400">Zero-Knowledge Key Storage</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold tabular-nums">18ms</span>
                  <span className="text-[9px] text-slate-500 block">ENCRYPTED</span>
                </div>
              </div>

              {/* Node 3: Sovereign Decentralized Shard */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-purple-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Sovereign Web3 Shard (IPFS)</span>
                    <span className="text-[10px] text-slate-400">Immutable Credential Merkle Proof</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-cyan-300 font-bold tabular-nums">3/3 SHARDS</span>
                  <span className="text-[9px] text-slate-500 block">PEER VALIDATED</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Shard Counter */}
            <div className="relative z-10 grid grid-cols-3 gap-2 py-3 border-t border-purple-500/20 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">SYNC STATE</span>
                <span className="text-xs text-purple-300 font-bold">{lastSyncTime}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">CONSENSUS</span>
                <span className="text-xs text-emerald-400 font-bold">{consensusRate}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">ENCRYPTION</span>
                <span className="text-xs text-cyan-300 font-bold">AES-256</span>
              </div>
            </div>

            {/* Bottom Sync Trigger Action Button */}
            <div className="relative z-10 pt-3">
              <button
                onClick={handleTriggerCloudSync}
                disabled={isCloudSyncing}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                <span>{isCloudSyncing ? 'RE-SYNCING CLOUD NODES...' : 'TRIGGER MULTI-NODE SYNC'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
