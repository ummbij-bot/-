'use client';

import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';
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
      <header className="mb-lg pt-2">
        <h1 className="h1 mb-1">{t('health_title')}</h1>
        <p className="text-body text-sm text-secondary">
          {user?.displayName?.split(' ')[0] || '어르신'}{t('health_subtitle')}
        </p>
      </header>

      {/* Primary Stat Card */}
      <section className="card mb-lg relative overflow-hidden bg-white">
        <div className="flex justify-between items-start">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="p-2 bg-orange-50 rounded-full">
                    <Icon name="Activity" size={20} color="var(--primary)" />
                 </div>
                 <span className="font-bold text-gray-900">이번주 활력 지수</span>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                 <span className="text-4xl font-extrabold text-primary">top 12%</span>
              </div>
              <p className="text-xs text-secondary mt-1">또래보다 건강해요!</p>
           </div>
           
           {/* Mini Stat Grid */}
           <div className="flex flex-col gap-3 text-right">
              <div>
                 <span className="text-xs text-secondary block">총 이동</span>
                 <span className="font-bold text-gray-900">1.8 km</span>
              </div>
              <div>
                 <span className="text-xs text-secondary block">칼로리</span>
                 <span className="font-bold text-gray-900">320 kcal</span>
              </div>
           </div>
        </div>
      </section>

      {/* Weekly Chart (Clean Bars) */}
      <section className="card mb-lg">
        <div className="flex-between mb-md">
           <h2 className="text-lg font-bold text-gray-900">주간 걸음</h2>
           <span className="text-xs text-secondary">최근 7일</span>
        </div>
        <div className="flex justify-between items-end h-32 pt-4">
           {weeklySteps.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                 <div 
                    className={`w-3 rounded-full transition-all duration-500 ${d.active ? 'bg-orange-500' : 'bg-gray-200'}`}
                    style={{ height: `${(d.steps / maxSteps) * 100}%` }}
                 />
                 <span className={`text-xs ${d.active ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
                    {d.day.charAt(0)}
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
             <div className="bg-white/80 p-4 rounded-xl border border-yellow-200">
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-sm text-gray-500">{new Date(vitalityHistory[0].date).toLocaleDateString()}</span>
                     <span className="text-2xl font-black text-primary">{vitalityHistory[0].score}점</span>
                 </div>
                 <p className="text-sm text-gray-800 font-medium">"{vitalityHistory[0].comment}"</p>
             </div>
         ) : (
             <div className="text-center py-6 text-gray-400 text-sm">
                 <p>아직 분석 기록이 없어요.</p>
                 <p>산책 후 사진을 찍어보세요!</p>
             </div>
         )}
      </section>

      {/* Share Action */}
      <button className="w-full py-4 border border-gray-200 rounded-2xl flex-center gap-2 text-gray-600 font-bold bg-white active:bg-gray-50">
         <Icon name="Share" size={20} />
         가족에게 건강 리포트 공유
      </button>

      <BottomBar />
    </main>
  );
}
