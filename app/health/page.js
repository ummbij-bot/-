'use client';

import { useVitality } from '../context/VitalityContext';
import Icon from '../components/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HealthReport() {
  const { user, loading, isPremium, upgradeToPremium, language, triggerVoiceCoach, t } = useVitality();
  const router = useRouter();
  const [vitalityHistory, setVitalityHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('snapHistory') || '[]');
    setVitalityHistory(history);
  }, []);

  useEffect(() => {
    if (!loading && !user) router.push('/start');
  }, [user, loading, router]);

  if (loading) return <div className="flex-center h-screen">Loading...</div>;
  if (!user) return null;

  // Mock Data
  const weeklySteps = [
    { day: 'Mon', steps: 3200, active: false },
    { day: 'Tue', steps: 4100, active: false },
    { day: 'Wed', steps: 2800, active: false },
    { day: 'Thu', steps: 3500, active: false },
    { day: 'Fri', steps: 4500, active: true },
    { day: 'Sat', steps: 5200, active: true },
    { day: 'Sun', steps: 1200, active: false },
  ];
  const maxSteps = 6000;

  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <header className="mb-10 pt-4">
        <h1 className="text-3xl font-black text-gray-900 mb-2">{t('health_title')}</h1>
        <p className="text-xl font-bold text-gray-500">
          {user?.displayName?.split(' ')[0] || '어르신'}{t('health_subtitle')}
        </p>
      </header>

      {/* Primary Stat Card */}
      <section className="card mb-lg relative overflow-hidden bg-white">
        <div className="flex justify-between items-start">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-100 rounded-2xl shadow-sm">
                     <Icon name="Activity" size={28} color="var(--primary)" />
                  </div>
                  <span className="text-xl font-black text-gray-900">이번주 활력 지수</span>
               </div>
               <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-5xl font-black text-orange-600">상위 12%</span>
               </div>
               <p className="text-lg text-gray-500 font-bold mt-2 italic shadow-orange-100">또래보다 훨씬 건강하세요! 👍</p>
            </div>
           
           {/* Mini Stat Grid */}
            <div className="flex flex-col gap-4 text-right justify-center">
               <div>
                  <span className="text-sm text-gray-400 block font-black mb-1">총 이동 거리</span>
                  <span className="text-2xl font-black text-gray-900 leading-none">1.8 <span className="text-sm">km</span></span>
               </div>
               <div>
                  <span className="text-sm text-gray-400 block font-black mb-1">소모 칼로리</span>
                  <span className="text-2xl font-black text-gray-900 leading-none">320 <span className="text-sm">kcal</span></span>
               </div>
            </div>
        </div>
      </section>

      {/* Weekly Chart (Clean Bars) */}
      <section className="card mb-lg">
        <div className="flex-between mb-8">
           <h2 className="text-2xl font-black text-gray-900">주간 걸음 기록</h2>
           <span className="text-sm font-bold text-gray-400">최근 7일</span>
        </div>
        <div className="flex justify-between items-end h-40 pt-6 px-2">
           {weeklySteps.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                 <div 
                    className={`w-6 rounded-full transition-all duration-500 shadow-sm ${d.active ? 'bg-orange-600' : 'bg-gray-200'}`}
                    style={{ height: `${(d.steps / maxSteps) * 100}%` }}
                 />
                 <span className={`text-sm font-black ${d.active ? 'text-orange-600' : 'text-gray-400'}`}>
                    {d.day === 'Sun' ? '일' : d.day === 'Mon' ? '월' : d.day === 'Tue' ? '화' : d.day === 'Wed' ? '수' : d.day === 'Thu' ? '목' : d.day === 'Fri' ? '금' : '토'}
                 </span>
              </div>
           ))}
        </div>
      </section>

      {/* AI Coach (Premium) */}
      <section className={`card mb-lg relative overflow-hidden ${isPremium ? 'border-orange-200 bg-orange-50' : 'bg-gray-50'}`}>
         <div className="flex items-start gap-3">
            <Icon name="Bot" size={24} color={isPremium ? 'var(--primary)' : 'var(--text-tertiary)'} />
            <div>
               <h3 className="font-bold text-gray-900 mb-1">AI 건강 코치</h3>
               <p className={`text-sm leading-relaxed ${!isPremium && 'blur-sm select-none'}`}>
                  "관절 보호를 위해 이번 주는 경사가 완만한 코스를 추천해요. 오늘 칼로리 소모가 부족하니 저녁에 20분 더 걸어보세요."
               </p>
            </div>
         </div>
         
         {!isPremium && (
            <div className="absolute inset-0 flex-center flex-col bg-white/60 backdrop-blur-sm">
               <Icon name="Lock" size={32} color="var(--gray-400)" className="mb-2" />
               <button 
                  onClick={upgradeToPremium}
                  className="btn bg-gray-900 text-white text-sm py-2 px-6 rounded-full"
               >
                  프리미엄 분석 보기
               </button>
            </div>
         )}
      </section>

      {/* Vitality Score Analysis (New) */}
      <section className="card mb-lg relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
         <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                 <Icon name="Smile" size={24} color="var(--primary)" />
                 <h2 className="font-bold text-gray-900 text-lg">AI 활력 분석</h2>
             </div>
             <button 
                onClick={() => router.push('/snap')} 
                className="text-xs text-primary font-bold bg-white px-3 py-1 rounded-full shadow-sm"
             >
                기록하기 +
             </button>
         </div>
         
         {vitalityHistory.length > 0 ? (
              <div className="bg-white p-5 rounded-2xl border-2 border-orange-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                      <span className="text-md text-gray-400 font-black">{new Date(vitalityHistory[0].date).toLocaleDateString()} 산책 기록</span>
                      <span className="text-3xl font-black text-orange-600">{vitalityHistory[0].score}점</span>
                  </div>
                  <p className="text-xl text-gray-800 font-bold leading-relaxed bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">" {vitalityHistory[0].comment} "</p>
              </div>
         ) : (
             <div className="text-center py-6 text-gray-400 text-sm">
                 <p>아직 분석 기록이 없어요.</p>
                 <p>산책 후 사진을 찍어보세요!</p>
             </div>
         )}
      </section>

      {/* Share Action */}
      <button className="w-full py-6 bg-white border-4 border-gray-100 rounded-3xl flex-center gap-4 text-gray-700 font-black text-xl shadow-xl active:scale-95 transition-all mb-8">
         <Icon name="Share2" size={28} className="text-orange-600" />
         자녀에게 건강 리포트 보내기
      </button>

    </main>
  );
}
