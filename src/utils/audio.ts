/**
 * Procedural Web Audio API sound generator for tactile paper interactions.
 * Generates realistic, crisp, and clearly audible paper rustle, crumple, and fold sounds.
 */

class PaperAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.ensureContext();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext creation not supported in this environment
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Generates a crisp, rich paper rustle / unfold sound effect
   */
  public playUnfold() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 1.1;
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise state variables (Kellet's filter)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const white = Math.random() * 2 - 1;

        // Realistic pink noise calculation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
        b6 = white * 0.115926;

        // Paper crackle spikes (fibers & creases popping open)
        const isCrackle = Math.random() > 0.965;
        const crackle = isCrackle ? (Math.random() * 2 - 1) * 0.9 : 0;

        // Multi-stage envelope: 3 distinct flap release bursts
        const burst1 = Math.exp(-Math.pow((t - 0.18) / 0.1, 2)) * 1.4;
        const burst2 = Math.exp(-Math.pow((t - 0.5) / 0.18, 2)) * 1.8;
        const burst3 = Math.exp(-Math.pow((t - 0.82) / 0.14, 2)) * 1.2;
        const baseRustle = Math.sin((t / duration) * Math.PI) * 0.7;

        // Flutter modulation simulating air friction
        const flutter = 1.0 + 0.3 * Math.sin(t * 36 + Math.sin(t * 80));

        const combinedEnvelope = (burst1 + burst2 + burst3 + baseRustle) * flutter;
        const sample = (pink * 0.75 + crackle * 0.55 + white * 0.2) * combinedEnvelope;

        data[i] = Math.max(-1, Math.min(1, sample * 0.85));
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass filter shaping paper resonance
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1600, now);
      bandpass.frequency.linearRampToValueAtTime(1100, now + duration);
      bandpass.Q.setValueAtTime(1.2, now);

      // Highpass to eliminate mud
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(280, now);

      // Master gain envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.85, now + 0.08);
      gain.gain.linearRampToValueAtTime(0.7, now + 0.6);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      source.connect(bandpass);
      bandpass.connect(highpass);
      highpass.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
    } catch {
      // Audio playback failed gracefully
    }
  }

  /**
   * Generates a rapid, satisfying paper crunch / crumple sound when folding back into a ball
   */
  public playFold() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.65;
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const progress = t / duration;
        const white = Math.random() * 2 - 1;

        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
        b6 = white * 0.115926;

        // Density of crunch impulses increases as the ball compresses
        const crackleThreshold = 0.95 - progress * 0.08;
        const isCrackle = Math.random() > crackleThreshold;
        const crackle = isCrackle ? (Math.random() * 2 - 1) * (1.0 + progress * 0.6) : 0;

        // Rapid crunch envelope with crunch bursts
        const crunchEnvelope = Math.pow(1 - progress, 0.6) * (1 + 0.4 * Math.sin(t * (40 + progress * 80)));
        const sample = (pink * 0.6 + crackle * 0.75 + white * 0.25) * crunchEnvelope;

        data[i] = Math.max(-1, Math.min(1, sample * 0.9));
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Filter sweeps upwards from loose paper to dense compact ball
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(2200, now + duration);
      filter.Q.setValueAtTime(1.4, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.9, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
    } catch {
      // Audio playback failed gracefully
    }
  }

  /**
   * Subtle paper tap / click
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.06;
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const white = Math.random() * 2 - 1;
        const env = Math.exp(-t * 90);
        data[i] = white * env * 0.45;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
    } catch {
      // Audio playback failed gracefully
    }
  }
}

export const paperAudio = new PaperAudioEngine();
