import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Sparkles, Database, Award, ArrowUpRight, Copy, Check, 
  CheckCircle, RefreshCw, AlertCircle, ExternalLink, Plus, Trash2, 
  Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, ShieldCheck, Link2,
  Cpu, Fingerprint, Eye, Radio, QrCode, Lock, Zap, Activity, Key
} from 'lucide-react';
import { playOwlHoot } from '../utils/audio';
import SciFiCommandHud from './SciFiCommandHud';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

interface SocialLinkItem {
  id: string;
  platform: string;
  badgeName: string;
  url: string;
  status: string;
  verifiedAt: string;
  trustScore: string;
  latency: string;
  icon: string;
  brandColor: string;
  bgGradient: string;
  borderColor: string;
}

export default function DashboardView({ onNavigate, lang }: DashboardViewProps) {
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [syncingBadgeId, setSyncingBadgeId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // Form input state for adding/editing social links
  const [inputPlatform, setInputPlatform] = useState('Facebook');
  const [inputUrl, setInputUrl] = useState('');
  const [addSuccessMsg, setAddSuccessMsg] = useState('');

  // Default pre-populated verified social links
  const defaultSocialLinks: SocialLinkItem[] = [
    {
      id: 'fb-default',
      platform: 'Facebook',
      badgeName: 'Verified Facebook',
      url: 'https://www.facebook.com/profile.php?id=61576867190581',
      status: 'Profile Linked',
      verifiedAt: 'Just now',
      trustScore: '99.9%',
      latency: '12ms',
      icon: '👥',
      brandColor: '#1877F2',
      bgGradient: 'from-blue-950/60 to-slate-900/80',
      borderColor: 'border-blue-500/40'
    },
    {
      id: 'x-default',
      platform: 'X / Twitter',
      badgeName: 'Verified X / Twitter',
      url: 'https://x.com/owlapp202',
      status: 'Profile Linked',
      verifiedAt: 'Just now',
      trustScore: '99.8%',
      latency: '14ms',
      icon: '🐦',
      brandColor: '#38BDF8',
      bgGradient: 'from-sky-950/60 to-slate-900/80',
      borderColor: 'border-sky-500/40'
    },
    {
      id: 'ig-default',
      platform: 'Instagram',
      badgeName: 'Verified Instagram',
      url: 'https://www.instagram.com/smido.fficial?igsh=MXFzcTJ4YjJzOGI2Ng==',
      status: 'Profile Linked',
      verifiedAt: 'Just now',
      trustScore: '99.7%',
      latency: '15ms',
      icon: '📸',
      brandColor: '#E1306C',
      bgGradient: 'from-pink-950/60 to-slate-900/80',
      borderColor: 'border-pink-500/40'
    },
    {
      id: 'yt-default',
      platform: 'YouTube',
      badgeName: 'Verified YouTube Channel',
      url: 'https://youtube.com/@smidofficial?si=MfaoZxIywRNGdzjZ',
      status: 'Profile Linked',
      verifiedAt: 'Just now',
      trustScore: '99.9%',
      latency: '11ms',
      icon: '📺',
      brandColor: '#FF0000',
      bgGradient: 'from-red-950/60 to-slate-900/80',
      borderColor: 'border-red-500/40'
    }
  ];

  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([]);

  useEffect(() => {
    // Check if user is registered
    const storedUser = localStorage.getItem('smid_registered_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load social links from localStorage or use defaults
    const storedLinks = localStorage.getItem('smid_user_social_links');
    if (storedLinks) {
      try {
        setSocialLinks(JSON.parse(storedLinks));
      } catch (e) {
        setSocialLinks(defaultSocialLinks);
      }
    } else {
      setSocialLinks(defaultSocialLinks);
      localStorage.setItem('smid_user_social_links', JSON.stringify(defaultSocialLinks));
    }
  }, []);

  const saveLinks = (updated: SocialLinkItem[]) => {
    setSocialLinks(updated);
    localStorage.setItem('smid_user_social_links', JSON.stringify(updated));
  };

  const handleRefresh = () => {
    playOwlHoot();
    setIsRefreshing(true);
    setTimeout(() => {
      const refreshed = socialLinks.map(link => ({
        ...link,
        status: 'Profile Linked',
        verifiedAt: 'Refreshed just now',
        latency: `${Math.floor(Math.random() * 10 + 8)}ms`
      }));
      saveLinks(refreshed);
      setIsRefreshing(false);
    }, 900);
  };

  const handleRefetchBadge = (badgeId: string) => {
    playOwlHoot();
    setSyncingBadgeId(badgeId);
    setTimeout(() => {
      const updated = socialLinks.map(item => {
        if (item.id === badgeId) {
          return {
            ...item,
            status: 'Profile Linked',
            verifiedAt: 'Re-verified just now',
            latency: `${Math.floor(Math.random() * 8 + 6)}ms`
          };
        }
        return item;
      });
      saveLinks(updated);
      setSyncingBadgeId(null);
    }, 700);
  };

  const handleAddSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    playOwlHoot();
    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const platformMeta: Record<string, { icon: string; brandColor: string; bgGradient: string; borderColor: string }> = {
      'Facebook': { icon: '👥', brandColor: '#1877F2', bgGradient: 'from-blue-950/60 to-slate-900/80', borderColor: 'border-blue-500/40' },
      'X / Twitter': { icon: '🐦', brandColor: '#38BDF8', bgGradient: 'from-sky-950/60 to-slate-900/80', borderColor: 'border-sky-500/40' },
      'Instagram': { icon: '📸', brandColor: '#E1306C', bgGradient: 'from-pink-950/60 to-slate-900/80', borderColor: 'border-pink-500/40' },
      'LinkedIn': { icon: '💼', brandColor: '#0A66C2', bgGradient: 'from-blue-950/60 to-slate-900/80', borderColor: 'border-blue-600/40' },
      'YouTube': { icon: '📺', brandColor: '#FF0000', bgGradient: 'from-red-950/60 to-slate-900/80', borderColor: 'border-red-500/40' },
      'TikTok': { icon: '🎵', brandColor: '#25F4EE', bgGradient: 'from-teal-950/60 to-slate-900/80', borderColor: 'border-teal-500/40' },
      'Discord': { icon: '🎮', brandColor: '#5865F2', bgGradient: 'from-indigo-950/60 to-slate-900/80', borderColor: 'border-indigo-500/40' },
      'Website': { icon: '🌐', brandColor: '#10B981', bgGradient: 'from-emerald-950/60 to-slate-900/80', borderColor: 'border-emerald-500/40' }
    };

    const meta = platformMeta[inputPlatform] || platformMeta['Website'];

    const newBadge: SocialLinkItem = {
      id: `badge-${Date.now()}`,
      platform: inputPlatform,
      badgeName: `Verified ${inputPlatform}`,
      url: formattedUrl,
      status: 'Profile Linked',
      verifiedAt: 'Just now',
      trustScore: '100%',
      latency: '10ms',
      icon: meta.icon,
      brandColor: meta.brandColor,
      bgGradient: meta.bgGradient,
      borderColor: meta.borderColor
    };

    const filtered = socialLinks.filter(item => item.platform !== inputPlatform);
    const updated = [newBadge, ...filtered];
    saveLinks(updated);

    setInputUrl('');
    setAddSuccessMsg(`✓ Created '${newBadge.badgeName}' badge with status 'Profile Linked'!`);
    setTimeout(() => setAddSuccessMsg(''), 3000);
  };

  const handleRemoveLink = (id: string) => {
    playOwlHoot();
    const updated = socialLinks.filter(item => item.id !== id);
    saveLinks(updated);
  };

  const handlePreloadDefaults = () => {
    playOwlHoot();
    saveLinks(defaultSocialLinks);
    setAddSuccessMsg('✓ Restored standard verified social badges!');
    setTimeout(() => setAddSuccessMsg(''), 3000);
  };

  // Safe fallback if user hasn't registered
  const defaultUser = {
    name: 'Oluwatosin Abraham Willoughby',
    email: 'founder@smid.platform',
    categoryName: 'ASMID Master Credential',
    categoryLabel: 'Adult & Founder Verified',
    accessCode: 'SMID-AUTH-8890-7721-SEC',
    connectedPlatforms: ['Facebook', 'X / Twitter', 'Instagram', 'YouTube'],
    faceVerified: true,
    registeredAt: 'Active Session',
    filesCount: 4
  };

  const activeUser = user || defaultUser;

  const copyToClipboard = (text: string) => {
    playOwlHoot();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platformOptions = [
    'Facebook', 'X / Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Discord', 'Website'
  ];

  return (
    <div className="py-6 sm:py-10 relative z-10 text-white max-w-6xl mx-auto space-y-8">
      
      {/* ======================================================== */}
      {/* 1. TOP SCI-FI IDENTITY PROFILE HUD                       */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.12)] overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Holographic Avatar Hexagon with Glowing Border */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-3xl">
                👤
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center">
                <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black font-orbitron tracking-tight text-white">
                  {activeUser.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                  VERIFIED IDENT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{activeUser.email}</p>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-cyan-300">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeUser.categoryName}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-purple-300">
                  <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
                  <span>Biometrics Locked</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick HUD Actions */}
          <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto justify-end">
            <button
              onClick={() => setShowQrModal(!showQrModal)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>{showQrModal ? 'Close Passkey' : 'QR Passkey'}</span>
            </button>

            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-orbitron font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'SYNCING...' : 'SYNC DIRECTORY'}</span>
            </button>
          </div>
        </div>

        {/* QR Access Modal / Drawer */}
        <AnimatePresence>
          {showQrModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6 pt-6 border-t border-cyan-500/20"
            >
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-400/30 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 p-2 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-xl">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
                <div className="space-y-2 text-left">
                  <h4 className="font-orbitron font-bold text-sm text-white">Dynamic Cryptographic Passkey</h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Scan with any authorized mobile device or partner social network to verify your identity badge in real-time.
                  </p>
                  <div className="p-2 rounded-lg bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-800 flex items-center justify-between gap-2">
                    <span className="truncate">{activeUser.accessCode}</span>
                    <button
                      onClick={() => copyToClipboard(activeUser.accessCode)}
                      className="text-[10px] text-cyan-400 hover:underline shrink-0"
                    >
                      {copied ? '✓ COPIED' : 'COPY'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* 2. STATS & TELEMETRY GRID                                */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {/* Trust Score Radar */}
        <div className="rounded-2xl p-5 bg-slate-950/80 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">GLOBAL TRUST SCORE</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="font-orbitron font-black text-3xl text-emerald-400">99.9%</span>
            <span className="text-[10px] font-mono text-emerald-300 font-bold">Unchallenged</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Biometric Liveness Match</span>
        </div>

        {/* Cryptographic Passkey Token */}
        <div className="rounded-2xl p-5 bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">SMID PASSKEY TOKEN</span>
            <Key className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-3">
            <span className="font-mono text-sm font-bold text-cyan-300 block truncate">
              {activeUser.accessCode}
            </span>
          </div>
          <button 
            onClick={() => copyToClipboard(activeUser.accessCode)}
            className="text-[10px] font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-all"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY CRYPTO PASSKEY'}
          </button>
        </div>

        {/* Active Verification Tier */}
        <div className="rounded-2xl p-5 bg-slate-950/80 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">TIER ACCREDITATION</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="my-3">
            <span className="font-orbitron font-black text-xl text-purple-300 block truncate">
              {activeUser.categoryName.split(' ')[0]}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Published to Trust Directory</span>
        </div>

        {/* Linked Social Nodes */}
        <div className="rounded-2xl p-5 bg-slate-950/80 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)] flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">LINKED SOCIAL NODES</span>
            <Radio className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="font-orbitron font-black text-3xl text-indigo-300">
              {socialLinks.length}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Synced</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Cross-Platform SSO Handshakes</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. EMBEDDED SCI-FI COMMAND HUD (Biometric & Cloud Sync)  */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-950/80 backdrop-blur-xl border border-slate-800 shadow-xl text-left">
        <SciFiCommandHud onNavigate={onNavigate} lang={lang} />
      </div>

      {/* ======================================================== */}
      {/* 4. VERIFIED SOCIAL MEDIA BADGES GRID SECTION             */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-950/80 backdrop-blur-xl border border-slate-800 text-left shadow-xl relative overflow-hidden">
        
        {/* Header with Add Social Link Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-black font-orbitron tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Verified Social Media Badges</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {socialLinks.length} Active
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Connect your official profile URLs to generate authenticated SMID verification badges with real-time status indicators.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                playOwlHoot();
                setShowAddForm(!showAddForm);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold font-orbitron tracking-wide flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Close Form' : 'Add Social Link'}</span>
            </button>
          </div>
        </div>

        {/* Add Social Link Inline Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <form onSubmit={handleAddSocialLink} className="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 font-orbitron uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-cyan-400" /> Link Profile & Issue Badge
                  </span>
                  <button
                    type="button"
                    onClick={handlePreloadDefaults}
                    className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    Restore Official Defaults
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Platform</label>
                    <select
                      value={inputPlatform}
                      onChange={(e) => setInputPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-semibold cursor-pointer"
                    >
                      {platformOptions.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {inputPlatform} Profile URL
                    </label>
                    <input
                      type="url"
                      required
                      placeholder={`e.g., https://${inputPlatform.toLowerCase().includes('facebook') ? 'www.facebook.com/profile.php?id=...' : 'x.com/username'}`}
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setInputPlatform('Facebook');
                        setInputUrl('https://www.facebook.com/profile.php?id=61576867190581');
                      }}
                      className="text-[10px] px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Facebook className="w-3 h-3" /> Quick Add Facebook
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInputPlatform('YouTube');
                        setInputUrl('https://youtube.com/@smidofficial?si=MfaoZxIywRNGdzjZ');
                      }}
                      className="text-[10px] px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Youtube className="w-3 h-3" /> Quick Add YouTube Channel
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-orbitron font-bold text-xs tracking-wider rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer ml-auto"
                  >
                    <Check className="w-4 h-4 text-slate-950" /> Issue Verified Badge
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Message */}
        {addSuccessMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-2 font-mono">
            <span>{addSuccessMsg}</span>
          </div>
        )}

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((badge) => {
            const isSyncing = syncingBadgeId === badge.id;
            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-slate-900/80 border ${badge.borderColor} rounded-2xl p-4 flex flex-col justify-between min-h-[170px] relative group hover:border-cyan-400/60 transition-all shadow-md`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <h4 className="text-sm font-black font-orbitron text-white tracking-wide">
                          {badge.badgeName}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono capitalize">{badge.platform} Profile</p>
                      </div>
                    </div>

                    <span className="shrink-0 p-1 bg-emerald-500/20 border border-emerald-400/50 rounded-full text-emerald-400 shadow-sm" title="Verified Badge">
                      <CheckCircle className="w-4 h-4 fill-emerald-500/20" />
                    </span>
                  </div>

                  <a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-cyan-300 hover:text-white truncate block max-w-full my-2 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-1 group/link"
                  >
                    <span className="truncate">{badge.url.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400 group-hover/link:text-white shrink-0" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 font-bold font-mono tracking-wide uppercase">
                        {badge.status}
                      </span>
                    </div>

                    <span className="text-slate-400 font-mono text-[9px]">{badge.verifiedAt}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <button
                      onClick={() => handleRefetchBadge(badge.id)}
                      disabled={isSyncing}
                      className="text-[10px] text-slate-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition-all cursor-pointer"
                      title="Re-fetch mock status telemetry"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                      <span>{isSyncing ? 'Fetching...' : `Sync (${badge.latency})`}</span>
                    </button>

                    <button
                      onClick={() => handleRemoveLink(badge.id)}
                      className="text-[10px] text-slate-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition-all cursor-pointer p-1"
                      title="Remove link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. SECURITY AUDIT ACTIVITY LOG                           */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-950/80 backdrop-blur-xl border border-slate-800 text-left shadow-xl">
        <h3 className="text-sm font-bold font-orbitron tracking-wider text-slate-200 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Security Audit & Cryptographic Activity Log</span>
        </h3>

        <div className="space-y-3.5 font-mono text-xs">
          <div className="flex gap-4 items-start pb-3.5 border-b border-slate-800/80 last:border-none last:pb-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              ✓
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-200">Biometric geometry signature verified</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Circular face mapping matched zero-knowledge landmark coordinates</p>
            </div>
            <span className="text-[10px] text-slate-500">12:34:10</span>
          </div>

          <div className="flex gap-4 items-start pb-3.5 border-b border-slate-800/80 last:border-none last:pb-0">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              🔑
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-200">Universal Passkey Handshake Active</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Meta Webhook, X Header Bearer, and TikTok Creator Handshake verified</p>
            </div>
            <span className="text-[10px] text-slate-500">12:30:02</span>
          </div>

          <div className="flex gap-4 items-start pb-3.5 border-b border-slate-800/80 last:border-none last:pb-0">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              ☁️
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-200">Distributed Cloud Nodes Synced</p>
              <p className="text-[11px] text-slate-400 mt-0.5">3/3 Shards consensus verified across US-East, EU-West, and Sovereign IPFS</p>
            </div>
            <span className="text-[10px] text-slate-500">12:28:44</span>
          </div>
        </div>
      </div>

      {/* Navigation shortcuts */}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <button
          onClick={() => {
            playOwlHoot();
            onNavigate('idcard');
          }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
        >
          View Holographic Digital ID
        </button>
        <button
          onClick={() => {
            playOwlHoot();
            onNavigate('cloud');
          }}
          className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer"
        >
          Encrypted Cloud Vault
        </button>
        <button
          onClick={() => {
            playOwlHoot();
            onNavigate('home');
          }}
          className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer"
        >
          Return to Hero Hub
        </button>
      </div>

    </div>
  );
}
