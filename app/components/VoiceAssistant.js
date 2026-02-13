'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useVitality } from '../context/VitalityContext';
import Icon from './Icon';

/**
 * [Phase 3.0] VoiceAssistant (마실이 2.0)
 * 실시간 음성 상호작용 및 능동적 건강 코칭을 담당합니다.
 */
export default function VoiceAssistant() {
  const { steps, triggerVoiceCoach, user } = useVitality();
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  // Web Speech API 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // [Phase 3.0] Active Coaching Logic
  useEffect(() => {
    if (!user) return;
    
    // 예: 목표의 50% 달성 시 능동적 칭찬
    if (steps > 0 && steps === 2000) {
      const utterance = new SpeechSynthesisUtterance("벌써 2천 보나 걸으셨네요! 대단하세요 어르신. 조금만 더 힘내세요!");
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
      setTranscript("활기찬 걸음, 응원합니다! 🎉");
    }
  }, [steps, user]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('듣고 있어요... 👂');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
    }
  };

  const processCommand = (text) => {
    console.log('🗣️ User said:', text);
    if (text.includes('걸음') || text.includes('얼마나')) {
      triggerVoiceCoach('steps');
    } else if (text.includes('안녕') || text.includes('마실')) {
      const utterance = new SpeechSynthesisUtterance("안녕하세요 어르신! 마실이입니다. 오늘 컨디션은 어떠신가요?");
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    } else {
      const utterance = new SpeechSynthesisUtterance(`${text}라고 말씀하셨군요. 아직 학습 중이라 이해하지 못했어요.`);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* 텍스트 말풍선 */}
      {isListening || transcript ? (
        <div className="bg-white p-3 rounded-2xl shadow-xl mb-3 max-w-[200px] border border-blue-100 animate-bounce">
          <p className="text-sm text-gray-700 font-medium">{transcript || '무엇을 도와드릴까요?'}</p>
        </div>
      ) : null}

      {/* 마실이 버튼 */}
      <button
        onClick={startListening}
        className={`p-4 rounded-full shadow-2xl transition-all active:scale-90 ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <div className="text-white relative">
            <Icon name="Mic" size={32} />
            {isListening && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
            )}
        </div>
      </button>

      <style jsx>{`
        .bg-white { transform-origin: bottom right; }
      `}</style>
    </div>
  );
}
