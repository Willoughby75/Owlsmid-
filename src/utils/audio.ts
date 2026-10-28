let audioCtx: AudioContext | null = null;
let isMuted = false;

// Pre-warm audio context on user gesture
if (typeof window !== 'undefined') {
  const initAudio = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    window.removeEventListener('pointerdown', initAudio);
    window.removeEventListener('keydown', initAudio);
  };
  window.addEventListener('pointerdown', initAudio, { once: true });
  window.addEventListener('keydown', initAudio, { once: true });
}

/**
 * Play a synthesized cybernetic owl double-hoot using the Web Audio API.
 * Uses custom pitch-bends and low-frequency amplitude modulation to recreate a warm, loud hoot.
 */
export function playOwlHoot() {
  if (isMuted) return;

  try {
    // 1. Lazy initialize or resume the AudioContext
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Helper function to synthesize a single rich "hoot" sound
    const playHootNote = (startTime: number, duration: number, baseFreq: number, peakFreq: number, flutterSpeed: number) => {
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      // Secondary harmonic oscillator for warmth
      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();

      // Vibrato/flutter oscillator to give that authentic bird acoustic texture
      const vibratoOsc = audioCtx.createOscillator();
      const vibratoGain = audioCtx.createGain();

      // Configure vibrato
      vibratoOsc.frequency.setValueAtTime(flutterSpeed, startTime);
      vibratoGain.gain.setValueAtTime(16, startTime); // vibrato depth in Hz

      vibratoOsc.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibratoGain.connect(subOsc.frequency);

      // Primary sine wave for hollow bird-like acoustics
      osc.type = 'sine';
      subOsc.type = 'triangle'; // adds warm acoustic body

      // Pitch Bend: sweep slightly up then smoothly slide down
      osc.frequency.setValueAtTime(baseFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(peakFreq, startTime + duration * 0.25);
      osc.frequency.linearRampToValueAtTime(baseFreq - 20, startTime + duration);

      subOsc.frequency.setValueAtTime(baseFreq * 0.5, startTime);
      subOsc.frequency.exponentialRampToValueAtTime(peakFreq * 0.5, startTime + duration * 0.25);
      subOsc.frequency.linearRampToValueAtTime((baseFreq - 20) * 0.5, startTime + duration);

      // Volume Envelope: clean attack and audible gain
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.55, startTime + 0.03); // loud & clear attack
      gainNode.gain.exponentialRampToValueAtTime(0.25, startTime + duration - 0.05); // sustain release
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration); // absolute zero

      subGain.gain.setValueAtTime(0, startTime);
      subGain.gain.linearRampToValueAtTime(0.20, startTime + 0.03);
      subGain.gain.exponentialRampToValueAtTime(0.05, startTime + duration - 0.05);
      subGain.gain.linearRampToValueAtTime(0, startTime + duration);

      // Routing
      osc.connect(gainNode);
      subOsc.connect(subGain);
      gainNode.connect(audioCtx.destination);
      subGain.connect(audioCtx.destination);

      vibratoOsc.start(startTime);
      vibratoOsc.stop(startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
      subOsc.start(startTime);
      subOsc.stop(startTime + duration);
    };

    // Classic Double-Hoot: "hoo (pause) hoooo"
    // Note 1: Lower, shorter, introductory hoot
    playHootNote(now, 0.18, 280, 310, 11);

    // Note 2: Slightly delayed, longer, higher pitch, with faster acoustic flutter
    playHootNote(now + 0.22, 0.35, 300, 335, 14);

  } catch (error) {
    console.warn("Audio Context failed to synthesize hoot:", error);
  }
}

/**
 * Toggle the global sound setting
 */
export function toggleMute(): boolean {
  isMuted = !isMuted;
  return isMuted;
}

/**
 * Get current mute state
 */
export function getMuteState(): boolean {
  return isMuted;
}
