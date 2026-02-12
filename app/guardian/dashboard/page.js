'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../../components/Icon';

export default function GuardianDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [parentData, setParentData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, location, gallery

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('isGuardian')) {
      router.push('/guardian/login');
      return;
    }

    // Mock Data Load
    setTimeout(() => {
      setParentData({
        name: '김영희',
        lastActive: '10분 전',
        status: 'walking', // walking, resting, sleeping
        steps: { current: 4832, goal: 6000 },
        location: '종묘 교보약국 근처',
        battery: 82,
        snapshots: [
            { id: 1, url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', score: 92, comment: "할머니! 오늘 표정이 너무 밝으세요.", time: '1시간 전' },
            { id: 2, url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80', score: 85, comment: "조금 피곤해 보이네요. 물 자주 드세요!", time: '어제' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [router]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex-center text-gray-400">부모님 데이터를 불러오는 중...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-6 py-5 shadow-sm sticky top-0 z-30 flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
                {parentData.name}님의 안부
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </h1>
            <p className="text-xs text-gray-500">마지막 활동: {parentData.lastActive}</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
            <Icon name="Battery" size={14} />
            {parentData.battery}%
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 1. Status Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div>
                     <span className="text-sm text-gray-500 font-medium block mb-1">오늘의 걸음</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-gray-900">{parentData.steps.current.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">/ {parentData.steps.goal.toLocaleString()}보</span>
                     </div>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex-center text-orange-500">
                    <Icon name="Activity" size={24} />
                </div>
            </div>
            
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${(parentData.steps.current / parentData.steps.goal) * 100}%` }}
                />
            </div>
            <p className="mt-3 text-sm text-gray-600 flex items-center gap-1.5">
                <Icon name="TrendingUp" size={16} color="green" />
                평소보다 <span className="font-bold text-green-600">12% 더</span> 걷고 계세요!
            </p>
        </section>

        {/* 2. Map & Location Status */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <Icon name="MapPin" size={20} color="var(--primary)" />
                <h2 className="font-bold text-gray-800">현재 위치</h2>
            </div>
            <div className="rounded-xl overflow-hidden bg-blue-50 h-32 flex-center flex-col text-blue-400 mb-3 border border-blue-100">
                <Icon name="Map" size={32} className="mb-2 opacity-50" />
                <span className="text-xs font-bold text-blue-500">위치: {parentData.location}</span>
                <span className="text-[10px] mt-1">실시간 경로 추적 중</span>
            </div>
            <div className="flex gap-2">
                 <button className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold flex-center gap-1 active:scale-95 transition-transform">
                    <Icon name="Phone" size={16} />
                    전화 걸기
                 </button>
                 <button className="flex-1 py-3 bg-primary text-white rounded-xl text-xs font-bold flex-center gap-1 shadow-sm active:scale-95 transition-transform">
                    <Icon name="Navigation" size={16} />
                    길찾기
                 </button>
            </div>
        </section>
        
        {/* 3. Family Snap Feed */}
        <section>
            <div className="flex justify-between items-center mb-3 px-1">
                <h2 className="font-bold text-gray-800 text-lg">📸 활력 인증샷</h2>
                <span className="text-xs text-primary font-bold bg-white px-2 py-1 rounded-md shadow-sm border border-orange-100">
                    NEW 2
                </span>
            </div>
            
            <div className="space-y-4">
                {parentData.snapshots.map(photo => (
                    <div key={photo.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="relative aspect-video bg-gray-200">
                             <img src={photo.url} alt="Walk" className="w-full h-full object-cover" />
                             <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold">
                                {photo.time}
                             </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                     <span className="text-2xl">😍</span>
                                     <div className="text-sm">
                                        <span className="font-bold text-gray-900">활력 점수</span>
                                        <span className="ml-1 text-primary font-black">{photo.score}점</span>
                                     </div>
                                </div>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Icon name="Heart" size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <span className="font-bold text-xs text-orange-500 block mb-1">AI 손주 코멘트</span>
                                {photo.comment}
                            </p>
                            
                            {/* Reply Input */}
                            <div className="mt-3 flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="어머니께 댓글을 남겨주세요..." 
                                    className="flex-1 bg-gray-100 border-none rounded-full px-4 text-xs focus:ring-1 focus:ring-primary"
                                />
                                <button className="w-8 h-8 rounded-full bg-primary flex-center text-white shrink-0">
                                    <Icon name="Send" size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </main>
  );
}
