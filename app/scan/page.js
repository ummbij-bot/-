'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import Icon from '../components/Icon';
import jsQR from 'jsqr';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

export default function ScanPage() {
  const router = useRouter();
  const { user, addPoints } = useVitality();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push('/start');
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [user, router]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // 후면 카메라
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        startScanning();
      }
    } catch (error) {
      console.error('❌ Camera access failed:', error);
      setCameraError('카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
  };

  const startScanning = () => {
    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current && scanning) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (canvas.width > 0 && canvas.height > 0) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            handleQRCode(code.data);
          }
        }
      }
    }, 300); // 초당 3회 스캔
  };

  const handleQRCode = async (data) => {
    // 중복 스캔 방지
    if (!scanning) return;
    setScanning(false);

    try {
      // QR 코드 형식: goldenwalk://store/{store_id}
      const match = data.match(/goldenwalk:\/\/store\/(.+)/);
      
      if (!match) {
        toast.error('유효하지 않은 QR 코드입니다.');
        setTimeout(() => setScanning(true), 2000);
        return;
      }

      const storeId = match[1];

      // Firestore에 체크인 기록
      await addDoc(collection(db, 'checkins'), {
        userId: user.uid,
        storeId,
        timestamp: new Date().toISOString()
      });

      // 포인트 적립
      await addPoints(50);

      toast.success('✅ 체크인 완료! 50 포인트 적립!', {
        duration: 3000,
        icon: '🎉'
      });

      // 2초 후 대시보드로 이동
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      console.error('❌ Check-in failed:', error);
      toast.error('체크인에 실패했습니다.');
      setTimeout(() => setScanning(true), 2000);
    }
  };

  if (!user) return null;

  return (
    <main className="h-screen flex flex-col bg-black relative overflow-hidden">
      {/* 헤더 */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <Icon name="X" size={24} />
          </button>
          <h1 className="text-white font-bold text-lg">QR 체크인</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* 카메라 프리뷰 */}
      <div className="flex-1 relative flex items-center justify-center">
        {cameraError ? (
          <div className="text-center px-6">
            <Icon name="AlertCircle" size={48} color="white" />
            <p className="text-white mt-4 text-lg">{cameraError}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 bg-white text-black rounded-full font-bold"
            >
              돌아가기
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* 스캔 가이드 */}
            <div className="relative z-10">
              <div className="w-64 h-64 border-4 border-white rounded-2xl relative">
                {/* 코너 마커 */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-8 border-l-8 border-blue-600" style={{ borderTopLeftRadius: '24px' }} />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-8 border-r-8 border-blue-600" style={{ borderTopRightRadius: '24px' }} />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-8 border-l-8 border-blue-600" style={{ borderBottomLeftRadius: '24px' }} />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-8 border-r-8 border-blue-600" style={{ borderBottomRightRadius: '24px' }} />
                
                {/* 스캔 애니메이션 */}
                {scanning && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan" />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 하단 안내 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-center text-lg font-medium">
          {scanning ? 'QR 코드를 스캔하세요' : '처리 중...'}
        </p>
        <p className="text-white/70 text-center text-sm mt-2">
          매장의 QR 코드를 카메라에 비춰주세요
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </main>
  );
}
