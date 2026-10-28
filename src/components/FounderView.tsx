import { motion } from 'motion/react';
import { Shield, Lock, Award, Heart, Mail, Linkedin, Twitter, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react';
import founderAvatar from '../assets/images/founder_avatar_raw_1786408465350.jpg';

interface FounderViewProps {
  lang: string;
}

export default function FounderView({ lang }: FounderViewProps) {
  const mission = [
    {
      icon: '🔒',
      title: 'Secure Identity',
      desc: 'Provide military-grade encryption and biometric verification to ensure every digital identity is protected against fraud and impersonation.'
    },
    {
      icon: '🛡️',
      title: 'Online Safety',
      desc: 'Create a safer internet by enabling verified interactions across all social platforms, reducing scams and fake accounts.'
    },
    {
      icon: '🌍',
      title: 'Global Access',
      desc: 'Make verified identity accessible to everyone — teens, students, adults, and businesses — across 150+ countries.'
    },
    {
      icon: '🤝',
      title: 'Trust Building',
      desc: 'Empower users to build genuine connections and credibility through visible trust scores and verified badges.'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Concept Born',
      desc: 'Oluwatosin identified the critical need for verified social media identity after witnessing growing cases of online impersonation and fraud.'
    },
    {
      year: '2025',
      title: 'SMID Platform Founded',
      desc: 'The SMID platform was officially founded with a mission to create a universal digital identity verification system for social media.'
    },
    {
      year: '2025',
      title: 'Four-Tier System Launched',
      desc: 'TSMID, TASMID, ASMID, and BSMID categories were introduced to serve teens, students, adults, and businesses respectively.'
    },
    {
      year: '2026',
      title: 'Global Expansion',
      desc: 'SMID expanded to support 150+ countries with multi-language support, biometric verification, and AI-powered assistance.'
    }
  ];

  return (
    <div className="py-12 relative z-10 text-white max-w-4xl mx-auto">
      {/* Founder Hero */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-slate-900/30 rounded-3xl p-8 border border-slate-800/80">
        {/* Avatar Area - Original Authentic Unedited Photo Frame */}
        <div className="w-60 sm:w-72 aspect-[9/16] rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shrink-0 shadow-2xl shadow-indigo-500/20 overflow-hidden relative group">
          <img 
            src={founderAvatar} 
            alt="Oluwatosin Abraham Willoughby original portrait" 
            className="w-full h-full rounded-[22px] object-contain bg-slate-950"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Info Area */}
        <div className="text-left flex-1">
          <h2 className="text-3xl font-black font-orbitron mb-1 tracking-tight">Oluwatosin Abraham Willoughby</h2>
          <p className="text-indigo-400 font-bold font-orbitron tracking-wider text-xs uppercase mb-4">Founder & CEO — SMID Platform</p>
          
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-sans">
            <p>
              Oluwatosin Abraham Willoughby is the visionary founder of the SMID (Social Media Identification) Platform, a groundbreaking system designed to provide verified digital identity for individuals and businesses across all social media platforms.
            </p>
            <p>
              With a deep passion for online safety, digital trust, and identity verification, Oluwatosin created SMID to address the growing challenges of impersonation, fraud, and identity theft in the digital age. The platform offers four tailored verification tiers — TSMID for teens, TASMID for students, ASMID for adults, and BSMID for businesses — each designed to protect users while building trust across social networks.
            </p>
            <p className="italic text-gray-400 font-medium">
              "Identity Today, Safety Tomorrow" — this founding principle drives every feature of the SMID ecosystem, from biometric face scanning to AI-powered verification assistants.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="https://x.com/owlapp202"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-200 transition-all cursor-pointer hover:border-sky-500/50"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-400" /> X / Twitter (@owlapp202)
            </a>
            <a
              href="https://www.instagram.com/smido.fficial?igsh=MXFzcTJ4YjJzOGI2Ng=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-200 transition-all cursor-pointer hover:border-pink-500/50"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram (@smido.fficial)
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61576867190581"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-200 transition-all cursor-pointer hover:border-blue-500/50"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-500" /> Facebook
            </a>
            <a
              href="https://youtube.com/@smidofficial?si=MfaoZxIywRNGdzjZ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 text-gray-200 transition-all cursor-pointer hover:border-red-500/50"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube (@smidofficial)
            </a>
            <a
              href="mailto:oluwatosinawilloughby997@gmail.com"
              className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 text-indigo-300 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email Founder
            </a>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold font-orbitron text-center mb-10 tracking-wider">Our Core Mission</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mission.map((ms) => (
            <div key={ms.title} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700/60 transition-all text-left flex gap-5">
              <span className="text-3xl select-none shrink-0">{ms.icon}</span>
              <div>
                <h4 className="text-base font-bold font-orbitron text-gray-100 mb-1.5">{ms.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Journey */}
      <div>
        <h3 className="text-3xl font-bold font-orbitron text-center mb-12 tracking-wider">Our Platform Journey</h3>
        <div className="relative border-l-2 border-indigo-500/30 pl-8 ml-4 md:ml-12 space-y-12 text-left">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-4 border-indigo-500 group-hover:border-pink-500 transition-all z-10" />

              <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 group-hover:border-slate-700/60 transition-all">
                <span className="inline-block px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold font-orbitron mb-2">
                  {item.year}
                </span>
                <h4 className="text-base font-bold text-gray-100 font-orbitron">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
