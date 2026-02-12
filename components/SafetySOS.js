'use client';

import { useState, useEffect } from 'react';

/**
 * SafetySOS Component
 * Emergency button with Fall Detection simulation.
 */
export default function SafetySOS() {
  const [isFallMode, setIsFallMode] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      alert('119 구조대와 보호자에게 긴급 호출을 발신했습니다. 🚑');
      setCountdown(null);
      setIsFallMode(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const triggerFallSimulation = () => {
    setCountdown(5);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <button 
        onClick={() => setIsFallMode(true)}
        className="fixed bottom-24 right-4 z-40 bg-red-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center font-bold text-xs animate-pulse border-2 border-white"
        style={{ boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)' }}
      >
        SOS
      </button>

      {/* Fall Detection / SOS Modal */}
      {isFallMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900/90 backdrop-blur-sm p-6 animate-ping-fast">
            <div className={`bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl ${countdown !== null ? 'animate-shake' : ''}`}>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🚨</span>
                </div>
                
                <h2 className="text-2xl font-black text-red-600 mb-2">
                    {countdown !== null ? '낙상이 감지되었습니다!' : '긴급 호출'}
                </h2>
                
                <p className="text-gray-600 mb-6">
                    {countdown !== null 
                        ? `${countdown}초 후 자동으로 119에 연결됩니다.` 
                        : '의식이 있으신가요? 긴급 상황 시 버튼을 누르세요.'}
                </p>

                {countdown !== null ? (
                    <div className="text-5xl font-black text-red-600 mb-8">{countdown}</div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                         <button 
                            onClick={triggerFallSimulation}
                            className="bg-gray-100 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200"
                        >
                            낙상 시뮬레이션
                        </button>
                        <button 
                            onClick={() => setCountdown(5)}
                            className="bg-red-600 py-3 rounded-xl font-bold text-white shadow-lg hover:bg-red-700"
                        >
                            즉시 호출 (119)
                        </button>
                    </div>
                )}

                <button 
                    onClick={() => { setIsFallMode(false); setCountdown(null); }}
                    className="w-full py-3 rounded-xl font-bold border-2 border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                    취소 (괜찮아요)
                </button>
            </div>
        </div>
      )}
    </>
  );
}
