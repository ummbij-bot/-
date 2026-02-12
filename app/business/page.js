'use client';

import { useRouter } from 'next/navigation';

export default function BusinessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
       <header className="flex justify-between items-center p-6 border-b border-gray-800">
           <h1 className="text-xl font-bold bg-gradient-to-r from-gold-400 to-yellow-200 bg-clip-text text-transparent">
               GoldenWalk Data Lab
           </h1>
           <button onClick={() => router.back()} className="text-gray-400 hover:text-white">✕ 닫기</button>
       </header>

       <div className="max-w-4xl mx-auto p-8">
           <div className="text-center mb-16">
               <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 inline-block">
                   B2B SOLUTION
               </span>
               <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                   도시를 걷는 <br/>
                   <span className="text-gold-400">데이터가 되다</span>
               </h2>
               <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                   골든워커들이 수집한 휠체어/유모차 이동 가능 경로 데이터.
                   <br/>스마트 시티 설계를 위한 가장 정밀한 보행 데이터를 제공합니다.
               </p>
           </div>

           {/* Heatmap Visualization */}
           <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 aspect-[16/9] mb-12 group">
               <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Satellite_view_of_the_Earth.jpg" 
                   alt="Map Data" 
                   className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
               
               {/* Data Points Simulation */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 flex items-center justify-center">
                   <div className="w-full h-full relative">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i}
                                className="absolute w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_10px_2px_rgba(255,215,0,0.6)] animate-pulse"
                                style={{ 
                                    top: `${Math.random() * 100}%`, 
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            ></div>
                        ))}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                             <path d="M50,200 Q150,50 300,100 T500,200" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                        </svg>
                   </div>
               </div>

               <div className="absolute bottom-6 left-6">
                   <p className="text-xs text-gold-400 font-mono mb-1">● ACCESSIBLE ROUTE DATA</p>
                   <h3 className="text-2xl font-bold">Jongno-gu, Seoul</h3>
               </div>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gold-500/30 transition-colors">
                   <h4 className="font-bold text-lg mb-2">Barrier-Free Map</h4>
                   <p className="text-sm text-gray-400">보행 약자를 위한 최적 경로 안내 데이터 API</p>
               </div>
               <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gold-500/30 transition-colors">
                   <h4 className="font-bold text-lg mb-2">Foot Traffic Heatmap</h4>
                   <p className="text-sm text-gray-400">시간대별 유동 인구 및 상권 분석 데이터</p>
               </div>
               <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gold-500/30 transition-colors">
                   <h4 className="font-bold text-lg mb-2">Safety Hazard Index</h4>
                   <p className="text-sm text-gray-400">낙상 사고 다발 구역 및 위험물 데이터</p>
               </div>
           </div>

           <div className="mt-16 text-center">
               <button className="bg-gold-500 hover:bg-gold-600 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform transition active:scale-95">
                   제휴 및 데이터 구매 문의
               </button>
           </div>
       </div>
    </main>
  );
}
