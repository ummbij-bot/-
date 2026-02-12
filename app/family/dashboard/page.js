'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuardianDashboard() {
  const router = useRouter();
  
  // Mock Data
  const parentName = "김영희";
  const stats = {
      steps: 8432,
      goal: 10000,
      emotion: "Happy 😊",
      lastUpdate: "10분 전"
  };

  const activityLog = [
      { time: "09:30", action: "아침 산책 시작 (종묘 공원)" },
      { time: "10:15", action: "보행 분석 완료 (점수: 85점)" },
      { time: "12:00", action: "교보약국 방문 (포인트 적립)" },
      { time: "14:20", action: "기분 체크: 매우 좋음" }
  ];

  return (
    <main className="min-h-screen bg-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-indigo-900">FAMILY CARE</h1>
            <button className="text-sm text-gray-500" onClick={() => router.push('/')}>나가기</button>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=400" alt="Parent" className="w-full h-full object-cover" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{parentName} 님 <span className="text-xs font-normal text-gray-500">(어머니)</span></h2>
                <p className="text-sm text-indigo-600 font-medium">● 혅재 활동 중 ({stats.lastUpdate})</p>
            </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Vitality Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-gray-500 text-sm font-bold">오늘의 활력 점수</h3>
                    <div className="text-4xl font-black text-indigo-900">85<span className="text-lg text-gray-400">/100</span></div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">기분 상태</div>
                    <div className="text-2xl">{stats.emotion}</div>
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 h-4 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-center text-gray-500">목표 걸음 {stats.goal}보 중 <span className="text-indigo-600 font-bold">{stats.steps}보</span> 달성</p>
        </section>

        {/* Real-time Activity Log */}
        <section>
            <h3 className="font-bold text-indigo-900 mb-3 px-1">실시간 활동 타임라인</h3>
            <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
                {activityLog.map((log, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-indigo-400 border-2 border-indigo-50" />
                        <div className="text-xs text-gray-400 mb-0.5">{log.time}</div>
                        <div className="text-sm text-gray-700 font-medium bg-white p-3 rounded-lg shadow-sm border border-gray-100 inline-block">
                            {log.action}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-2 gap-3">
            <button 
                onClick={() => alert('부모님께 응원 메시지를 보냈습니다! 💌')}
                className="bg-white p-4 rounded-xl shadow-sm text-center border border-indigo-100 hover:bg-indigo-50 transition-colors"
            >
                <div className="text-2xl mb-1">🥰</div>
                <div className="text-sm font-bold text-indigo-900">응원 보내기</div>
            </button>
            <button 
                onClick={() => alert('커피 쿠폰을 선물했습니다! ☕️')}
                className="bg-white p-4 rounded-xl shadow-sm text-center border border-indigo-100 hover:bg-indigo-50 transition-colors"
            >
                <div className="text-2xl mb-1">🎁</div>
                <div className="text-sm font-bold text-indigo-900">선물 하기</div>
            </button>
        </section>
      </div>
    </main>
  );
}
