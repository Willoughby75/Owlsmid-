import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Volume2, VolumeX, MessageSquare, Globe, 
  HelpCircle, ChevronRight, RefreshCw, Send, AlertCircle, 
  Sparkles, CheckCircle2, Play, Pause, Headphones, ListFilter,
  Layers, Languages, MessageCircle
} from 'lucide-react';

interface LinguaBotViewProps {
  lang: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  explanation?: string;
  pronunciation?: string;
  audioBase64?: string;
  timestamp: string;
}

export default function LinguaBotView({ lang: currentAppLang }: LinguaBotViewProps) {
  const [inputText, setInputText] = useState('');
  const [inputLang, setInputLang] = useState('Auto-Detect');
  const [targetLang, setTargetLang] = useState('fr'); // Default to French
  const [voiceName, setVoiceName] = useState('Zephyr'); // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
  const [mode, setMode] = useState<'translate' | 'explain' | 'chat'>('translate');
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Playback states
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // message ID or 'primary'
  const [useLocalTTS, setUseLocalTTS] = useState(false); // Toggle between Gemini premium and Local TTS

  // Primary output state for non-chat modes (translate / explain)
  const [analysisResult, setAnalysisResult] = useState<{
    translatedText: string;
    originalExplanation: string;
    pronunciationGuide: string;
    audioBase64?: string;
  } | null>(null);

  // Conversation history for chat mode
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am SMID LinguaBot. Type any phrase, or speak to me in any language, and I will understand, translate, and speak it out loud with proper cultural context.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const activeBufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  const stopAudioPlayback = () => {
    if (activeBufferSourceRef.current) {
      try {
        activeBufferSourceRef.current.stop();
      } catch (e) {}
      activeBufferSourceRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(null);
  };

  // Play Premium Gemini 24kHz raw 16-bit PCM Audio
  const playPremiumPCM = (base64Data: string, id: string) => {
    stopAudioPlayback();
    setIsPlaying(id);

    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const buffer = bytes.buffer;
      const dataView = new DataView(buffer);
      const numSamples = len / 2;
      const sampleRate = 24000; // Gemini TTS default sample rate

      // Initialize or resume AudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate });
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const audioCtx = audioContextRef.current;
      const audioBuffer = audioCtx.createBuffer(1, numSamples, sampleRate);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < numSamples; i++) {
        // Read 16-bit signed integer (little-endian)
        const sample = dataView.getInt16(i * 2, true);
        // Normalize to float range [-1.0, 1.0]
        channelData[i] = sample / 32768;
      }
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      
      source.onended = () => {
        setIsPlaying(null);
      };

      source.start();
      activeBufferSourceRef.current = source;
    } catch (err) {
      console.error("PCM playback failed. falling back to client-side SpeechSynthesis.", err);
      // Fallback
      playLocalTTS(id);
    }
  };

  // Play Browser SpeechSynthesis (Fallback/Local TTS)
  const playLocalTTS = (id: string, textToSpeak?: string) => {
    stopAudioPlayback();
    setIsPlaying(id);

    let text = "";
    if (textToSpeak) {
      text = textToSpeak;
    } else if (id === 'primary' && analysisResult) {
      text = analysisResult.translatedText;
    } else {
      const msg = chatHistory.find(m => m.id === id);
      text = msg ? msg.text : "";
    }

    if (!text) {
      setIsPlaying(null);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to set matching language
      const langMap: Record<string, string> = {
        en: 'en-US',
        fr: 'fr-FR',
        es: 'es-ES',
        pt: 'pt-BR',
        yo: 'en-NG', // approximation
        ar: 'ar-SA',
        zh: 'zh-CN'
      };
      utterance.lang = langMap[targetLang] || 'en-US';

      utterance.onend = () => {
        setIsPlaying(null);
      };
      utterance.onerror = () => {
        setIsPlaying(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported on this browser.");
      setIsPlaying(null);
    }
  };

  const handlePlayVoice = (id: string, base64Audio?: string, text?: string) => {
    if (isPlaying === id) {
      stopAudioPlayback();
      return;
    }

    if (useLocalTTS || !base64Audio) {
      playLocalTTS(id, text);
    } else {
      playPremiumPCM(base64Audio, id);
    }
  };

  const handleProcessText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    stopAudioPlayback();

    const userMessage = inputText;
    setInputText('');

    // If chat mode, push user message first
    let userMsgId = 'user_' + Date.now();
    if (mode === 'chat') {
      setChatHistory(prev => [
        ...prev,
        {
          id: userMsgId,
          sender: 'user',
          text: userMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }

    try {
      const res = await fetch('/api/linguabot/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          inputLang,
          targetLang: getLangLabel(targetLang),
          voiceName,
          mode
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to process message with AI.");
      }

      const data = await res.json();

      if (mode === 'chat') {
        const botMsgId = 'bot_' + Date.now();
        setChatHistory(prev => [
          ...prev,
          {
            id: botMsgId,
            sender: 'bot',
            text: data.translatedText,
            explanation: data.originalExplanation,
            pronunciation: data.pronunciationGuide,
            audioBase64: data.audioBase64,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);

        // Auto-play the voice response
        if (data.audioBase64) {
          setTimeout(() => playPremiumPCM(data.audioBase64, botMsgId), 400);
        } else {
          setTimeout(() => playLocalTTS(botMsgId, data.translatedText), 400);
        }
      } else {
        // Translation or Explanation Result
        setAnalysisResult({
          translatedText: data.translatedText,
          originalExplanation: data.originalExplanation,
          pronunciationGuide: data.pronunciationGuide,
          audioBase64: data.audioBase64,
        });

        // Auto-play voice response
        if (data.audioBase64) {
          setTimeout(() => playPremiumPCM(data.audioBase64, 'primary'), 400);
        } else {
          setTimeout(() => playLocalTTS('primary', data.translatedText), 400);
        }
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your network or API keys.");
    } finally {
      setIsLoading(false);
    }
  };

  const getLangLabel = (code: string) => {
    const map: Record<string, string> = {
      en: 'English',
      fr: 'French',
      es: 'Spanish',
      pt: 'Portuguese',
      yo: 'Yoruba',
      ar: 'Arabic',
      zh: 'Chinese'
    };
    return map[code] || 'English';
  };

  const handleQuickSuggest = (text: string) => {
    setInputText(text);
  };

  const suggestedPhrases = [
    { text: "Safety is our priority, identity is our promise.", label: "Platform Tagline" },
    { text: "My friend is presenting a digital secure portal tomorrow.", label: "Creative Network" },
    { text: "Hello, welcome to our secure network credentials hub.", label: "Greeting Accent" },
    { text: "Good leadership builds transparent institutions.", label: "Executive Trust" }
  ];

  return (
    <div id="linguabot-view-container" className="space-y-8 max-w-5xl mx-auto">
      
      {/* Title Header with Glowing Orb */}
      <div className="relative text-center space-y-3 py-6 bg-slate-900/10 rounded-3xl border border-slate-800/40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold font-orbitron tracking-wider">
          <Sparkles className="w-4 h-4 animate-pulse text-indigo-400" />
          <span>MULTI-LINGUAL KNOWLEDGE ENGINE</span>
        </div>
        
        <h1 className="text-4xl font-extrabold font-orbitron tracking-tight text-white">
          SMID <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">AI LinguaBot</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
          The ultimate digital trust voice companion. Translate, explain, and speak languages with deep semantic understanding and native speaker accents.
        </p>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls & Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-5">
            <h2 className="text-lg font-bold font-orbitron text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Languages className="w-5 h-5 text-indigo-400" />
              <span>Voice Settings</span>
            </h2>

            {/* Mode Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Engine Mode</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                {[
                  { id: 'translate', label: 'Translate', icon: Globe },
                  { id: 'explain', label: 'Understand', icon: Layers },
                  { id: 'chat', label: 'Interactive Chat', icon: MessageSquare }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMode(item.id as any);
                      setError(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all ${
                      mode === item.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/30'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Source & Target languages selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">From</label>
                <select
                  value={inputLang}
                  onChange={(e) => setInputLang(e.target.value)}
                  className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-xl border border-slate-800 text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                >
                  <option value="Auto-Detect">Auto-Detect Language</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Yoruba">Yoruba</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">To Target</label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-xl border border-slate-800 text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                >
                  <option value="en">English (US/UK)</option>
                  <option value="fr">French (France)</option>
                  <option value="es">Spanish (Spain)</option>
                  <option value="pt">Portuguese (Brazil)</option>
                  <option value="yo">Yoruba (Nigeria)</option>
                  <option value="ar">Arabic (Saudi Arabia)</option>
                  <option value="zh">Chinese (Mandarin)</option>
                </select>
              </div>
            </div>

            {/* Premium Voice Settings */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gemini TTS Voice</label>
                <span className="text-[10px] bg-purple-950/40 text-purple-400 font-bold px-2 py-0.5 rounded-full border border-purple-500/20">PREMIUM PCM</span>
              </div>
              <select
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="w-full bg-slate-950 text-xs px-3 py-2.5 rounded-xl border border-slate-800 text-gray-300 focus:border-indigo-500 outline-none"
              >
                <option value="Zephyr">Zephyr (Warm & Dynamic)</option>
                <option value="Kore">Kore (Professional Accent)</option>
                <option value="Fenrir">Fenrir (Deep & Resonant)</option>
                <option value="Puck">Puck (Cheerful & High-Energy)</option>
                <option value="Charon">Charon (Calm & Informative)</option>
              </select>
            </div>

            {/* Output Engine toggle (Local vs Gemini) */}
            <div className="pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Engine Overrides</span>
                  <span className="text-[10px] text-gray-500 block">Use local browser speech synthesiser</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUseLocalTTS(!useLocalTTS)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    useLocalTTS ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                    useLocalTTS ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Suggestions Block */}
          {mode !== 'chat' && (
            <div className="bg-slate-900/20 rounded-2xl border border-slate-800/80 p-5 space-y-3">
              <h3 className="text-xs font-bold font-orbitron text-gray-400 uppercase tracking-wider">Linguistic Sandbox Suggestions</h3>
              <div className="flex flex-col gap-2">
                {suggestedPhrases.map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickSuggest(phrase.text)}
                    className="w-full text-left p-2.5 bg-slate-950/40 hover:bg-indigo-950/10 border border-slate-800/50 hover:border-indigo-500/30 rounded-xl text-xs text-gray-400 hover:text-white transition-all duration-200 flex justify-between items-center"
                  >
                    <span className="truncate pr-4">{phrase.text}</span>
                    <span className="text-[9px] font-bold font-orbitron text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 uppercase shrink-0">{phrase.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interaction Arena */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main workspace container based on Mode */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 min-h-[420px] flex flex-col justify-between">
            
            {/* Upper Content Box */}
            <div className="flex-1 flex flex-col">
              
              {/* Chat View Layout */}
              {mode === 'chat' ? (
                <div className="flex-1 flex flex-col h-[340px] justify-between">
                  <div className="overflow-y-auto max-h-[300px] space-y-4 pr-1 scrollbar-thin">
                    <AnimatePresence initial={false}>
                      {chatHistory.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 shadow-lg ${
                            msg.sender === 'user' 
                              ? 'bg-indigo-600 text-white rounded-tr-none' 
                              : 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-none'
                          }`}>
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                              {msg.sender === 'bot' && (
                                <button
                                  onClick={() => handlePlayVoice(msg.id, msg.audioBase64, msg.text)}
                                  className={`p-2 rounded-xl transition-all ${
                                    isPlaying === msg.id 
                                      ? 'bg-pink-600/20 text-pink-400 border border-pink-500/30' 
                                      : 'bg-slate-900 hover:bg-indigo-950 border border-slate-800 text-gray-300 hover:text-white'
                                  }`}
                                  title="Listen voice out loud"
                                >
                                  {isPlaying === msg.id ? (
                                    <VolumeX className="w-4 h-4 animate-bounce text-pink-400" />
                                  ) : (
                                    <Volume2 className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Additional understanding metadata if from bot */}
                            {msg.sender === 'bot' && (msg.explanation || msg.pronunciation) && (
                              <div className="mt-3 pt-3 border-t border-slate-900 space-y-2.5 text-xs text-gray-400">
                                {msg.pronunciation && (
                                  <div className="bg-indigo-950/15 p-2 rounded-lg border border-indigo-500/10">
                                    <span className="font-bold text-[10px] text-indigo-400 uppercase tracking-widest font-orbitron block mb-0.5">Phonetic Guide</span>
                                    <p className="font-mono text-indigo-200">{msg.pronunciation}</p>
                                  </div>
                                )}
                                {msg.explanation && (
                                  <div className="space-y-1">
                                    <span className="font-bold text-[10px] text-fuchsia-400 uppercase tracking-widest font-orbitron block">Linguistic Insight</span>
                                    <p className="leading-relaxed text-gray-300">{msg.explanation}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            <span className="text-[9px] text-gray-500 block text-right font-mono">{msg.timestamp}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                  </div>
                </div>
              ) : (
                
                // Translate / Explain Standard Views
                <div className="space-y-5 flex-1">
                  <AnimatePresence mode="wait">
                    {analysisResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-4"
                      >
                        {/* Audio Waveform HUD & Voice Playback Card */}
                        <div className="bg-slate-950 border border-indigo-500/20 rounded-2xl p-5 space-y-4 shadow-xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                              <span className="text-xs font-bold font-orbitron text-emerald-400 uppercase tracking-wider">Semantic Analysis Ready</span>
                            </div>
                            <span className="text-[10px] font-bold font-mono text-indigo-400 uppercase bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/10">
                              {getLangLabel(targetLang)} Voice Output
                            </span>
                          </div>

                          <div className="flex items-start gap-4">
                            <button
                              onClick={() => handlePlayVoice('primary', analysisResult.audioBase64)}
                              className={`p-4 rounded-2xl transition-all shadow-lg shrink-0 ${
                                isPlaying === 'primary' 
                                  ? 'bg-pink-600/20 text-pink-400 border border-pink-500/40 shadow-pink-500/5' 
                                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                              }`}
                            >
                              {isPlaying === 'primary' ? (
                                <VolumeX className="w-6 h-6 animate-pulse" />
                              ) : (
                                <Volume2 className="w-6 h-6" />
                              )}
                            </button>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Translation / Result</span>
                              <p className="text-lg font-bold text-white leading-relaxed">{analysisResult.translatedText}</p>
                            </div>
                          </div>

                          {/* Animated Visual EQ bar when audio plays */}
                          {isPlaying === 'primary' && (
                            <div className="flex items-center gap-1.5 h-6 pt-1 px-2">
                              {[...Array(24)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 bg-gradient-to-t from-indigo-500 to-pink-500 rounded-full"
                                  animate={{ height: [4, Math.random() * 20 + 6, 4] }}
                                  transition={{ repeat: Infinity, duration: 0.6 + i * 0.03, ease: 'easeInOut' }}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Phonetic spelling guide */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block font-orbitron">Phonetic Guide</span>
                          <p className="font-mono text-sm text-indigo-200 leading-relaxed">{analysisResult.pronunciationGuide}</p>
                        </div>

                        {/* Semantic Explanation Deep Dive */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4.5 space-y-2">
                          <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-wider block font-orbitron">Linguistic Context & Grammar Breakdown</span>
                          <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{analysisResult.originalExplanation}</p>
                        </div>

                        {/* Refresh Button */}
                        <button
                          onClick={() => setAnalysisResult(null)}
                          className="text-xs text-indigo-400 hover:text-white font-bold font-orbitron uppercase tracking-wider flex items-center gap-1.5 pt-2"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Analyze another phrase</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Bot className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white font-orbitron">Awaiting Credentials Sandbox Input</p>
                          <p className="text-xs text-gray-500 max-w-sm">
                            Choose your target language on the left, type a creative phrase or tag line below, and click Process to hear it spoken out loud.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Error Message banner */}
            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/30 text-pink-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Bottom Form input panel */}
            <form onSubmit={handleProcessText} className="relative pt-4 border-t border-slate-800/80 mt-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 focus-within:border-indigo-500/50 transition-all flex items-center pr-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    mode === 'chat' 
                      ? 'Chat in any language... (e.g. "Comment ça va today?")' 
                      : 'Type text to understand & speak...'
                  }
                  required
                  className="w-full bg-transparent px-4.5 py-4 text-sm text-slate-100 placeholder-gray-500 outline-none"
                />

                <div className="flex items-center gap-1.5">
                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className={`p-3.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                      isLoading || !inputText.trim()
                        ? 'bg-slate-900 text-gray-600 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15'
                    }`}
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
      
    </div>
  );
}
