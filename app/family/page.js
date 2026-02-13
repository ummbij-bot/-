'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import { toast } from 'react-hot-toast';
import Icon from '../components/Icon';

export default function FamilyPage() {
  const { user, language, t } = useVitality();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('connect'); // connect | gifts | governance
  const [inviteCode, setInviteCode] = useState('');
  
  const gifts = [
    { id: 1, from: '둘째 딸', item: '정관장 홍삼정', image: '🎁', date: '2024.02.10', used: false },
    { id: 2, from: '첫째 아들', item: '나이키 에어맥스', image: '👟', date: '2024.02.05', used: true },
  ];

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
    toast.success(language === 'ko' ? '초대 코드가 생성되었습니다!' : '招待コードが生成されました！');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success(language === 'ko' ? '코드가 복사되었습니다.' : 'コードがコピーされました。');
  };

  const handleUseGift = (id) => {
    toast.success(language === 'ko' ? '선물 사용 처리가 완료되었습니다!' : 'ギフトの使用が完了しました！');
  };

  return (
    <main className="page-content">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">{language === 'ko' ? '우리 가족' : '家族'}</h1>
          <p className="text-gray-500 font-bold">{language === 'ko' ? '가족과 함께 건강을 나눠요' : '家族と一緒に健康を共有しましょう'}</p>
        </div>
        <div className="w-16 h-16 bg-orange-100 rounded-full flex-center text-3xl shadow-inner">👨‍👩‍👧‍👦</div>
      </header>

      {/* Modern Triple Tab */}
      <div className="flex mb-10 bg-gray-100 p-2 rounded-[24px]">
        <button 
          onClick={() => setActiveTab('connect')}
          className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${activeTab === 'connect' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400'}`}
        >
          {language === 'ko' ? '연결하기' : 'つなぐ'}
        </button>
        <button 
          onClick={() => setActiveTab('gifts')}
          className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${activeTab === 'gifts' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400'}`}
        >
          {language === 'ko' ? '선물함' : 'ギフト'}
        </button>
        <button 
          onClick={() => setActiveTab('governance')}
          className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${activeTab === 'governance' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400'}`}
        >
          {language === 'ko' ? '가족 투표' : '投票'}
        </button>
      </div>

      {activeTab === 'connect' && (
        <section className="animate-fade-in">
             <div className="card text-center py-10 mb-lg">
                <div className="text-6xl mb-4">📱</div>
                 <h3 className="text-2xl font-black mb-3">{language === 'ko' ? '초대 코드를 알려주세요' : '招待コードを送ってください'}</h3>
                 <p className="text-lg font-bold text-gray-500 mb-8 px-6 leading-relaxed">
                    {language === 'ko' 
                        ? '가족과 연결되면 매일의 건강 상태를\n자녀가 확인하고 선물을 보낼 수 있어요.' 
                        : '家族がつながると、両親の健康状態を確認することができます。'}
                 </p>

                 {inviteCode ? (
                     <div className="bg-orange-50 p-8 rounded-[32px] mx-4 border-4 border-orange-100 shadow-inner">
                         <div className="text-md text-orange-600 font-black mb-3 uppercase tracking-widest">초대 코드</div>
                         <div className="text-5xl font-black tracking-[8px] mb-8 text-orange-900">{inviteCode}</div>
                         <button className="w-full py-6 bg-orange-600 text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all" onClick={copyCode}>
                             {language === 'ko' ? '코드 소문내기' : 'コードをコピー'}
                         </button>
                     </div>
                 ) : (
                     <button className="px-10 py-6 bg-gray-900 text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all" onClick={generateCode}>
                         {language === 'ko' ? '번호 만들기' : 'コード生成'}
                     </button>
                 )}
             </div>

             <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[32px] shadow-2xl text-white">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-2xl font-black mb-2">{language === 'ko' ? '프리미엄 가족 케어' : '💎 プレミアムケア'}</h3>
                        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">Elite Membership</div>
                     </div>
                     <span className="text-4xl">💎</span>
                 </div>
                 <button className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all" onClick={() => router.push('/premium')}>
                     {language === 'ko' ? '자녀에게 요청하기' : '子供にリクエスト'}
                 </button>
              </div>
        </section>
      )}

      {activeTab === 'gifts' && (
        <section className="animate-fade-in flex flex-col gap-4">
            {gifts.map(gift => (
                <div key={gift.id} className={`bg-white rounded-[32px] p-6 flex items-center gap-6 shadow-md border-2 transition-all active:scale-95 ${gift.used ? 'opacity-50 grayscale' : 'border-orange-100'}`}>
                    <div className="text-5xl bg-orange-50 w-24 h-24 flex-center rounded-3xl shadow-inner">{gift.image}</div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-black uppercase">{gift.from}</span>
                            <span className="text-sm text-gray-400 font-bold">{gift.date}</span>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 break-keep">{gift.item}</h4>
                    </div>
                    {!gift.used && (
                        <button className="px-6 py-4 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg active:scale-90" onClick={() => handleUseGift(gift.id)}>
                            사용
                        </button>
                    )}
                </div>
            ))}
        </section>
      )}

      {activeTab === 'governance' && (
        <section className="animate-fade-in flex flex-col gap-6">
            <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100">
                <h3 className="text-xl font-black text-orange-900 mb-2">가족 의사결정 (Elite) 🗳️</h3>
                <p className="text-sm font-bold text-orange-700 opacity-80 leading-relaxed">
                    가족이 함께 모은 포인트를 어디에 쓸지,\n이번 주말 어디로 산책갈지 함께 결정해요.
                </p>
            </div>

            <div className="card p-8 border-2 border-gray-100">
                <div className="flex justify-between items-start mb-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-black uppercase">진행 중</span>
                    <span className="text-xs text-gray-400 font-bold italic">D-2 남음</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">이번 주말 가족 산책 장소</h4>
                <p className="text-lg font-bold text-gray-500 mb-8">서울숲 (경치 좋음) vs 청계천 (평탄함)</p>
                <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-white border-4 border-gray-100 text-gray-900 rounded-2xl font-black text-xl hover:border-orange-400 transition-all shadow-sm active:scale-95">
                        서울숲 🌲 (2표)
                    </button>
                    <button className="flex-1 py-5 bg-orange-600 border-4 border-orange-600 text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">
                        청계천 🌊 (3표)
                    </button>
                </div>
            </div>

            <button className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-2xl shadow-2xl active:scale-95 transition-all mt-4">
                새 안건 제안하기 +
            </button>
        </section>
      )}
    </main>
  );
}
