'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../../context/VitalityContext';
import Icon from '../../components/Icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * [Phase 4.0] PartnerDashboard
 * 지역 상점주를 위한 방문자 통계 및 마케팅 관리 페이지입니다.
 */
export default function PartnerDashboard() {
  const router = useRouter();
  const { user } = useVitality();
  
  // 가상의 방문 데이터
  const visitorData = [
    { day: '월', count: 45, points: 2250 },
    { day: '화', count: 52, points: 2600 },
    { day: '수', count: 38, points: 1900 },
    { day: '목', count: 65, points: 3250 },
    { day: '금', count: 48, points: 2400 },
    { day: '토', count: 82, points: 4100 },
    { day: '일', count: 70, points: 3500 },
  ];

  const totalVisitors = visitorData.reduce((acc, cur) => acc + cur.count, 0);
  const totalPoints = visitorData.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <header className="mb-lg pt-2 flex justify-between items-center">
        <div>
          <h1 className="h1 mb-1">상점 관리 센터</h1>
          <p className="text-body text-sm text-secondary font-medium">스타벅스 강남점 사장님, 환영합니다! ☕</p>
        </div>
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
           <Icon name="Settings" size={24} />
        </div>
      </header>

      {/* 핵심 요약 카드 */}
      <section className="grid grid-cols-2 gap-4 mb-lg">
        <div className="card p-5 bg-white border-2 border-blue-50 rounded-[28px] shadow-sm">
          <span className="text-xs text-blue-400 block mb-2 uppercase font-black tracking-wider">주간 총 방문자</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-blue-600">{totalVisitors}</span>
            <span className="text-sm font-bold text-gray-400">명</span>
          </div>
          <div className="mt-2 text-[10px] text-green-500 font-bold flex items-center gap-1">
            <Icon name="ArrowUp" size={10} /> 전주 대비 12% 상승
          </div>
        </div>
        <div className="card p-5 bg-blue-600 rounded-[28px] shadow-lg border-none text-white">
          <span className="text-xs text-blue-100 block mb-2 uppercase font-black tracking-wider">누적 보상 포인트</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">{totalPoints.toLocaleString()}</span>
            <span className="text-sm font-bold text-blue-200">P</span>
          </div>
          <div className="mt-2 text-[10px] text-blue-100 font-semibold">
            사용자 리워드 지급분
          </div>
        </div>
      </section>

      {/* 방문자 통계 그래프 */}
      <section className="card mb-lg p-6 bg-white rounded-[32px] border border-blue-50 shadow-sm">
        <div className="flex-between mb-8">
          <h3 className="font-black text-gray-900 text-lg">요일별 방문 추이</h3>
          <span className="text-xs text-blue-600 font-black bg-blue-50 px-3 py-1.5 rounded-full">최근 7일</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3F2FD" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: '900', fill: '#8B95A1' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#E3F2FD', radius: [10, 10, 0, 0] }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,102,255,0.1)', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {visitorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.count > 60 ? '#0066FF' : '#93C5FD'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 활성 쿠폰 관리 */}
      <section className="mb-lg">
        <h3 className="font-black text-gray-900 text-lg mb-4 px-1">진행 중인 마케팅</h3>
        <div className="space-y-4">
          <div className="card p-5 flex items-center gap-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white border-none rounded-[28px] shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex-center">
              <Icon name="Zap" size={28} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-lg">반짝 걷기 할인 (아메리카노)</h4>
              <p className="text-sm font-bold opacity-80">선착순 100명 중 82명 완료</p>
            </div>
            <Icon name="ChevronRight" size={24} />
          </div>
          
          <button className="w-full py-5 rounded-[28px] border-2 border-dashed border-blue-100 text-blue-300 font-black text-lg flex-center gap-2 hover:border-blue-300 hover:text-blue-500 transition-all bg-white shadow-sm">
            <Icon name="Plus" size={24} /> 새 마케팅 직접 등록하기
          </button>
        </div>
      </section>

      <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-500">
        <p className="mb-1 italic">📌 파트너 센터 안내</p>
        <p>어르신 방문 데이터는 매분 단위로 업데이트됩니다. QR 체크인 시스템은 카운터 옆 잘 보이는 곳에 비치해 주세요.</p>
      </div>

    </main>
  );
}
