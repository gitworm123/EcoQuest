// EcoQuest - Web Audio API Sound Effects Synthesizer
window.EcoQuestUtils = window.EcoQuestUtils || {};

(function() {
  let audioCtx = null;
  let isSoundEnabled = true;

  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(gainVal, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      console.warn("Audio playback not supported", e);
    }
  }

  window.EcoQuestUtils.audio = {
    setSoundEnabled(enabled) {
      isSoundEnabled = enabled;
    },
    isSoundEnabled() {
      return isSoundEnabled;
    },
    playClick() {
      playTone(480, 'sine', 0.05, 0.05);
    },
    playCorrect() {
      // Pleasant bright ascending two-tone green chime
      playTone(523.25, 'sine', 0.12, 0.12, 0);      // C5
      playTone(659.25, 'sine', 0.12, 0.12, 0.08);   // E5
      playTone(783.99, 'sine', 0.2, 0.12, 0.16);    // G5
    },
    playWrong() {
      // Gentle warning chord
      playTone(280, 'triangle', 0.18, 0.1, 0);
      playTone(220, 'triangle', 0.25, 0.08, 0.1);
    },
    playXP() {
      // Shimmering points chime
      playTone(659.25, 'sine', 0.1, 0.08, 0);
      playTone(880.00, 'sine', 0.15, 0.09, 0.07);
      playTone(1046.50, 'sine', 0.22, 0.1, 0.14);
    },
    playLevelUp() {
      // Grand celebratory fanfare
      playTone(440, 'triangle', 0.15, 0.15, 0);
      playTone(554.37, 'triangle', 0.15, 0.15, 0.12);
      playTone(659.25, 'triangle', 0.2, 0.15, 0.24);
      playTone(880, 'triangle', 0.4, 0.18, 0.36);
    },
    playBadge() {
      // Magical achievement twinkle
      playTone(587.33, 'sine', 0.12, 0.12, 0);
      playTone(739.99, 'sine', 0.12, 0.12, 0.1);
      playTone(880.00, 'sine', 0.15, 0.12, 0.2);
      playTone(1174.66, 'sine', 0.35, 0.15, 0.3);
    }
  };
})();
