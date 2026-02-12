'use client';

import { useState, useEffect } from 'react';

/**
 * ARMemoryLane Component
 * Simulates walking in Tokyo (Bunkyo-ku) using "Street View" style background.
 */
export default function ARMemoryLane({ onClose, steps }) {
  const [sights, setSights] = useState([
    { name: '분쿄구청 전망대', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600', desc: '도쿄의 전경이 한눈에 보이는 곳입니다.' },
    { name: '리쿠기엔 정원', img: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&q=80&w=600', desc: '아름다운 일본의 전통 정원입니다.' },
    { name: '네즈 신사', img: 'https://images.unsplash.com/photo-1583921342674-6f81a798935c?auto=format&fit=crop&q=80&w=600', desc: '붉은 도리이가 줄지어 서 있는 신사입니다.' }
  ]);
  
  const [currentSightIndex, setCurrentSightIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulate walking logic
  useEffect(() => {
    const timer = setInterval(() => {
        setProgress(old => {
            if (old >= 100) {
                // Next sight
                setCurrentSightIndex(prev => (prev + 1) % sights.length);
                return 0;
            }
            return old + 2; // Simulate progress
        });
    }, 100);
    return () => clearInterval(timer);
  }, [sights.length]);

  const sight = sights[currentSightIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col">
       {/* Background (AR View) */}
       <div 
         className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
         style={{ backgroundImage: `url(${sight.img})`, filter: 'brightness(0.7)' }}
       />

       {/* Header Overlay */}
       <div className="relative z-10 p-5 flex justify-between items-start pt-12 bg-gradient-to-b from-black/80 to-transparent">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">LIVE</span>
                <span className="text-sm font-medium text-gray-200">🇯🇵 도쿄 분쿄구 마실 중</span>
            </div>
            <h2 className="text-3xl font-bold">{sight.name}</h2>
          </div>
          <button onClick={onClose} className="bg-white/20 backdrop-blur-md p-2 rounded-full">
            ✕
          </button>
       </div>

       {/* Center Compass/Guide */}
       <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-64 h-64 border-2 border-white/30 rounded-full flex items-center justify-center relative animate-pulse-soft">
             <div className="text-center">
                 <div className="text-5xl mb-2">🚶</div>
                 <p className="text-lg font-bold">다음 명소까지</p>
                 <p className="text-3xl font-black text-mint-300">{100 - progress}m</p>
             </div>
             {/* Progress Ring */}
             <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle 
                    cx="128" cy="128" r="120" 
                    fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" 
                 />
                 <circle 
                    cx="128" cy="128" r="120" 
                    fill="none" stroke="#4ECDC4" strokeWidth="4"
                    strokeDasharray="754"
                    strokeDashoffset={754 - (754 * progress) / 100}
                    className="transition-all duration-500 ease-linear"
                 />
             </svg>
          </div>
       </div>

       {/* Bottom Guide Card */}
       <div className="relative z-10 p-6 pb-12 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex gap-4 items-center">
             <div className="w-12 h-12 rounded-full bg-gold-500 overflow-hidden border-2 border-white">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Grandma" alt="Guide" />
             </div>
             <div className="flex-1">
                 <p className="text-sm text-gold-300 font-bold mb-1">마실 가이드</p>
                 <p className="text-sm leading-relaxed">{sight.desc}</p>
             </div>
          </div>
       </div>
    </div>
  );
}
