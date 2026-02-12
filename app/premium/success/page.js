'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PremiumSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Celebrate!
    const timer = setTimeout(() => {
        router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen bg-black flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
        {/* Confetti Effect (CSS only for MVP) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute text-2xl animate-[fall_3s_infinite]" style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random()}s`
                }}>🎉</div>
            ))}
        </div>

        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gold-400 to-yellow-200 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,215,0,0.6)] animate-bounce">
            <span className="text-4xl">👑</span>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-2">Welcome to<br/><span className="text-gold-400">PREMIUM</span></h1>
        
        <p className="text-gray-400 mb-8">
            이제 '활력 패스'의 모든 기능을<br/>제한 없이 이용하실 수 있습니다.
        </p>

        <div className="bg-gray-800 rounded-xl p-4 w-full max-w-xs border border-gray-700">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>결제 금액</span>
                <span className="text-white font-bold">9,900원</span>
            </div>
            <div className="flex justify-between text-sm text-gray-300">
                <span>다음 결제일</span>
                <span className="text-white font-bold">2026. 03. 11</span>
            </div>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
            잠시 후 홈으로 이동합니다...
        </div>
    </main>
  );
}
