'use client';

import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import { useEffect } from 'react';
import Icon from '../components/Icon';

export default function Onboarding() {
  const router = useRouter();
  const { user, login, loading } = useVitality();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const handleStart = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다.');
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
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          GoldenWalk
          <span className="block text-xl text-gray-500 font-medium mt-1">마실</span>
        </h1>
        
        <p className="text-gray-500 mb-12 leading-relaxed">
          가벼운 동네 마실로 시작하는<br/>
          활기찬 시니어 라이프
        </p>

        <button 
          onClick={handleStart}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-lg"
        >
          <Icon name="LogIn" size={20} />
          구글계정으로 시작하기
        </button>
        
         <p className="text-xs text-gray-400 mt-6">
          시작 버튼을 누르면 이용약관에 동의하게 됩니다.
        </p>
      </div>
    </main>
  );
}
