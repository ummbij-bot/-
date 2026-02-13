'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  import GaitAnalyzer from '../../lib/sensors/GaitAnalyzer';
  import { useVitality } from '../context/VitalityContext';
  import { toast } from 'react-hot-toast';

  export default function AnalysisPage() {
    const { saveGaitLog, healthForecast, language, t } = useVitality();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [fallDetected, setFallDetected] = useState(false);
    const [healthScore, setHealthScore] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [permissionError, setPermissionError] = useState(null);
    
    const router = useRouter();
    const analyzerRef = useRef(null);
    const startTimeRef = useRef(0);

    const handleFall = () => {
      setFallDetected(true);
      toast.error(t('fall_alert') || '낙상이 감지되었습니다!', { duration: 5000 });
      if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
    };

    const handleAnalysisUpdate = (data) => {
      setHealthScore(data.stabilityScore);
      setChartData(prev => [...prev.slice(-19), { 
        time: new Date().toLocaleTimeString(), 
        ax: data.raw?.ax || 0,
        ay: data.raw?.ay || 0,
        az: data.raw?.az || 0
      }]);
    };

    const toggleAnalysis = async () => {
      if (isAnalyzing) {
        analyzerRef.current?.stop();
        setIsAnalyzing(false);
        
        if (healthScore !== null) {
            const duration = (Date.now() - startTimeRef.current) / 1000;
            await saveGaitLog({
                healthScore,
                duration,
                avgStability: healthScore,
                fallDetected
            });
            toast.success(t('save_success') || '보행 분석 완료!');
        }
        return;
      }

      try {
        if (!analyzerRef.current) {
          analyzerRef.current = new GaitAnalyzer({
            onFallDetected: handleFall,
            onAnalysisUpdate: handleAnalysisUpdate
          });
        }
        await analyzerRef.current.start();
        setIsAnalyzing(true);
        startTimeRef.current = Date.now();
        setPermissionError(null);
      } catch (err) {
        setPermissionError(t('permission_error') || '센서 권한이 필요합니다.');
      }
    };

  useEffect(() => {
    return () => {
      analyzerRef.current?.stop();
    };
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrapper pb-24">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{t('health_title')}</h1>
          <div className="flex gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full uppercase font-bold">
              {language}
            </span>
            <button onClick={() => router.back()} className="text-gray-500">✕</button>
          </div>
        </header>

        {/* [NEW] AI 건강 컨시어지 예측 카드 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white mb-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>{t('health_forecast')}</span>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full uppercase">AI Future</span>
                </h3>
                <p className="text-xs opacity-80 mt-1">{t('forecast_msg')}</p>
              </div>
              <div className="text-right">
                 <div className="text-3xl font-black">{healthForecast.expectedScore}</div>
                 <div className="text-[10px] opacity-70 uppercase">Vit. Score</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="border-r border-white/20">
                <div className="text-[10px] opacity-70 uppercase mb-1">{t('health_age')}</div>
                <div className="text-2xl font-bold">{healthForecast.predictedAge} <span className="text-xs font-normal">세</span></div>
              </div>
              <div className="pl-2">
                <div className="text-[10px] opacity-70 uppercase mb-1">{t('expected_score')}</div>
                <div className="text-2xl font-bold">{healthForecast.expectedScore} <span className="text-xs font-normal">점</span></div>
              </div>
            </div>
            
            <p className="mt-4 text-xs bg-black/20 p-3 rounded-xl border border-white/10 italic">
              " {healthForecast.advice} "
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* 실시간 상태 카드 */}
        <div className={`card mb-6 text-center shadow-lg transition-all ${fallDetected ? 'bg-red-50 border-red-500 border-2' : 'bg-white'}`}>
           <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-bold">Stability</p>
           <div className="text-6xl font-black text-primary mb-2 tabular-nums">
             {healthScore !== null ? healthScore : '--'}
           </div>
           <p className="text-sm font-medium text-gray-500">
             {isAnalyzing ? (language === 'ko' ? '분석 중...' : 'Analyzing...') : (language === 'ko' ? '검사 대기' : 'Wait')}
           </p>
        </div>

        {/* 제어 버튼 */}
        <div className="space-y-4">
          <button 
            onClick={toggleAnalysis}
            className={`w-full py-5 rounded-3xl text-xl font-black shadow-xl transition-all active:scale-95 ${
              isAnalyzing 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-primary text-white'
            }`}
          >
            {isAnalyzing ? (language === 'ko' ? '중단' : 'STOP') : (language === 'ko' ? '검사 시작' : 'START')}
          </button>
          
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              {language === 'ko' ? '사용 가이드' : 'User Guide'}
            </h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• {language === 'ko' ? '평평한 곳에서 일정한 속도로 걸어주세요.' : 'Walk at a steady pace on a flat surface.'}</li>
              <li>• {language === 'ko' ? '낙상 감지 시 자동으로 보호자에게 알림이 전송됩니다.' : 'Guardians are notified automatically if a fall is detected.'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
