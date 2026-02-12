'use client';
import { useState, useEffect } from 'react';
import Icon from '../Icon';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Icon name="Download" size={24} color="white" />
          </div>
          <div>
            <div className="font-bold">앱으로 설치하기</div>
            <div className="text-xs text-gray-300">더 빠르고 편리하게 이용하세요</div>
          </div>
        </div>
        <button 
          onClick={handleInstallClick}
          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm"
        >
          설치
        </button>
        <button 
          onClick={() => setShowPrompt(false)}
          className="absolute -top-2 -right-2 bg-gray-500 rounded-full p-1"
        >
          <Icon name="X" size={16} color="white" />
        </button>
      </div>
    </div>
  );
}
