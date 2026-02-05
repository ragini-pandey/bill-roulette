export type SoundType = "click" | "lose";

export const playSound = (type: SoundType) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    if (type === "lose") {
      playYaySound(audioCtx);
    } else {
      playClickSound(audioCtx);
    }
  } catch {
    // Ignore audio errors
  }
};

const playYaySound = (audioCtx: AudioContext) => {
  const playYayBurst = (startTime: number, baseFreq: number, duration: number) => {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseGain = audioCtx.createGain();
    noiseSource.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 1.5;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.type = "triangle";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime + startTime);
    osc2.frequency.setValueAtTime(baseFreq * 1.5, audioCtx.currentTime + startTime);

    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, audioCtx.currentTime + startTime + duration);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2, audioCtx.currentTime + startTime + duration);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + startTime + duration);

    noiseGain.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
    noiseGain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + startTime + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + startTime + duration);

    osc1.start(audioCtx.currentTime + startTime);
    osc2.start(audioCtx.currentTime + startTime);
    noiseSource.start(audioCtx.currentTime + startTime);
    osc1.stop(audioCtx.currentTime + startTime + duration + 0.01);
    osc2.stop(audioCtx.currentTime + startTime + duration + 0.01);
    noiseSource.stop(audioCtx.currentTime + startTime + duration + 0.01);
  };

  playYayBurst(0, 400, 0.15);
  playYayBurst(0.12, 500, 0.12);
  playYayBurst(0.22, 600, 0.2);
};

const playClickSound = (audioCtx: AudioContext) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
};

export const getRandomMessage = <T>(messages: readonly T[]): T => {
  return messages[Math.floor(Math.random() * messages.length)];
};
