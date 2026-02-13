'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from './context/VitalityContext';
import { storeData } from '../lib/data';
import Icon from './components/Icon';
import CircleProgress from './components/CircleProgress';
import LuckyPouch from './components/LuckyPouch';
import SafetySOS from './components/SafetySOS';
import FamilySnap from './components/FamilySnap';
import MasilVoice from './components/MasilVoice';
import ARMemoryLane from './components/ARMemoryLane';
import PayPalExchange from './components/PayPalExchange';
import VoiceMailbox from './components/VoiceMailbox';
import FamilyChallenge from './components/FamilyChallenge';
import MedicationManager from './components/MedicationManager';
import SafeReturn from './components/SafeReturn';
import GlobalFeed from './components/GlobalFeed';
import VoiceModeButton from './components/features/VoiceModeButton';
import MissionCard from './components/MissionCard';
import WeatherActivityGuide from './components/WeatherActivityGuide';
import Skeleton from './components/Skeleton';
import InstallPrompt from './components/features/InstallPrompt';
import { shareContent } from '../utils/share';
import { toast } from 'react-hot-toast';

export default function Home() {
  const { 
    user, 
    loading, 
    steps, 
    goal, 
    points: contextPoints, 
    familyMessage, 
    language,
    setLanguage,
    t, // i18n helper
    addSteps, // 수동 걸음 수 추가 함수
    weatherData,
    wearableStatus
  } = useVitality();
  const router = useRouter();
  const [arMode, setArMode] = useState(false);
  const [showExchange, setShowExchange] = useState(false);
  const [localPoints, setLocalPoints] = useState(0);
  const [addingSteps, setAddingSteps] = useState(false);

  // Combine context points with local exchanged points for demo
  const displayPoints = (typeof contextPoints === 'number' ? contextPoints : 0) + localPoints;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/start');
    }
  }, [user, loading, router]);

  if (loading) return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <div className="flex-between mb-lg pt-2">
         <Skeleton className="w-40 h-10" />
         <div className="flex gap-2">
            <Skeleton className="w-12 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
         </div>
      </div>
      <Skeleton className="w-full h-48 mb-lg rounded-2xl" />
      <Skeleton className="w-full h-32 mb-lg rounded-xl" />
      <div className="grid grid-cols-2 gap-md mb-lg">
        <Skeleton className="w-full h-32 rounded-xl" />
        <Skeleton className="w-full h-32 rounded-xl" />
      </div>
    </main>
  );
  if (!user) return null;

  const nearbyStores = storeData[language] || storeData['ko'];

  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      
{/* 1. Header: Minimal & Functional */ }
<header className="flex-between mb-lg pt-2">
    <div>
        <h1 className="h1">
            {t('greeting')}, {user?.displayName?.split(' ')[0] || '어르신'}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl">{weatherData.icon}</span>
          <p className="text-sm font-medium text-gray-700">
            {weatherData.temp}°C {weatherData.conditionKr}
          </p>
          <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-bold">
            먼지 {weatherData.fineDustStatus}
          </span>
        </div>
    </div>

    <div className="flex-center gap-md">
        {/* [Phase 5.0] Wearable Sync Indicator */}
        <button
            onClick={() => router.push('/wearable')}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all active:scale-95 ${
                wearableStatus?.status === 'connected' 
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                : 'bg-white border-gray-100 text-gray-400'
            }`}
        >
            <div className={`relative ${wearableStatus?.status === 'connected' ? 'animate-pulse' : ''}`}>
                <Icon name="Watch" size={20} />
                {wearableStatus?.status === 'connected' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                )}
            </div>
            <span className="text-xs font-black uppercase tracking-tighter">
                {wearableStatus?.status === 'connected' ? 'Sync' : 'Link'}
            </span>
        </button>

        <button
            onClick={() => setLanguage(language === 'ko' ? 'ja' : 'ko')}
            className="btn-neutral pressable flex-center"
            style={{ minWidth: '60px', height: '60px', borderRadius: '30px', fontSize: '16px', fontWeight: '800' }}
            aria-label={language === 'ko' ? "Switch to Japanese" : "한국어로 변경"}
        >
            {language === 'ko' ? 'JP' : 'KR'}
        </button>
        <button
            onClick={() => router.push('/device')}
            className="flex-center pressable bg-white border border-gray-100"
            style={{ width: 60, height: 60, borderRadius: '50%' }}
            aria-label="Settings"
        >
            <Icon name="Settings" size={28} color="var(--text-primary)" />
        </button>
    </div>
</header>

{/* ... (Stat Card remains mostly same, maybe add pressable if clickable) ... */ }
<section className="card mb-lg relative overflow-hidden">
    <div className="flex-between items-start mb-md">
        <div>
            <span className="text-base font-black text-primary mb-1 block tracking-wider">오늘의 활력</span>
            <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1 }}>
                    {steps.toLocaleString()}
                </span>
                <span className="text-lg text-secondary font-bold">/ {goal.toLocaleString()}</span>
            </div>
        </div>
        <div style={{ width: 80, height: 80 }}>
            <CircleProgress current={steps} goal={goal} size={80} strokeWidth={8} color="var(--primary)" />
        </div>
    </div>

    <div className="flex gap-md mt-6 pt-6 border-t-2 border-gray-100">
        <div className="flex-1">
            <div className="text-sm font-bold text-secondary mb-1">칼로리</div>
            <div className="text-xl font-black">142<span className="text-xs ml-0.5">kcal</span></div>
        </div>
        <div className="flex-1">
            <div className="text-sm font-bold text-secondary mb-1">거리</div>
            <div className="text-xl font-black">1.2<span className="text-xs ml-0.5">km</span></div>
        </div>
        <div className="flex-1">
            <div className="text-sm font-bold text-secondary mb-1">시간</div>
            <div className="text-xl font-black">45<span className="text-xs ml-0.5">분</span></div>
        </div>
        <button 
            onClick={async () => {
                const result = await shareContent({
                    title: '오늘의 걷기 달성!',
                    text: `${user?.displayName || '어르신'}님이 오늘 ${steps.toLocaleString()}걸음을 걸으셨어요! 함께 응원해주세요. 🏃`,
                    url: window.location.origin
                });
                if (result.success) {
                    toast.success(result.method === 'clipboard' ? '링크가 복사되었습니다!' : '공유되었습니다!');
                }
            }}
            className="flex-center bg-orange-100 text-orange-600 rounded-2xl w-14 h-14 pressable"
            aria-label="Share"
        >
            <Icon name="Share2" size={28} />
        </button>
    </div>
    
    {/* 수동 걸음 추가 버튼 */}
    <div className="mt-4 pt-4 border-t-2 border-gray-100">
        <button 
            onClick={async () => {
                if (addingSteps) return;
                setAddingSteps(true);
                try {
                    const result = await addSteps(100);
                    toast.success(`✅ 걸음 수 +100! (${result.pointsAdded}포인트 적립)`);
                } catch (error) {
                    toast.error('걸음 수 추가에 실패했습니다.');
                } finally {
                    setAddingSteps(false);
                }
            }}
            disabled={addingSteps}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-md active:bg-orange-700 transition-colors disabled:opacity-50"
        >
            {addingSteps ? (
                <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    추가 중...
                </>
            ) : (
                <>
                    <Icon name="PlusCircle" size={28} />
                    걸음 수 +100 추가하기
                </>
            )}
        </button>
    </div>
</section>

      
      {/* [Phase 3.0] Situation-Aware Guide */}
      <WeatherActivityGuide />

      {/* 1.5 Daily Mission (PM Agent) */}
      <MissionCard />

      {/* 1.8 AI Health Analysis (New Feature) */}
      <section className="mb-lg">
          <button 
              onClick={() => router.push('/analysis')}
              className="w-full card pressable relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
              style={{ padding: '20px' }}
          >
              <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
                      <Icon name="Activity" size={28} />
                  </div>
                  <div className="text-left">
                      <div className="font-bold text-lg text-gray-800">AI 보행 건강 검진</div>
                      <div className="text-sm text-gray-600">내 걸음걸이로 낙상 위험을 측정해요 🩺</div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
                      <Icon name="Activity" size={80} color="blue" />
                  </div>
              </div>
          </button>
      </section>

      {/* 2. Family Snap CTA (New) */}
<section className="mb-lg">
    <button 
        onClick={() => router.push('/snap')}
        className="w-full card pressable relative overflow-hidden bg-gradient-to-r from-orange-100 to-amber-50 border-orange-200"
        style={{ padding: '20px' }}
    >
        <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-white rounded-full shadow-sm text-orange-500">
                <Icon name="Camera" size={28} />
            </div>
            <div className="text-left">
                <div className="font-bold text-lg text-gray-800">오늘의 미소 인증하기</div>
                <div className="text-sm text-gray-600">AI 손주가 활력을 분석해드려요! 📸</div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
                <Icon name="Smile" size={80} color="orange" />
            </div>
        </div>
    </button>
</section>

{/* 3. Quick Actions Grid */ }
<section className="grid grid-cols-2 gap-md mb-lg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
    <button
        className="card flex-center flex-col gap-sm pressable"
        onClick={() => router.push('/quiz')}
        style={{ padding: '20px', margin: 0, alignItems: 'start' }}
        aria-label="Start Brain Quiz"
    >
        <div className="p-2 bg-orange-50 rounded-full mb-2">
            <Icon name="Brain" size={24} color="var(--primary)" />
        </div>
        <div className="text-left">
            <div className="font-bold text-md">두뇌 퀴즈</div>
            <div className="text-xs text-secondary">+50P 받기</div>
        </div>
    </button>

    <button
        className="card flex-center flex-col gap-sm pressable"
        onClick={() => setShowExchange(true)}
        style={{ padding: '20px', margin: 0, alignItems: 'start' }}
        aria-label="Open Point Exchange"
    >
        <div className="p-2 bg-blue-50 rounded-full mb-2">
            <Icon name="Wallet" size={24} color="#0066FF" />
        </div>
        <div className="text-left">
            <div className="font-bold text-md">포인트 환전</div>
            <div className="text-xs text-secondary">{displayPoints.toLocaleString()}P 보유</div>
        </div>
    </button>
</section>

{/* ... (Family Section) ... */ }
<section className="mb-lg">
    <div className="flex-between mb-sm">
        <h2 className="h3">Family Updates</h2>
        <button
            onClick={() => router.push('/family/dashboard')}
            className="text-sm text-primary font-medium pressable p-2"
        >
            더보기
        </button>
    </div>

    <div className="card flex items-center gap-md pressable" style={{ padding: '16px' }} onClick={() => router.push('/family/dashboard')}>
        <div className="relative">
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&q=80" alt="Family Member" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-100">
                <Icon name="Heart" size={12} color="red" fill="red" />
            </div>
        </div>
        <div className="flex-1">
            <div className="text-sm text-secondary mb-1">가족의 메시지</div>
            <div className="font-medium text-primary text-base" dangerouslySetInnerHTML={{ __html: familyMessage }} />
        </div>
        <button className="btn-icon" style={{ width: 32, height: 32 }}>
            <Icon name="ChevronRight" size={20} />
        </button>
    </div>
</section>

{/* 5. Nearby Benefits */ }
<section className="mb-lg">
    <h2 className="h3 mb-md">주변 혜택</h2>
    <div className="flex flex-col gap-sm">
        {nearbyStores.slice(0, 3).map((store) => (
            <div key={store.id} className="card flex-between pressable" style={{ padding: '16px', margin: 0 }}>
                <div className="flex gap-md items-center">
                    <div style={{
                        width: 40, height: 40, borderRadius: '8px',
                        background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Icon name="Store" size={20} color="var(--text-secondary)" />
                    </div>
                    <div>
                        <div className="font-bold">{store.name}</div>
                        <div className="text-xs text-secondary">{store.category} • {store.distance}</div>
                    </div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 16px', width: 'auto', fontSize: '13px' }}>
                    쿠폰
                </button>
            </div>
        ))}
    </div>
</section>

{/* ... (Components) ... */ }
<GlobalFeed />
<LuckyPouch />
<SafetySOS />
<VoiceMailbox />
<MedicationManager />
<SafeReturn />

{/* Modals & O2O */ }
{showExchange && (
    <PayPalExchange
        onClose={() => setShowExchange(false)}
        onConvert={(amount) => setLocalPoints(prev => prev + amount)}
    />
)}
<MasilVoice steps={steps} userName={user?.displayName || '어르신'} />
{arMode && <ARMemoryLane steps={steps} onClose={() => setArMode(false)} />}

{/* Floating Action: Family Dashboard Only */ }
<VoiceModeButton />
<div className="fixed z-40" style={{ bottom: '90px', right: '20px' }}>
    <button
        onClick={() => router.push('/family/dashboard')}
        className="shadow-floating rounded-full w-14 h-14 flex-center bg-white border border-gray-100 text-primary pressable"
        aria-label="Family Dashboard"
    >
        <Icon name="Users" size={24} />
    </button>
</div>

      {/* Special Feature: Tokyo Masil Card (Visual Anchor) */}
      <section className="mb-lg" onClick={() => setArMode(true)}>
          <div className="card relative overflow-hidden h-48 flex items-end p-6 cursor-pointer group active:scale-95 transition-transform">
              <img 
                  src="/images/tokyo_tower.png" 
                  alt="Tokyo Masil" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="relative z-10 text-white w-full flex justify-between items-end">
                  <div>
                      <div className="inline-flex items-center gap-1 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-2">
                          <Icon name="Plane" size={12} color="white" />
                          <span>TRAVEL MODE</span>
                      </div>
                      <h3 className="text-2xl font-bold leading-tight">도쿄 벚꽃 산책</h3>
                      <p className="text-sm text-gray-200 mt-1">집에서 즐기는 일본 여행</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex-center border border-white/30">
                      <Icon name="ArrowRight" size={20} color="white" />
                  </div>
              </div>
          </div>
      </section>

      <InstallPrompt />
    </main>
  );
}
