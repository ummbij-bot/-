'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';

export default function InsurancePage() {
  const { user, language, points, steps } = useVitality();
  const router = useRouter();

  const [discountRate, setDiscountRate] = useState(5.5); // Mock calculated rate

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
          {language === 'ko' ? '골든 라이프 보험 🛡️' : 'ゴールデンライフ保険 🛡️'}
        </h1>
        <p className="text-muted">
          {language === 'ko' ? '열심히 걸으면 보험료가 내려갑니다.' : '一生懸命歩くと保険料が下がります。'}
        </p>
      </header>

      {/* Main Discount Card */}
      <section className="card-mint mb-lg animate-float" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
        <h3 className="fw-bold mb-4" style={{ fontSize: '18px' }}>
            {language === 'ko' ? '이번 달 보험료 할인율' : '今月の保険料割引率'}
        </h3>
        <div className="text-5xl font-black text-primary mb-2">
            {discountRate}%
        </div>
        <p className="text-sm opacity-80 mb-6">
            {language === 'ko' 
                ? `지난주 하루 평균 ${Math.floor(steps/7).toLocaleString()}보를 걸으셨네요! 👏` 
                : `先週、一日平均${Math.floor(steps/7).toLocaleString()}歩歩きましたね！👏`}
        </p>
        <button className="btn btn-white btn-full" onClick={() => alert('보험사 앱으로 연결됩니다. (Mock)')}>
            {language === 'ko' ? '할인 적용하기' : '割引を適用'}
        </button>
      </section>

      {/* Corporate Report / Certificate */}
      <section className="card mb-lg p-4 bg-gray-50 border-dashed border-2 border-gray-200 text-center">
        <h4 className="font-bold text-gray-600 mb-2">
            {language === 'ko' ? '기업/기관 제출용 증빙' : '企業/機関提出用証明'}
        </h4>
        <button className="btn btn-outline btn-sm" onClick={() => alert('PDF 리포트가 다운로드되었습니다. (Mock)')}>
            📄 {language === 'ko' ? '건강 걷기 증명서 발급' : '健康歩行証明書の発行'}
        </button>
      </section>

      {/* Partnership Products */}
      <section className="grid grid-cols-1 gap-4 mb-20">
        <h3 className="section-title">
            {language === 'ko' ? '제휴 보험 상품' : '提携保険商品'}
        </h3>
        
        {/* Product 1 */}
        <div className="card p-4 flex gap-4 items-center">
            <div className="text-3xl">🚑</div>
            <div className="flex-1">
                <h4 className="fw-bold">시니어 낙상 안심 보험</h4>
                <p className="text-xs text-muted">삼성화재 | 월 1,200원~</p>
            </div>
            <button className="btn btn-sm btn-outline">보기</button>
        </div>

        {/* Product 2 */}
        <div className="card p-4 flex gap-4 items-center">
            <div className="text-3xl">🦷</div>
            <div className="flex-1">
                <h4 className="fw-bold">든든 치아 사랑 보험</h4>
                <p className="text-xs text-muted">라이나생명 | 걷기 등급 A시 10%↓</p>
            </div>
            <button className="btn btn-sm btn-outline">보기</button>
        </div>
      </section>

      <BottomBar />
    </main>
  );
}
