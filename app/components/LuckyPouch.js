'use client';

import { useState, useEffect } from 'react';
import { useVitality } from '../context/VitalityContext';
import Icon from './Icon';

export default function LuckyPouch() {
  const { addPoints, language, triggerHaptic } = useVitality();
  const [isOpen, setIsOpen] = useState(false);
  const [canOpen, setCanOpen] = useState(true);
  const [fortune, setFortune] = useState('');

  const fortunes = {
    ko: [
      "오늘도 건강한 하루 되세요!",
      "물 한 잔이 보약입니다.",
      "웃음이 최고의 명약입니다.",
      "햇볕을 쬐면 뼈가 튼튼해져요!",
      "천천히 걷는 것도 좋은 운동입니다."
    ],
    ja: [
      "今日も健康な一日を！",
      "一杯の水は補薬です。",
      "笑顔は最高の良薬です。",
      "日光を浴びると骨が丈夫になります！",
      "ゆっくり歩くのも良い運動です。"
    ]
  };

  const handleOpen = () => {
    if (!canOpen) return;

    triggerHaptic();
    setIsOpen(true);
    setCanOpen(false);
    
    // Reward logic
    const rewardPoints = Math.floor(Math.random() * 10) + 1; // 1~10 points
    addPoints(rewardPoints);

    // Fortune logic
    const msgs = fortunes[language] || fortunes['ko'];
    setFortune(`${msgs[Math.floor(Math.random() * msgs.length)]}`);
  };

  if (!canOpen && !isOpen) return null;

  return (
    <div className="lucky-pouch-container fixed bottom-32 right-4 z-40">
      {!isOpen ? (
        <button 
          onClick={handleOpen}
          className="w-12 h-12 bg-gray-900 rounded-full flex-center shadow-lg border-2 border-white animate-bounce-slow"
        >
          <Icon name="Gift" size={24} color="white" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 w-64 text-center animate-in fade-in zoom-in duration-200">
           <div className="w-12 h-12 bg-orange-50 rounded-full flex-center mx-auto mb-3">
              <Icon name="Sparkles" size={24} color="var(--primary)" />
           </div>
           <p className="font-bold text-gray-900 mb-1">행운의 포인트 도착!</p>
           <p className="text-sm text-gray-500 mb-4">{fortune}</p>
           
           <button 
             onClick={() => setIsOpen(false)}
             className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold"
           >
             닫기
           </button>
        </div>
      )}
    </div>
  );
}
