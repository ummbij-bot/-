'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../../components/Icon';

export default function GuardianLogin() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (code === '1234' || code === 'mom' || code === '엄마') { // Mock Auth
      localStorage.setItem('isGuardian', 'true');
      router.push('/guardian/dashboard');
    } else {
      setError('올바른 초대 코드가 아닙니다. 부모님 앱의 [설정]에서 확인해주세요.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transform transition-all">
        {/* Brand Logo Area */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Icon name="Heart" size={32} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">GoldenWalk 보호자 로그인</h1>
          <p className="text-gray-500 text-sm">
            부모님의 건강한 걸음을 응원해주세요.<br/>
            매일의 안부를 데이터로 확인하세요.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              가족 초대 코드
            </label>
            <div className="relative">
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="예: 1234"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg tracking-widest placeholder:tracking-normal placeholder:text-gray-400"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="Key" size={20} />
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-2 pl-1 flex items-center gap-1"><Icon name="AlertCircle" size={12} /> {error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex justify-center items-center gap-2"
          >
            <span>모니터링 시작하기</span>
            <Icon name="ArrowRight" size={20} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            초대 코드를 모르시나요? <br/>
            부모님 앱의 <span className="text-gray-600 font-bold">설정 {'>'} 가족 연결</span>에서 확인 가능합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
