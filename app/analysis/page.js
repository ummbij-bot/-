'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * GaitAnalysis Page
 * Simulates real-time gait pattern analysis using mock sensor data.
 */
export default function GaitAnalysis() {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const [stepWidth, setStepWidth] = useState([]);
  const [balance, setBalance] = useState([]);

  // Mock Data Generators
  useEffect(() => {
    const interval = setInterval(() => {
        setStepWidth(prev => [...prev.slice(-19), 50 + Math.random() * 10]); // Keep last 20 points
        setBalance(prev => [...prev.slice(-19), 90 + Math.random() * 10]);
    }, 500);
    
    // Stop "analyzing" phase after 5 seconds
    const timeout = setTimeout(() => {
        setAnalyzing(false);
    }, 5000);

    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="page-content bg-gray-50 min-h-screen">
       <header className="flex items-center gap-4 mb-6 p-4 bg-white shadow-sm sticky top-0 z-10">
           <button onClick={() => router.back()} className="text-2xl">←</button>
           <h1 className="text-xl font-bold">실시간 보행 분석</h1>
       </header>

       <div className="px-4 pb-8 space-y-6">
           {/* 1. Live Camera View (Simulated) */}
           <section className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-black">
                <img 
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Walking Feet" 
                    className="opacity-60 object-cover w-full h-full"
                />
                
                {/* Skeleton Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-2/3 border-4 border-green-400 rounded-lg animate-pulse relative">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 animate-[scan_2s_linear_infinite]"></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/60 text-green-400 px-3 py-1 rounded-full text-xs font-mono">
                            AI TRACKING ACTIVE
                        </div>
                    </div>
                </div>

                {/* Live Metrics Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <div className="flex-1 bg-black/70 backdrop-blur rounded-xl p-3 text-white text-center">
                        <p className="text-xs text-gray-400">평균 속도</p>
                        <p className="text-xl font-bold font-mono">3.2 <span className="text-sm">km/h</span></p>
                    </div>
                    <div className="flex-1 bg-black/70 backdrop-blur rounded-xl p-3 text-white text-center">
                        <p className="text-xs text-gray-400">분당 걸음</p>
                        <p className="text-xl font-bold font-mono">98 <span className="text-sm">spm</span></p>
                    </div>
                </div>
           </section>

           {/* 2. Analysis Graphs */}
           <section className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📉</span> 보행 패턴 그래프
                </h3>
                
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>좌우 균형 (Balance)</span>
                        <span className="text-green-600 font-bold">정상 범위</span>
                    </div>
                    <div className="h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-end overflow-hidden px-1 gap-0.5">
                        {balance.map((val, i) => (
                            <div key={i} className="flex-1 bg-green-400 rounded-t-sm transition-all duration-300" style={{ height: `${val - 80}%` }}></div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>보폭 일정성 (Regularity)</span>
                        <span className="text-gold-600 font-bold">약간 불규칙</span>
                    </div>
                    <div className="h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-end overflow-hidden px-1 gap-0.5">
                        {stepWidth.map((val, i) => (
                            <div key={i} className="flex-1 bg-gold-400 rounded-t-sm transition-all duration-300" style={{ height: `${val - 40}%` }}></div>
                        ))}
                    </div>
                </div>
           </section>

           {/* 3. AI Diagnosis Result */}
           {!analyzing && (
               <section className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5 animate-scale-up">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-full text-3xl shadow-sm">👨‍⚕️</div>
                        <div>
                            <h3 className="font-bold text-green-800 text-lg mb-1">건강한 걸음걸이입니다!</h3>
                            <p className="text-sm text-green-700 leading-relaxed">
                                지난달보다 보폭이 2cm 넓어졌어요. 하체 근력이 좋아지고 있다는 신호입니다. 지금처럼 꾸준히 걸어주세요!
                            </p>
                            <div className="mt-3 flex gap-2">
                                <span className="bg-white text-green-600 text-xs px-2 py-1 rounded border border-green-200">#관절튼튼</span>
                                <span className="bg-white text-green-600 text-xs px-2 py-1 rounded border border-green-200">#낙상위험_낮음</span>
                            </div>
                        </div>
                    </div>
               </section>
           )}
       </div>
    </main>
  );
}
