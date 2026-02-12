'use client';

import { useState } from 'react';

/**
 * SafeReturn Component
 * Simulates safe navigation guidance.
 */
export default function SafeReturn() {
  const [active, setActive] = useState(false);

  if (!active) {
      return (
          <button 
            onClick={() => setActive(true)}
            className="fixed bottom-24 left-4 z-40 bg-gray-900 text-white p-3 rounded-full shadow-lg flex items-center gap-2 border border-gray-700"
          >
              <span>🔦</span>
              <span className="text-xs font-bold">안심 귀가</span>
          </button>
      );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end">
        {/* Simulated Map Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }}></div>
        
        {/* Safe Path Highlight (Visual Only) */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
                <path d="M100,800 Q150,600 200,400 T300,200" fill="none" stroke="#FFD700" strokeWidth="10" strokeLinecap="round" strokeDasharray="20 10" className="animate-pulse" />
            </svg>
        </div>

        <div className="bg-white rounded-t-3xl p-6 relative z-10 animate-slide-up">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-yellow-500 text-2xl">🔦</span> 안심 귀가 모드
                </h3>
                <button onClick={() => setActive(false)} className="text-gray-400">닫기</button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm text-xl">👮‍♂️</div>
                <div>
                    <p className="font-bold text-gray-800 text-sm">큰 길 우선 안내 중</p>
                    <p className="text-xs text-gray-600">가로등이 밝은 대로변으로 안내합니다.</p>
                </div>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl shadow-lg mb-2">
                보호자에게 위치 전송
            </button>
        </div>
    </div>
  );
}
