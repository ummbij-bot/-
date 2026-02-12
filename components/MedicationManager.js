'use client';

import { useState, useEffect } from 'react';

/**
 * MedicationManager Component
 * Suggests post-meal walks and tracks medication compliance.
 */
export default function MedicationManager() {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Simulate detecting "Lunch Time" after 3 seconds for demo
    const timer = setTimeout(() => {
        setShowReminder(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showReminder) return null;

  return (
    <div className="fixed top-24 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-l-4 border-blue-500 flex items-start gap-4">
        <div className="bg-blue-100 p-2 rounded-full text-2xl">💊</div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-800 text-sm">점심 약 드실 시간이에요</h4>
            <p className="text-xs text-gray-600 mt-1 mb-2">
                약 드시고 소화도 시킬 겸, <br/>
                가까운 <strong>종묘 온실</strong>까지 걸어보실까요?
            </p>
            <div className="flex gap-2">
                <button 
                    onClick={() => setShowReminder(false)}
                    className="flex-1 bg-blue-500 text-white text-xs font-bold py-2 rounded-lg"
                >
                    네, 알겠어요
                </button>
                <button 
                    onClick={() => setShowReminder(false)}
                    className="flex-1 bg-gray-100 text-gray-500 text-xs font-bold py-2 rounded-lg"
                >
                    나중에
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
