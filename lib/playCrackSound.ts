let audioCtx: AudioContext | null = null;

export function unlockAudio() {
  if (typeof window === "undefined") return;

  if (!audioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    audioCtx = new AudioCtx();
  }

  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
}

export function playCrackSound() {
  try {
    unlockAudio();
    if (!audioCtx) return;

    const ctx = audioCtx;
    const now = ctx.currentTime;
    const duration = 0.22;
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / length;
      const decay = Math.exp(-t * 28);
      const noise = (Math.random() * 2 - 1) * decay;
      const click = Math.sin(i * 0.35) * decay * 0.4;
      data[i] = noise * 0.85 + click;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 500;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    source.connect(highpass);
    highpass.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
    source.stop(now + duration);
  } catch {
    // Audio not available — fail silently
  }
}
