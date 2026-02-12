import { useState, useEffect, useRef } from 'react';

const ENCOURAGEMENTS = [
  "잘하고 계세요! 조금만 더 힘내볼까요?",
  "어깨를 펴고, 시선은 정면을 봐주세요.",
  "오늘 날씨가 참 좋네요. 기분 좋은 산책 되세요!",
  "벌써 이만큼 걸으셨어요. 정말 대단해요!",
  "천천히, 본인의 속도에 맞춰서 걸으세요.",
  "숨을 깊게 들이마시고, 내쉬어 보세요.",
  "건강해지는 소리가 들리나요? 화이팅!",
  "자녀분들이 응원하고 있어요 힘내세요!"
];

export function useVoiceCoach() {
  const [isCoaching, setIsCoaching] = useState(false);
  const intervalRef = useRef(null);

  // Initialize TTS
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // Korean
    utterance.rate = 0.9; // Slightly slower for seniors
    utterance.pitch = 1.0;
    
    // Cancel previous speech to avoid queue buildup
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startCoaching = () => {
    setIsCoaching(true);
    speak("산책 코칭을 시작합니다. 즐거운 산책 되세요!");
    
    // Speak a random message every 45 seconds
    intervalRef.current = setInterval(() => {
      const randomMsg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
      speak(randomMsg);
    }, 45000); 
  };

  const stopCoaching = () => {
    setIsCoaching(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    speak("산책 코칭을 종료합니다. 수고하셨습니다!");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    isCoaching,
    startCoaching,
    stopCoaching,
    speak
  };
}
