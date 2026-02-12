'use client';

import { useState, useEffect } from 'react';
import { speak } from '../lib/voice/speech'; // Assuming this lib exists from previous context

/**
 * MasilVoice (Masil-i 2.0)
 * AI Voice Companion with Persona (Granddaughter/Doctor)
 */
export default function MasilVoice({ steps, userName = '어르신' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [persona, setPersona] = useState('granddaughter'); // 'granddaughter' or 'doctor'

  // Context-aware greetings
  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour < 11) timeGreeting = '상쾌한 아침이에요';
    else if (hour < 17) timeGreeting = '나른한 오후네요';
    else timeGreeting = '편안한 저녁 되세요';

    const encouragement = steps > 5000 
        ? '벌써 5,000보나 걸으셨네요! 정말 대단하세요 🏃‍♂️' 
        : '오늘도 가볍게 마실 한번 다녀오실까요? ⛅️';

    // Initial message construction
    setMessage(`${timeGreeting}, ${userName}! ${encouragement}`);
  }, [steps, userName]);

  const handleSpeak = () => {
    setIsSpeaking(true);
    // Simulate API delay or processing
    speak(message);
    setTimeout(() => setIsSpeaking(false), 3000); // Simple timeout for demo
  };

  const togglePersona = () => {
    const newPersona = persona === 'granddaughter' ? 'doctor' : 'granddaughter';
    setPersona(newPersona);
    if (newPersona === 'granddaughter') {
        setMessage(`할머니! 저 왔어요~ 오늘 날씨 진짜 좋죠? 같이 걸어요!`);
    } else {
        setMessage(`안녕하십니까, 주치의입니다. 오늘 관절 상태는 어떠신가요? 무리하지 마시고 천천히 걸으십시오.`);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
            onClick={() => setIsOpen(true)}
            className="fixed z-50 rounded-full shadow-gold animate-float"
            style={{ 
                bottom: '100px', right: '20px', 
                width: '64px', height: '64px', 
                background: 'var(--grad-gold-rich)', 
                border: '4px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px'
            }}
        >
            👩‍⚕️
        </button>
      )}

      {/* Expanded Voice Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div 
                className="w-full max-w-[430px] bg-white rounded-t-[32px] p-6 shadow-2xl animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-100 flex-center text-2xl border-2 border-gold-300">
                           {persona === 'granddaughter' ? '👧' : '👨‍⚕️'}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                {persona === 'granddaughter' ? 'AI 손녀 마실이' : 'AI 마실 주치의'}
                            </h3>
                            <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-mint-500 animate-pulse' : 'bg-green-500'}`} />
                                <span className="text-xs text-gray-500">대화 가능</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 p-2">✕</button>
                </div>

                {/* Message Bubble */}
                <div className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-100 shadow-inner relative">
                    <p className="text-lg text-gray-800 leading-relaxed font-medium">
                        "{message}"
                    </p>
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 bg-gold-500 rounded-full animate-ping opacity-75" />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                        onClick={handleSpeak}
                        className={`btn btn-lg flex-center gap-2 ${isSpeaking ? 'bg-mint-100 text-mint-700 border-mint-200' : 'btn-primary'}`}
                        style={{ height: '56px', borderRadius: '20px' }}
                    >
                        {isSpeaking ? '🔊 말하는 중...' : '🗣️ 대화하기'}
                    </button>
                    <button 
                        onClick={togglePersona}
                        className="btn btn-secondary btn-lg"
                        style={{ height: '56px', borderRadius: '20px', fontSize: '15px' }}
                    >
                        🔄 {persona === 'granddaughter' ? '주치의 모드' : '손녀 모드'}
                    </button>
                </div>

                 <p className="text-center text-xs text-gray-400">
                    "오늘 날씨 어때?"라고 물어보세요
                </p>
            </div>
        </div>
      )}
    </>
  );
}
