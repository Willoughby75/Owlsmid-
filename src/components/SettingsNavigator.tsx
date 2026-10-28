import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, Sun, Moon, Zap, Globe, Volume2, VolumeX, Cloud, 
  ShieldCheck, HardDrive, Laptop, LogOut, CheckCircle, RefreshCw, 
  Trash2, User, Key, Sparkles, LayoutGrid, Check, ExternalLink, ArrowRight
} from 'lucide-react';
import { playOwlHoot, toggleMute, getMuteState } from '../utils/audio';

interface SettingsNavigatorProps {
  theme: 'dark' | 'light' | 'neon';
  setTheme: (theme: 'dark' | 'light' | 'neon') => void;
  lang: string;
  setLang: (lang: string) => void;
  onNavigate: (tab: string) => void;
}

export default function SettingsNavigator({
  theme,
  setTheme,
  lang,
  setLang,
  onNavigate
}: SettingsNavigatorProps) {
  const [activeSection, setActiveSection] = useState<'appearance' | 'language' | 'audio' | 'integrations' | 'storage' | 'security'>('appearance');
  const [isMuted, setIsMuted] = useState(() => getMuteState());
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [lastActionMsg, setLastActionMsg] = useState<string | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('smid_registered_user');
    if (stored) {
      setRegisteredUser(JSON.parse(stored));
    }
  }, []);

  const handleToggleAudio = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (!muted) {
      playOwlHoot();
    }
    setLastActionMsg(muted ? 'Owl click audio feedback muted' : 'Owl hoot audio enabled!');
  };

  const handleClearCache = () => {
    if (confirm('Clear temporary local cache? (This will reset theme preferences and session cache, but won\'t delete registered profile credentials)')) {
      localStorage.removeItem('smid_tab');
      setLastActionMsg('Local app cache cleared successfully!');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to disconnect your SMID profile from this browser?')) {
      localStorage.removeItem('smid_registered_user');
      setRegisteredUser(null);
      setLastActionMsg('SMID credentials cleared from browser session.');
    }
  };

  const languagesList = [
    { code: 'en', flag: '🇺🇸', name: 'English', region: 'United States / Global' },
    { code: 'fr', flag: '🇫🇷', name: 'Français', region: 'France / Francophonie' },
    { code: 'es', flag: '🇪🇸', name: 'Español', region: 'España / Latinoamérica' },
    { code: 'pt', flag: '🇧🇷', name: 'Português', region: 'Brasil / Portugal' },
    { code: 'yo', flag: '🇳🇬', name: 'Yorùbá', region: 'West Africa / Nigeria' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية (RTL)', region: 'Middle East / Arabic' },
    { code: 'zh', flag: '🇨🇳', name: '中文', region: 'China / Asia' }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 relative z-10 text-left">
      {/* Header Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold mb-3">
          <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          <span>SMID CENTRAL SETTINGS NAVIGATOR</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight font-orbitron bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
          Settings & Preferences
        </h2>
        <p className="text-xs text-gray-400 mt-2 font-mono max-w-lg mx-auto">
          Manage visual styling modes, localization languages, audio haptics, cloud synchronization, and connected Workspace tools.
        </p>

        {/* Quick Summary Status Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
            <span className="text-gray-500">Theme:</span>
            <span className="text-indigo-400 font-bold uppercase">{theme}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
            <span className="text-gray-500">Language:</span>
            <span className="text-emerald-400 font-bold uppercase">{lang}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
            <span className="text-gray-500">Audio:</span>
            <span className={isMuted ? 'text-gray-400' : 'text-purple-400 font-bold'}>{isMuted ? 'Muted' : 'On (Owl Hoot)'}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Cloud Sync Active</span>
          </span>
        </div>
      </div>

      {/* Main Settings Navigator Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation Sections */}
        <div className="md:col-span-1 space-y-2">
          {[
            { id: 'appearance', label: 'Appearance', icon: Sun, desc: 'Themes & Visuals' },
            { id: 'language', label: 'Language', icon: Globe, desc: 'Localization' },
            { id: 'audio', label: 'Audio & Haptics', icon: Volume2, desc: 'Owl Sound FX' },
            { id: 'integrations', label: 'Connected Apps', icon: Laptop, desc: 'Google & Microsoft' },
            { id: 'storage', label: 'Cloud & Storage', icon: Cloud, desc: 'Cache & Backup' },
            { id: 'security', label: 'Account Passkey', icon: ShieldCheck, desc: 'Profile Security' },
          ].map((sec) => {
            const IconComponent = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id as any);
                  setLastActionMsg(null);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isActive 
                    ? 'bg-indigo-600/15 border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-950/20 font-bold' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-gray-400 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-gray-400'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-orbitron">{sec.label}</div>
                  <div className="text-[10px] text-gray-500 font-sans font-normal">{sec.desc}</div>
                </div>
              </button>
            );
          })}

          {/* Compressed Quick Apps Navigator Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mt-6 space-y-3">
            <h4 className="text-[11px] font-bold font-orbitron uppercase text-gray-400 flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
              <span>App Shortcuts</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <button onClick={() => onNavigate('home')} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300">Home</button>
              <button onClick={() => onNavigate('idcard')} className="p-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-300 font-bold">ID Card</button>
              <button onClick={() => onNavigate('dashboard')} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300">Dashboard</button>
              <button onClick={() => onNavigate('register')} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gray-300">Register</button>
              <button onClick={() => onNavigate('workspace')} className="p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300">Google</button>
              <button onClick={() => onNavigate('msoffice')} className="p-2 rounded-lg bg-sky-950/40 hover:bg-sky-900/40 text-sky-300">Microsoft</button>
            </div>
          </div>
        </div>

        {/* Section Detail Panel */}
        <div className="md:col-span-3 bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* 1. APPEARANCE & THEMES */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Visual Themes & Color Modes</h3>
                  <p className="text-xs text-gray-400">Select your preferred lighting atmosphere across the entire SMID platform</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'dark',
                    title: 'Dark Mode',
                    desc: 'Deep slate canvas with high contrast typography & eye-safe lighting.',
                    icon: Moon,
                    bgClass: 'bg-slate-950 border-slate-800 text-slate-100',
                    accentColor: 'text-indigo-400'
                  },
                  {
                    id: 'light',
                    title: 'Light Mode',
                    desc: 'Clean off-white canvas with sharp typography & subtle gray borders.',
                    icon: Sun,
                    bgClass: 'bg-slate-100 border-slate-300 text-slate-900',
                    accentColor: 'text-indigo-600'
                  },
                  {
                    id: 'neon',
                    title: 'Neon Cyber',
                    desc: 'Futuristic purple-black canvas with glowing electric violet accents.',
                    icon: Zap,
                    bgClass: 'bg-[#040112] border-purple-500/40 text-purple-200',
                    accentColor: 'text-fuchsia-400'
                  }
                ].map((th) => {
                  const IconComp = th.icon;
                  const isCurrent = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        setTheme(th.id as any);
                        setLastActionMsg(`Applied ${th.title} theme successfully.`);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden ${
                        isCurrent 
                          ? 'border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-950/40 scale-[1.02]' 
                          : 'hover:border-slate-700 opacity-80 hover:opacity-100'
                      } ${th.bgClass}`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <IconComp className={`w-5 h-5 ${th.accentColor}`} />
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold font-mono">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold font-orbitron mb-1">{th.title}</h4>
                        <p className="text-[11px] opacity-75 leading-relaxed">{th.desc}</p>
                      </div>
                      <div className="pt-2 flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. LANGUAGE & LOCALIZATION */}
          {activeSection === 'language' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Global Language Settings</h3>
                  <p className="text-xs text-gray-400">Choose from 7 supported international languages with automatic direction & translation support</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {languagesList.map((item) => {
                  const isSelected = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLastActionMsg(`Language switched to ${item.name}!`);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold shadow-lg' 
                          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.flag}</span>
                        <div>
                          <div className="text-xs font-bold font-orbitron">{item.name}</div>
                          <div className="text-[10px] text-gray-500">{item.region}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. AUDIO & HAPTICS */}
          {activeSection === 'audio' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Volume2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Audio & Sound FX Preferences</h3>
                  <p className="text-xs text-gray-400">Control click feedback sound effects featuring the signature SMID Owl Hoot</p>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800/80 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-orbitron text-white">Interactive Owl Hoot Click Feedback</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Plays an auditory owl hoot sound when tapping buttons or interactive controls.</p>
                  </div>
                  <button
                    onClick={handleToggleAudio}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold font-orbitron transition-all cursor-pointer flex items-center gap-2 ${
                      isMuted 
                        ? 'bg-slate-950 border-slate-800 text-gray-400 hover:text-white' 
                        : 'bg-purple-600 hover:bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-950/40'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isMuted ? 'Unmute Audio' : 'Mute Sound'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-gray-300 font-mono">
                    <span>Test Audio Sound Effect:</span>
                  </div>
                  <button
                    onClick={() => playOwlHoot()}
                    disabled={isMuted}
                    className="px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Test Sound Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONNECTED APPS & INTEGRATIONS */}
          {activeSection === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Connected Tools & Suite Hubs</h3>
                  <p className="text-xs text-gray-400">Manage Google Workspace & Microsoft 365 integrations for identity syncing and dispatch</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Google Workspace */}
                <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Google Workspace</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">CONNECTED</span>
                  </div>
                  <p className="text-xs text-gray-300">6 Connected Tools: Google Drive, Calendar, Gmail, Sheets, Docs & Tasks.</p>
                  <button
                    onClick={() => onNavigate('workspace')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold font-orbitron text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Google Apps Hub
                  </button>
                </div>

                {/* Microsoft 365 */}
                <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">Microsoft 365</span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-mono border border-sky-500/20">CONNECTED</span>
                  </div>
                  <p className="text-xs text-gray-300">6 Connected Tools: OneDrive, Teams, Outlook, Excel, Word & To Do.</p>
                  <button
                    onClick={() => onNavigate('msoffice')}
                    className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold font-orbitron text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Microsoft Apps Hub
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. CLOUD & STORAGE */}
          {activeSection === 'storage' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Cloud Sync & Data Vault</h3>
                  <p className="text-xs text-gray-400">Manage real-time cloud persistence, local storage caches, and backup security keys</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-orbitron text-white">Real-Time Cloud Synchronization</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Automatically syncs card verification metadata with secure cloud persistence.</p>
                  </div>
                  <button
                    onClick={() => {
                      setAutoSyncEnabled(!autoSyncEnabled);
                      setLastActionMsg(autoSyncEnabled ? 'Cloud Sync paused.' : 'Cloud Sync enabled.');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-orbitron transition-all cursor-pointer ${
                      autoSyncEnabled 
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-gray-400'
                    }`}
                  >
                    {autoSyncEnabled ? 'ACTIVE' : 'PAUSED'}
                  </button>
                </div>

                <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-orbitron text-white">Local Application Storage & Cache</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Clear temporary session cache if experiencing stale layout states.</p>
                  </div>
                  <button
                    onClick={handleClearCache}
                    className="px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 text-red-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Cache
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. SECURITY & ACCOUNT */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">Account & Passkey Security</h3>
                  <p className="text-xs text-gray-400">Manage registered identity credentials, biometric seals, and security keys</p>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 space-y-4">
                {registeredUser ? (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <User className="w-5 h-5 text-indigo-400" />
                      <div>
                        <div className="text-white font-bold">{registeredUser.name || 'Registered Holder'}</div>
                        <div className="text-gray-500 text-[11px]">{registeredUser.email}</div>
                      </div>
                    </div>

                    <div className="flex justify-between text-gray-300 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-gray-500">SMID Access Key:</span>
                      <span className="text-emerald-400 font-bold">{registeredUser.accessCode || 'SMID-9876543210'}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 bg-pink-950/30 hover:bg-pink-900/40 border border-pink-500/30 text-pink-300 font-bold font-orbitron text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Disconnect Credentials
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <p className="text-xs text-gray-400 font-mono">No active registered user profile found in local session.</p>
                    <button
                      onClick={() => onNavigate('register')}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-orbitron text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <Key className="w-4 h-4" /> Register New SMID Badge
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Status Toast */}
          <AnimatePresence>
            {lastActionMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-3.5 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{lastActionMsg}</span>
                </div>
                <button 
                  onClick={() => setLastActionMsg(null)}
                  className="text-[10px] text-gray-400 hover:text-white"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
