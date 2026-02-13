'use client';

import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import { useEffect, useState } from 'react';
import Icon from '../components/Icon';

export default function Onboarding() {
  const router = useRouter();
  const { user, login, loading } = useVitality();
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const handleStart = async (method = 'redirect') => {
    setLocalLoading(true);
    try {
      await login(method);
      // Redirect 방식은 페이지가 이동하므로 여기 도달 안 함
    } catch (error) {
      console.error('Login failed:', error);
      
      // 사용자 친화적 에러 메시지
      let errorMessage = '로그인에 실패했습니다.';
      if (error.code === 'auth/popup-blocked') {
        errorMessage = '팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = '로그인이 취소되었습니다.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = '인터넷 연결을 확인해주세요.';
      }
      
      alert(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  if (loading) return null;

  return (
    <main className="h-screen flex flex-col items-center justify-center p-6 bg-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-50" />

      <div className="z-10 text-center w-full max-w-sm">
        <div className="w-full max-w-[280px] aspect-square mx-auto mb-8 relative flex-center">
            <img 
              src="/images/hero_shoe.png" 
              alt="Start Walking" 
              className="w-full h-full object-contain drop-shadow-2xl animate-float-slow" 
            />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">
          GoldenWalk
          <span className="block text-2xl text-orange-600 font-black mt-2">마실 (Masil)</span>
        </h1>
        
        <p className="text-xl font-bold text-gray-600 mb-14 leading-relaxed">
          동네 마실처럼 가볍게,<br/>
          건강하고 즐거운 매일을 시작해요
        </p>

        <button 
          onClick={() => handleStart('redirect')}
          disabled={localLoading || loading}
          className="w-full py-6 bg-orange-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {localLoading ? (
            <>
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              로그인 중입니다...
            </>
          ) : (
            <>
              <Icon name="LogIn" size={24} />
              구글로 편하게 시작하기
            </>
          )}
        </button>
        
        <button 
          onClick={() => handleStart('anonymous')}
          disabled={localLoading || loading}
          className="w-full py-5 mt-4 bg-white text-gray-700 border-2 border-gray-200 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 active:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Icon name="User" size={20} />
          로그인 없이 구경하기
        </button>
        
         <p className="text-xs text-gray-400 mt-4">
          시작 버튼을 누르면 이용약관에 동의하게 됩니다.
        </p>
      </div>
    </main>
  );
}
