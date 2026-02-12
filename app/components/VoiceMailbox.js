'use client';

import { useState } from 'react';

/**
 * VoiceMailbox Component
 * A "Radio-style" interface for seniors to listen to family messages and record replies.
 */
export default function VoiceMailbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('listen'); // 'listen' or 'record'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Mock Data
  const messages = [
    { id: 1, sender: '둘째 딸', time: '방금 전', duration: '0:45', played: false },
    { id: 2, sender: '큰 아들', time: '어제', duration: '1:20', played: true },
  ];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback logic here
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate sending logic
      alert('답장이 전송되었습니다! 📨');
    } else {
      setIsRecording(true);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed z-40 flex items-center gap-2 shadow-lg animate-float"
        style={{ 
            bottom: '180px', right: '20px', 
            padding: '12px 20px', 
            borderRadius: '30px',
            background: '#FF6B6B', 
            color: 'white',
            border: '2px solid white'
        }}
      >
        <span className="text-2xl">📻</span>
        <span className="font-bold text-sm">보이스 우체통</span>
        <span className="bg-white text-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">1</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#F4E1C1] rounded-[40px] p-6 shadow-2xl relative border-8 border-[#8B4513] animate-scale-up">
        {/* Close Button */}
        <button 
            onClick={() => setIsOpen(false)}
            className="absolute -top-4 -right-4 bg-gray-800 text-white w-10 h-10 rounded-full font-bold border-2 border-white"
        >
            ✕
        </button>

        {/* Radio Speaker Mesh */}
        <div className="flex gap-2 mb-6 justify-center opacity-30">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-12 bg-[#5D4037] rounded-full"></div>
            ))}
        </div>

        {/* Display Screen */}
        <div className="bg-[#4A4A4A] rounded-xl p-4 mb-6 relative overflow-hidden border-4 border-[#333]">
            <div className="text-center">
                <p className="text-green-400 text-xs mb-1">
                    {mode === 'listen' ? 'Now Playing' : 'Recording...'}
                </p>
                <h3 className="text-white text-xl font-bold mb-2">
                    {mode === 'listen' ? '둘째 딸의 음성편지' : '답장 녹음 중'}
                </h3>
                <div className="text-3xl font-mono text-yellow-400">
                    {mode === 'listen' ? (isPlaying ? '00:15 / 00:45' : '00:00 / 00:45') : '00:03'}
                </div>
            </div>
            
            {/* Visualizer Animation */}
            {(isPlaying || isRecording) && (
                <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center gap-1 opacity-50">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-2 bg-green-500 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: '0.2s' }}></div>
                    ))}
                </div>
            )}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-4">
            <button 
                onClick={() => setMode('listen')}
                className={`flex flex-col items-center gap-1 ${mode === 'listen' ? 'opacity-100' : 'opacity-50'}`}
            >
                <div className="w-12 h-12 rounded-full bg-gray-200 border-b-4 border-gray-300 flex items-center justify-center shadow-md active:border-b-0 active:translate-y-1 transition-all">
                    ⏪
                </div>
                <span className="text-xs font-bold text-[#5D4037]">이전</span>
            </button>

            {mode === 'listen' ? (
                <button 
                    onClick={handlePlay}
                    className="w-20 h-20 rounded-full bg-[#FF6B6B] border-b-4 border-[#D94545] flex items-center justify-center shadow-lg active:border-b-0 active:translate-y-1 transition-all"
                >
                    <span className="text-4xl ml-2">{isPlaying ? '⏸' : '▶'}</span>
                </button>
            ) : (
                <button 
                    onClick={handleRecord}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-b-4 transition-all active:border-b-0 active:translate-y-1 ${isRecording ? 'bg-white border-gray-300' : 'bg-red-500 border-red-700'}`}
                >
                    <div className={`w-8 h-8 rounded-sm ${isRecording ? 'bg-red-500' : 'bg-white rounded-full'}`}></div>
                </button>
            )}

            <button 
                onClick={() => setMode(mode === 'listen' ? 'record' : 'listen')}
                className={`flex flex-col items-center gap-1 ${mode === 'record' ? 'opacity-100' : 'opacity-50'}`}
            >
                <div className="w-12 h-12 rounded-full bg-gray-200 border-b-4 border-gray-300 flex items-center justify-center shadow-md active:border-b-0 active:translate-y-1 transition-all">
                    {mode === 'listen' ? '🎤' : '📻'}
                </div>
                <span className="text-xs font-bold text-[#5D4037]">
                    {mode === 'listen' ? '답장' : '듣기'}
                </span>
            </button>
        </div>
      </div>
    </div>
  );
}
