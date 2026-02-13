'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import { useDevice } from '../context/DeviceContext';
import { useAccessibility } from '../context/AccessibilityContext';

export default function DevicePage() {
  const { language } = useVitality();
  const { fontSizeLevel, setFontSizeLevel } = useAccessibility();
  const { devices, connectDevice, disconnectDevice, heartRate, fallDetected, triggerFallSimulation } = useDevice();
  const router = useRouter();

  const deviceList = [
    { id: 'watch', name: 'Galaxy Watch 6', type: 'wearable', icon: '⌚' },
    { id: 'cane', name: 'Masil Smart Cane', type: 'iot', icon: '🦯' },
  ];

  // Simulation: Connect Device
  const toggleConnection = (id) => {
    if (devices[id]) {
        if(confirm(language === 'ko' ? '연결을 해제하시겠습니까?' : '接続を解除しますか？')) {
            disconnectDevice(id);
        }
    } else {
        alert(language === 'ko' ? '기기를 찾는 중...' : 'デバイスを検索中...');
        setTimeout(() => {
            connectDevice(id);
            alert(language === 'ko' ? '연결 성공!' : '接続成功！');
        }, 1000);
    }
  };

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
             {language === 'ko' ? '기기 관리 ⚙️' : 'デバイス管理 ⚙️'}
        </h1>
        <p className="text-muted">
          {language === 'ko' ? '워치와 지팡이를 연결하여 더 안전하게 걸으세요.' : 'ウォッチと杖を接続して、より安全に歩きましょう。'}
        </p>
      </header>

      {/* Accessibility Settings */}
      <section className="card mb-lg" style={{ padding: '20px' }}>
        <h3 className="fw-bold mb-md" style={{ fontSize: '18px' }}>
            {language === 'ko' ? '화면 설정' : '画面設定'}
        </h3>
        <div className="flex-between">
            <span className="font-medium">
                {language === 'ko' ? '글자 크기' : '文字サイズ'}
            </span>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {[1, 2, 3].map((level) => (
                    <button
                        key={level}
                        onClick={() => setFontSizeLevel(level)}
                        className={`w-10 h-10 rounded-md flex-center transition-all ${
                            fontSizeLevel === level ? 'bg-white shadow-sm text-primary font-bold' : 'text-gray-400'
                        }`}
                        aria-label={`Font size level ${level}`}
                    >
                        <span style={{ fontSize: level === 1 ? '14px' : level === 2 ? '18px' : '22px' }}>A</span>
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Device List */}
      <section className="flex flex-col gap-md">
        {deviceList.map((device) => {
          const isConnected = devices[device.id];
          return (
          <div 
            key={device.id} 
            className={`card ${isConnected ? 'card-mint' : ''}`}
            style={{ 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '40px' }}>{device.icon}</span>
                <div>
                    <h3 className="fw-bold" style={{ fontSize: '18px' }}>{device.name}</h3>
                    <p className="text-muted" style={{ fontSize: '12px' }}>
                        {isConnected 
                            ? (language === 'ko' ? '연결됨 • 배터리 85%' : '接続済み • バッテリー 85%')
                            : (language === 'ko' ? '연결 안 됨' : '未接続')}
                    </p>
                </div>
            </div>
            
            <button 
                className={`btn ${isConnected ? 'btn-white' : 'btn-dark'}`}
                style={{ borderRadius: '20px', padding: '8px 16px', fontSize: '12px' }}
                onClick={() => toggleConnection(device.id)}
            >
                {isConnected 
                        ? (language === 'ko' ? '해제' : '解除') 
                        : (language === 'ko' ? '연결하기' : '接続')
                }
            </button>
          </div>
          );
        })}
      </section>

      {/* Data Preview (Mock) */}
      <section className="card mt-lg" style={{ padding: '20px' }}>
        <h3 className="fw-bold mb-md" style={{ fontSize: '16px' }}>
            {language === 'ko' ? '실시간 데이터 미리보기' : 'リアルタイムデータプレビュー'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="bg-gray-50 p-4 rounded-lg text-center animate-pulse">
                <div className="text-sm text-gray-500 mb-1">Heart Rate</div>
                <div className="text-2xl fw-black text-red-500">
                    {devices.watch ? `${heartRate} BPM` : '--'}
                </div>
            </div>
            <div 
                className={`p-4 rounded-lg text-center ${fallDetected ? 'bg-red-100' : 'bg-gray-50'}`}
                onClick={triggerFallSimulation}
                style={{ cursor: 'pointer' }}
            >
                <div className="text-sm text-gray-500 mb-1">Fall Detection (Simulate)</div>
                <div className={`text-lg fw-bold ${fallDetected ? 'text-red-600' : 'text-green-600'}`}>
                    {devices.cane ? (fallDetected ? '⚠️ FALL DEMO' : 'Normal') : '--'}
                </div>
                {devices.cane && <div style={{fontSize:'10px', marginTop:'4px'}}>(Tap to Fall)</div>}
            </div>
        </div>
      </section>

    </main>
  );
}
