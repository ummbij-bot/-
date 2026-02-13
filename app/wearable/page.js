'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import Icon from '../components/Icon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * [Phase 5.0] WearablePage
 * 애플 워치, 갤럭시 워치 등 웨어러블 디바이스 연동 및 관리 페이지입니다.
 */
export default function WearablePage() {
  const router = useRouter();
  const { wearableStatus, syncWearableData } = useVitality();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // 가상의 실시간 심박수 데이터
  const [heartRateData, setHeartRateData] = useState([
    { time: '10:00', hr: 72 },
    { time: '10:05', hr: 75 },
    { time: '10:10', hr: 82 },
    { time: '10:15', hr: 78 },
    { time: '10:20', hr: 74 },
    { time: '10:25', hr: 71 },
  ]);

  const handleConnect = () => {
    setIsConnecting(true);
    // 2초 후 연결 성공 시뮬레이션
    setTimeout(() => {
      syncWearableData({ status: 'connected', deviceName: 'Apple Watch Series 9' });
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <main className="page-content bg-gray-50 min-h-screen pb-32">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow-sm flex-center">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-black">내 시계 연결하기</h1>
        <div className="w-10" />
      </header>

      <div className="px-6 pt-4">
        {/* 기기 연결 상태 카드 */}
        <section className={`card p-6 mb-6 transition-all duration-500 ${
          wearableStatus?.status === 'connected' ? 'bg-blue-600 text-white border-none' : 'bg-white'
        }`}>
          <div className="flex-between mb-6">
            <div className={`w-14 h-14 rounded-2xl flex-center ${
              wearableStatus?.status === 'connected' ? 'bg-white/20' : 'bg-blue-50 text-blue-600'
            }`}>
              <Icon name="Watch" size={32} />
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              wearableStatus?.status === 'connected' ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {wearableStatus?.status === 'connected' ? 'Connected' : 'Disconnected'}
            </div>
          </div>

          <h2 className="text-2xl font-black mb-1">
            {wearableStatus?.status === 'connected' ? wearableStatus.deviceName : '시계가 연결되지 않음'}
          </h2>
          <p className={`text-sm mb-6 ${wearableStatus?.status === 'connected' ? 'opacity-80' : 'text-secondary'}`}>
            {wearableStatus?.status === 'connected' 
              ? '보행 데이터와 심박수가 실시간으로 동기화 중입니다.' 
              : '더 정확한 건강 분석을 위해 스마트워치를 연결해 보세요.'}
          </p>

          {wearableStatus?.status === 'connected' ? (
            <button 
              onClick={() => syncWearableData({ status: 'disconnected' })}
              className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition-all"
            >
              연결 해제하기
            </button>
          ) : (
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className={`w-full py-4 rounded-xl font-black text-lg shadow-lg flex-center gap-3 transition-all ${
                isConnecting ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isConnecting ? (
                <>연결 시도 중...</>
              ) : (
                <>연결하기 <Icon name="Plus" size={20} /></>
              )}
            </button>
          )}
        </section>

        {/* 연결 시에만 보이는 정밀 데이터 섹션 */}
        {wearableStatus?.status === 'connected' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="font-bold text-gray-800 mb-4 px-1">실시간 건강 지표</h3>
            
            <section className="card p-5 bg-white mb-4">
              <div className="flex-between mb-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">실시간 심박수</span>
                <div className="flex items-center gap-1 text-red-500 animate-pulse font-black italic">
                   <Icon name="Heart" size={14} fill="currentColor" /> 74 BPM
                </div>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={heartRateData}>
                    <defs>
                      <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Area type="monotone" dataKey="hr" stroke="#ef4444" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="card p-4 bg-white">
                <Icon name="Zap" size={18} className="text-orange-500 mb-2" />
                <span className="text-xs text-secondary font-bold block">소모 칼로리</span>
                <span className="text-xl font-black">245 kcal</span>
              </div>
              <div className="card p-4 bg-white">
                <Icon name="Wind" size={18} className="text-blue-500 mb-2" />
                <span className="text-xs text-secondary font-bold block">걸음 수 (워치)</span>
                <span className="text-xl font-black">1,245 보</span>
              </div>
            </section>
          </div>
        )}

        {/* 안내 문구 */}
        <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 text-sm mb-2">💡 스마트 디바이스 연동 안내</h4>
            <p className="text-xs text-blue-600/80 leading-relaxed">
              시계와 연결하면 스마트폰을 들고 있지 않아도 걸음수가 정확히 측정됩니다. 또한, 보행 중 낙상 위험을 더 정밀하게 감지하여 가족들에게 알림을 보낼 수 있습니다.
            </p>
        </div>
      </div>

    </main>
  );
}
