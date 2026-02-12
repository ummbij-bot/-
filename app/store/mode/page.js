'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Store Mode (Kiosk) Page
 * Intended for tablets placed in partner stores.
 */
export default function StoreMode() {
  const router = useRouter();
  const [scanState, setScanState] = useState('idle'); // idle, scanning, success
  const storeName = "종묘 교보약국";

  const handleScan = () => {
    setScanState('scanning');
    // Simulate scan delay
    setTimeout(() => {
        setScanState('success');
        setTimeout(() => {
            setScanState('idle'); // Reset for next customer
        }, 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gold-primary z-10"></div>

        {/* Header */}
        <div className="relative z-10 text-center mb-10">
            <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                Store Link ⚡️
            </span>
            <h1 className="text-4xl font-bold mb-2">{storeName}</h1>
            <p className="text-gray-400">Vitality Pass Official Partner</p>
        </div>

        {/* Main Interaction Area */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-center">
            
            {scanState === 'idle' && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">안녕하세요! 👋</h2>
                    <div 
                        onClick={handleScan}
                        className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl border-4 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-6xl mb-4 opacity-50">📱</span>
                        <p className="text-gray-500 font-medium">
                            마실 패스(QR)를<br/>여기에 비춰주세요
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button className="bg-gold-500 hover:bg-gold-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95">
                            포인트 사용
                        </button>
                        <button className="bg-mint-500 hover:bg-mint-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95">
                            적립 하기
                        </button>
                    </div>
                </>
            )}

            {scanState === 'scanning' && (
                <div className="py-10">
                    <div className="w-24 h-24 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-2xl font-bold text-gray-900">QR 스캔 중...</h2>
                </div>
            )}

            {scanState === 'success' && (
                <div className="py-10 animate-scale-up">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white text-4xl">✓</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">인증 되었습니다!</h2>
                    <p className="text-xl text-gold-600 font-bold">김철수 님 (VIP)</p>
                    <div className="mt-6 bg-gray-100 p-4 rounded-xl text-left">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">보유 포인트</span>
                            <span className="font-bold">12,500 P</span>
                        </div>
                        <div className="flex justify-between text-blue-600">
                            <span className="font-bold">사용 가능 쿠폰</span>
                            <span className="font-bold">2장</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Exit Button for Demo */}
        <button 
            onClick={() => router.push('/')}
            className="absolute bottom-6 text-gray-600 text-sm hover:text-white transition-colors z-10"
        >
            ← 메인으로 돌아가기 (Demo)
        </button>
    </main>
  );
}
