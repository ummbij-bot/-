'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../components/Icon';

const dataRisk = [
  { name: '안전', value: 65, fill: '#4ade80' },
  { name: '주의', value: 25, fill: '#fbbf24' },
  { name: '위험', value: 10, fill: '#ef4444' },
];

const dataActivity = [
  { time: '06시', traffic: 120 },
  { time: '09시', traffic: 850 },
  { time: '12시', traffic: 540 },
  { time: '15시', traffic: 920 },
  { time: '18시', traffic: 430 },
  { time: '21시', traffic: 150 },
];

// Mock Heatmap Component
const HeatmapMock = () => (
  <div className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden mb-6 group cursor-pointer">
    {/* Background Map Placeholder */}
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
    
    {/* Heat Spots (CSS Blur) */}
    <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
    <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-50"></div>
    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500 rounded-full blur-xl opacity-60"></div>
    
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
        🔴 활동 밀집 지역 (종묘 공원)
    </div>
  </div>
);

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold">G</div>
            <span className="font-bold text-lg tracking-tight">GoldenWalk <span className="text-slate-400 font-normal">Data Intelligence</span></span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
            <button className="hover:text-white transition-colors">Documentation</button>
            <button className="hover:text-white transition-colors">API Keys</button>
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">Admin</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <header className="mb-10">
            <h1 className="text-3xl font-black mb-2">서울특별시 종로구 <span className="text-orange-600">이동 약자 현황</span></h1>
            <p className="text-slate-500 text-lg">실시간 데이터 기반의 도시 활력 및 위험도 모니터링</p>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
                { label: '실시간 활동 인구', value: '4,832명', delta: '+12%', icon: 'Users', color: 'blue' },
                { label: '평균 보행 속도', value: '3.2 km/h', delta: '-1.5%', icon: 'Activity', color: 'orange' },
                { label: '낙상 위험 감지', value: '12건', delta: '주의', icon: 'AlertTriangle', color: 'red' },
                { label: '가입 카버리지', value: '28.4%', delta: '종로구', icon: 'Map', color: 'green' },
            ].map((kpi, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-500`}>
                            <Icon name={kpi.icon} size={24} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.delta.includes('+') ? 'bg-green-100 text-green-700' : kpi.delta.includes('-') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                            {kpi.delta}
                        </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-1">{kpi.value}</h3>
                    <p className="text-sm text-slate-400 font-medium">{kpi.label}</p>
                </div>
            ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Heatmap & Geo Data */}
            <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Icon name="MapPin" size={20} className="text-slate-400" />
                            도시 활력 히트맵 (City Vitality Heatmap)
                        </h2>
                        <button className="text-sm text-blue-600 font-bold hover:underline">전체 지도 보기</button>
                    </div>
                    <HeatmapMock />
                    <p className="text-sm text-slate-500 leading-relaxed">
                        최근 24시간 동안 65세 이상 인구의 유동량이 가장 많은 구역입니다. 
                        <strong>종묘 공원</strong>과 <strong>광장시장</strong> 주변의 보행 밀도가 높으며, 
                        오후 2시-4시 사이에 피크를 이룹니다.
                    </p>
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                     <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Icon name="Clock" size={20} className="text-slate-400" />
                        시간대별 유동 인구 추이
                    </h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataActivity}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="traffic" stroke="#ff6b00" strokeWidth={4} dot={{r: 6}} activeDot={{r: 8}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            {/* Right: Risk Analysis */}
            <div className="space-y-8">
                 <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full">
                    <h2 className="text-xl font-bold mb-2 text-red-600 flex items-center gap-2">
                        <Icon name="Activity" size={20} />
                        낙상 위험군 분석
                    </h2>
                    <p className="text-sm text-slate-400 mb-8">보행 패턴 비정상 감지 리포트</p>
                    
                    <div className="h-64 w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataRisk}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#f8fafc'}} />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <h4 className="font-bold text-red-700 text-sm mb-1">🚨 긴급 알림 (3건)</h4>
                            <ul className="text-xs text-red-600 space-y-1">
                                <li>• 익선동 124-1 노면 파손 감지</li>
                                <li>• 사용자 #8291 낙상 의심 (10분 전)</li>
                                <li>• 창신동 급경사 구간 속도 급감</li>
                            </ul>
                        </div>
                        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-colors">
                            상세 데이터 다운로드 (.CSV)
                        </button>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}
