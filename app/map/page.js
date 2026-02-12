'use client';

import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';
import Icon from '../components/Icon';
import { storeData } from '../../lib/data';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MapPage() {
  const { user, loading, language, t } = useVitality();
  const router = useRouter();

  // 1. Google Maps API Integration Placeholder
  const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  useEffect(() => {
    if (!MAPS_API_KEY && !document.querySelector('script[src*="maps.googleapis.com"]')) {
       // Simulation mode logic or script injection
    }
  }, [MAPS_API_KEY]);

  if (loading) return <div className="flex-center h-screen">Loading...</div>;
  if (!user) return null;

  const stores = storeData[language] || storeData['ko'];
  const currentStore = stores[0];

  return (
    <main className="page-content p-0 overflow-hidden relative" style={{ padding: 0, height: '100dvh' }}>
      
      {/* Search Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none">
         <div className="pointer-events-auto bg-white rounded-xl shadow-lg flex items-center p-3 gap-3 border border-gray-100">
            <Icon name="Search" size={20} color="var(--text-tertiary)" />
            <input 
                type="text" 
                placeholder="장소, 주소 검색" 
                className="flex-1 bg-transparent border-none outline-none text-base"
            />
         </div>
         {/* Filter Chips */}
         <div className="pointer-events-auto flex gap-2 mt-3 overflow-x-auto no-scrollbar">
            <button className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                <Icon name="Zap" size={12} /> 전체
            </button>
            <button className="bg-white text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-gray-200 flex items-center gap-1">
                <Icon name="Coffee" size={12} /> 카페
            </button>
             <button className="bg-white text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-gray-200 flex items-center gap-1">
                <Icon name="Cross" size={12} /> 약국
            </button>
         </div>
      </div>

      {/* Map Container (Simulation) */}
      <div className="w-full h-full bg-gray-100 relative">
         {/* Simulated Map Background */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:16px_16px]"></div>
         
         {/* Simulated Pins */}
         <div className="absolute top-1/3 left-1/4">
             <div className="flex flex-col items-center">
                 <div className="w-8 h-8 bg-orange-500 rounded-full flex-center shadow-lg border-2 border-white text-white">
                    <Icon name="MapPin" size={16} />
                 </div>
                 <span className="text-xs font-bold text-gray-800 mt-1 bg-white px-1 rounded shadow-sm">교보약국</span>
             </div>
         </div>

         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex flex-col items-center">
                 <div className="w-10 h-10 bg-black rounded-full flex-center shadow-xl border-2 border-white text-white animate-bounce-slow">
                    <Icon name="Navigation" size={20} />
                 </div>
             </div>
         </div>
      </div>

      {/* Store Card Bottom Sheet */}
      <div className="absolute bottom-20 left-4 right-4 z-30">
        <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentStore.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{currentStore.category} · {currentStore.distance}</p>
                </div>
                <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">
                    + {currentStore.points} P
                </div>
            </div>

            <div className="flex gap-3 mb-4">
                <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm">
                    길찾기
                </button>
                <button className="w-12 h-12 flex-center bg-gray-100 rounded-xl text-gray-600">
                    <Icon name="Phone" size={20} />
                </button>
                <button className="w-12 h-12 flex-center bg-gray-100 rounded-xl text-gray-600">
                    <Icon name="Share" size={20} />
                </button>
            </div>
            
            <div className="text-xs text-gray-400 text-center">
                오늘 {currentStore.hours}까지 영업
            </div>
        </div>
      </div>

      <BottomBar />
    </main>
  );
}
