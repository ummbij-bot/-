'use client';

import { useVitality } from '../context/VitalityContext';
import Icon from '../components/Icon';
import { storeData } from '../../lib/data';
import { globalMapData, getNearestCityData } from '../../lib/api/mapData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MapPage() {
  const { user, loading, language, t } = useVitality();
  const router = useRouter();
  const [currentCity, setCurrentCity] = useState(globalMapData.seoul);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // 1. Google Maps API Integration Placeholder
  const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const city = getNearestCityData(pos.coords.latitude, pos.coords.longitude);
        setCurrentCity(city);
      });
    }
  }, []);

  if (loading) return <div className="flex-center h-screen">Loading...</div>;
  if (!user) return null;

  const stores = storeData[language] || storeData['ko'];
  const displaySpot = selectedSpot || currentCity.spots[0];

  return (
    <main className="page-content p-0 overflow-hidden relative" style={{ padding: 0, height: '100dvh' }}>
      
      {/* Search Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-white/90 to-transparent pointer-events-none">
         <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl flex items-center p-5 gap-4 border-2 border-gray-100">
            <Icon name="Search" size={24} color="var(--primary)" />
            <input 
                type="text" 
                placeholder="어디로 가고 싶으신가요?" 
                className="flex-1 bg-transparent border-none outline-none text-xl font-bold placeholder:text-gray-300"
            />
         </div>
          {/* City Selector */}
          <div className="pointer-events-auto flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-2">
            {Object.entries(globalMapData).map(([key, city]) => (
              <button 
                key={key}
                onClick={() => {
                  setCurrentCity(city);
                  setSelectedSpot(null);
                }}
                className={`px-6 py-3 rounded-full text-lg font-black transition-all shadow-md active:scale-95 ${currentCity.name === city.name ? 'bg-orange-600 text-white' : 'bg-white text-gray-500 border-2 border-gray-100'}`}
              >
                {city.name}
              </button>
            ))}
          </div>
      </div>

      {/* Map Container (Simulation) */}
      <div className="w-full h-full bg-gray-100 relative">
         {/* Simulated Map Background */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:16px_16px]"></div>

         {/* Global Markers */}
         {currentCity.spots.map((spot) => (
            <div 
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className="absolute transition-all cursor-pointer"
              style={{ 
                top: `${20 + Math.random() * 50}%`,
                left: `${20 + Math.random() * 50}%` 
              }}
            >
               <div className="flex flex-col items-center group">
                   <div className={`w-14 h-14 rounded-full flex-center shadow-2xl border-4 border-white text-white transform active:scale-125 transition-transform ${spot.type === 'trail' ? 'bg-green-600' : spot.type === 'cafe' ? 'bg-orange-600' : 'bg-blue-600'}`}>
                      <Icon name={spot.type === 'trail' ? 'Navigation' : spot.type === 'cafe' ? 'Coffee' : 'MapPin'} size={28} />
                   </div>
                   <span className="text-sm font-black text-gray-900 mt-2 bg-white px-3 py-1 rounded-full shadow-lg border-2 border-orange-100">
                     {spot.name}
                   </span>
               </div>
            </div>
         ))}

         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex flex-col items-center">
                 <div className="w-10 h-10 bg-primary rounded-full flex-center shadow-2xl border-2 border-white text-white animate-bounce-slow">
                    <Icon name="Navigation" size={20} />
                 </div>
             </div>
         </div>
      </div>

      {/* Store Card Bottom Sheet */}
      <div className="absolute bottom-20 left-4 right-4 z-30">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 border border-gray-100">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">{displaySpot.name}</h2>
                    <p className="text-xl text-gray-600 font-bold mt-1">{displaySpot.tags.join(' · ')}</p>
                </div>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-md uppercase tracking-tighter">
                    Elite Map
                </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-[2rem] mb-8 border-2 border-orange-100/50">
                <p className="text-xl text-orange-900 font-bold leading-relaxed italic">" {displaySpot.desc} "</p>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 py-6 bg-gray-900 text-white rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                    <Icon name="Navigation" size={28} />
                    길 찾기
                </button>
                <div className="w-20 h-20 flex-center bg-gray-50 rounded-3xl text-gray-400 border border-gray-100">
                    <Icon name="Share2" size={32} />
                </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-300 text-center font-bold uppercase tracking-widest">
                {currentCity.name} 지역 무장애 거점 데이터 활성화됨
            </div>
        </div>
      </div>
    </main>
  );
}
