'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../../context/VitalityContext';
import { toast } from 'react-hot-toast';

export default function PremiumSuccessPage() {
  const { user, isPremium, t } = useVitality();
  const router = useRouter();

  useEffect(() => {
    // In a real app, we would update the user's premium status in Firestore here
    // For now, we simulate the excitement
    const timer = setTimeout(() => {
      router.push('/family/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container bg-white min-h-screen flex items-center justify-center">
      <div className="content-wrapper text-center">
        <div className="mb-10 relative inline-block">
          <div className="text-8xl animate-bounce">💎</div>
          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-black p-2 rounded-full shadow-lg animate-pulse">
            ELITE
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
          환영합니다!<br/>골든워크 엘리트 멤버
        </h1>
        
        <p className="text-gray-500 font-medium mb-12 leading-relaxed">
          Ummbi-nim, 이제 모든 프리미엄 혜택을 누리실 수 있습니다.<br/>
          가족과 함께 더 건강한 일상을 만들어보세요.
        </p>

        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10 shadow-inner">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-6">활성화된 프리미엄 기능</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-3xl shadow-sm">
                 <div className="text-2xl mb-1">📈</div>
                 <div className="text-[10px] font-black text-gray-800">정밀 분석</div>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm">
                 <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
                 <div className="text-[10px] font-black text-gray-800">가족 무제한</div>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm">
                 <div className="text-2xl mb-1">🌍</div>
                 <div className="text-[10px] font-black text-gray-800">글로벌 맵</div>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm">
                 <div className="text-2xl mb-1">🚑</div>
                 <div className="text-[10px] font-black text-gray-800">응급 벨</div>
              </div>
           </div>
        </div>

        <button 
          onClick={() => router.push('/family/dashboard')}
          className="w-full py-5 bg-primary text-white rounded-3xl text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          시작하기
        </button>
        <p className="mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
          잠시 후 대시보드로 자동 이동합니다...
        </p>
      </div>
    </div>
  );
}
