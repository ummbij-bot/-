'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentModal from '../../components/PaymentModal';

export default function PremiumPage() {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);

  const benefits = [
    { icon: '👩‍⚕️', title: '24시간 전문 의료 상담', desc: '언제든지 간호사/의사와 상담 가능' },
    { icon: '📊', title: '정밀 건강 리포트', desc: '의학적 분석이 포함된 월간 리포트' },
    { icon: '🚑', title: '병원 안심 동행', desc: '병원 방문 시 매니저 동행 (월 1회)' },
    { icon: '👨‍👩‍👧‍👦', title: '온가족 안심 알림', desc: '부모님 위급 상황 시 전 가족 알림' },
  ];

  return (
    <main className="page-content bg-gradient-to-b from-mint-50 to-white min-h-screen">
      <header className="mb-lg pt-4">
        <button onClick={() => router.back()} className="text-2xl mb-4 text-gray-500">←</button>
        <span className="badge badge-mint mb-2">Premium Care</span>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">
          부모님 건강,<br/>
          <span className="text-mint-600">골든워크 프리미엄</span>으로<br/>
          더 확실하게 지켜드리세요.
        </h1>
      </header>

      {/* Hero Image */}
      <div className="mb-8 w-full h-48 rounded-2xl overflow-hidden shadow-lg relative">
        <img 
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80" 
            alt="Doctor caring for senior" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white font-bold text-lg">"자녀가 곁에 있는 것처럼"</p>
        </div>
      </div>

      {/* Benefits Grid */}
      <section className="grid grid-cols-1 gap-4 mb-10 text-left">
        {benefits.map((b, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="text-3xl bg-mint-50 p-2 rounded-full">{b.icon}</div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-500">{b.desc}</p>
                </div>
            </div>
        ))}
      </section>

      {/* Pricing Card */}
      <section className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl text-center mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">BEST CHOICE</div>
        
        <h2 className="text-xl font-bold mb-2">월간 프리미엄 구독</h2>
        <div className="text-4xl font-black mb-1 text-mint-400">4,900원<span className="text-lg font-normal text-gray-400">/월</span></div>
        <p className="text-gray-400 text-sm mb-6">커피 한 잔 값으로 효도하세요.</p>
        
        <button 
            onClick={() => setShowPayment(true)}
            className="w-full bg-mint-500 hover:bg-mint-400 text-black font-bold py-4 rounded-xl text-lg transition-all transform active:scale-95 shadow-[0_0_20px_rgba(78,205,196,0.4)]"
        >
            지금 시작하기
        </button>
        <p className="text-xs text-gray-500 mt-4">언제든지 해지 가능합니다.</p>
      </section>

      {/* Review Section */}
      <section className="bg-mint-50 p-6 rounded-2xl mb-10">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-gold-500">⭐⭐⭐⭐⭐</span>
            <span className="text-sm font-bold text-gray-700">4.9/5.0</span>
        </div>
        <p className="text-gray-700 italic">"매달 부모님 건강 리포트를 받아보니 너무 안심돼요. 4900원이 전혀 아깝지 않습니다."</p>
        <p className="text-xs text-gray-400 mt-2 font-bold">- 30대 직장인 김** 님</p>
      </section>

      {/* Payment Modal Integration */}
      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={4900}
        itemName="골든워크 프리미엄 구독 (1개월)"
        onComplete={() => {
            setShowPayment(false);
            alert('구독이 시작되었습니다! 🎉');
            router.push('/family/dashboard'); // Redirect to family dashboard to see premium features
        }}
      />
    </main>
  );
}
