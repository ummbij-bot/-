'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import { useCommunity } from '../context/CommunityContext';
import Icon from '../components/Icon';
import { toast } from 'react-hot-toast';

export default function CommunityPage() {
  const { user, loading, language, steps, points, t } = useVitality();
  const { feed, buddies, campaigns, handleDonate } = useCommunity();
  const [activeTab, setActiveTab] = useState('local'); // 'local' or 'global'
  const router = useRouter();

  // Mock Global Data for Phase 9.0
  const globalFeed = [
    { id: 'g1', userName: 'Mary', imageUrl: null, location: 'New York, USA', aiComment: 'Fresh morning walk at Central Park!', vitalityScore: 92 },
    { id: 'g2', userName: 'Zhang', imageUrl: null, location: 'Beijing, China', aiComment: 'Great tai chi and walk combo.', vitalityScore: 88 },
    { id: 'g3', userName: 'Sato', imageUrl: null, location: 'Tokyo, Japan', aiComment: 'Cherry blossoms are beautiful!', vitalityScore: 95 },
  ];

  // Mock Data for "Dong" Ranking
  const [ranking, setRanking] = useState([]);
  const [myRank, setMyRank] = useState(0);

  useEffect(() => {
    const mockData = [
      { id: 1, name: '김철수', steps: 12500, avatar: '👴' },
      { id: 2, name: '이영희', steps: 11200, avatar: '👵' },
      { id: 3, name: '박민수', steps: 9800, avatar: '🧓' },
      { id: 4, name: '최자영', steps: 8500, avatar: '👵' },
      { id: 5, name: '정수빈', steps: 7200, avatar: '👴' },
    ];
    if (user) {
        const userEntry = { id: 999, name: user.displayName || '나', steps: steps, avatar: '😊', isMe: true };
        const newRanking = [...mockData, userEntry].sort((a, b) => b.steps - a.steps);
        setRanking(newRanking);
        setMyRank(newRanking.findIndex(r => r.id === 999) + 1);
    } else {
        setRanking(mockData);
    }
  }, [user, steps]);

  const onDonateClick = async (campaign) => {
    const amount = 1000;
    if (points < amount) {
      toast.error(language === 'ko' ? '포인트가 부족해요! 조금 더 걸어볼까요? 🏃‍♂️' : 'Not enough points! Keep walking!');
      return;
    }
    const res = await handleDonate(amount, campaign.id);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  if (loading) return <div className="loading-screen">{language === 'ko' ? '동네 소식 불러오는 중...' : 'Loading...'}</div>;

  return (
    <main className="page-content" style={{ paddingBottom: '110px' }}>
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black text-gray-800">
                {activeTab === 'local' ? t('community_title') : t('global_community_title')}
            </h1>
            <div className="bg-gray-100 p-1 rounded-full flex gap-1">
                <button 
                    onClick={() => setActiveTab('local')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'local' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
                >
                    Local
                </button>
                <button 
                    onClick={() => setActiveTab('global')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'global' ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'}`}
                >
                    Global
                </button>
            </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">
          {activeTab === 'local' 
            ? (language === 'ko' ? '종로구 혜화동 이웃들과 소통해요' : 'Connect with your local neighbors')
            : (language === 'ko' ? '전 세계 시니어들의 활기를 만나보세요' : 'Discover vitality from seniors worldwide')}
        </p>
      </header>

      {activeTab === 'local' ? (
        <>
          {/* 1. 마실 사진전 (Local Social Feed) */}
          <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-black text-gray-800 tracking-tight">{t('snap_show')}</h2>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {feed.length > 0 ? feed.map(post => (
                <div key={post.id} className="flex-none w-56 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-36 bg-gray-100 relative">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="walk" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🏞️</div>
                    )}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md text-white rounded-xl text-[10px] font-bold">
                      {post.userName}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                        <div className="text-[10px] text-primary font-black uppercase">Vitality {post.vitalityScore}%</div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Now</span>
                    </div>
                    <div className="text-xs text-gray-700 font-medium line-clamp-2 italic">"{post.aiComment || 'Keep walking!'}"</div>
                  </div>
                </div>
              )) : (
                <div className="w-full py-12 bg-white rounded-3xl flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100">
                  <span className="text-4xl mb-2">📷</span>
                  <p className="text-xs font-bold uppercase tracking-widest">{language === 'ko' ? '첫 사진의 주인공이 되어보세요!' : 'Be the first to share!'}</p>
                </div>
              )}
            </div>
          </section>

          {/* 2. 동네 마실 친구 (Nearby Matching) */}
          <section className="mb-8">
             <h2 className="text-lg font-black text-gray-800 tracking-tight mb-4">{t('buddy_matching')}</h2>
             <div className="space-y-4">
                {buddies.map(buddy => (
                  <div key={buddy.id} className="flex justify-between items-center p-4 bg-white rounded-3xl border border-gray-50 shadow-sm hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{buddy.avatar}</div>
                      <div>
                        <div className="font-black text-gray-900">{buddy.name}</div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-wider">{buddy.distance} · {buddy.status}</div>
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                      onClick={() => toast.success(t('함께 마실하기를 제안했습니다! 💌', '一緒に散歩を提案しました！💌'))}
                    >
                      {t('buddy_suggest')}
                    </button>
                  </div>
                ))}
             </div>
          </section>

          {/* 3. 명예의 전당 (Ranking) */}
          <section className="mb-8">
            <h2 className="text-lg font-black text-gray-800 tracking-tight mb-4">{t('ranking_title')}</h2>
            <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-3xl p-5 mb-4 text-white shadow-xl flex justify-between items-center">
               <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">My Status</div>
                  <div className="text-3xl font-black">{myRank} <span className="text-xs font-normal">RD</span></div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Daily Steps</div>
                  <div className="text-2xl font-black">{steps.toLocaleString()}</div>
               </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
              {ranking.map((item, index) => (
                <div key={item.id} className={`flex items-center p-4 ${index !== ranking.length - 1 ? 'border-b border-gray-50' : ''} ${item.isMe ? 'bg-primary/5' : ''}`}>
                   <div className="w-6 font-black text-gray-200 italic mr-2">{index + 1}</div>
                   <div className="text-3xl mr-4">{item.avatar}</div>
                   <div className="flex-1">
                     <div className="text-sm font-black text-gray-800">{item.name}</div>
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.steps.toLocaleString()} Steps Today</div>
                   </div>
                   {index < 3 && <div className="text-2xl">{['🥇', '🥈', '🥉'][index]}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* 4. 마실 마음 나눔 (Donation) */}
          <section className="mb-8">
            <h2 className="text-lg font-black text-gray-800 tracking-tight mb-4">{t('donation_title')}</h2>
            {campaigns.map(c => (
              <div key={c.id} className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl mb-6 relative overflow-hidden group">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">{c.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-gray-900 leading-tight mb-3">{c.title}</h3>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(c.current/c.target)*100}%` }} />
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{Math.round((c.current/c.target)*100)}% Funded</span>
                      <span className="text-[10px] font-bold text-gray-400">{c.current.toLocaleString()} / {c.target.toLocaleString()} P</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-lg hover:bg-black active:scale-95 transition-all"
                  onClick={() => onDonateClick(c)}
                >
                  {t('donate_btn')} (1,000 P)
                </button>
              </div>
            ))}
          </section>
        </>
      ) : (
        /* GLOBAL FEED (GoldenWorker) - Phase 9.0 */
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 gap-6">
              {globalFeed.map((post, idx) => (
                <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-50 flex flex-col">
                   <div className="h-56 bg-slate-100 flex items-center justify-center text-6xl relative group">
                      🌎
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6">
                        <div className="text-white font-black text-xl">{post.location}</div>
                        <div className="text-white/70 text-xs font-bold">{post.userName}</div>
                      </div>
                      <div className="absolute top-4 right-6 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">
                        GoldenWorker #{idx+1}
                      </div>
                   </div>
                   <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                         <div className="flex-1 h-2 bg-gray-100 rounded-full">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${post.vitalityScore}%` }}></div>
                         </div>
                         <span className="text-xs font-black text-secondary">{post.vitalityScore}% VIT.</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
                         <p className="text-sm text-gray-800 font-medium">"{post.aiComment}"</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                         <button className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50">👍 Cheers</button>
                         <button className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50">💬 Translate</button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-8 p-6 bg-secondary/5 rounded-3xl border border-secondary/10 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-1">Coming Soon: Global Events</h4>
              <p className="text-xs text-secondary/60 font-medium">Prepare to participate in global walking challenges!</p>
           </div>
        </div>
      )}
    </main>
  );
}
