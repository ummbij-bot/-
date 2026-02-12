/**
 * speech.js
 * Utilities for Voice Interface (Text-to-Speech & Speech-to-Text).
 */

export const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("TTS not supported");
    }
  };
  
  export const startListening = (onResult) => {
    // Simple mock for browsers without SpeechRecognition (often requires HTTPS)
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      const mockInput = prompt("음성 인식이 지원되지 않는 환경입니다. 명령어를 텍스트로 입력해주세요:", "내 점수 알려줘");
      if (mockInput) onResult(mockInput);
      return;
    }
  
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
  
    recognition.start();
  };
