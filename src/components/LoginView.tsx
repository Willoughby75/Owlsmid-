import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Mail, User, Sparkles, Key, Check, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (tab: string) => void;
  lang: string;
}

export default function LoginView({ onNavigate, lang }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  
  // Signup State
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Password Strength Calculations
  const [pwStrength, setPwStrength] = useState<number>(0); // 0 to 3
  const [pwLabel, setPwLabel] = useState<string>('Enter a password');

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPwStrength(0);
      setPwLabel('Enter a password');
      return;
    }
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    
    setPwStrength(score);
    if (score === 1) {
      setPwLabel('Weak password');
    } else if (score === 2) {
      setPwLabel('Medium strength');
    } else if (score >= 3) {
      setPwLabel('Strong security lock');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setNotification({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      setNotification({ type: 'error', message: 'Invalid email address.' });
      return;
    }

    // Simulate login by writing profile details to local storage
    const mockUser = {
      category: 'asmid',
      categoryName: 'ASMID (Adult Social Media ID)',
      name: loginForm.email.split('@')[0].toUpperCase(),
      email: loginForm.email,
      dob: '1995-10-12',
      country: 'United Kingdom',
      phone: '+44 7700 900077',
      accessCode: `SMID-LOGN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      connectedPlatforms: ['LinkedIn', 'X / Twitter', 'Discord'],
      faceVerified: true,
      registeredAt: new Date().toLocaleDateString(),
      filesCount: 3
    };

    localStorage.setItem('smid_registered_user', JSON.stringify(mockUser));
    window.dispatchEvent(new Event('storage'));

    setNotification({ type: 'success', message: 'Login authorized successfully! Syncing profile...' });
    
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupForm;
    
    if (!name || !email || !password || !confirmPassword) {
      setNotification({ type: 'error', message: 'All registration parameters are required.' });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotification({ type: 'error', message: 'Invalid email format.' });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (password.length < 8) {
      setNotification({ type: 'error', message: 'Security rule: Password must be at least 8 characters.' });
      return;
    }

    // Write to local storage
    const newUser = {
      category: 'asmid',
      categoryName: 'ASMID (Adult Social Media ID)',
      name: name,
      email: email,
      dob: '2000-01-01',
      country: 'United States',
      phone: '+1 555-0199',
      accessCode: `SMID-NEW-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      connectedPlatforms: [],
      faceVerified: true,
      registeredAt: new Date().toLocaleDateString(),
      filesCount: 1
    };

    localStorage.setItem('smid_registered_user', JSON.stringify(newUser));
    window.dispatchEvent(new Event('storage'));

    setNotification({ type: 'success', message: 'Secure account created successfully! Welcome to SMID.' });
    
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="py-12 relative z-10 max-w-md mx-auto">
      <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-left">
        {/* Subtle glowing element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <motion.div 
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center mb-3"
          >
            <Shield className="w-7 h-7" />
          </motion.div>
          <h2 className="text-3xl font-black font-orbitron tracking-widest text-white uppercase flex justify-center gap-0.5">
            {["S", "M", "I", "D"].map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="ml-2 font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Auth</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Secure Identity Access Panel</p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setNotification(null);
            }}
            className={`flex-1 py-3 text-xs font-bold font-orbitron tracking-wider uppercase transition-all border-b-2 cursor-pointer ${
              activeTab === 'login' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            🔐 Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setNotification(null);
            }}
            className={`flex-1 py-3 text-xs font-bold font-orbitron tracking-wider uppercase transition-all border-b-2 cursor-pointer ${
              activeTab === 'signup' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            🚀 Sign Up
          </button>
        </div>

        {/* Toast Notification HUD */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-xs border flex items-start gap-2.5 leading-relaxed ${
              notification.type === 'success' 
                ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-400'
                : notification.type === 'error'
                ? 'bg-pink-950/25 border-pink-500/30 text-pink-400'
                : 'bg-indigo-950/25 border-indigo-500/30 text-indigo-400'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}

        {/* Login Panel */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secret Key/Password</label>
                <button
                  type="button"
                  onClick={() => setNotification({ type: 'info', message: 'A secure recovery protocol link has been dispatched to your local register node.' })}
                  className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold tracking-wider uppercase cursor-pointer"
                >
                  Forgot Code?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer"
            >
              🔐 Unlock Credentials
            </button>
          </form>
        )}

        {/* Signup Panel */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  placeholder="Your full legal name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="Min. 8 characters"
                  value={signupForm.password}
                  onChange={(e) => {
                    setSignupForm(prev => ({ ...prev, password: e.target.value }));
                    checkPasswordStrength(e.target.value);
                  }}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
              
              {/* Password strength visual meter */}
              {signupForm.password && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1 h-1.5 w-full bg-slate-950 rounded overflow-hidden">
                    <div 
                      className={`h-full rounded-sm transition-all duration-300 ${
                        pwStrength >= 1 ? 'bg-pink-500 w-1/3' : 'w-0'
                      }`}
                    />
                    <div 
                      className={`h-full rounded-sm transition-all duration-300 ${
                        pwStrength >= 2 ? 'bg-amber-400 w-1/3' : 'w-0'
                      }`}
                    />
                    <div 
                      className={`h-full rounded-sm transition-all duration-300 ${
                        pwStrength >= 3 ? 'bg-emerald-400 w-1/3' : 'w-0'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase">
                    <Key className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{pwLabel}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="Repeat secret password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full bg-slate-950 border-2 border-slate-850 focus:border-indigo-500 text-xs rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg cursor-pointer"
            >
              🚀 Create Account
            </button>
          </form>
        )}

        <div className="text-center mt-6 pt-4 border-t border-slate-800 text-[11px] text-gray-400 leading-relaxed">
          Need premium authentication?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-indigo-400 font-bold hover:underline font-orbitron"
          >
            Register SMID Verified Profile
          </button>
        </div>
      </div>
    </div>
  );
}
