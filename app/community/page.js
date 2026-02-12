'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';

export default function CommunityPage() {
  const { user, loading, language, steps } = useVitality();
  const router = useRouter();

  // Mock Data for "Dong" Ranking
  const [ranking, setRanking] = useState([]);
  const [myRank, setMyRank] = useState(0);

  useEffect(() => {
    // Simulate fetching local data
    const mockData = [
      { id: 1, name: '김철수', steps: 12500, avatar: '👴' },
      { id: 2, name: '이영희', steps: 11200, avatar: '👵' },
      { id: 3, name: '박민수', steps: 9800, avatar: '🧓' },
      { id: 4, name: '최자영', steps: 8500, avatar: '👵' },
      { id: 5, name: '정수빈', steps: 7200, avatar: '👴' },
    ];
    
    // Add current user to ranking simulation
    if (user) {
        const userEntry = { 
            id: 999, 
            name: user.displayName || '나', 
            steps: steps, 
            avatar: '😊',
            isMe: true
        };
        const newRanking = [...mockData, userEntry].sort((a, b) => b.steps - a.steps);
        setRanking(newRanking);
        setMyRank(newRanking.findIndex(r => r.id === 999) + 1);
    } else {
        setRanking(mockData);
    }

  }, [user, steps]);

  if (loading) return <div className="loading-screen">동네 소식 불러오는 중...</div>;

  const t = (ko, ja) => language === 'ko' ? ko : ja;

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
          {t('우리 동네 마실 랭킹 🏆', '近所の散歩ランキング 🏆')}
        </h1>
        <p className="text-muted">
          {t('종로구 혜화동 이웃들과 함께해요!', 'へファ洞の近所の人たちと一緒に！')}
        </p>
      </header>

      {/* [Phase 22] Government Safety Notice */}
      <div className="bg-red-50 border border-red-100 p-3 rounded-lg mb-lg flex items-start gap-3 animate-pulse">
        <span className="text-xl">📢</span>
        <div>
            <div className="text-xs font-bold text-red-600 mb-1">
                {language === 'ko' ? '종로구청 안전 문자 (Safety Alert)' : 'ジョンロ区役所 安全メール'}
            </div>
            <p className="text-sm text-gray-800 leading-tight">
                {language === 'ko' 
                    ? '오늘 낮 최고 기온 35도 예상. 야외 활동 시 충분한 수분을 섭취하고 그늘에서 휴식하세요.' 
                    : '今日の日中の最高気温35度予想。野外活動時は十分な水分を摂取し、日陰で休息してください。'}
            </p>
        </div>
      </div>

      {/* My Rank Card */}
      <section className="card-mint mb-lg animate-float" style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 'var(--fs-sm)', opacity: 0.9 }}>{t('나의 현재 순위', '私の現在の順位')}</div>
          <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 900 }}>
            {myRank}{t('위', '位')} <span style={{ fontSize: 'var(--fs-md)', fontWeight: 400 }}>/ {ranking.length}명</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--fs-sm)', opacity: 0.9 }}>{t('오늘 걸음', '今日の歩数')}</div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>{steps.toLocaleString()}</div>
        </div>
      </section>

      {/* Ranking List */}
      <section className="card mb-lg" style={{ padding: '0' }}>
        {ranking.map((item, index) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '16px 20px', 
            borderBottom: index !== ranking.length - 1 ? '1px solid var(--gray-100)' : 'none',
            background: item.isMe ? 'rgba(46, 204, 113, 0.1)' : 'white'
          }}>
            <div style={{ width: '30px', fontWeight: 700, fontSize: 'var(--fs-md)', color: index < 3 ? 'var(--dark-gold)' : 'var(--gray-400)' }}>
              {index + 1}
            </div>
            <div style={{ fontSize: '32px', marginRight: '12px' }}>{item.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.name} {item.isMe && <span className="badge badge-mint" style={{ fontSize: '10px', marginLeft: '4px' }}>Me</span>}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{t('열심히 걷는 중 🔥', '熱心に歩いています 🔥')}</div>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
              {item.steps.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Cheering Button */}
      <button 
        className="btn btn-gold btn-full mb-lg" 
        onClick={() => alert(t('이웃들에게 응원을 보냈습니다! 👏', '近所の人たちに応援を送りました！👏'))}
      >
        {t('이웃 응원하기 👋', '近所の人を応援する 👋')}
      </button>

      <BottomBar />
    </main>
  );
}
