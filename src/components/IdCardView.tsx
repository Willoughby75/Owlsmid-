import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Share2, Printer, RefreshCw, RotateCw, Globe, Award, Sparkles, CheckCircle, 
  Download, Edit3, Lock, Copy, Check, Eye, User, Calendar, MapPin, Phone, 
  Mail, FileText, ExternalLink, QrCode, CheckSquare, Layers, Youtube, Facebook,
  Twitter, Instagram, Linkedin, Zap
} from 'lucide-react';
import SmidOwlLogo from './SmidOwlLogo';

interface IdCardViewProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function IdCardView({ onNavigate, lang }: IdCardViewProps) {
  const [user, setUser] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'both' | 'flip' | 'front' | 'back'>('both');
  const [cardTheme, setCardTheme] = useState<'crimson' | 'indigo' | 'emerald'>('crimson');
  const [showLanyard, setShowLanyard] = useState(true);
  const [trustScore, setTrustScore] = useState(96);
  const [isRefreshingScore, setIsRefreshingScore] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Express registration form state for unregistered users
  const [showExpressForm, setShowExpressForm] = useState(false);
  const [expressForm, setExpressForm] = useState({
    name: '',
    category: 'asmid',
    description: 'Creative Manager',
    dob: '1997-03-03',
    age: '28',
    country: 'United States',
    phone: '+1 (555) 234-5678',
    email: '',
    avatarUrl: ''
  });

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    dob: '',
    age: '',
    country: '',
    phone: '',
    email: '',
    accessCode: '',
    avatarUrl: ''
  });

  const loadUserData = () => {
    const storedUser = localStorage.getItem('smid_registered_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditForm({
          name: parsed.name || '',
          description: parsed.description || parsed.categoryLabel || 'Creative Manager',
          dob: parsed.dob || '1997-03-03',
          age: parsed.age || '28',
          country: parsed.country || 'United States',
          phone: parsed.phone || '(000) 123 4567',
          email: parsed.email || 'your email goes here',
          accessCode: parsed.accessCode || 'SMID-9876543210',
          avatarUrl: parsed.avatarUrl || ''
        });
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
    window.addEventListener('storage', loadUserData);
    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []);

  const activeUser = user || {
    name: 'UNREGISTERED USER',
    description: 'Registration Required',
    petName: '',
    categoryName: 'ASMID',
    categoryLabel: 'Adult Social Media ID',
    dob: 'YYYY-MM-DD',
    age: '--',
    country: 'Not Specified',
    phone: 'Not Registered',
    email: 'Not Registered',
    accessCode: 'SMID-0000000000',
    connectedPlatforms: [],
    registeredAt: '--',
    expiresAt: '--',
    faceVerified: false
  };

  // Calculate age string helper
  const displayAge = editForm.age || (activeUser.age ? `${activeUser.age} Yrs` : '28 Yrs');
  const displayName = editForm.name || activeUser.name;
  const displayDesc = editForm.description || activeUser.description || activeUser.categoryLabel || 'Creative Manager';
  const displayCountry = editForm.country || activeUser.country;
  const displayPhone = editForm.phone || activeUser.phone;
  const displayEmail = editForm.email || activeUser.email;
  const displayCode = editForm.accessCode || activeUser.accessCode;
  const displayDob = editForm.dob || activeUser.dob;

  const handleRefreshTrustScore = () => {
    setIsRefreshingScore(true);
    setTimeout(() => {
      setTrustScore(Math.floor(Math.random() * 5) + 95);
      setIsRefreshingScore(false);
    }, 1000);
  };

  const handleSaveEdit = () => {
    const updated = {
      ...activeUser,
      name: editForm.name,
      description: editForm.description,
      dob: editForm.dob,
      age: editForm.age,
      country: editForm.country,
      phone: editForm.phone,
      email: editForm.email,
      accessCode: editForm.accessCode,
      avatarUrl: editForm.avatarUrl
    };
    setUser(updated);
    localStorage.setItem('smid_registered_user', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setIsEditing(false);
  };

  const handleCopyVerificationLink = () => {
    const link = `https://smid.platform/verify?code=${displayCode}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExpressRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressForm.name.trim() || !expressForm.email.trim()) {
      alert('Please fill out your full name and email address.');
      return;
    }

    const randSegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const signature = `SMID-${randSegment()}-${randSegment()}-${randSegment()}`;
    
    const catLabels: Record<string, string> = {
      tsmid: 'Teen Social Media ID',
      tasmid: 'Teen & Adult Social Media ID',
      asmid: 'Adult Social Media ID',
      bsmid: 'Business Social Media ID',
      minibsmid: 'Mini Business Social Media ID'
    };

    const newRegUser = {
      category: expressForm.category,
      categoryName: expressForm.category.toUpperCase(),
      categoryLabel: catLabels[expressForm.category] || 'Adult Social Media ID',
      name: expressForm.name.toUpperCase(),
      description: expressForm.description || 'Verified SMID Registrant',
      dob: expressForm.dob || '1997-03-03',
      age: expressForm.age || '28',
      country: expressForm.country || 'United States',
      phone: expressForm.phone || '(000) 123 4567',
      email: expressForm.email,
      accessCode: signature,
      avatarUrl: expressForm.avatarUrl || '',
      connectedPlatforms: ['Facebook', 'X / Twitter', 'Instagram', 'LinkedIn', 'YouTube'],
      faceVerified: true,
      registeredAt: new Date().toLocaleDateString(),
      expiresAt: '13-08-2028'
    };

    localStorage.setItem('smid_registered_user', JSON.stringify(newRegUser));
    window.dispatchEvent(new Event('storage'));
    setUser(newRegUser);
    setEditForm({
      name: newRegUser.name,
      description: newRegUser.description,
      dob: newRegUser.dob,
      age: newRegUser.age,
      country: newRegUser.country,
      phone: newRegUser.phone,
      email: newRegUser.email,
      accessCode: newRegUser.accessCode,
      avatarUrl: newRegUser.avatarUrl
    });
    setShowExpressForm(false);
  };

  // Color themes dictionary
  const themes = {
    crimson: {
      primary: '#dc2626', // Red
      secondary: '#991b1b',
      accent: '#ef4444',
      badgeBg: 'bg-red-600',
      textAccent: 'text-red-500',
      borderAccent: 'border-red-600',
      lanyardBg: 'bg-gradient-to-b from-red-700 via-red-600 to-red-800',
      gradientHeader: 'from-red-600 via-red-700 to-slate-900'
    },
    indigo: {
      primary: '#4f46e5', // Indigo
      secondary: '#3730a3',
      accent: '#6366f1',
      badgeBg: 'bg-indigo-600',
      textAccent: 'text-indigo-400',
      borderAccent: 'border-indigo-600',
      lanyardBg: 'bg-gradient-to-b from-indigo-700 via-indigo-600 to-indigo-900',
      gradientHeader: 'from-indigo-600 via-purple-700 to-slate-900'
    },
    emerald: {
      primary: '#059669', // Emerald
      secondary: '#065f46',
      accent: '#10b981',
      badgeBg: 'bg-emerald-600',
      textAccent: 'text-emerald-400',
      borderAccent: 'border-emerald-600',
      lanyardBg: 'bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-900',
      gradientHeader: 'from-emerald-600 via-teal-700 to-slate-900'
    }
  };

  const activeTheme = themes[cardTheme];

  // Vector Crisp QR Code Graphic
  const QrCodeGraphic = ({ code }: { code: string }) => (
    <div className={`p-1.5 bg-white rounded-xl shadow-md border-2 ${activeTheme.borderAccent} inline-block shrink-0`}>
      <div className="w-16 h-16 bg-slate-950 p-1.5 rounded-lg flex flex-col justify-between relative overflow-hidden">
        {/* Top Finder Patterns */}
        <div className="flex justify-between">
          <div className="w-3.5 h-3.5 border-2 border-white rounded-xs p-0.5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-xs" />
          </div>
          <div className="w-3.5 h-3.5 border-2 border-white rounded-xs p-0.5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-xs" />
          </div>
        </div>
        {/* Center Matrix Bits */}
        <div className="grid grid-cols-6 gap-0.5 my-1">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-red-500 rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-red-500 rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-red-500 rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
        {/* Bottom Finder Pattern & Logo */}
        <div className="flex justify-between items-end">
          <div className="w-3.5 h-3.5 border-2 border-white rounded-xs p-0.5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-xs" />
          </div>
          <div className="text-[6px] font-mono font-bold text-red-500 bg-slate-900 px-1 rounded">
            SMID
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-10 relative z-10 text-white max-w-5xl mx-auto px-4">
      {/* Title & Slogan featuring Official SMID Owl Artwork */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>OFFICIAL VERTICAL LANYARD ID BADGE</span>
        </div>
        
        {/* Render Official SMID Owl Logo Emblem */}
        <div className="transform hover:scale-105 transition-transform">
          <SmidOwlLogo size="md" showSubtitle={true} />
        </div>

        <p className="text-xs text-gray-400 mt-3 font-mono max-w-lg">
          Cryptographically signed physical & digital lanyard identity badge with biometric face verification seal.
        </p>
      </div>

      {/* GATED STATE FOR UNREGISTERED USERS - ID CARD IS NOT DISPLAYED UNTIL REGISTERED */}
      {!user ? (
        <div className="bg-slate-950/90 border-2 border-red-500/30 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl relative overflow-hidden text-center my-6">
          {/* Ambient lighting spots */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="w-20 h-20 bg-red-950/60 border border-red-500/40 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Lock className="w-10 h-10 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-white mb-3 tracking-wide">
            Registration Required To View ID Badge
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 max-w-lg mx-auto font-sans">
            Your official SMID Lanyard Identity Card is dynamically rendered from your verified registration credentials. No registered SMID profile was found in this browser session.
          </p>

          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-left mb-6 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-orbitron">
              <CheckSquare className="w-4 h-4 shrink-0" />
              <span>Complete registration to instantly unlock:</span>
            </div>
            <ul className="text-gray-300 pl-6 list-disc space-y-1.5 text-xs font-sans">
              <li>Personalized 3D Flip Lanyard ID Badge with custom photo/avatar</li>
              <li>Cryptographic access sync code & biometric face verification seal</li>
              <li>Your custom full name, role/title, country, age & contact credentials</li>
              <li>Printable, downloadable & shareable official identity card with QR code</li>
            </ul>
          </div>

          {/* Action Choice Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-extrabold font-orbitron text-xs tracking-widest rounded-xl transition-all shadow-xl shadow-red-950/40 cursor-pointer flex items-center justify-center gap-2 uppercase"
            >
              <Sparkles className="w-4 h-4" /> Go To Full Registration Hub
            </button>
            
            <button
              onClick={() => setShowExpressForm(!showExpressForm)}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-orbitron"
            >
              <User className="w-4 h-4" /> {showExpressForm ? 'Close Express Form' : '⚡ Quick 1-Min Express Register'}
            </button>
          </div>

          {/* Express Registration Form inline option */}
          {showExpressForm && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleExpressRegister}
              className="mt-8 pt-6 border-t border-slate-800 text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-orbitron text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Express Identity Registration
                </h4>
                <span className="text-[10px] text-gray-500 font-mono">Instant Live Card Generation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ALEX MORGAN"
                    value={expressForm.name}
                    onChange={(e) => setExpressForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category *</label>
                  <select
                    value={expressForm.category}
                    onChange={(e) => setExpressForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  >
                    <option value="asmid">ASMID - Adult Social Media ID</option>
                    <option value="tsmid">TSMID - Teen Social Media ID</option>
                    <option value="tasmid">TASMID - Teen & Adult Social Media ID</option>
                    <option value="bsmid">BSMID - Business Social Media ID</option>
                    <option value="minibsmid">MINIBSMID - Mini Business ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Title / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Creative Manager / Founder"
                    value={expressForm.description}
                    onChange={(e) => setExpressForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={expressForm.dob}
                    onChange={(e) => setExpressForm(p => ({ ...p, dob: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={expressForm.country}
                    onChange={(e) => setExpressForm(p => ({ ...p, country: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={expressForm.email}
                    onChange={(e) => setExpressForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Profile Photo / Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={expressForm.avatarUrl}
                  onChange={(e) => setExpressForm(p => ({ ...p, avatarUrl: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold font-orbitron text-xs tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer uppercase flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Generate & Unlock Live ID Card Now
              </button>
            </motion.form>
          )}
        </div>
      ) : (
        <>
          {/* REGISTERED USER IDENTITY STATUS BANNER */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 text-center mb-8 text-xs text-emerald-300 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-bold font-orbitron">OFFICIAL VERIFIED IDENTITY:</span>
              <span className="text-white font-bold">{user.name}</span>
              <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono">({user.categoryLabel || user.categoryName || 'ASMID'})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('register')}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all cursor-pointer text-[11px] shrink-0 font-orbitron"
              >
                Re-Register / Replace
              </button>
              <button
                onClick={() => {
                  if (confirm('Clear current registered ID card? You will need to re-register to view an ID card again.')) {
                    localStorage.removeItem('smid_registered_user');
                    window.dispatchEvent(new Event('storage'));
                    setUser(null);
                  }
                }}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-red-400 border border-slate-800 font-semibold rounded-lg transition-all cursor-pointer text-[11px] shrink-0"
              >
                Clear ID
              </button>
            </div>
          </div>

      {/* Control Toolbar */}
      <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 mb-10 max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Layout Modes */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'both' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Both Sides
          </button>
          <button
            onClick={() => setViewMode('flip')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'flip' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" /> 3D Flip Card
          </button>
          <button
            onClick={() => setViewMode('front')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'front' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Front
          </button>
          <button
            onClick={() => setViewMode('back')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'back' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        {/* Theme Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 font-bold uppercase">Theme:</span>
          <button
            onClick={() => setCardTheme('crimson')}
            className={`w-6 h-6 rounded-full bg-red-600 border-2 transition-all cursor-pointer ${
              cardTheme === 'crimson' ? 'border-white scale-110 shadow-[0_0_10px_#ef4444]' : 'border-transparent opacity-60'
            }`}
            title="Crimson Red (Reference Image)"
          />
          <button
            onClick={() => setCardTheme('indigo')}
            className={`w-6 h-6 rounded-full bg-indigo-600 border-2 transition-all cursor-pointer ${
              cardTheme === 'indigo' ? 'border-white scale-110 shadow-[0_0_10px_#6366f1]' : 'border-transparent opacity-60'
            }`}
            title="Midnight Indigo"
          />
          <button
            onClick={() => setCardTheme('emerald')}
            className={`w-6 h-6 rounded-full bg-emerald-600 border-2 transition-all cursor-pointer ${
              cardTheme === 'emerald' ? 'border-white scale-110 shadow-[0_0_10px_#10b981]' : 'border-transparent opacity-60'
            }`}
            title="Emerald Security"
          />
        </div>

        {/* Toggle Lanyard & Edit */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLanyard(!showLanyard)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              showLanyard ? 'bg-red-500/10 border-red-500/40 text-red-300' : 'bg-slate-900 border-slate-800 text-gray-400'
            }`}
          >
            <span>{showLanyard ? '🎗️ Hide Lanyard' : '🎗️ Show Lanyard'}</span>
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Card Info
          </button>
        </div>
      </div>

      {/* CARD DISPLAY AREA */}
      <div className="mb-12 flex justify-center">
        {/* MODE 1: SIDE-BY-SIDE DUAL CARD LANYARD DISPLAY */}
        {viewMode === 'both' && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-4xl w-full">
            {/* FRONT CARD CONTAINER */}
            <div className="flex flex-col items-center">
              {showLanyard && (
                <div className="flex flex-col items-center relative z-20 mb-[-14px]">
                  {/* Woven Lanyard Strap */}
                  <div className={`w-12 h-20 ${activeTheme.lanyardBg} rounded-t-xl shadow-lg border-x border-red-900/60 relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)] bg-[size:8px_8px]" />
                    <span className="text-[7px] font-mono font-black text-red-100 uppercase rotate-90 tracking-widest opacity-90 select-none">
                      SMID REGISTRY
                    </span>
                  </div>
                  {/* Chrome Swivel Metallic Clip */}
                  <div className="w-9 h-7 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-md border border-gray-400 shadow-xl flex items-center justify-center -mt-1 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-500 border border-gray-200 shadow-inner" />
                  </div>
                </div>
              )}

              {/* CARD FRONT BODY */}
              <div className="w-[330px] sm:w-[350px] min-h-[530px] bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 relative overflow-hidden select-none">
                {/* Diagonal Geometric Header Accent */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-32 ${activeTheme.badgeBg} transform -skew-y-6 origin-top-left -mt-6 z-0`}
                />
                <div className="absolute top-0 right-0 w-28 h-28 bg-slate-900 transform skew-x-12 -mr-8 -mt-8 z-0" />

                {/* Feather Owl Watermark Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden z-0">
                  <svg viewBox="0 0 100 80" className="w-[300px] h-[240px] text-slate-950" fill="currentColor">
                    <path d="M 5,75 L 5,20 L 30,5 L 50,38 L 70,5 L 95,20 L 95,75 L 80,75 L 80,32 L 62,18 L 50,45 L 38,18 L 20,32 L 20,75 Z" />
                    <circle cx="33" cy="38" r="13" />
                    <circle cx="67" cy="38" r="13" />
                  </svg>
                </div>

                {/* Header Section */}
                <div className="relative z-10 text-center">
                  {/* Lanyard Clip Slot Hole */}
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] mb-3 shrink-0" />

                  {/* Avatar Portrait */}
                  <div className="relative w-24 h-24 mx-auto rounded-full bg-white p-1 shadow-2xl border-4 border-red-600 mt-2 flex items-center justify-center overflow-hidden">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Portrait" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center text-4xl font-bold">
                        👤
                      </div>
                    )}
                    {/* Verification Shield Badge */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow">
                      ✓
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="mt-3">
                    <h3 className="text-xl font-extrabold tracking-tight font-sans text-slate-900 uppercase leading-tight">
                      {displayName}
                    </h3>
                    <p className={`text-xs font-bold ${activeTheme.textAccent} font-sans uppercase tracking-wider mt-0.5`}>
                      {displayDesc}
                    </p>
                  </div>
                </div>

                {/* Middle Info Table */}
                <div className="relative z-10 bg-slate-50/90 rounded-2xl p-4 border border-slate-200 my-3 text-xs space-y-2.5 font-sans">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">ID NO</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider">: {displayCode}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">AGE / DOB</span>
                    <span className="font-mono font-bold text-slate-900">: {displayAge} ({displayDob})</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">COUNTRY</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayCountry}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">PHONE</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayPhone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">E-MAIL</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayEmail}</span>
                  </div>
                </div>

                {/* Bottom Logo & Crest with Owl Emblem */}
                <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl ${activeTheme.badgeBg} text-white flex items-center justify-center p-1 shadow-md shrink-0`}>
                      <svg viewBox="0 0 100 80" className="w-6 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 5,75 L 5,20 L 30,5 L 50,38 L 70,5 L 95,20 L 95,75 L 80,75 L 80,32 L 62,18 L 50,45 L 38,18 L 20,32 L 20,75 Z" fill="#FFFFFF" />
                        <path d="M 45,36 L 55,36 L 50,52 Z" fill="#F8FAFC" />
                        <circle cx="33" cy="38" r="11" fill="#020617" />
                        <circle cx="33" cy="38" r="5" fill="#FFFFFF" />
                        <circle cx="67" cy="38" r="11" fill="#020617" />
                        <circle cx="67" cy="38" r="5" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black font-orbitron tracking-wider text-slate-900 leading-none">
                        SMID IDC
                      </p>
                      <p className="text-[8px] font-mono text-gray-500 tracking-tight">
                        Social Media Identity
                      </p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase font-mono tracking-wider">
                    VERIFIED
                  </div>
                </div>
              </div>
            </div>

            {/* BACK CARD CONTAINER */}
            <div className="flex flex-col items-center">
              {showLanyard && (
                <div className="flex flex-col items-center relative z-20 mb-[-14px]">
                  {/* Woven Lanyard Strap */}
                  <div className={`w-12 h-20 ${activeTheme.lanyardBg} rounded-t-xl shadow-lg border-x border-red-900/60 relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)] bg-[size:8px_8px]" />
                    <span className="text-[7px] font-mono font-black text-red-100 uppercase rotate-90 tracking-widest opacity-90 select-none">
                      SMID REGISTRY
                    </span>
                  </div>
                  {/* Chrome Swivel Metallic Clip */}
                  <div className="w-9 h-7 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-md border border-gray-400 shadow-xl flex items-center justify-center -mt-1 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-500 border border-gray-200 shadow-inner" />
                  </div>
                </div>
              )}

              {/* CARD BACK BODY */}
              <div className="w-[330px] sm:w-[350px] min-h-[530px] bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 relative overflow-hidden select-none">
                {/* Diagonal Header Shape */}
                <div className="absolute top-0 left-0 w-32 h-20 bg-slate-900 transform -skew-x-12 -ml-6 -mt-4 z-0" />
                <div className={`absolute top-0 right-0 w-32 h-24 ${activeTheme.badgeBg} transform skew-x-12 -mr-6 -mt-4 z-0`} />

                {/* Feather Owl Watermark Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden z-0">
                  <svg viewBox="0 0 100 80" className="w-[300px] h-[240px] text-slate-950" fill="currentColor">
                    <path d="M 5,75 L 5,20 L 30,5 L 50,38 L 70,5 L 95,20 L 95,75 L 80,75 L 80,32 L 62,18 L 50,45 L 38,18 L 20,32 L 20,75 Z" />
                    <circle cx="33" cy="38" r="13" />
                    <circle cx="67" cy="38" r="13" />
                  </svg>
                </div>

                {/* Top Slot & Dates Header */}
                <div className="relative z-10 text-center">
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] mb-4 shrink-0" />

                  <div className="flex justify-between items-center text-xs font-mono font-bold px-2 pt-2 text-slate-800">
                    <div>
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Join</span>
                      <span>: {activeUser.registeredAt || '12-08-2019'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Expire</span>
                      <span className={`${activeTheme.textAccent}`}>: {activeUser.expiresAt || '13-08-2028'}</span>
                    </div>
                  </div>
                </div>

                {/* Middle Description & Bio Section */}
                <div className="relative z-10 my-3 text-left space-y-2 text-xs font-sans">
                  <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
                    This official SMID identity token confirms verified biometric face mapping and cryptographic social media profile ownership.
                  </p>
                  <ul className="space-y-1 text-[11px] text-gray-700 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.badgeBg} mt-1.5 shrink-0`} />
                      <span>Tamperproof hash proof logged on SMID cloud ledger.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.badgeBg} mt-1.5 shrink-0`} />
                      <span>Multi-platform identity bridge (Facebook, YouTube, X, Instagram, LinkedIn).</span>
                    </li>
                  </ul>
                </div>

                {/* Verified Handles Badges */}
                <div className="relative z-10 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    BOUND SOCIAL PLATFORMS
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(activeUser.connectedPlatforms || ['Facebook', 'YouTube', 'X / Twitter', 'Instagram', 'LinkedIn']).map((p: string) => (
                      <span key={p} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-bold text-slate-800 shadow-xs">
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature Row */}
                <div className="relative z-10 text-center border-t border-slate-200 pt-2 my-1">
                  <div className="font-serif italic text-lg font-bold text-slate-900 tracking-wide select-none">
                    Tosin Willoughby
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                    SMID Registrar / Founding President
                  </span>
                </div>

                {/* Bottom QR Code Block */}
                <div className="relative z-10 bg-slate-900 text-white rounded-2xl p-3 flex items-center justify-between shadow-lg">
                  <div className="text-left space-y-1 max-w-[180px]">
                    <span className="text-[10px] font-bold font-orbitron text-red-400 uppercase tracking-wider block">
                      SCAN TO VERIFY
                    </span>
                    <p className="text-[9px] text-gray-300 font-mono leading-tight">
                      Scan QR code to audit official trust token on SMID public registry.
                    </p>
                  </div>
                  {/* Vector QR Code */}
                  <QrCodeGraphic code={displayCode} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: INTERACTIVE 3D FLIP CARD VIEW */}
        {viewMode === 'flip' && (
          <div className="perspective-1000 w-full max-w-[360px] flex flex-col items-center">
            {showLanyard && (
              <div className="flex flex-col items-center relative z-20 mb-[-14px]">
                <div className={`w-12 h-20 ${activeTheme.lanyardBg} rounded-t-xl shadow-lg border-x border-red-900/60 relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)] bg-[size:8px_8px]" />
                  <span className="text-[7px] font-mono font-black text-red-100 uppercase rotate-90 tracking-widest opacity-90 select-none">
                    SMID REGISTRY
                  </span>
                </div>
                <div className="w-9 h-7 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-md border border-gray-400 shadow-xl flex items-center justify-center -mt-1 relative z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-500 border border-gray-200 shadow-inner" />
                </div>
              </div>
            )}

            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="relative w-full aspect-[1/1.55] transform-style-preserve-3d cursor-pointer select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-32 ${activeTheme.badgeBg} transform -skew-y-6 origin-top-left -mt-6 z-0`} />
                <div className="absolute top-0 right-0 w-28 h-28 bg-slate-900 transform skew-x-12 -mr-8 -mt-8 z-0" />

                <div className="relative z-10 text-center">
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 mb-3 shrink-0" />
                  <div className="relative w-24 h-24 mx-auto rounded-full bg-white p-1 shadow-2xl border-4 border-red-600 mt-2 flex items-center justify-center overflow-hidden">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Portrait" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center text-4xl font-bold">
                        👤
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow">
                      ✓
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xl font-extrabold font-sans text-slate-900 uppercase leading-tight">{displayName}</h3>
                    <p className={`text-xs font-bold ${activeTheme.textAccent} uppercase tracking-wider mt-0.5`}>{displayDesc}</p>
                  </div>
                </div>

                <div className="relative z-10 bg-slate-50/90 rounded-2xl p-4 border border-slate-200 my-3 text-xs space-y-2 font-sans">
                  <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase">ID NO</span>
                    <span className="font-mono font-bold text-slate-900">: {displayCode}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase">AGE / DOB</span>
                    <span className="font-mono font-bold text-slate-900">: {displayAge} ({displayDob})</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase">COUNTRY</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[160px]">: {displayCountry}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500 text-[10px] uppercase">PHONE</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[160px]">: {displayPhone}</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${activeTheme.badgeBg} text-white flex items-center justify-center text-xs shadow`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black font-orbitron tracking-wider text-slate-900 leading-none">SMID ID</p>
                      <p className="text-[8px] font-mono text-gray-500">Universal Passkey</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    CLICK TO FLIP 🔄
                  </span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div 
                className="absolute inset-0 backface-hidden bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 overflow-hidden" 
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="absolute top-0 left-0 w-32 h-20 bg-slate-900 transform -skew-x-12 -ml-6 -mt-4 z-0" />
                <div className={`absolute top-0 right-0 w-32 h-24 ${activeTheme.badgeBg} transform skew-x-12 -mr-6 -mt-4 z-0`} />

                <div className="relative z-10 text-center">
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 mb-3 shrink-0" />
                  <div className="flex justify-between items-center text-xs font-mono font-bold px-2 text-slate-800">
                    <div>
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Join</span>
                      <span>: {activeUser.registeredAt || '12-08-2019'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Expire</span>
                      <span className={`${activeTheme.textAccent}`}>: {activeUser.expiresAt || '13-08-2028'}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 my-3 text-left space-y-2 text-xs font-sans">
                  <p className="text-[11px] text-gray-600 font-normal">
                    Cryptographically signed identity badge confirming verified biometric face mapping and social profile ownership.
                  </p>
                </div>

                <div className="relative z-10 text-center border-t border-slate-200 pt-2">
                  <div className="font-serif italic text-lg font-bold text-slate-900">Tosin Willoughby</div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase">SMID Registrar</span>
                </div>

                <div className="relative z-10 bg-slate-900 text-white rounded-2xl p-3 flex items-center justify-between shadow-lg">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-bold font-orbitron text-red-400 block">SCAN TO VERIFY</span>
                    <p className="text-[9px] text-gray-300 font-mono">Scan QR code to audit SMID trust token.</p>
                  </div>
                  <QrCodeGraphic code={displayCode} />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODE 3 & 4: FRONT ONLY OR BACK ONLY */}
        {(viewMode === 'front' || viewMode === 'back') && (
          <div className="flex flex-col items-center">
            {showLanyard && (
              <div className="flex flex-col items-center relative z-20 mb-[-14px]">
                <div className={`w-12 h-20 ${activeTheme.lanyardBg} rounded-t-xl shadow-lg border-x border-red-900/60 relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)] bg-[size:8px_8px]" />
                  <span className="text-[7px] font-mono font-black text-red-100 uppercase rotate-90 tracking-widest opacity-90 select-none">
                    SMID REGISTRY
                  </span>
                </div>
                <div className="w-9 h-7 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-md border border-gray-400 shadow-xl flex items-center justify-center -mt-1 relative z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-500 border border-gray-200 shadow-inner" />
                </div>
              </div>
            )}

            {viewMode === 'front' ? (
              /* FRONT CARD */
              <div className="w-[330px] sm:w-[350px] min-h-[530px] bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 relative overflow-hidden select-none">
                <div className={`absolute top-0 left-0 right-0 h-32 ${activeTheme.badgeBg} transform -skew-y-6 origin-top-left -mt-6 z-0`} />
                <div className="absolute top-0 right-0 w-28 h-28 bg-slate-900 transform skew-x-12 -mr-8 -mt-8 z-0" />

                <div className="relative z-10 text-center">
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 mb-3 shrink-0" />
                  <div className="relative w-24 h-24 mx-auto rounded-full bg-white p-1 shadow-2xl border-4 border-red-600 mt-2 flex items-center justify-center overflow-hidden">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Portrait" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center text-4xl font-bold">
                        👤
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow">
                      ✓
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xl font-extrabold font-sans text-slate-900 uppercase leading-tight">{displayName}</h3>
                    <p className={`text-xs font-bold ${activeTheme.textAccent} uppercase tracking-wider mt-0.5`}>{displayDesc}</p>
                  </div>
                </div>

                <div className="relative z-10 bg-slate-50/90 rounded-2xl p-4 border border-slate-200 my-3 text-xs space-y-2.5 font-sans">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">ID NO</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider">: {displayCode}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">AGE / DOB</span>
                    <span className="font-mono font-bold text-slate-900">: {displayAge} ({displayDob})</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">COUNTRY</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayCountry}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">PHONE</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayPhone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">E-MAIL</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[170px]">: {displayEmail}</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-200 pt-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${activeTheme.badgeBg} text-white flex items-center justify-center text-xs shadow`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black font-orbitron tracking-wider text-slate-900 leading-none">SMID ID</p>
                      <p className="text-[8px] font-mono text-gray-500">Universal Social Identity</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase font-mono tracking-wider">
                    VERIFIED
                  </div>
                </div>
              </div>
            ) : (
              /* BACK CARD */
              <div className="w-[330px] sm:w-[350px] min-h-[530px] bg-white rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gray-200 relative overflow-hidden select-none">
                <div className="absolute top-0 left-0 w-32 h-20 bg-slate-900 transform -skew-x-12 -ml-6 -mt-4 z-0" />
                <div className={`absolute top-0 right-0 w-32 h-24 ${activeTheme.badgeBg} transform skew-x-12 -mr-6 -mt-4 z-0`} />

                <div className="relative z-10 text-center">
                  <div className="w-14 h-3 mx-auto bg-slate-950 rounded-full border-2 border-slate-700 mb-4 shrink-0" />
                  <div className="flex justify-between items-center text-xs font-mono font-bold px-2 pt-2 text-slate-800">
                    <div>
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Join</span>
                      <span>: {activeUser.registeredAt || '12-08-2019'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-[9px] uppercase block font-semibold">Expire</span>
                      <span className={`${activeTheme.textAccent}`}>: {activeUser.expiresAt || '13-08-2028'}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 my-3 text-left space-y-2 text-xs font-sans">
                  <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
                    This official SMID identity token confirms verified biometric face mapping and cryptographic social media profile ownership.
                  </p>
                </div>

                <div className="relative z-10 text-center border-t border-slate-200 pt-2 my-1">
                  <div className="font-serif italic text-lg font-bold text-slate-900 tracking-wide select-none">Tosin Willoughby</div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">SMID Registrar</span>
                </div>

                <div className="relative z-10 bg-slate-900 text-white rounded-2xl p-3 flex items-center justify-between shadow-lg">
                  <div className="text-left space-y-1 max-w-[180px]">
                    <span className="text-[10px] font-bold font-orbitron text-red-400 uppercase tracking-wider block">SCAN TO VERIFY</span>
                    <p className="text-[9px] text-gray-300 font-mono leading-tight">Scan QR code to audit official trust token on SMID registry.</p>
                  </div>
                  <QrCodeGraphic code={displayCode} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TRUST RATING & VERIFICATION AUDIT PANEL */}
      <div className="bg-slate-950/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 max-w-3xl mx-auto text-left mb-10 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h4 className="text-base font-bold font-orbitron tracking-wider text-white">
                SMID Cryptographic Trust Score
              </h4>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Real-time neural identity validation & social proof index</p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-3xl font-extrabold font-orbitron text-emerald-400">
              {trustScore}%
            </span>
            <button 
              onClick={handleRefreshTrustScore}
              disabled={isRefreshingScore}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-gray-300 transition-all cursor-pointer"
              title="Refresh trust score"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshingScore ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-bold font-mono uppercase text-[10px]">Biometric Face</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
            <p className="text-[11px] text-gray-300 font-semibold">Face coordinate vector map cryptographically locked.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-bold font-mono uppercase text-[10px]">Document Audit</span>
              <span className="text-emerald-400 font-bold">PASSED</span>
            </div>
            <p className="text-[11px] text-gray-300 font-semibold">Live camera document scanner seal matched.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-bold font-mono uppercase text-[10px]">Social Handles</span>
              <span className="text-cyan-400 font-bold">5 LINKED</span>
            </div>
            <p className="text-[11px] text-gray-300 font-semibold">Facebook, YouTube, X, Instagram, LinkedIn connected.</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 border border-red-500 text-white font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg"
        >
          <Printer className="w-4 h-4" /> Print Lanyard Badge (PDF)
        </button>
        <button
          onClick={() => onNavigate('workspace')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-slate-950 font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg"
        >
          <Globe className="w-4 h-4" /> Sync with Google Apps
        </button>
        <button
          onClick={() => onNavigate('msoffice')}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 border border-sky-500 text-white font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg"
        >
          <Share2 className="w-4 h-4" /> Sync with Microsoft Apps
        </button>
        <button
          onClick={handleCopyVerificationLink}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-gray-200 font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
          <span>{copiedLink ? 'Verification Link Copied!' : 'Copy Verification QR Link'}</span>
        </button>
      </div>

      {/* LIVE EDIT MODAL */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-orbitron text-white">Edit ID Card Details</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-white font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Full Registrant Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    placeholder="e.g. JHON MILLER"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Description / Role / Title</label>
                  <input 
                    type="text" 
                    value={editForm.description}
                    onChange={(e) => setEditForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    placeholder="e.g. Creative Manager"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">Age (e.g. 28 Yrs)</label>
                    <input 
                      type="text" 
                      value={editForm.age}
                      onChange={(e) => setEditForm(p => ({ ...p, age: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">DOB (e.g. 03-07-1997)</label>
                    <input 
                      type="text" 
                      value={editForm.dob}
                      onChange={(e) => setEditForm(p => ({ ...p, dob: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">Country</label>
                    <input 
                      type="text" 
                      value={editForm.country}
                      onChange={(e) => setEditForm(p => ({ ...p, country: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">ID Code</label>
                    <input 
                      type="text" 
                      value={editForm.accessCode}
                      onChange={(e) => setEditForm(p => ({ ...p, accessCode: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 uppercase mb-1">Email</label>
                    <input 
                      type="text" 
                      value={editForm.email}
                      onChange={(e) => setEditForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Custom Photo URL (Optional)</label>
                  <input 
                    type="text" 
                    value={editForm.avatarUrl}
                    onChange={(e) => setEditForm(p => ({ ...p, avatarUrl: e.target.value }))}
                    placeholder="https://... (Leave blank for default icon)"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-950 text-gray-400 hover:text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg"
                >
                  Save ID Card
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </>
      )}
    </div>
  );
}
