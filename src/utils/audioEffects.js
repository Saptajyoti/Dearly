/**
 * DEARLY - Micro-Interactions & Audio Effects (Web Audio API)
 * ============================================================
 * Provides delicate, non-intrusive sound effects for tactile delight:
 * gift unboxing, strawberry taps, letter opening, and candle wishes.
 * 100% client-side, zero external audio assets required.
 */

let sharedAudioCtx = null;

const getAudioContext = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!sharedAudioCtx && AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch (e) {
    return null;
  }
};

/**
 * Gentle sparkle chime when opening the surprise gift box
 */
export const playUnwrapSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.08);
    osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
  });
};

/**
 * Cute bubbly chime when tapping the strawberry
 */
export const playBerrySound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
};

/**
 * Gentle paper unseal sound when opening the letter
 */
export const playLetterSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [659.25, 880.0, 1174.66]; // E5, A5, D6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + idx * 0.09 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.09);
    osc.stop(ctx.currentTime + idx * 0.09 + 0.5);
  });
};

/**
 * Celebration chime & puff when blowing out birthday candles
 */
export const playBlowCandleSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Soft breath noise simulation
  const bufferSize = ctx.sampleRate * 0.25;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.03;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.25);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.25);

  // Celebratory ascending chime following the breath
  const chimeNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
  chimeNotes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.18 + i * 0.07);

    chimeGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.18 + i * 0.07);
    chimeGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.18 + i * 0.07 + 0.02);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18 + i * 0.07 + 0.6);

    osc.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    osc.start(ctx.currentTime + 0.18 + i * 0.07);
    osc.stop(ctx.currentTime + 0.18 + i * 0.07 + 0.6);
  });
};

