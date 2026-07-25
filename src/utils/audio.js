// Subtle Web Audio API Synthesizer for Interactive Sound FX

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playTick() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}

export function playWoosh() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

export function playSuccessChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    const startTime = ctx.currentTime + idx * 0.08;
    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.3);
  });
}

// Low-frequency Cinematic Drone Track for Ambient Agency Atmosphere
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientFilter = null;
let ambientGain = null;
let isAmbientPlaying = false;

export function toggleAmbientDrone() {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isAmbientPlaying) {
    stopAmbientDrone();
    return false;
  } else {
    startAmbientDrone();
    return true;
  }
}

export function startAmbientDrone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isAmbientPlaying) return;

  try {
    // Root sub-bass frequency (55Hz = A1 note)
    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = 'sawtooth';
    ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime);

    // Warm detuned fifth (82.4Hz = E2 note)
    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = 'sine';
    ambientOsc2.frequency.setValueAtTime(82.4, ctx.currentTime);

    // Lowpass filter for deep cinematic rumble
    ambientFilter = ctx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.setValueAtTime(180, ctx.currentTime);
    ambientFilter.Q.setValueAtTime(2, ctx.currentTime);

    // Smooth Gain envelope
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    ambientOsc1.connect(ambientFilter);
    ambientOsc2.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
    isAmbientPlaying = true;
  } catch (err) {
    console.error("Ambient audio error:", err);
  }
}

export function stopAmbientDrone() {
  if (!isAmbientPlaying || !ambientGain || !audioCtx) return;

  try {
    ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

    setTimeout(() => {
      try {
        ambientOsc1?.stop();
        ambientOsc2?.stop();
        ambientOsc1?.disconnect();
        ambientOsc2?.disconnect();
      } catch (e) {
        // ignore
      }
      ambientOsc1 = null;
      ambientOsc2 = null;
      ambientFilter = null;
      ambientGain = null;
      isAmbientPlaying = false;
    }, 850);
  } catch (err) {
    isAmbientPlaying = false;
  }
}

export function getIsAmbientPlaying() {
  return isAmbientPlaying;
}
