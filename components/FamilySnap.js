'use client';

import { useState, useEffect } from 'react';

/**
 * FamilySnap Component
 * Simulates AI Emotion Analysis on a photo.
 */
export default function FamilySnap({ photoUrl, onAnalyzeComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const startAnalysis = () => {
    if (analyzed) return;
    setAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      if (onAnalyzeComplete) onAnalyzeComplete();
    }, 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl w-full aspect-[4/5] bg-gray-100 shadow-md">
      {/* Photo (Background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ 
            backgroundImage: `url(${photoUrl})`,
            transform: analyzed ? 'scale(1.05)' : 'scale(1)'
        }}
        onClick={startAnalysis}
      />

      {/* 1. Initial State: CTA Overlay */}
      {!analyzing && !analyzed && (
        <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
            onClick={startAnalysis}
        >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 animate-bounce">
                <span className="text-3xl">✨</span>
            </div>
            <p className="text-white font-bold text-shadow">AI 표정 분석하기</p>
        </div>
      )}

      {/* 2. Analysis State: Scanning Animation */}
      {analyzing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full h-1 bg-mint-400 shadow-[0_0_15px_#4ECDC4] absolute top-0 animate-scan" />
            <div className="w-20 h-20 rounded-full border-4 border-mint-400 border-t-transparent animate-spin mb-4" />
            <p className="text-white font-bold animate-pulse">표정과 활력을 분석 중...</p>
        </div>
      )}

      {/* 3. Result State: Badges & Message */}
      {analyzed && (
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 animate-slide-up">
            
            {/* Emotion Badges */}
            <div className="flex gap-2 mb-3">
                <div className="badge bg-gold-400/90 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1 px-3 py-1.5 rounded-full">
                    <span>😆</span>
                    <span className="text-sm font-bold">활짝 웃음 92%</span>
                </div>
                <div className="badge bg-mint-400/90 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1 px-3 py-1.5 rounded-full">
                    <span>⚡️</span>
                    <span className="text-sm font-bold">활력 최상</span>
                </div>
            </div>

            {/* AI Message Bubble */}
            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl rounded-bl-sm shadow-xl border border-white/40">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-md">✨ AI 마실이</span>
                    <span className="text-[10px] text-gray-400">방금 전</span>
                </div>
                <p className="text-[15px] text-gray-800 leading-relaxed font-medium" style={{ wordBreak: 'keep-all' }}>
                    "어머! 손녀분이 할머니를 보고 정말 반가워하네요. 
                    지금 <strong className="text-gold-600">영상통화</strong>를 걸어보시면 어떨까요?"
                </p>
                <div className="mt-2 flex gap-2">
                    <button className="flex-1 bg-gold-500 text-white text-xs font-bold py-2 rounded-lg shadow-sm active:scale-95 transition-transform">
                        📞 영상통화 걸기
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-lg active:scale-95 transition-transform">
                        💌 답장하기
                    </button>
                </div>
            </div>
        </div>
      )}

      <style jsx>{`
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .bg-mint-400 { background-color: #4ECDC4; }
        .text-mint-400 { color: #4ECDC4; }
        .border-mint-400 { border-color: #4ECDC4; }
        .bg-gold-400 { background-color: #FF9F4A; }
        .text-gold-600 { color: #E07030; }
        .bg-gold-500 { background-color: #FF8C42; }
        .bg-gold-50 { background-color: #FFF9F2; }

        @keyframes scan {
            0% { top: 0; opacity: 0.8; }
            50% { top: 100%; opacity: 0.8; }
            100% { top: 0; opacity: 0.8; }
        }
        .animate-scan { animation: scan 2s linear infinite; }
      `}</style>
    </div>
  );
}
