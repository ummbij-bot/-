'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import BottomBar from '../components/BottomBar';
import { gifticons, categories } from '../data/gifticons';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all' 
    ? gifticons 
    : gifticons.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10 px-6 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">포인트 샵</h1>
        <div className="bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-100">
          <Icon name="Coins" size={16} className="text-orange-500" />
          <span className="font-extrabold text-orange-600 text-sm">3,450 P</span>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="pt-20 px-6 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all ${
                        selectedCategory === cat.id 
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105' 
                        : 'bg-white text-gray-500 border border-gray-100'
                    }`}
                >
                    <Icon name={cat.icon} size={18} />
                    <span className="font-bold">{cat.name}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Item List */}
      <main className="px-6 grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
            <Link href={`/shop/gifticon/${item.id}`} key={item.id}>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <span className="text-xs text-gray-400 font-bold mb-1">{item.brandName}</span>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                            <span className="font-black text-orange-600 text-lg">{item.price.toLocaleString()} P</span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex-center text-gray-300">
                                <Icon name="ChevronRight" size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
      </main>

      <BottomBar />
    </div>
  );
}
