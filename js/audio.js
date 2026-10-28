/**
 * Romantic Audio Engine & Sound Synthesizer
 * 
 * Powered by Web Audio API for 100% offline, zero-dependency romantic ambient music.
 * Also supports optional custom MP3 (`assets/audio/our-song.mp3`).
 */

import { ROMANTIC_CONFIG } from './data.js';

export class RomanticAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.customAudio = null;
    this.timerId = null;
    this.volume = 0.35;
    this.masterGain = null;
    
    // Check if custom audio is enabled by user
    this.hasCustomAudio = false;
    if (ROMANTIC_CONFIG.useCustomSong) {
      this.setupCustomAudio();
    }
  }

  setupCustomAudio() {
    const audio = new Audio('assets/audio/our-song.mp3');
    audio.loop = true;
    audio.volume = this.volume;
    
    // Check if audio file actually exists
    audio.addEventListener('canplaythrough', () => {
      this.hasCustomAudio = true;
      this.customAudio = audio;
    });
    audio.addEventListener('error', () => {
      this.hasCustomAudio = false;
      this.customAudio = null;
    });
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    this.initContext();
    this.isPlaying = true;

    if (this.hasCustomAudio && this.customAudio) {
      this.customAudio.play().catch(() => {
        // Fallback to ambient synth
        this.startAmbientSynth();
      });
    } else {
      this.startAmbientSynth();
    }

    document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { isPlaying: true } }));
  }

  stop() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    document.dispatchEvent(new CustomEvent('musicStateChange', { detail: { isPlaying: false } }));
  }

  /**
   * Generates a dreamy, slow romantic lullaby/music-box arpeggio progression.
   * Chords: Fmaj7 -> Am7 -> Dm7 -> Bbmaj7
   */
  startAmbientSynth() {
    if (!this.audioCtx) return;

    // Frequencies (Hz) for notes
    const notes = {
      F3: 174.61, A3: 220.00, C4: 261.63, E4: 329.63,
      G4: 392.00, A4: 440.00, C5: 523.25, D5: 587.33,
      E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
    };

    // 4 beautiful romantic chord arpeggios
    const progressions = [
      // Fmaj7
      [notes.F3, notes.C4, notes.E4, notes.A4, notes.C5, notes.E5],
      // Am7
      [notes.A3, notes.C4, notes.E4, notes.G4, notes.C5, notes.E5],
      // Dm7
      [notes.F3, notes.A3, notes.D5, notes.F5, notes.A4, notes.D5],
      // Bbmaj7
      [notes.F3, notes.A3, notes.D5, notes.F5, notes.A5, notes.F5]
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const currentChord = progressions[chordIdx];
      const freq = currentChord[noteIdx];

      this.playPluck(freq, 2.2);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % progressions.length;
      }
    };

    // Play note every 850ms for a slow, peaceful music-box effect
    playNextNote();
    this.timerId = setInterval(playNextNote, 850);
  }

  /**
   * Plays a delicate warm bell/harp note with soft harmonic resonance
   */
  playPluck(freq, duration = 2.0) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    // Main tone (gentle sine wave)
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm subtle overtone for bell/music-box warmth
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = this.audioCtx.createGain();
    overtoneGain.gain.setValueAtTime(0.12, now);
    osc2.connect(overtoneGain);
    overtoneGain.connect(noteGain);

    // Envelope: quick gentle attack, long warm exponential decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  /**
   * Play sweet chime for envelope opening or interaction
   */
  playChime() {
    this.initContext();
    if (!this.audioCtx) return;

    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chimeFreqs.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      }, i * 90);
    });
  }

  /**
   * Play soft click/pop for UI taps
   */
  playPop() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      // Ignore if audio context not unlocked yet
    }
  }

  /**
   * Play a cute cartoon rubber bonk sound (synthesized hollow woodblock / pitch drop)
   */
  playCartoonBonk() {
    this.initContext();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Rubber bonk: quick frequency drop from 460Hz down to 110Hz
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);

      // Hollow wooden slap harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(260, now);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.15);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.23);
      osc2.stop(now + 0.23);
    } catch (e) {
      // Ignore if audio context not unlocked yet
    }
  }
}

// Global audio instance
export const romanticAudio = new RomanticAudioEngine();
if (typeof window !== 'undefined') {
  window.romanticAudio = romanticAudio;
}
