'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';

/**
 * SafetySOS Component
 * Swiss Style Refactor
 */
export default function SafetySOS() {
  const [isFallMode, setIsFallMode] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      alert('119 구조대와 보호자에게 긴급 호출을 발신했습니다.');
      setCountdown(null);
      setIsFallMode(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <>
      {/* Floating SOS Button */}
      <button 
        onClick={() => setIsFallMode(true)}
        className="fixed bottom-20 left-4 z-40 bg-red-500 text-white w-12 h-12 rounded-full shadow-lg flex-center border-2 border-white"
      >
        <span className="font-bold text-xs">SOS</span>
      </button>

      {/* Fall Detection / SOS Modal */}
      {isFallMode && (
        <div className="fixed inset-0 z-50 flex-center bg-black/60 backdrop-blur-sm p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-50 rounded-full flex-center mx-auto mb-4 animate-pulse">
                    <Icon name="AlertTriangle" size={32} color="#EF4444" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {countdown !== null ? '낙상 감지' : '긴급 호출'}
                </h2>
                
                <p className="text-gray-500 mb-8 leading-relaxed">
                    {countdown !== null 
                        ? `${countdown}초 후 119에 자동 연결됩니다.` 
                        : '위급 상황인가요? 버튼을 누르면 즉시 도움을 요청합니다.'}
                </p>

                {countdown !== null ? (
                    <div className="text-6xl font-black text-red-500 mb-8">{countdown}</div>
                ) : (
                    <div className="flex flex-col gap-3 mb-4">
                        <button 
                            onClick={() => setCountdown(5)}
                            className="w-full py-4 bg-red-500 rounded-xl font-bold text-white shadow-lg flex-center gap-2"
                        >
                            <Icon name="PhoneCall" size={20} />
                            119 호출하기
                        </button>
                        <button 
                             onClick={() => setCountdown(5)}
                             className="w-full py-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700"
                        >
                            보호자 호출
                        </button>
                    </div>
                )}

                <button 
                    onClick={() => { setIsFallMode(false); setCountdown(null); }}
                    className="mt-4 text-gray-400 text-sm font-medium underline"
                >
                    취소하기
                </button>
            </div>
        </div>
      )}
    </>
  );
}
