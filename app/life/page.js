'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';

export default function LifePage() {
  const { user, language, t } = useVitality();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('ALL');

  const lifeServices = [
    { id: 1, cat: 'TRAVEL', icon: '✈️', title: '효도 여행 패키지', desc: '제주도 2박 3일 힐링 코스', hot: true },
    { id: 2, cat: 'JOB', icon: '💼', title: '우리 동네 시니어 일자리', desc: '도서관 사서 도우미 모집', hot: true },
    { id: 3, cat: 'HOME', icon: '🏠', title: '실버타운 입주 상담', desc: '도심형 고급 요양 시설', hot: false },
    { id: 4, cat: 'PAY', icon: '💳', title: '마실 페이 충전', desc: '최대 5% 추가 적립금', hot: false },
    { id: 5, cat: 'CITY', icon: '🏙️', title: '스마트 시티 리빙랩', desc: '보행 환경 개선 의견 접수', hot: false },
  ];

  const filteredServices = activeCategory === 'ALL' 
    ? lifeServices 
    : lifeServices.filter(s => s.cat === activeCategory);

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
          Golden Life 🌏
        </h1>
        <p className="text-muted">
          {language === 'ko' ? '여행부터 일자리까지, 활기찬 노후를 위한 모든 것' : '旅行から仕事まで、活気ある老後のためのすべて'}
        </p>
      </header>

      {/* Masil Pay Card */}
      <section className="card-custom mb-lg text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', padding: '20px' }}>
        <div className="flex justify-between items-start mb-4">
            <span className="font-bold opacity-80">Masil Pay</span>
            <span className="badge badge-gold">NFC ON</span>
        </div>
        <div className="text-3xl font-black mb-1">
            54,200 <span className="text-lg font-normal">KRW</span>
        </div>
        <p className="text-sm opacity-70 mb-4">
            {language === 'ko' ? '이번 달 적립 혜택: 1,240원' : '今月の積立特典: 1,240ウォン'}
        </p>
        <div className="flex gap-2">
            <button className="btn btn-sm bg-white/20 text-white border-none flex-1 hover:bg-white/30">
                {language === 'ko' ? '충전하기' : 'チャージ'}
            </button>
            <button className="btn btn-sm bg-white/20 text-white border-none flex-1 hover:bg-white/30">
                {language === 'ko' ? '송금하기' : '送金'}
            </button>
        </div>
      </section>

      {/* Category Filter */}
      <div className="h-scroll mb-md">
        {['ALL', 'TRAVEL', 'JOB', 'HOME', 'CITY'].map(cat => (
            <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`badge px-4 py-2 cursor-pointer transition-all ${activeCategory === cat ? 'badge-gold' : 'bg-white border border-gray-200 text-gray-500'}`}
                style={{ marginRight: '8px' }}
            >
                {cat === 'ALL' ? (language === 'ko' ? '전체' : '全体') : cat}
            </button>
        ))}
      </div>

      {/* Service Grid */}
      <section className="grid grid-cols-1 gap-4 mb-20 animate-fade-in">
        {filteredServices.map(service => (
            <div key={service.id} className="card p-4 flex gap-4 items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert('서비스 상세 페이지로 이동합니다. (Mock)')}>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                    {service.icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="fw-bold m-0">{service.title}</h4>
                        {service.hot && <span className="badge badge-red" style={{ fontSize: '10px', padding: '2px 6px' }}>HOT</span>}
                    </div>
                    <p className="text-xs text-muted m-0">{service.desc}</p>
                </div>
                <span className="text-gray-300">›</span>
            </div>
        ))}
      </section>

      <BottomBar />
    </main>
  );
}
