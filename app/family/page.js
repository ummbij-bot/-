'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';

export default function FamilyPage() {
  const { user, language, t } = useVitality();
  const router = useRouter();

  const [inviteCode, setInviteCode] = useState('');
  const [activeTab, setActiveTab] = useState('connect'); // connect | gifts
  const [gifts, setGifts] = useState([
    { id: 1, from: '아들', item: '스타벅스 커피 쿠폰', image: '☕', date: '2025.10.23', used: false },
    { id: 2, from: '딸', item: '정관장 홍삼 세트', image: '🎁', date: '2025.10.20', used: true },
  ]);

  const generateCode = () => {
    // Generate Random 6-digit Code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
  };

  const copyCode = () => {
    // navigator.clipboard.writeText(inviteCode); // Might require secure context
    alert(language === 'ko' ? `초대 코드(${inviteCode})가 복사되었습니다.\n카카오톡으로 가족에게 보내보세요!` : `招待コード(${inviteCode})がコピーされました。`);
  };

  const handleUseGift = (id) => {
    if(confirm(language === 'ko' ? '이 쿠폰을 사용하시겠습니까?' : 'このクーポンを使用しますか？')) {
        setGifts(prev => prev.map(g => g.id === id ? { ...g, used: true } : g));
        alert(language === 'ko' ? '쿠폰이 사용 처리되었습니다.' : 'クーポンが使用されました。');
    }
  };

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
          {language === 'ko' ? '가족 케어 👨‍👩‍👧‍👦' : 'ファミリーケア 👨‍👩‍👧‍👦'}
        </h1>
        <p className="text-muted">
          {language === 'ko' ? '자녀와 연결하고 효도 선물을 받으세요.' : '子供とつながって親孝行プレゼントを受け取りましょう。'}
        </p>
      </header>
      
      {/* Tabs */}
      <div className="flex mb-lg bg-gray-100 p-1 rounded-xl">
        <button 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'connect' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('connect')}
        >
            {language === 'ko' ? '가족 연결' : '家族接続'}
        </button>
        <button 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'gifts' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('gifts')}
        >
            {language === 'ko' ? '받은 선물함' : 'プレゼントボックス'}
        </button>
      </div>

      {activeTab === 'connect' ? (
        <section className="animate-fade-in">
             <div className="card text-center py-10 mb-lg">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="fw-bold mb-2">{language === 'ko' ? '자녀에게 초대 코드를 보내세요' : '子供に招待コードを送ってください'}</h3>
                <p className="text-muted text-sm mb-6 px-4">
                    {language === 'ko' 
                        ? '가족이 연결되면 부모님의 건강 상태를 확인하고, 위급 시 알림을 받을 수 있습니다.' 
                        : '家族がつながると、両親の健康状態を確認し、緊急時に通知を受け取ることができます。'}
                </p>

                {inviteCode ? (
                    <div className="bg-orange-50 p-6 rounded-xl mx-4 border-2 border-orange-200">
                        <div className="text-sm text-orange-600 font-bold mb-2">초대 코드 (Invite Code)</div>
                        <div className="text-4xl font-black tracking-widest mb-4">{inviteCode}</div>
                        <button className="btn btn-gold btn-full" onClick={copyCode}>
                            {language === 'ko' ? '코드 복사하기' : 'コードをコピー'}
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-dark" style={{ minWidth: '200px' }} onClick={generateCode}>
                        {language === 'ko' ? '초대 코드 생성하기' : '招待コード生成'}
                    </button>
                )}
             </div>

             {/* Subscription Upsell */}
             <div className="card-mint p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="fw-bold text-lg">{language === 'ko' ? '💎 프리미엄 케어 구독' : '💎 プレミアムケア購読'}</h3>
                    <span className="badge badge-white">BETA</span>
                </div>
                <p className="text-sm opacity-80 mb-4">
                    {language === 'ko' 
                        ? '월 4,900원으로 24시간 관제 서비스와 전문 의료 상담을 이용해보세요. (자녀 카드로 결제 가능)' 
                        : '月4,900ウォンで24時間管制サービスと専門医療相談を利用してみてください。'}
                </p>
                <button className="btn btn-white btn-full text-sm" onClick={() => router.push('/premium')}>
                    {language === 'ko' ? '자녀에게 결제 요청하기' : '子供に決済をリクエスト'}
                </button>
             </div>
        </section>
      ) : (
        <section className="animate-fade-in flex flex-col gap-4">
            {gifts.map(gift => (
                <div key={gift.id} className={`card p-4 flex items-center gap-4 ${gift.used ? 'opacity-60 bg-gray-50' : 'border-l-4 border-orange-400'}`}>
                    <div className="text-4xl bg-gray-100 p-3 rounded-full">{gift.image}</div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="badge badge-gold" style={{ fontSize: '10px' }}>FROM: {gift.from}</span>
                            <span className="text-xs text-gray-400">{gift.date}</span>
                        </div>
                        <h4 className="fw-bold">{gift.item}</h4>
                    </div>
                    {!gift.used && (
                        <button className="btn btn-sm btn-outline" onClick={() => handleUseGift(gift.id)}>
                            사용
                        </button>
                    )}
                    {gift.used && <span className="text-xs font-bold text-gray-400">사용완료</span>}
                </div>
            ))}
            <div className="text-center text-sm text-gray-400 mt-4">
                {language === 'ko' ? '최근 6개월 내역만 표시됩니다.' : '過去6ヶ月の履歴のみ表示されます。'}
            </div>
        </section>
      )}

      <BottomBar />
    </main>
  );
}
