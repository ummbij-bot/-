'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../components/Icon';
import BottomBar from '../components/BottomBar';

export default function FamilySnapPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Mock "Vision AI" Analysis
  const analyzePhoto = () => {
    setAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        vitalityScore: 92,
        emotion: 'Happy',
        aiComment: "할머니! 오늘 표정이 너무 밝으세요. 10년은 젊어 보이시는걸요? 사랑해요! ❤️"
      });
      
      // Save to history (Mock)
      const history = JSON.parse(localStorage.getItem('snapHistory') || '[]');
      history.unshift({
        date: new Date().toISOString(),
        score: 92,
        comment: "할머니! 오늘 표정이 너무 밝으세요..."
      });
      localStorage.setItem('snapHistory', JSON.stringify(history));

    }, 2500); // 2.5s delay for realistic "AI thinking" feel
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        analyzePhoto(); // Auto-start analysis on upload
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="page-content bg-black min-h-screen text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 flex-between z-10">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-black/40 backdrop-blur-md">
          <Icon name="ArrowLeft" size={24} color="white" />
        </button>
        <span className="font-bold text-lg">Family Snap</span>
        <div className="w-10"></div>
      </header>

      {/* Camera View Area */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900">
        {!imagePreview ? (
          <div className="text-center p-8">
            <div className="mb-8 opacity-50">
              <Icon name="Camera" size={64} color="white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">오늘의 활력 인증!</h2>
            <p className="text-gray-400 mb-8">
              산책 후 밝은 미소를 찍어주세요.<br/>
              AI 손주가 분석해드립니다.
            </p>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg shadow-orange-500/30 animate-pulse"
            >
              사진 찍기 📸
            </button>
            <input 
              type="file" 
              accept="image/*" 
              capture="user" // Use front camera by default
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            
            {/* Analysis Overlay */}
            {analyzing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex-center flex-col">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xl font-bold animate-pulse">AI가 표정을 분석 중입니다...</p>
                <p className="text-sm text-gray-300 mt-2">활력 점수 계산 중...</p>
              </div>
            )}

            {/* Result Overlay */}
            {!analyzing && result && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pb-24 pt-20 animate-slide-up">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                    <div className="inline-block bg-yellow-400 text-black font-black px-3 py-1 rounded-full text-sm mb-3">
                        VITALITY SCORE
                    </div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">
                        {result.vitalityScore}점
                    </div>
                    <div className="h-px w-full bg-white/20 my-4"></div>
                    <div className="flex gap-3 items-start text-left">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white">
                             <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&q=80" alt="Grandchild" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-300 mb-1">손녀님의 AI 메시지</p>
                            <p className="text-lg font-medium leading-snug">"{result.aiComment}"</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => {
                            setImagePreview(null);
                            setResult(null);
                        }}
                        className="mt-6 w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform"
                    >
                        다음에도 찍을게요!
                    </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomBar />
    </main>
  );
}
