'use client';

import React, { useState, useEffect } from 'react';
import Icon from './Icon';

/**
 * [Phase 3.0] WeatherActivityGuide
 * 날씨 및 미세먼지에 따라 시니어 맞춤형 활동을 제안합니다.
 */
export default function WeatherActivityGuide() {
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny', // sunny, rainy, cloudy, fine_dust
    dustLevel: 'good', // good, bad
  });

  // Mock data fetching (실제로는 OpenWeatherMap 등 연동 가능)
  useEffect(() => {
    // 50% 확률로 비가 오는 날씨 시뮬레이션
    const isRainy = Math.random() > 0.7;
    if (isRainy) {
      setWeather({ temp: 18, condition: 'rainy', dustLevel: 'good' });
    }
  }, []);

  const getGuide = () => {
    if (weather.condition === 'rainy') {
      return {
        title: '오늘은 실내 마실 어떠세요? 🏠',
        desc: '비가 오니 밖은 미끄러울 수 있어요. 거실에서 가벼운 스트레칭 10분은 어떨까요?',
        icon: 'CloudRain',
        color: 'blue'
      };
    } else if (weather.dustLevel === 'bad') {
      return {
        title: '미세먼지가 나빠요! 😷',
        desc: '오늘은 창문을 닫고 집안에서 제자리 걷기 100보에 도전해 보세요.',
        icon: 'Wind',
        color: 'gray'
      };
    } else {
      return {
        title: '걷기 참 좋은 날씨예요! ☀️',
        desc: '온도도 적당하고 미세먼지도 없어요. 동네 한 바퀴 시원하게 걸어볼까요?',
        icon: 'Sun',
        color: 'orange'
      };
    }
  };

  const guide = getGuide();

  return (
    <section className="mb-lg">
      <div className={`p-5 rounded-2xl border-2 shadow-sm transition-all bg-${guide.color}-50 border-${guide.color}-100`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full bg-white shadow-sm text-${guide.color}-500`}>
            <Icon name={guide.icon} size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900 mb-1">{guide.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{guide.desc}</p>
          </div>
        </div>
        
        <button className={`mt-4 w-full py-3 rounded-xl font-bold text-sm bg-white border border-${guide.color}-200 text-${guide.color}-700 shadow-sm active:scale-95 transition-all`}>
           {weather.condition === 'rainy' ? '실내 스트레칭 시작하기' : '마실 코스 추천받기'}
        </button>
      </div>

      <style jsx>{`
        .bg-blue-50 { background-color: #eff6ff; }
        .border-blue-100 { border-color: #dbeafe; }
        .text-blue-500 { color: #3b82f6; }
        .text-blue-700 { color: #1d4ed8; }
        .border-blue-200 { border-color: #bfdbfe; }

        .bg-orange-50 { background-color: #fffaf0; }
        .border-orange-100 { border-color: #feebc8; }
        .text-orange-500 { color: #f6ad55; }
        .text-orange-700 { color: #c05621; }
        .border-orange-200 { border-color: #fbd38d; }

        .bg-gray-50 { background-color: #f9fafb; }
        .border-gray-100 { border-color: #f3f4f6; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-700 { color: #374151; }
        .border-gray-200 { border-color: #e5e7eb; }
      `}</style>
    </section>
  );
}
