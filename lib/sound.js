export const playClickSound = () => {
  if (typeof window === 'undefined') return;
  
  // Simple "Tick" sound using Web Audio API for better performance than loading mp3
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch for clarity
  oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
};
