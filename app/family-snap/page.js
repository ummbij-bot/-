'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { analyzePhoto } from '../../lib/ai/vision_service';

export default function FamilySnapPage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResult(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      const analysis = await analyzePhoto(image);
      setResult(analysis);
    } catch (error) {
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <header className="flex items-center gap-4 mb-lg">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Family Snap <span className="text-mint-600 text-sm">AI Beta</span></h1>
      </header>

      {/* Camera/Upload Section */}
      <section className="card mb-lg text-center p-6">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-4xl block mb-2">📸</span>
            <p className="text-gray-500 font-medium">터치하여 사진 찍기<br/>또는 앨범에서 선택</p>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img src={image} alt="Uploaded" className="w-full h-64 object-cover" />
            {!result && (
                <button 
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 text-xs"
                >
                    새로 찍기
                </button>
            )}
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <div className="text-center mt-4">
            <button 
                onClick={() => {
                    setImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80');
                    setResult(null);
                }}
                className="text-xs text-gray-400 underline"
            >
                [데모용] 샘플 사진으로 분석하기
            </button>
        </div>
      </section>

      {/* Analysis Action */}
      {image && !result && (
        <div className="relative">
             {analyzing && (
                <div className="absolute inset-0 z-10 bg-black/50 rounded-xl flex flex-col items-center justify-center">
                    <div className="w-full h-1 bg-mint-400 absolute top-0 animate-[scan_2s_infinite_linear]" style={{ boxShadow: '0 0 10px #4ECDC4' }} />
                    <div className="text-white font-bold text-lg animate-pulse">AI 분석 중...</div>
                </div>
             )}
            <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className={`btn btn-full ${analyzing ? 'opacity-0' : 'btn-mint'} shadow-premium`}
            >
            ✨ AI 건강 분석 시작
            </button>
            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                }
            `}</style>
        </div>
      )}

      {/* Result Section */}
      {result && (
        <section className="animate-slide-up space-y-4">
          <div className="card text-white p-6 shadow-premium" style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #2CB5AC 100%)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black flex items-center gap-2">
                <span className="text-2xl">✨</span> 분석 완료
              </h2>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/30">
                <span className="font-bold text-white">{result.score}점</span>
                <span className="text-xs text-white/80 ml-1">/ 100</span>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10">
                <label className="text-xs font-bold text-mint-100 block mb-1">감정 상태 (Emotion)</label>
                <div className="text-2xl font-black text-white">{result.emotion}</div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10">
                <label className="text-xs font-bold text-mint-100 block mb-1">건강 인사이트 (Health)</label>
                <p className="text-sm text-white font-medium leading-relaxed">{result.health_insight}</p>
              </div>

              <div className="bg-white text-gray-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-6xl opacity-10">💌</div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wide">Family Message</label>
                <div className="font-bold text-lg text-gray-900 leading-relaxed">
                  "{result.message_to_family}"
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
                alert('가족에게 메시지와 사진이 전송되었습니다! (Demo)');
                router.push('/');
            }}
            className="btn btn-gold btn-full"
          >
            👨‍👩‍👧‍👦 가족에게 공유하기 (+50P)
          </button>
        </section>
      )}
    </main>
  );
}
