import { useState, useEffect, useRef } from 'react';
import masilVoice from '../../lib/ai/voiceEngine';
import { useVitality } from '../context/VitalityContext';

const ENCOURAGEMENTS = [
  "잘하고 계세요! 조금만 더 힘내볼까요?",
  "어깨를 펴고, 시선은 정면을 봐주세요.",
  "오늘 산책 어떠신가요? 기분 좋은 산책 되세요!",
  "벌써 이만큼 걸으셨어요. 정말 대단해요!",
  "천천히, 본인의 속도에 맞춰서 걸으세요.",
  "숨을 깊게 들이마시고, 내쉬어 보세요.",
  "건강해지는 소리가 들리나요? 화이팅!",
  "자녀분들이 응원하고 있어요 힘내세요!"
];

export function useVoiceCoach() {
  const { weatherData, steps, user } = useVitality();
  const [isCoaching, setIsCoaching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const intervalRef = useRef(null);

  /**
   * TTS: 말하기
   */
  const speak = (text, onEnd) => {
    masilVoice.speak(text, onEnd);
  };

  /**
   * 상황 인지형 가이드 생성
   */
  const getContextualMessage = () => {
    // 1. 미세먼지 체크
    if (weatherData.fineDustStatus === '나쁨' || weatherData.fineDustStatus === '매우나쁨') {
      return "오늘은 미세먼지가 좋지 않네요. 마스크를 꼭 착용하시고, 너무 장시간 걷지는 마세요.";
    }
    // 2. 온도 체크
    if (weatherData.temp >= 30) {
      return "날씨가 많이 무더워요. 그늘로 이동하시고 시원한 물을 자주 마셔주세요.";
    }
    if (weatherData.temp <= 5) {
      return "날씨가 많이 쌀쌀해졌어요. 옷을 따뜻하게 입으시고 몸이 떨리면 실내로 들어가세요.";
    }
    // 3. 디폴트 응원
    return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  };

  /**
   * STT: 듣기 및 명령어 처리
   */
  const handleCommand = (text) => {
    setTranscript(text);
    
    if (text.includes('정지') || text.includes('그만') || text.includes('종료')) {
      stopCoaching();
    } else if (text.includes('포인트')) {
      speak("현재 보유하신 포인트는 비밀이에요! 농담입니다, 대시보드에서 확인해 보세요.");
    } else if (text.includes('응원')) {
      const randomMsg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
      speak(randomMsg);
    } else {
      speak(`방금 ${text}라고 말씀하셨나요? 제가 더 열심히 배우겠습니다.`);
    }
  };

  const startListening = () => {
    setIsListening(true);
    masilVoice.listen(
      (result) => {
        handleCommand(result);
        setIsListening(false);
      },
      (error) => {
        console.error('STT Error:', error);
        setIsListening(false);
      }
    );
  };

  const startCoaching = () => {
    setIsCoaching(true);
    speak("마실이 음성 코칭을 시작합니다. 궁금한 게 있으면 언제든 말씀해 주세요!", () => {
        // [Phase 6.0] Listen for command after initial greeting
        // startListening(); // Auto-listen placeholder
    });
    
    intervalRef.current = setInterval(() => {
      const message = getContextualMessage();
      speak(message);
    }, 45000); 
  };

  const stopCoaching = () => {
    setIsCoaching(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    masilVoice.stopListening();
    speak("코칭을 종료합니다. 오늘 산책 어떠셨나요? 가족들에게 사진 한 장 보내보세요!");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      masilVoice.stopListening();
    };
  }, []);

  return {
    isCoaching,
    isListening,
    transcript,
    startCoaching,
    stopCoaching,
    startListening,
    speak
  };
}
