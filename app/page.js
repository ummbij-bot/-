'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from './context/VitalityContext';
import { storeData } from '../lib/data';
import Icon from './components/Icon';
import BottomBar from './components/BottomBar';
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
    t // i18n helper
  } = useVitality();
  const router = useRouter();
  const [arMode, setArMode] = useState(false);
  const [showExchange, setShowExchange] = useState(false);
  const [localPoints, setLocalPoints] = useState(0);

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
        <p className="text-body text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('cheer')}
        </p>
    </div>

    <div className="flex-center gap-md">
        <button
            onClick={() => setLanguage(language === 'ko' ? 'ja' : 'ko')}
            className="btn-neutral pressable"
            style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '20px', minHeight: '44px' }}
            aria-label={language === 'ko' ? "Switch to Japanese" : "한국어로 변경"}
        >
            {language === 'ko' ? 'JP' : 'KR'}
        </button>
        <button
            onClick={() => router.push('/device')}
            className="flex-center pressable"
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: '1px solid var(--border)' }}
            aria-label="Settings"
        >
            <Icon name="Settings" size={24} color="var(--text-primary)" />
        </button>
    </div>
</header>

{/* ... (Stat Card remains mostly same, maybe add pressable if clickable) ... */ }
<section className="card mb-lg relative overflow-hidden">
    <div className="flex-between items-start mb-md">
        <div>
            <span className="text-sm font-bold text-primary mb-1 block">TODAY</span>
            <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px', lineHeight: 1 }}>
                    {steps.toLocaleString()}
                </span>
                <span className="text-sm text-secondary">/ {goal.toLocaleString()}</span>
            </div>
        </div>
        <div style={{ width: 60, height: 60 }}>
            <CircleProgress current={steps} goal={goal} size={60} strokeWidth={6} color="var(--primary)" />
        </div>
    </div>

    <div className="flex gap-md mt-4 pt-4 border-t border-gray-100">
        <div className="flex-1">
            <div className="text-xs text-secondary mb-1">소모 칼로리</div>
            <div className="font-bold">142 kcal</div>
        </div>
        <div className="flex-1">
            <div className="text-xs text-secondary mb-1">이동 거리</div>
            <div className="font-bold">1.2 km</div>
        </div>
        <div className="flex-1">
            <div className="text-xs text-secondary mb-1">활동 시간</div>
            <div className="font-bold">45 min</div>
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
            className="flex-center bg-green-50 text-green-600 rounded-full w-10 h-10 pressable"
            aria-label="Share"
        >
            <Icon name="Share2" size={20} />
        </button>
    </div>
</section>

      
      {/* 1.5 Daily Mission (PM Agent) */}
      <MissionCard />

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
            <div className="text-sm text-secondary mb-1">손녀님의 메시지</div>
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
<BottomBar />
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
