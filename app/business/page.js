'use client';

import React, { useState } from 'react';
import Icon from '../components/Icon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * [Phase 4.0] BusinessDashboard
 * 지자체 및 보험사용 보행 데이터 분석 플랫폼입니다. (B2B 데이터 비즈니스 모델)
 */
export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('safety'); // safety, health, economic

  // 가상의 보행 위험 지역 데이터 (히트맵 컨셉)
  const riskZoneData = [
    { name: '강남구청 인근', riskScore: 85, danger: '낙상 주의' },
    { name: '대치동 은마아파트', riskScore: 42, danger: '양호' },
    { name: '강남역 10번 출구', riskScore: 78, danger: '경사 주의' },
    { name: '양재천 산책로', riskScore: 12, danger: '매우 안전' },
    { name: '논현동 가구거리', riskScore: 65, danger: '보도블록 노후' },
  ];

  // 연령대별 보행 안정성 추이
  const trendData = [
    { month: '10월', age60: 82, age70: 75, age80: 62 },
    { month: '11월', age60: 80, age70: 72, age80: 58 },
    { month: '12월', age60: 78, age70: 68, age80: 52 },
    { month: '1월', age60: 85, age70: 70, age80: 55 },
    { month: '2월', age60: 88, age70: 72, age80: 57 },
  ];

  return (
    <main className="bg-slate-900 min-h-screen text-slate-300 p-6">
      <header className="mb-10 flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            GoldenWalk Business Intelligence
          </div>
          <h1 className="text-3xl font-black text-white italic">데이터 통합 관제 센터</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase font-bold">Authenticated Partner</p>
          <p className="text-slate-200 font-bold">서울특별시 강남구청 님</p>
        </div>
      </header>

      {/* 대시보드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 지역별 보행 위험 지수 (히트맵 대체 리스트) */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-3xl p-6 border border-slate-800">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Icon name="Map" size={20} color="var(--primary)" /> 집중 관리 구역 TOP 5
          </h3>
          <div className="space-y-4">
            {riskZoneData.sort((a, b) => b.riskScore - a.riskScore).map((zone, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-xl flex-center font-bold ${
                  zone.riskScore > 70 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  {zone.riskScore}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{zone.name}</p>
                  <p className="text-xs text-slate-500">{zone.danger}</p>
                </div>
                <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${zone.riskScore > 70 ? 'bg-red-500' : 'bg-green-500'}`} 
                       style={{ width: `${zone.riskScore}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold transition-colors">
            위험 구역 상세 리포트 다운로드
          </button>
        </div>

        {/* 보행 안정성 추이 그래프 */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-3xl p-6 border border-slate-800">
          <div className="flex-between mb-8">
            <h3 className="text-white font-bold uppercase tracking-tighter">연령대별 보행 안정성 추이</h3>
            <div className="flex gap-2">
               <div className="flex items-center gap-1 text-[10px]"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 60대</div>
               <div className="flex items-center gap-1 text-[10px]"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div> 70대</div>
               <div className="flex items-center gap-1 text-[10px]"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> 80대</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="color60" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                <XAxis dataKey="month" stroke="#718096" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="age60" stroke="#3b82f6" fillOpacity={1} fill="url(#color60)" strokeWidth={3} />
                <Area type="monotone" dataKey="age70" stroke="#6366f1" fillOpacity={0} strokeWidth={3} />
                <Area type="monotone" dataKey="age80" stroke="#a855f7" fillOpacity={0} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-xs text-blue-400 italic">
            💡 분석 결과: 동절기(12-1월) 80대 연령층의 보행 안정성이 평소보다 15% 하락했습니다. 해당 기간 집중 낙상 방지 캠페인을 제안합니다.
          </div>
        </div>

      </div>

      {/* 비즈니스 연동 섹션 */}
      <footer className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl border border-indigo-500/30">
          <h4 className="text-white font-bold mb-2">지자체 정비 사업 연동</h4>
          <p className="text-sm text-slate-400 mb-4">보행 약자 다빈도 경로 데이터를 기반으로 무장애(Barrier-free) 도로 정비 구역 우선순위를 추천받으세요.</p>
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-full text-xs font-bold hover:bg-indigo-400 transition-all">API 문서 보기</button>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl border border-purple-500/30">
          <h4 className="text-white font-bold mb-2">보험사 가입자 모니터링</h4>
          <p className="text-sm text-slate-400 mb-4">가입자의 보행 패턴 변화를 감지하여 건강 증진 리워드 및 질병 예방 서비스를 자동화합니다.</p>
          <button className="px-6 py-2 bg-purple-500 text-white rounded-full text-xs font-bold hover:bg-purple-400 transition-all">데이터 대시보드 Pro 신청</button>
        </div>
      </footer>
    </main>
  );
}
