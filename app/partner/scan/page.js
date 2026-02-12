'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { validateQRToken } from '../../../lib/o2o/qr';

export default function QRScanPage() {
    const router = useRouter();
    const [scanning, setScanning] = useState(true);
    const [result, setResult] = useState(null);
    const videoRef = useRef(null);
    const [hasCamera, setHasCamera] = useState(false);

    // Initialize Camera
    useEffect(() => {
        let stream = null;
        if (scanning) {
            (async () => {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        setHasCamera(true);
                    }
                } catch (err) {
                    console.log("Camera not available, falling back to animation.");
                    setHasCamera(false);
                }
            })();
        }
        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [scanning]);

    // Mock Scanning Logic (Simulates detection)
    useEffect(() => {
        let timer;
        if (scanning) {
            timer = setTimeout(() => {
                // Simulate a successful scan after 3 seconds
                const mockToken = `GW-USER-1234-${Math.floor(Date.now() / 1000 / 60)}`;
                const validation = validateQRToken(mockToken);
                setResult(validation);
                setScanning(false);
            }, 3000); // 3 seconds delay for "searching" feel
        }
        return () => clearTimeout(timer);
    }, [scanning]);

    return (
        <main className="h-screen bg-black flex flex-col items-center justify-center relative">
            <button onClick={() => router.back()} className="absolute top-4 left-4 text-white text-2xl z-10">✕</button>
            
            {scanning ? (
                <>
                    {/* Camera Feed Background */}
                    {hasCamera ? (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-black" />
                    )}

                    {/* Scan Overlay */}
                    <div className="relative z-10 w-72 h-72 border-2 border-mint-500 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(78,205,196,0.3)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-mint-400 shadow-[0_0_20px_#4ECDC4] animate-[scan_2s_infinite_linear]" />
                         {/* Corner Markers */}
                         <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
                         <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
                         <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
                         <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
                    </div>
                    
                    <p className="relative z-10 text-white mt-12 font-bold bg-black/50 px-6 py-2 rounded-full backdrop-blur-md animate-pulse">
                        손님의 QR 코드를 비춰주세요
                    </p>

                    <style jsx>{`
                        @keyframes scan {
                            0% { top: 0%; }
                            50% { top: 100%; }
                            100% { top: 0%; }
                        }
                    `}</style>
                </>
            ) : (
                <div className="bg-white p-8 rounded-2xl text-center w-80 animate-slide-up">
                    {result?.valid ? (
                        <>
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">인증 성공!</h2>
                            <p className="text-gray-500 mb-6">User #{result.userId}님에게<br/><strong className="text-gold-600">50 포인트</strong>를 적립했습니다.</p>
                            <button 
                                onClick={() => { setScanning(true); setResult(null); }}
                                className="w-full btn btn-mint"
                            >
                                다음 손님 스캔하기
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-5xl mb-4">❌</div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">인증 실패</h2>
                            <p className="text-red-500 mb-6">{result?.error}</p>
                            <button 
                                onClick={() => { setScanning(true); setResult(null); }}
                                className="w-full btn btn-white border"
                            >
                                다시 시도하기
                            </button>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
