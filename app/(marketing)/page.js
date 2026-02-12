'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MarketingPage() {
  const router = useRouter();

  return (
    <div className="marketing-root" style={{ background: '#FFFFFF', color: '#111827', fontFamily: 'var(--font-pretendard)' }}>
      {/* 1. Navigation */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="GoldenWalk" style={{ width: '40px' }} />
          <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>마실(GoldenWalk)</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#4B5563', fontWeight: 500 }}>서비스 소개</a>
          <a href="#pricing" style={{ color: '#4B5563', fontWeight: 500 }}>가격 안내</a>
          <Link href="/start">
             <button className="btn btn-primary" style={{ minHeight: '44px', padding: '0 24px', borderRadius: '12px' }}>
                무료로 시작하기
             </button>
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section style={{ padding: '80px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)' }}>
        <h1 style={{ fontSize: '64px', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
          부모님의 하루,<br /> 
          <span style={{ color: 'var(--primary)' }}>건강한 마실</span>로 챙겨보세요
        </h1>
        <p style={{ fontSize: '20px', color: '#4B5563', marginBottom: '40px', lineHeight: 1.6 }}>
          전 세계 시니어를 위한 걷기 리포트와 포인트 선물.<br />
          자녀에겐 안심을, 부모님에겐 활력을 드립니다.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => router.push('/start')} className="btn btn-primary" style={{ width: '240px', height: '64px', fontSize: '20px', borderRadius: '16px' }}>
            지금 바로 시작하기
          </button>
          <button className="btn" style={{ width: '180px', height: '64px', fontSize: '20px', borderRadius: '16px', border: '2px solid var(--gray-200)', color: '#4B5563' }}>
            더 알아보기
          </button>
        </div>
      </section>

      {/* 3. Social Proof */}
      <section style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #F3F4F6' }}>
        <p style={{ color: '#9CA3AF', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
          함께하는 가족들
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', opacity: 0.5, filter: 'grayscale(1)' }}>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>SAMSUNG Health</span>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>Apple Health</span>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>NHN Cloud</span>
        </div>
      </section>

      {/* 4. Feature Highlights */}
      <section id="features" style={{ padding: '100px 40px' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
               <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
               <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>동네 마실 지도</h3>
               <p style={{ color: '#6B7280', lineHeight: 1.6 }}>집 주변 시니어 친화 매장을 한눈에 발견하고 걷는 즐거움을 느껴보세요.</p>
            </div>
            <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
               <div style={{ fontSize: '40px', marginBottom: '16px' }}>📊</div>
               <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>AI 건강 리포트</h3>
               <p style={{ color: '#6B7280', lineHeight: 1.6 }}>매일의 걸음수를 분석하여 자녀에게 알안심 리포트를 보내드립니다.</p>
            </div>
            <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
               <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎁</div>
               <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>행복 포인트 상점</h3>
               <p style={{ color: '#6B7280', lineHeight: 1.6 }}>포인트를 모아 커피, 약국 할인권 등 실제 혜택으로 교환할 수 있습니다.</p>
            </div>
         </div>
      </section>

      {/* 5. Pricing CTA */}
      <section id="pricing" style={{ padding: '100px 40px', background: '#F9FAFB', textAlign: 'center' }}>
         <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '64px' }}>합리적인 가격으로 건강을 구독하세요</h2>
         <div style={{ maxWidth: '400px', margin: '0 auto', background: '#FFFFFF', padding: '48px', borderRadius: '32px', border: '1px solid var(--primary)', boxShadow: '0 20px 40px rgba(249, 115, 22, 0.1)' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>활력 패스 프리미엄</div>
            <div style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px' }}>$4.99<span style={{ fontSize: '20px', color: '#9CA3AF' }}> / 월</span></div>
            <ul style={{ textAlign: 'left', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px', color: '#4B5563' }}>
               <li>✅ AI 정밀 건강 조언 (주간)</li>
               <li>✅ 가족 무제한 연결 및 알림</li>
               <li>✅ 주변 매장 포인트 2배 적립</li>
               <li>✅ 광고 없는 깨끗한 화면</li>
            </ul>
            <button onClick={() => router.push('/start')} className="btn btn-primary btn-full" style={{ height: '64px', fontSize: '18px', borderRadius: '16px' }}>
               프리미엄 7일 무료 체험
            </button>
         </div>
      </section>

      {/* 6. Footer */}
      <footer style={{ padding: '60px 40px', borderTop: '1px solid #F3F4F6', color: '#9CA3AF', fontSize: '14px', textAlign: 'center' }}>
         <div style={{ marginBottom: '24px' }}>
            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>GOLDENWALK</span> © 2026. All Rights Reserved.
         </div>
         <p>서울시 종로구 혜화동 123-456 활력빌딩 | 사업자번호: 123-45-67890 | 대표: 김마실</p>
      </footer>
    </div>
  );
}
