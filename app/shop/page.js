'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import { gifticons, categories } from '../data/gifticons';
import { useVitality } from '../context/VitalityContext';

export default function Shop() {
  const { points } = useVitality(); // 실제 포인트!
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all' 
    ? gifticons 
    : gifticons.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-20 px-6 py-5 shadow-md flex justify-between items-center" style={{ height: 'var(--header-height)' }}>
        <h1 className="text-2xl font-black text-gray-900">포인트 상점</h1>
        <div className="bg-orange-600 px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm">
          <Icon name="Coins" size={20} className="text-white" />
          <span className="font-black text-white text-lg">{points?.toLocaleString() || 0} P</span>
        </div>
      </header>

      {/* [Phase 4.0] Dynamic Weather Coupon Section */}
      <div className="pt-24 px-6 mb-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-white/20 w-fit px-2 py-0.5 rounded-full mb-2">
                <Icon name="Zap" size={14} /> 맞춤 소식
              </div>
              <h2 className="text-2xl font-black leading-tight">오늘은 따뜻한<br/>쌍화차 어떠세요? ☕</h2>
              <p className="text-sm opacity-90 font-bold mt-2">비 오는 날 보너스 적립!</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex-center animate-bounce">
              <Icon name="Coffee" size={36} />
            </div>
          </div>
          <button className="w-full py-5 bg-white text-orange-600 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-xl">
            추천 선물 보러가기
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-3xl whitespace-nowrap transition-all border-2 ${
                        selectedCategory === cat.id 
                        ? 'bg-orange-600 border-orange-600 text-white shadow-xl scale-105' 
                        : 'bg-white text-gray-500 border-gray-100'
                    }`}
                >
                    <Icon name={cat.icon} size={22} />
                    <span className="font-black text-lg">{cat.name}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Item List */}
      <main className="px-6 grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
            <Link href={`/shop/gifticon/${item.id}`} key={item.id}>
                <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-transparent hover:border-orange-200 transition-all flex gap-5 active:scale-95">
                    <div className="w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden shrink-0 shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <span className="text-sm text-gray-400 font-black mb-1">{item.brandName}</span>
                        <h3 className="text-xl font-black text-gray-900 leading-tight mb-3">{item.name}</h3>
                        <div className="flex items-center justify-between">
                            <span className="font-black text-orange-600 text-2xl">{item.price.toLocaleString()} P</span>
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex-center text-gray-400">
                                <Icon name="ChevronRight" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
      </main>

    </div>
  );
}
