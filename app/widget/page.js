'use client';

import { useRouter } from 'next/navigation';

/**
 * WidgetPreview Page
 * Shows previews of the home screen widgets.
 */
export default function WidgetPreview() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
       <header className="mb-8 flex items-center gap-4">
           <button onClick={() => router.back()} className="text-2xl">←</button>
           <h1 className="text-2xl font-bold">홈 화면 위젯 미리보기</h1>
       </header>

       <section className="mb-10">
           <h2 className="text-lg font-bold text-gray-500 mb-4">1. 부모님 전용 (시니어용)</h2>
           <div className="bg-wallpaper-home p-8 rounded-3xl shadow-inner relative overflow-hidden" 
                style={{ backgroundColor: '#a8c0ff', backgroundImage: 'linear-gradient(160deg, #a8c0ff 0%, #3f2b96 100%)', minHeight: '300px' }}>
                
                {/* Widget: Family Photo Frame */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-4 w-full max-w-[200px] shadow-2xl mx-auto">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative">
                         <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Granddaughter" className="object-cover w-full h-full" />
                         <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <span className="text-red-500">♥</span> 3
                         </div>
                    </div>
                    <div className="text-center text-white">
                        <p className="font-bold text-shadow">사랑하는 우리 손녀</p>
                        <p className="text-xs opacity-80">1시간 전 업데이트</p>
                    </div>
                </div>

           </div>
       </section>

       <section>
           <h2 className="text-lg font-bold text-gray-500 mb-4">2. 자녀 전용 (보호자용)</h2>
           <div className="bg-wallpaper-home p-8 rounded-3xl shadow-inner relative overflow-hidden" 
                style={{ backgroundColor: '#fbc2eb', backgroundImage: 'linear-gradient(160deg, #fbc2eb 0%, #a6c1ee 100%)', minHeight: '300px' }}>
                
                {/* Widget: Guardian Status */}
                <div className="bg-white rounded-3xl p-5 w-full shadow-xl mx-auto flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gold-100 border-2 border-gold-primary flex items-center justify-center text-2xl">
                        👵
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-gray-800">어머니</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">안심 구역</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                             <span>👣 8,432보</span>
                             <span className="text-gray-300">|</span>
                             <span>🔋 78%</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">마지막 활동: 10분 전 (종묘 공원)</p>
                    </div>
                </div>

           </div>
       </section>
       
       <button onClick={() => alert('위젯 설정 가이드가 전송되었습니다.')} className="btn btn-primary w-full mt-8">
            위젯 설치하기
       </button>
    </main>
  );
}
