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
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Background: TheHam Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3F2FD] to-white z-0"></div>
        
        {/* Header */}
        <div className="relative z-10 text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex-center shadow-lg mx-auto mb-4">
                <span className="text-white font-black text-3xl">마</span>
            </div>
            <h1 className="text-4xl font-black mb-1 text-gray-900">{storeName}</h1>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Vitality Pass Official Partner</p>
        </div>

        {/* Main Interaction Area */}
        <div className="relative z-10 w-full max-w-sm bg-white rounded-[40px] p-10 shadow-[0_20px_60px_rgba(0,102,255,0.1)] text-center border border-blue-50">
            
            {scanState === 'idle' && (
                <>
                    <h2 className="text-2xl font-black text-gray-900 mb-8">안녕하세요! 👋</h2>
                    <div 
                        onClick={handleScan}
                        className="w-64 h-64 mx-auto bg-blue-50 rounded-[48px] border-4 border-dashed border-blue-200 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-all active:scale-95 group"
                    >
                        <span className="text-7xl mb-4 group-hover:scale-110 transition-transform">📱</span>
                        <p className="text-blue-600 font-bold text-lg leading-tight">
                            마실 패스(QR)를<br/>여기에 비춰주세요
                        </p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[24px] font-black text-xl shadow-lg transform transition active:scale-95">
                            포인트 사용 / 적립
                        </button>
                    </div>
                </>
            )}

            {scanState === 'scanning' && (
                <div className="py-12">
                    <div className="w-24 h-24 border-[8px] border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
                    <h2 className="text-2xl font-black text-gray-900">QR 코드를 확인하고 있어요</h2>
                </div>
            )}

            {scanState === 'success' && (
                <div className="py-10 animate-scale-up">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <span className="text-white text-5xl">✓</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">인증 되었습니다!</h2>
                    <p className="text-2xl text-blue-600 font-black">김철수 님 (VIP)</p>
                    <div className="mt-8 bg-blue-50 p-6 rounded-[24px] text-left border border-blue-100">
                        <div className="flex justify-between mb-3 items-center">
                            <span className="text-blue-600 font-bold">보유 포인트</span>
                            <span className="font-black text-xl text-gray-900">12,500 P</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-blue-600 font-bold">사용 가능 쿠폰</span>
                            <span className="font-black text-xl text-gray-900">2장</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Exit Button for Demo */}
        <button 
            onClick={() => router.push('/')}
            className="absolute bottom-10 bg-white/50 backdrop-blur-md text-gray-400 text-sm py-2 px-4 rounded-full hover:text-gray-900 transition-colors z-10 font-bold"
        >
            ← 메인 화면으로 (Demo)
        </button>
    </main>
  );
}
