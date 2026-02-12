'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TrafficChart from '../../components/TrafficChart';

export default function PartnerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
      todayVisits: 84,
      todayPoints: 4200,
      totalCoupons: 12
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <div>
            <h1 className="text-lg font-bold text-gray-800">🏪 골든워크 파트너</h1>
            <p className="text-xs text-gray-500">종로구 교보약국 (지점장: 김철수)</p>
        </div>
        <button className="text-sm text-gray-500 underline" onClick={() => router.push('/')}>로그아웃</button>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Action */}
        <section>
            <button 
                onClick={() => router.push('/partner/scan')}
                className="w-full bg-gradient-to-r from-mint-500 to-teal-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between"
            >
                <div className="text-left">
                    <h2 className="text-xl font-bold mb-1">QR 스캔하기</h2>
                    <p className="text-sm opacity-90">손님 방문 인증 & 포인트 적립</p>
                </div>
                <span className="text-4xl bg-white/20 p-3 rounded-full">📷</span>
            </button>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-xs mb-1">오늘 방문자</div>
                <div className="text-2xl font-black text-gray-800">{stats.todayVisits}<span className="text-sm font-normal text-gray-400">명</span></div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 text-xs mb-1">적립 포인트</div>
                <div className="text-2xl font-black text-gold-600">{stats.todayPoints.toLocaleString()}P</div>
            </div>
        </section>

        {/* Traffic Chart */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">시간대별 방문 현황</h3>
            <TrafficChart />
        </section>

        {/* Recent Activity */}
        <section>
            <h3 className="font-bold text-gray-800 mb-3 px-1">최근 방문 내역</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">👵</div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">익명 (User #{9940-i})</div>
                                <div className="text-xs text-gray-400">{i * 12 + 5}분 전</div>
                            </div>
                        </div>
                        <span className="badge badge-mint text-xs">+50P</span>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button className="text-xs text-gray-400 underline">더보기</button>
            </div>
        </section>
      </div>
    </main>
  );
}
