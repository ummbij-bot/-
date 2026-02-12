'use client';

import { useState } from 'react';

/**
 * PayPalExchange Component
 * Simulates receiving allowance via PayPal and converting it to Masil Points.
 */
export default function PayPalExchange({ onClose, onConvert }) {
  const [step, setStep] = useState('alert'); // alert, converting, success
  const allowanceAmount = 50.00;
  const exchangeRate = 1350; // 1 USD = 1350 KRW (Point)
  const bonusRate = 0.05; // 5% Bonus

  const finalPoints = Math.floor(allowanceAmount * exchangeRate * (1 + bonusRate));

  const handleConvert = () => {
    setStep('converting');
    setTimeout(() => {
        setStep('success');
        if(onConvert) onConvert(finalPoints);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        
        {/* Step 1: New Allowance Alert */}
        {step === 'alert' && (
            <div className="p-6 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-10" />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                        NEW
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">손녀에게 용돈이 도착했어요!</h3>
                <p className="text-gray-500 mb-6">
                    미국에서 <strong>${allowanceAmount}</strong>를 보내셨습니다.<br/>
                    마실 포인트로 환전하시겠어요?
                </p>

                <div className="bg-gold-50 p-4 rounded-xl mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">환전 금액</span>
                        <span className="font-bold text-gray-900">{(allowanceAmount * exchangeRate).toLocaleString()} P</span>
                    </div>
                    <div className="flex justify-between items-center text-red-500 font-bold">
                        <span>🎁 환전 우대 (5%)</span>
                        <span>+ {(allowanceAmount * exchangeRate * bonusRate).toLocaleString()} P</span>
                    </div>
                    <div className="h-px bg-gold-200 my-2"></div>
                    <div className="flex justify-between items-center text-lg font-black text-gold-600">
                        <span>총 적립</span>
                        <span>{finalPoints.toLocaleString()} P</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 btn btn-secondary py-3 text-sm">다음에</button>
                    <button onClick={handleConvert} className="flex-1 btn btn-primary py-3 text-sm">
                        즉시 환전하기
                    </button>
                </div>
            </div>
        )}

        {/* Step 2: Processing */}
        {step === 'converting' && (
            <div className="p-10 text-center">
                <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-gray-800">포인트로 환전 중입니다...</h3>
                <p className="text-sm text-gray-500 mt-2">PayPal 안전 결제 시스템 연동 중</p>
            </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
            <div className="p-8 text-center bg-gradient-to-br from-gold-50 to-white">
                <div className="text-5xl mb-4 animate-bounce">💰</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">환전 완료!</h3>
                <p className="text-lg text-gold-600 font-bold mb-6">+{finalPoints.toLocaleString()} P 적립됨</p>
                <button onClick={onClose} className="btn btn-primary w-full shadow-lg">
                    확인
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
