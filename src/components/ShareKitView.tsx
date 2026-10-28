import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, Copy, Check, QrCode, Presentation, Users, Code, Heart, 
  Award, ChevronLeft, ChevronRight, Download, ExternalLink, Shield, 
  Lightbulb, TrendingUp, Compass, MessageSquare, Star
} from 'lucide-react';

interface ShareKitViewProps {
  lang: string;
}

export default function ShareKitView({ lang }: ShareKitViewProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  
  // Slide deck state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Determine the current URL to make it shareable
    setShareUrl(window.location.origin + window.location.pathname);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // 1. Copy Decks for pitch sharing
  const investorPitch = `Hello! I wanted to share the SMID (Social Media Identification) Platform, a next-generation identity and digital trust ecosystem I've founded. 

SMID addresses a multi-billion dollar challenge: authentic digital trust. Our platform bridges the gap with a customized, zero-barrier, four-tier identification framework (TSMID for teens, TASMID for students, ASMID for adults, and BSMID for business entities) backed by encrypted cloud verification vaults and biometrics.

Check out the live interactive applet here to see our live camera scanning technology and system:
${shareUrl}

Let me know when you'd like to discuss how we are reshaping digital trust and safety.
— Oluwatosin Abraham Willoughby, Founder & CEO`;

  const developerPitch = `Hi! I wanted to showcase the technical architecture of the SMID Platform.

SMID is built as a highly responsive, server-side secure, and accessible platform. It features:
- Live Front & Back camera-driven cryptographic document scanners.
- Adaptive multi-tier registration pipelines.
- Integrated face mappers using device camera streams.
- Multilingual globalization modules (supporting English, Yorùbá, Français, and more).
- Encrypted cloud verification vaults for document safety.

Take a look at the live compilation, code structure, and live scanner demos here:
${shareUrl}

I'd love to get your feedback on our camera access patterns, API structures, and optimization opportunities!
— Oluwatosin Abraham Willoughby`;

  const familyPitch = `Hey! I'm super excited to share a major project I've been building: the SMID Platform! 

SMID is all about online safety and helping people safely verify who they are on social media. I designed it to protect teens, help students, and make the internet a safer place for everyone. It even features a live face scanner and a camera document scanner!

You can try it out and get your own verified SMID card here:
${shareUrl}

Let me know what you think of my work! I'd love for you to try scanning and registering your custom ID!
With love,
Oluwatosin Abraham Willoughby`;

  // 2. Slide Deck Content
  const slides = [
    {
      title: "SMID Platform",
      subtitle: "Identity Today, Safety Tomorrow",
      tag: "THE VISION",
      icon: <Shield className="w-12 h-12 text-indigo-400" />,
      bullets: [
        "Founded by Oluwatosin Abraham Willoughby to pioneer authentic digital trust.",
        "Solves the lack of reliable, accessible, and secure identification across social systems.",
        "Guarantees a safe, encrypted environment for everyone: teens, students, adults, and brands.",
        "No complex fee structures—completely free to verify and register."
      ],
      highlight: "Universal digital trust without compromising privacy."
    },
    {
      title: "The Problem We Solve",
      subtitle: "Tackling Digital Insecurity and Impersonation",
      tag: "THE CHALLENGE",
      icon: <Lightbulb className="w-12 h-12 text-amber-400" />,
      bullets: [
        "Bots, scam profiles, and fake registrations are diluting commercial trust.",
        "Minors are exposed to dangerous, unverified spaces without structural buffers.",
        "Traditional verifications require uploading highly sensitive ID files directly to unknown public networks.",
        "No flexible, cost-effective identity solutions exist for students and startup business entities."
      ],
      highlight: "Vulnerability breeds danger; SMID restores security."
    },
    {
      title: "The Multi-Tier Solution",
      subtitle: "Custom Tailored Verification Pipelines",
      tag: "THE PRODUCT",
      icon: <Award className="w-12 h-12 text-purple-400" />,
      bullets: [
        "🎮 TSMID: Safe teen verification with zero billing and maximum child-safety guidelines.",
        "🎓 TASMID: High-school and university tier confirming authentic education credentials.",
        "👤 ASMID: Standard adult verified status using international formats.",
        "🏢 BSMID: Enterprise and startup validation with digital storefront support."
      ],
      highlight: "A structured, compliant answer for every age group and brand scale."
    },
    {
      title: "The Cutting-Edge Tech",
      subtitle: "Biometrics and Advanced Cryptographic Cards",
      tag: "THE ENGINE",
      icon: <Code className="w-12 h-12 text-cyan-400" />,
      bullets: [
        "📸 Dual Camera Scanners: Full support for both front and back smartphone cameras to scan any document.",
        "👤 Live Face Mapper: Front camera mapping loop that binds physical biometrics to cryptographic signatures.",
        "🔐 Secure cloud vaulting with custom device signature locks.",
        "📄 Any Document Adaptability: Scan traditional IDs, birth certificates, or municipal papers instantly."
      ],
      highlight: "Designed for standard web views and low-latency mobile browsers."
    },
    {
      title: "The Roadmap & Strategy",
      subtitle: "Disrupting Global Verified Digital Identity",
      tag: "THE FUTURE",
      icon: <TrendingUp className="w-12 h-12 text-emerald-400" />,
      bullets: [
        "Scalable cross-platform API for social networking integrations.",
        "Secure global verification framework across 150+ countries.",
        "Community engagement through localized language nodes (supporting Yorùbá, Arabic, Spanish, etc.).",
        "Empowering thousands of users daily to publish verified SMID credentials."
      ],
      highlight: "Join the revolution of verifiable safety and trusted safety."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="py-12 relative z-10 text-white max-w-5xl mx-auto space-y-12">
      {/* Header Info */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider font-orbitron">
          <Share2 className="w-3.5 h-3.5" />
          <span>SMID Pitch & Share Hub</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-tight">
          Share Your Vision
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Pitch the SMID Platform directly to key stakeholders. We have prepared specialized, copyable communication pitches and an interactive, embedded presentation deck for Investors, Developers, and Family & Friends.
        </p>
      </div>

      {/* Embedded Presentation Pitch Deck */}
      <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl relative">
        {/* Glow overlay */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-4 md:p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <Presentation className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold font-orbitron tracking-wider text-gray-300 uppercase">Interactive Investor Pitch Deck</span>
          </div>
          <div className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
            SLIDE {currentSlide + 1} OF {slides.length}
          </div>
        </div>

        {/* Slide Stage */}
        <div className="p-8 md:p-12 min-h-[380px] flex flex-col justify-between relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/5 border border-indigo-500/25 px-2.5 py-0.5 rounded-full font-mono">
                    {slides[currentSlide].tag}
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black font-orbitron text-white mt-2">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400 font-medium font-orbitron mt-1">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800/60 flex items-center justify-center shrink-0 shadow-lg">
                  {slides[currentSlide].icon}
                </div>
              </div>

              {/* Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {slides[currentSlide].bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-900 hover:border-slate-800/80 transition-all">
                    <span className="text-indigo-400 text-sm mt-0.5">✓</span>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">{bullet}</p>
                  </div>
                ))}
              </div>

              {/* Callout Highlight */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-transparent p-4 rounded-xl border-l-4 border-indigo-500 text-xs md:text-sm font-semibold text-indigo-300">
                "{slides[currentSlide].highlight}"
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-900 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'bg-indigo-500 w-6' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Target Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Investor Pitch Column */}
        <div className="bg-slate-900/30 rounded-3xl p-6 border border-slate-800/80 text-left flex flex-col justify-between hover:border-slate-700/60 transition-all relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-orbitron text-gray-100">For Investors</h3>
              <p className="text-[11px] text-gray-400 font-medium">Elevator pitch emphasizing market size, safety standards, and global growth.</p>
            </div>
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 max-h-56 overflow-y-auto text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed select-all">
              {investorPitch}
            </div>
          </div>
          <button
            onClick={() => handleCopy(investorPitch, 'investor')}
            className="mt-6 w-full py-3 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedText === 'investor' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Pitch Text!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Investor Pitch</span>
              </>
            )}
          </button>
        </div>

        {/* Developer Pitch Column */}
        <div className="bg-slate-900/30 rounded-3xl p-6 border border-slate-800/80 text-left flex flex-col justify-between hover:border-slate-700/60 transition-all relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-orbitron text-gray-100">For Google & Devs</h3>
              <p className="text-[11px] text-gray-400 font-medium">Showcase camera scanners, biometric face mapping, Yorùbá integration, and encryption.</p>
            </div>
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 max-h-56 overflow-y-auto text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed select-all">
              {developerPitch}
            </div>
          </div>
          <button
            onClick={() => handleCopy(developerPitch, 'developer')}
            className="mt-6 w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedText === 'developer' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Pitch Text!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Technical Pitch</span>
              </>
            )}
          </button>
        </div>

        {/* Family & Friends Column */}
        <div className="bg-slate-900/30 rounded-3xl p-6 border border-slate-800/80 text-left flex flex-col justify-between hover:border-slate-700/60 transition-all relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-orbitron text-gray-100">For Family & Friends</h3>
              <p className="text-[11px] text-gray-400 font-medium">A warm, friendly invite to try out your biometric face mapper and customized templates.</p>
            </div>
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 max-h-56 overflow-y-auto text-xs font-mono text-gray-400 whitespace-pre-wrap leading-relaxed select-all">
              {familyPitch}
            </div>
          </div>
          <button
            onClick={() => handleCopy(familyPitch, 'family')}
            className="mt-6 w-full py-3 bg-pink-500/10 hover:bg-pink-500/15 border border-pink-500/30 hover:border-pink-500/50 text-pink-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedText === 'family' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Pitch Text!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Family Pitch</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Copy Shareable URL Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 rounded-3xl p-8 border border-indigo-500/10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-orbitron">Your Custom Live Share Link</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Copy this direct URL to send to anybody. It opens the complete, fully responsive live interactive application on any mobile phone or desktop device.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 max-w-lg mx-auto">
            <input 
              type="text" 
              readOnly 
              value={shareUrl}
              className="bg-transparent text-xs font-mono font-bold text-gray-300 px-3 py-2 flex-1 outline-none text-center sm:text-left select-all"
            />
            <button
              onClick={() => handleCopy(shareUrl, 'url')}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold font-orbitron uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 justify-center"
            >
              {copiedText === 'url' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <a 
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-500 hover:text-indigo-400 transition-all font-mono flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Open in New Tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
