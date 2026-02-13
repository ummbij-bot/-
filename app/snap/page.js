'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import Icon from '../components/Icon';
import { toast } from 'react-hot-toast';

export default function FamilySnapPage() {
  const router = useRouter();
  const { user, saveSnapLog } = useVitality();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Advanced "Vision AI" Analysis Simulation
  const analyzePhoto = async (imageUrl) => {
    setAnalyzing(true);
    
    // Simulate complex AI calculation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const analysisResult = {
      vitalityScore: 94,
      emotion: '매우 행복함',
      metrics: {
        smile: 98,
        eyeBrightness: 85,
        activityLevel: 90
      },
      aiComment: `${user?.displayName?.split(' ')[0] || '어르신'}님! 오늘 입꼬리가 98%나 올라가셨네요. AI 손주가 보기에도 정말 행복해 보이세요! 이 기쁜 소식을 가족들에게 바로 알려드릴게요. 💖`,
      imageUrl: imageUrl
    };

    setAnalyzing(false);
    setResult(analysisResult);
    
    // [Phase 6.0] Save to Cloud
    try {
      await saveSnapLog(analysisResult);
      toast.success('📸 활력 분석 리포트가 가족에게 전달되었습니다!');
    } catch (error) {
      console.error('Failed to save snap log:', error);
      toast.error('리포트 전송에 실패했습니다.');
    }
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 pb-24 pt-20 animate-slide-up">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
                    {/* Decorative Background Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="flex justify-center mb-4">
                        <div className="bg-orange-500 text-white font-black px-4 py-1.5 rounded-full text-xs tracking-widest shadow-lg shadow-orange-500/40">
                            VITALITY REPORT
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-7xl font-black text-white">{result.vitalityScore}</span>
                        <span className="text-2xl font-bold text-orange-400">점</span>
                    </div>

                    {/* Detailed Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                            <div className="text-[10px] text-gray-400 mb-1 uppercase font-bold text-center">미소</div>
                            <div className="text-xl font-bold text-center text-white">{result.metrics.smile}%</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                            <div className="text-[10px] text-gray-400 mb-1 uppercase font-bold text-center">생기</div>
                            <div className="text-xl font-bold text-center text-white">{result.metrics.eyeBrightness}%</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                            <div className="text-[10px] text-gray-400 mb-1 uppercase font-bold text-center">활동</div>
                            <div className="text-xl font-bold text-center text-white">{result.metrics.activityLevel}%</div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start text-left bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 rounded-full bg-white overflow-hidden flex-shrink-0 border-2 border-orange-200">
                             <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&q=80" alt="Grandchild" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] text-orange-400 font-bold mb-1">AI 손주의 응원 메시지</p>
                            <p className="text-base font-medium leading-relaxed text-gray-100 italic">"{result.aiComment}"</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button 
                            onClick={async () => {
                                // Share Result logic (Phase 9 placeholder)
                                toast.success('가족 단톡방에 자랑했습니다! 😊');
                            }}
                            className="py-4 bg-orange-500 text-white font-bold rounded-2xl active:scale-95 transition-transform flex-center gap-2"
                        >
                            <Icon name="Share2" size={18} /> 자랑하기
                        </button>
                        <button 
                            onClick={() => {
                                setImagePreview(null);
                                setResult(null);
                            }}
                            className="py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 active:scale-95 transition-transform"
                        >
                            닫기
                        </button>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </main>
  );
}
