import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, Shield, Key, Copy, Check, ExternalLink, Zap, 
  Activity, RefreshCw, CheckCircle2, Lock, ArrowUpRight,
  Globe, Sparkles, Terminal, Layers
} from 'lucide-react';
import { playOwlHoot } from '../utils/audio';

interface PlatformNode {
  id: string;
  name: string;
  category: 'social' | 'creator' | 'developer' | 'enterprise';
  icon: string;
  badge: string;
  color: string;
  glowColor: string;
  endpoint: string;
  protocol: string;
  handshakeLatency: number;
  status: 'connected' | 'standby';
  description: string;
  token: string;
  coords: { x: number; y: number }; // percentage position for diagram
}

export default function UniversalNodeNetwork({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'social' | 'creator' | 'developer'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('meta');
  const [copiedToken, setCopiedToken] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  const nodes: PlatformNode[] = [
    {
      id: 'meta',
      name: 'Facebook & Instagram',
      category: 'social',
      icon: '👥',
      badge: 'Meta Graph Webhook',
      color: 'from-blue-600 to-indigo-600',
      glowColor: 'rgba(37, 99, 235, 0.4)',
      endpoint: 'https://graph.meta.com/v19.0/smid_identity_lock',
      protocol: 'OAuth 2.0 + SMID Face Lock Token',
      handshakeLatency: 14,
      status: 'connected',
      description: 'Instant cross-verification for personal profiles and business pages with anti-impersonation biometric verification lock.',
      token: 'SMID-META-AUTH-909281-SIG-VERIFIED',
      coords: { x: 22, y: 24 }
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      category: 'social',
      icon: '🐦',
      badge: 'Verified Header Bearer',
      color: 'from-sky-500 to-blue-500',
      glowColor: 'rgba(14, 165, 233, 0.4)',
      endpoint: 'https://api.x.com/2/oauth2/smid_bearer',
      protocol: 'JWT Bearer Signature + Proof-of-Humanity',
      handshakeLatency: 11,
      status: 'connected',
      description: 'Links cryptographic SMID badge with user bio and handle metadata to eradicate sybil bots and phishing accounts.',
      token: 'SMID-XTWITTER-SECURE-817290-PASSTHROUGH',
      coords: { x: 78, y: 24 }
    },
    {
      id: 'tiktok',
      name: 'TikTok & YouTube',
      category: 'creator',
      icon: '🎵',
      badge: 'Creator Handshake',
      color: 'from-pink-500 to-red-500',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      endpoint: 'https://open-api.tiktok.com/smid/creator_v1',
      protocol: 'Zero-Knowledge Video Channel Attestation',
      handshakeLatency: 16,
      status: 'connected',
      description: 'Enables verified video content badges, digital rights protection, and age-appropriate content governance (TSMID compliant).',
      token: 'SMID-CREATOR-TIKTOK-YT-442190-LIVE',
      coords: { x: 84, y: 72 }
    },
    {
      id: 'custom',
      name: 'Custom Web Apps',
      category: 'developer',
      icon: '🌐',
      badge: 'REST & GraphQL API',
      color: 'from-emerald-500 to-teal-500',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      endpoint: 'https://api.smid.id/v1/verify_identity',
      protocol: 'Decentralized DID & RESTful Handshake',
      handshakeLatency: 9,
      status: 'connected',
      description: 'Integrate the SMID single-sign-on (SSO) passkey into any custom SaaS, university portal, or e-commerce storefront in 3 lines of code.',
      token: 'SMID-RESTAPI-CLIENT-TOKEN-99120-PROD',
      coords: { x: 16, y: 72 }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn & Professional',
      category: 'social',
      icon: '💼',
      badge: 'Enterprise Trust SSO',
      color: 'from-blue-700 to-cyan-600',
      glowColor: 'rgba(2, 132, 199, 0.4)',
      endpoint: 'https://api.linkedin.com/v2/smid_attestation',
      protocol: 'SAML 2.0 / OIDC Verified Worker Lock',
      handshakeLatency: 18,
      status: 'connected',
      description: 'Verifies professional credentials, university degrees (TASMID), and corporate leadership IDs without disclosing confidential data.',
      token: 'SMID-CORP-LINKEDIN-SSO-77128-AUTH',
      coords: { x: 50, y: 88 }
    }
  ];

  const filteredNodes = nodes.filter(n => activeFilter === 'all' || n.category === activeFilter);
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleCopyToken = () => {
    playOwlHoot();
    navigator.clipboard.writeText(selectedNode.token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleTestPing = () => {
    playOwlHoot();
    setIsPinging(true);
    setPingResult(null);

    setTimeout(() => {
      setIsPinging(false);
      setPingResult(`HTTP 200 OK — Cryptographic Handshake Verified in ${selectedNode.handshakeLatency}ms. Signature valid.`);
    }, 850);
  };

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-slate-950/90 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden text-left">
      {/* Background Cyber Grid & Radiant Center Glow */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Area */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>UNIVERSAL INTEGRATION PROTOCOL • FOUND A WAY OUT</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white">
            Interactive Social Platform Node Network
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
            One single cryptographic SMID passkey bridges authentic identity across all networks seamlessly.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shrink-0 self-start md:self-auto">
          {[
            { id: 'all', label: 'All Nodes' },
            { id: 'social', label: 'Social' },
            { id: 'creator', label: 'Creator' },
            { id: 'developer', label: 'Developer API' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playOwlHoot();
                setActiveFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: Constellation View + Live Inspection HUD */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch">
        
        {/* LEFT / CENTER: Interactive SVG Node Graph Stage (7 Cols) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] rounded-3xl bg-slate-950/80 border border-indigo-500/20 p-4 flex items-center justify-center overflow-hidden">
          {/* Animated Circuit Connectors (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="beamGradientCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Circuit Radial Lines connecting Center (50%, 48%) to each node */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <g key={`line-${node.id}`}>
                  {/* Base Hairline Connection */}
                  <line
                    x1="50%"
                    y1="48%"
                    x2={`${node.coords.x}%`}
                    y2={`${node.coords.y}%`}
                    stroke={isSelected ? '#00f0ff' : 'rgba(99, 102, 241, 0.25)'}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? '6 4' : 'none'}
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Pulsing Light Signal Dot traveling between Core and Node */}
                  {isSelected && (
                    <circle
                      r="4"
                      fill="#00F0FF"
                      className="shadow-[0_0_10px_#00F0FF]"
                    >
                      <animateMotion
                        path={`M 0 0 L ${(node.coords.x - 50) * 3} ${(node.coords.y - 48) * 3}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center Hub: SMID MASTER IDENTITY CORE */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 0 25px rgba(99,102,241,0.3)',
                '0 0 50px rgba(168,85,247,0.5)',
                '0 0 25px rgba(99,102,241,0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-900 border-2 border-indigo-400 text-center cursor-pointer select-none"
            style={{ top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }}
            onClick={() => {
              playOwlHoot();
            }}
          >
            {/* Concentric rotating radar ring around core */}
            <div className="absolute -inset-3 rounded-full border border-indigo-500/30 border-dashed animate-radar pointer-events-none" />
            <div className="absolute -inset-6 rounded-full border border-cyan-500/20 pointer-events-none" />

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg mb-1">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-orbitron font-extrabold text-[11px] sm:text-xs text-white tracking-wider">
              SMID CORE
            </span>
            <span className="text-[9px] font-mono text-cyan-300">
              MASTER DID
            </span>
          </motion.div>

          {/* Interactive Peripheral Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isDimmed = activeFilter !== 'all' && node.category !== activeFilter;

            return (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playOwlHoot();
                  setSelectedNodeId(node.id);
                  setPingResult(null);
                }}
                className={`absolute z-30 cursor-pointer select-none transition-all duration-300 ${
                  isDimmed ? 'opacity-30' : 'opacity-100'
                }`}
                style={{
                  top: `${node.coords.y}%`,
                  left: `${node.coords.x}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`relative px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 backdrop-blur-xl border transition-all ${
                  isSelected 
                    ? 'bg-slate-900/95 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] ring-2 ring-cyan-500/30' 
                    : 'bg-slate-950/80 border-slate-700/80 hover:border-indigo-400/60 text-slate-200 shadow-lg'
                }`}>
                  <span className="text-xl sm:text-2xl">{node.icon}</span>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold block whitespace-nowrap">{node.name}</span>
                    <span className="text-[9px] font-mono text-slate-400 block">{node.badge}</span>
                  </div>

                  {/* Verified Indicator Badge */}
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: Node Telemetry & Protocol Inspection HUD (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-950/90 border border-cyan-500/30 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div>
            {/* Header of selected platform */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-400/40 flex items-center justify-center text-2xl shadow-md">
                  {selectedNode.icon}
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-base text-white">
                    {selectedNode.name}
                  </h4>
                  <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{selectedNode.badge}</span>
                  </span>
                </div>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold uppercase">
                {selectedNode.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed my-4 font-sans">
              {selectedNode.description}
            </p>

            {/* Endpoint & Protocol Specs */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">PROTOCOL</span>
                <span className="text-cyan-300 font-semibold">{selectedNode.protocol}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">HANDSHAKE SPEED</span>
                <span className="text-emerald-400 font-bold tabular-nums">~{selectedNode.handshakeLatency} ms</span>
              </div>

              {/* Cryptographic Passkey / Token Field */}
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">SMID ENCRYPTED PASSKEY</span>
                  <button
                    onClick={handleCopyToken}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
                  >
                    {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedToken ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-cyan-300 select-all break-all bg-slate-950 p-2 rounded-lg border border-slate-800">
                  {selectedNode.token}
                </div>
              </div>
            </div>

            {/* Ping Handshake Output if tested */}
            {pingResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{pingResult}</span>
              </motion.div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-5 border-t border-cyan-500/20 flex gap-3">
            <button
              onClick={handleTestPing}
              disabled={isPinging}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 text-amber-300 ${isPinging ? 'animate-bounce' : ''}`} />
              <span>{isPinging ? 'TESTING HANDSHAKE...' : 'TEST PROTOCOL PING'}</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="py-3 px-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 text-xs font-orbitron font-bold tracking-wider cursor-pointer"
              >
                Manage
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Quick Access Badges Strip */}
      <div className="relative z-10 pt-4 border-t border-indigo-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Universal Single-Sign-On Standard • Zero Identity Exposure</span>
        </span>
        <span className="text-slate-500">
          Compatible with Meta, X, TikTok, Discord, LinkedIn, RESTful Microservices
        </span>
      </div>
    </div>
  );
}
