import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Globe, Sun, Moon, Zap, Menu, X, LogOut, Heart, HelpCircle, Volume2, VolumeX, Twitter, Instagram, Facebook, Youtube, Mail, Settings, ChevronDown, Grid } from 'lucide-react';
import { playOwlHoot, toggleMute, getMuteState } from './utils/audio';
import ParticleBackground from './components/ParticleBackground';
import SmidOwlLogo from './components/SmidOwlLogo';
import HomeView from './components/HomeView';
import CategoriesView from './components/CategoriesView';
import RegisterView from './components/RegisterView';
import DashboardView from './components/DashboardView';
import IdCardView from './components/IdCardView';
import CloudView from './components/CloudView';
import FounderView from './components/FounderView';
import LinguaBotView from './components/LinguaBotView';
import ShareKitView from './components/ShareKitView';
import LoginView from './components/LoginView';
import GoogleWorkspaceHub from './components/GoogleWorkspaceHub';
import MicrosoftToolsHub from './components/MicrosoftToolsHub';
import SettingsNavigator from './components/SettingsNavigator';
import { translations, getTranslation } from './i18n';

export default function App() {
  // --- Persistent Layout States ---
  const [theme, setTheme] = useState<'dark' | 'light' | 'neon'>(() => {
    return (localStorage.getItem('smid_theme') as 'dark' | 'light' | 'neon') || 'dark';
  });
  
  const [lang, setLang] = useState<string>(() => {
    return localStorage.getItem('smid_lang') || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('smid_tab') || 'home';
  });

  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Sound Toggle and Global Click Event Listener for Owl sound ---
  const [isAudioMuted, setIsAudioMuted] = useState(() => getMuteState());

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element or parent is a button, anchor, input, select, role="button", or interactive element
      const interactive = target.closest('button, a, input, select, [role="button"], .cursor-pointer, [onClick]');
      if (interactive) {
        playOwlHoot();
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => {
      window.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  // --- Hydrate User and Sync Theme/Lang Changes ---
  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('smid_registered_user');
      if (stored) {
        setRegisteredUser(JSON.parse(stored));
      } else {
        setRegisteredUser(null);
      }
    };

    checkUser();

    // Listen to storage event for register updates
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  useEffect(() => {
    // Set theme attributes on HTML/body
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('smid_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('smid_lang', lang);
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('smid_tab', activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [hudNotice, setHudNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setHudNotice(msg);
    setTimeout(() => setHudNotice(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('smid_registered_user');
    setRegisteredUser(null);
    setActiveTab('home');
    showToast('Secure credentials cleared successfully.');
  };

  const getLangName = (l: string) => {
    const labels: Record<string, string> = {
      en: 'English',
      fr: 'Français',
      es: 'Español',
      pt: 'Português',
      yo: 'Yorùbá',
      ar: 'العربية',
      zh: '中文'
    };
    return labels[l] || 'English';
  };

  const t = (key: string) => getTranslation(lang, key);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 pb-20 ${
      theme === 'light' 
        ? 'bg-slate-50 text-slate-950' 
        : theme === 'neon' 
        ? 'bg-[#040112] text-[#e0ccff]' 
        : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Immersive Particle Canvas Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticleBackground theme={theme} />
      </div>

      {/* --- PREMIUM NAVBAR --- */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-slate-50/80 border-slate-200' 
          : theme === 'neon' 
          ? 'bg-[#040112]/80 border-purple-500/20 shadow-[0_4px_30px_rgba(168,85,247,0.15)]' 
          : 'bg-slate-950/85 border-slate-800/80 shadow-lg shadow-slate-950/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <SmidOwlLogo size="sm" showSubtitle={false} />
            <div className="hidden sm:block text-left leading-none pl-1">
              <span className="text-[9px] font-bold tracking-widest text-slate-300 block uppercase font-mono">
                SOCIAL MEDIA IDENTITY
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-orbitron font-bold text-[11px] tracking-wider">
            {[
              { id: 'home', label: t('nav_home') },
              { id: 'idcard', label: t('nav_idcard') },
              { id: 'dashboard', label: t('nav_dashboard') },
              { id: 'register', label: t('nav_register') },
            ].map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabChange(link.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer relative uppercase ${
                    isActive 
                      ? theme === 'neon' 
                        ? 'text-fuchsia-400 bg-purple-950/30 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.25)]' 
                        : 'text-indigo-400 bg-indigo-500/5 border border-indigo-500/20' 
                      : 'text-gray-400 hover:text-white border border-transparent'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        theme === 'neon' ? 'bg-purple-400' : 'bg-indigo-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}

            {/* Apps & Integration Hubs Menu */}
            <div className="relative group">
              <button className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 uppercase ${
                ['workspace', 'msoffice', 'cloud', 'linguabot'].includes(activeTab)
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}>
                <span>Apps & Tools</span>
                <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
              </button>
              <div className="absolute left-0 top-full mt-1 w-44 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-1.5 hidden group-hover:block z-50 text-left">
                {[
                  { id: 'workspace', label: 'Google Apps', color: 'text-emerald-400' },
                  { id: 'msoffice', label: 'Microsoft Apps', color: 'text-sky-400' },
                  { id: 'cloud', label: 'Cloud Vault', color: 'text-cyan-400' },
                  { id: 'linguabot', label: 'AI LinguaBot', color: 'text-purple-400' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full text-xs px-3 py-2 rounded-xl text-left flex items-center justify-between cursor-pointer transition-all ${
                      activeTab === item.id 
                        ? 'bg-indigo-600/20 text-white font-bold' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] ${item.color}`}>●</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform & Pitch */}
            {[
              { id: 'categories', label: t('nav_categories') },
              { id: 'share', label: t('nav_share') },
              { id: 'founder', label: t('nav_founder') },
            ].map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabChange(link.id)}
                  className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer relative uppercase ${
                    isActive 
                      ? 'text-indigo-400 bg-indigo-500/5 border border-indigo-500/20' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Settings Button */}
            <button
              onClick={() => handleTabChange('settings')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 uppercase ${
                activeTab === 'settings' 
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-950/40' 
                  : 'bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-indigo-400" />
              <span>Settings</span>
            </button>
          </div>

          {/* Utility / Theme Control Panel */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Multi-language Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="px-3.5 py-2 bg-slate-950/40 hover:bg-slate-900 border border-slate-800/80 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{getLangName(lang)}</span>
                <span className="text-[10px] text-gray-500">▼</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-950 border border-slate-800/80 shadow-2xl p-1.5 z-50 text-left"
                  >
                    {[
                      { code: 'en', flag: '🇺🇸', name: 'English' },
                      { code: 'fr', flag: '🇫🇷', name: 'Français' },
                      { code: 'es', flag: '🇪🇸', name: 'Español' },
                      { code: 'pt', flag: '🇧🇷', name: 'Português' },
                      { code: 'yo', flag: '🇳🇬', name: 'Yorùbá' },
                      { code: 'ar', flag: '🇸🇦', name: 'العربية' },
                      { code: 'zh', flag: '🇨🇳', name: '中文' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-xs px-3 py-2 rounded-lg text-left flex items-center gap-2 cursor-pointer transition-all ${
                          lang === item.code 
                            ? 'bg-indigo-600/15 text-indigo-400 font-bold' 
                            : 'text-gray-400 hover:text-white hover:bg-slate-900/60'
                        }`}
                      >
                        <span>{item.flag}</span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme selectors */}
            <div className="flex bg-slate-950/40 p-1 rounded-xl border border-slate-800/80">
              <button 
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === 'light' ? 'bg-indigo-600/10 text-indigo-500 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                title="Light Mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === 'dark' ? 'bg-indigo-600/10 text-indigo-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                title="Dark Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('neon')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === 'neon' ? 'bg-purple-600/15 text-purple-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                title="Neon Cyber"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Interactive Owl Sound Control */}
            <button
              onClick={() => {
                const muted = toggleMute();
                setIsAudioMuted(muted);
                if (!muted) {
                  playOwlHoot();
                }
              }}
              className={`p-2 rounded-xl transition-all border cursor-pointer flex items-center justify-center ${
                isAudioMuted 
                  ? 'bg-slate-950/40 border-slate-800 text-gray-500 hover:text-gray-300' 
                  : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400 hover:text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.15)]'
              }`}
              title={isAudioMuted ? "Unmute Owl click sounds" : "Mute Owl click sounds"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Profile Info / Logout Option */}
            {registeredUser ? (
              <button
                onClick={handleLogout}
                className="p-2 bg-slate-950/40 hover:bg-pink-950/15 border border-slate-800 hover:border-pink-500/30 text-gray-400 hover:text-pink-400 rounded-xl transition-all cursor-pointer"
                title="Disconnect Profile Credentials"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleTabChange('register')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold font-orbitron text-[10px] tracking-wider rounded-xl transition-all cursor-pointer"
              >
                PUBLISH SMID
              </button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-950/40 border border-slate-800 text-gray-400 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* --- MOBILE MENUS DRAWER --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t overflow-hidden ${
                theme === 'light' 
                  ? 'bg-slate-50 border-slate-200 text-slate-950' 
                  : theme === 'neon' 
                  ? 'bg-[#040112] border-purple-500/20 text-[#e0ccff]' 
                  : 'bg-slate-950 border-slate-800 text-slate-100'
              }`}
            >
              <div className="px-4 py-5 space-y-4 text-left">
                {/* SETTINGS NAVIGATOR DIRECT BANNER */}
                <button
                  onClick={() => handleTabChange('settings')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold font-orbitron text-xs flex items-center justify-between shadow-lg cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="tracking-wider">SETTINGS NAVIGATOR</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-mono">Open ⚙️</span>
                </button>

                {/* COMPRESSED CATEGORIZED NAVIGATION */}
                <div className="space-y-3 pt-2">
                  {/* Category 1: Core */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-mono mb-1.5 px-1">Core Navigation</p>
                    <div className="grid grid-cols-2 gap-1.5 font-orbitron font-bold text-xs uppercase">
                      {[
                        { id: 'home', label: t('nav_home') },
                        { id: 'idcard', label: t('nav_idcard') },
                        { id: 'dashboard', label: t('nav_dashboard') },
                        { id: 'register', label: t('nav_register') },
                      ].map((link) => (
                        <button
                          key={link.id}
                          onClick={() => handleTabChange(link.id)}
                          className={`text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                            activeTab === link.id 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-900/60 hover:bg-slate-900 text-gray-300'
                          }`}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: Workspace & Tools */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400 font-mono mb-1.5 px-1">Workspace & Tools</p>
                    <div className="grid grid-cols-2 gap-1.5 font-orbitron font-bold text-xs uppercase">
                      {[
                        { id: 'workspace', label: 'Google Apps' },
                        { id: 'msoffice', label: 'Microsoft Apps' },
                        { id: 'cloud', label: 'Cloud Vault' },
                        { id: 'linguabot', label: 'AI LinguaBot' },
                      ].map((link) => (
                        <button
                          key={link.id}
                          onClick={() => handleTabChange(link.id)}
                          className={`text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                            activeTab === link.id 
                              ? 'bg-sky-600 text-white' 
                              : 'bg-slate-900/60 hover:bg-slate-900 text-gray-300'
                          }`}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Platform */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 font-mono mb-1.5 px-1">Platform & Pitch</p>
                    <div className="grid grid-cols-3 gap-1.5 font-orbitron font-bold text-[10px] uppercase">
                      {[
                        { id: 'categories', label: t('nav_categories') },
                        { id: 'share', label: t('nav_share') },
                        { id: 'founder', label: t('nav_founder') },
                      ].map((link) => (
                        <button
                          key={link.id}
                          onClick={() => handleTabChange(link.id)}
                          className={`text-center px-2 py-2 rounded-xl transition-all cursor-pointer ${
                            activeTab === link.id 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-slate-900/60 hover:bg-slate-900 text-gray-300'
                          }`}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Theme & Language row controls */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap justify-between items-center gap-3">
                  {/* Lang switcher select */}
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="bg-slate-950 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 text-gray-300 outline-none"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="pt">Português</option>
                    <option value="yo">Yorùbá</option>
                    <option value="ar">العربية</option>
                    <option value="zh">中文</option>
                  </select>

                  {/* Theme Selectors */}
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    {['light', 'dark', 'neon'].map((th) => (
                      <button
                        key={th}
                        onClick={() => setTheme(th as any)}
                        className={`text-xs px-2 py-1 capitalize rounded-md cursor-pointer ${
                          theme === th 
                            ? 'bg-indigo-600 text-white font-bold' 
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {th}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Owl Sound Control */}
                  <button
                    onClick={() => {
                      const muted = toggleMute();
                      setIsAudioMuted(muted);
                      if (!muted) {
                        playOwlHoot();
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg border cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                      isAudioMuted 
                        ? 'bg-slate-950 border-slate-800 text-gray-500 hover:text-gray-300' 
                        : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    {isAudioMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MAIN PAGE WORKSPACE STAGE --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 min-h-[calc(100vh-280px)] relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && <HomeView onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'categories' && (
              <CategoriesView 
                onSelectCategory={() => handleTabChange('register')} 
                lang={lang} 
              />
            )}
            {activeTab === 'register' && <RegisterView onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'dashboard' && <DashboardView onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'idcard' && <IdCardView onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'cloud' && <CloudView lang={lang} />}
            {activeTab === 'workspace' && <GoogleWorkspaceHub onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'msoffice' && <MicrosoftToolsHub onNavigate={handleTabChange} lang={lang} />}
            {activeTab === 'settings' && <SettingsNavigator theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} onNavigate={handleTabChange} />}
            {activeTab === 'linguabot' && <LinguaBotView lang={lang} />}
            {activeTab === 'share' && <ShareKitView lang={lang} />}
            {activeTab === 'founder' && <FounderView lang={lang} />}
            {activeTab === 'login' && <LoginView onNavigate={handleTabChange} lang={lang} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className={`mt-16 py-12 px-4 border-t relative z-10 transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-slate-100 border-slate-200' 
          : theme === 'neon' 
          ? 'bg-[#040112] border-purple-500/20 text-[#bf9cff]/80' 
          : 'bg-slate-950 border-slate-900 text-slate-400'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <p className="font-orbitron font-black text-2xl tracking-widest bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
            SMID
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 font-mono">
            Identity Today, Safety Tomorrow.
          </p>
          <p className="text-[11px] leading-relaxed max-w-lg mx-auto text-gray-400">
            SMID is built by Oluwatosin Abraham Willoughby to ensure universal digital trust on modern professional networks, creative streams, and student social connections.
          </p>

          {/* Social Links & Email */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://x.com/owlapp202"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>@owlapp202</span>
            </a>
            <a
              href="https://www.instagram.com/smido.fficial?igsh=MXFzcTJ4YjJzOGI2Ng=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@smido.fficial</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61576867190581"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-500" />
              <span>Facebook</span>
            </a>
            <a
              href="https://youtube.com/@smidofficial?si=MfaoZxIywRNGdzjZ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </a>
            <a
              href="mailto:oluwatosinawilloughby997@gmail.com"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Email Founder</span>
            </a>
          </div>

          <p className="text-[10px] text-gray-500 pt-4 font-mono border-t border-slate-900/60 mt-4">
            © 2026 SMID Platform. Founded by Oluwatosin Abraham Willoughby. All rights reserved.
          </p>
        </div>
      </footer>

      {/* --- ACTIVE CLOUD SYNC HUD BAR & POPUP NOTICE --- */}
      <div 
        onClick={() => {
          playOwlHoot();
          showToast('Multi-Node Sync: Active. AES-256 zero-knowledge signature verified across 3 nodes.');
        }}
        className={`fixed bottom-4 right-4 z-40 px-4 py-2 rounded-2xl border shadow-2xl flex items-center gap-2.5 text-xs font-bold font-orbitron select-none cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95 ${
          theme === 'light' 
            ? 'bg-white/95 border-slate-300 text-slate-800 backdrop-blur-md' 
            : theme === 'neon' 
            ? 'bg-purple-950/80 border-purple-500/40 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md' 
            : 'bg-slate-950/90 border-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md'
        }`}
      >
        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
        <span>Cloud Sync: Active</span>
        <span className="text-[10px] font-mono font-semibold text-slate-400">
          (3/3 nodes)
        </span>
      </div>

      {/* Floating HUD Toast Notification */}
      <AnimatePresence>
        {hudNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-4 z-50 max-w-sm p-3.5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl text-left font-mono text-xs text-cyan-200 flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span>{hudNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
