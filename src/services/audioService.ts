/**
 * Sound synthesis service for telemetry tactile feedback.
 * Operates purely with Web Audio API with zero external dependencies.
 * AudioContext is lazily initialized ONLY on user gesture to avoid browser policy warnings.
 */
class TelemetryAudioService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false; // Default to false for silent professional military presentation

  private ensureCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playNodeSelect();
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playNodeSelect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.ensureCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Graceful fallback if restricted
    }
  }

  public playPhaseTransition() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.ensureCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Fallback
    }
  }

  public playHydrogenBeacon(callback?: () => void) {
    if (!this.soundEnabled) {
      if (callback) callback();
      return;
    }
    try {
      const ctx = this.ensureCtx();
      if (!ctx) {
        if (callback) callback();
        return;
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();

      mod.frequency.setValueAtTime(8, now);
      modGain.gain.setValueAtTime(30, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1420.4, now);
      osc.frequency.exponentialRampToValueAtTime(1420.405, now + 1.0);

      mod.connect(modGain);
      modGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      mod.start(now);
      osc.start(now);

      mod.stop(now + 1.0);
      osc.stop(now + 1.0);

      if (callback) {
        setTimeout(callback, 1000);
      }
    } catch {
      if (callback) callback();
    }
  }
}

export const audioService = new TelemetryAudioService();

