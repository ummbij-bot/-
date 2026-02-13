/**
 * Masil Voice Engine (Phase 6.0)
 * Handles STT (Speech-to-Text) and TTS (Text-to-Speech) using Web Speech API
 */

class VoiceEngine {
  constructor() {
    this.recognition = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isListening = false;

    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'ko-KR';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  /**
   * TTS: Speak text
   */
  speak(text, onEnd) {
    if (!this.synth) return;
    
    // Stop previous speaking
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9; // Slightly slower for senior users
    utterance.pitch = 1.0;
    
    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synth.speak(utterance);
  }

  /**
   * STT: Start listening
   */
  listen(onResult, onError) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition not supported');
      return;
    }

    if (this.isListening) return;

    this.recognition.onstart = () => {
      this.isListening = true;
      console.log('🎤 Listening...');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('🗣️ User said:', transcript);
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('🎤 Stopped listening');
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.error('Failed to start recognition:', e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }
}

const masilVoice = new VoiceEngine();
export default masilVoice;
