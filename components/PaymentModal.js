'use client';

import { useState, useEffect } from 'react';

export default function PaymentModal({ isOpen, onClose, amount, itemName, onComplete }) {
  const [step, setStep] = useState('select'); // select | processing | complete
  const [method, setMethod] = useState(null);

  useEffect(() => {
    if (isOpen) {
        setStep('select');
        setMethod(null);
    }
  }, [isOpen]);

  const handlePayment = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep('processing');
    
    // Simulate PG processing time
    setTimeout(() => {
        setStep('complete');
        // Auto close after success
        setTimeout(() => {
            onComplete();
        }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">결제하기</h3>
            <button onClick={onClose} className="text-gray-400 text-2xl">&times;</button>
        </div>

        <div className="p-6">
            {step === 'select' && (
                <>
                    <div className="text-center mb-6">
                        <div className="text-sm text-gray-500 mb-1">{itemName}</div>
                        <div className="text-3xl font-black text-gray-900">{amount.toLocaleString()}원</div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={() => handlePayment('kakaopay')}
                            className="w-full bg-[#FAE100] hover:bg-[#F7D600] text-[#371D1E] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <span className="text-xl">💬</span> 카카오페이 결제
                        </button>
                        <button 
                            onClick={() => handlePayment('naverpay')}
                            className="w-full bg-[#03C75A] hover:bg-[#02B150] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <span className="text-xl">🇳</span> 네이버페이 결제
                        </button>
                        <button 
                            onClick={() => handlePayment('samsungpay')}
                            className="w-full bg-[#1428A0] hover:bg-[#102080] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <span className="text-xl">💳</span> 삼성페이 (Samsung Pay)
                        </button>
                        <button 
                            onClick={() => handlePayment('card')}
                            className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <span className="text-xl">💳</span> 일반 신용카드
                        </button>
                    </div>
                </>
            )}

            {step === 'processing' && (
                <div className="py-10 text-center">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-mint-500 rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-lg font-bold text-gray-800 animate-pulse">결제 승인 요청 중...</p>
                    <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
                </div>
            )}

            {step === 'complete' && (
                <div className="py-8 text-center">
                    <div className="text-6xl mb-4 animate-bounce">✅</div>
                    <p className="text-xl font-bold text-mint-600 mb-2">결제가 완료되었습니다!</p>
                    <p className="text-gray-500 text-sm">주문번호: ORD-{Math.floor(Math.random()*100000)}</p>
                </div>
            )}
        </div>
        
        {step === 'select' && (
             <div className="bg-gray-50 px-6 py-4 text-xs text-gray-400 text-center">
                위 결제 수단은 모의 테스트용입니다.<br/>실제 비용은 청구되지 않습니다.
            </div>
        )}
      </div>
    </div>
  );
}
