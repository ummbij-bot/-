'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WearableSync() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
        setSyncing(false);
        setConnected(true);
    }, 2000);
  };

  return (
    <main className="page-content bg-gray-50 min-h-screen">
       <header className="flex items-center gap-4 mb-6 p-4 bg-white shadow-sm sticky top-0 z-10">
           <button onClick={() => router.back()} className="text-2xl">←</button>
           <h1 className="text-xl font-bold">워치 연동</h1>
       </header>

       <div className="px-4 space-y-4">
           {/* Connection Card */}
           <div className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${connected ? 'border-green-400' : 'border-transparent'}`}>
               <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                       <span className="text-3xl">⌚️</span>
                       <div>
                           <h3 className="font-bold text-gray-900">Galaxy Watch 6</h3>
                           <p className="text-xs text-gray-500">{connected ? '연동됨' : '연결 안 됨'}</p>
                       </div>
                   </div>
                   <button 
                    onClick={handleSync}
                    disabled={connected || syncing}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        connected 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-black text-white active:scale-95'
                    }`}
                   >
                       {syncing ? '연결 중...' : connected ? '완료' : '연결하기'}
                   </button>
               </div>
               
               {connected && (
                   <div className="grid grid-cols-2 gap-3 mt-6 animate-scale-up">
                       <div className="bg-gray-50 p-4 rounded-xl text-center">
                           <p className="text-xs text-gray-500 mb-1">Heart Rate</p>
                           <p className="text-xl font-black text-red-500 flex items-center justify-center gap-1">
                               <span className="animate-pulse">♥</span> 78 <span className="text-xs text-gray-400">bpm</span>
                           </p>
                       </div>
                       <div className="bg-gray-50 p-4 rounded-xl text-center">
                           <p className="text-xs text-gray-500 mb-1">Active Steps</p>
                           <p className="text-xl font-black text-blue-500">
                               1,240
                           </p>
                       </div>
                   </div>
               )}
           </div>

           {!connected && !syncing && (
               <div className="text-center text-gray-400 text-sm mt-8">
                   <p>워치를 가까이 대고 연결 버튼을 눌러주세요.</p>
                   {/* Ripple Animation */}
                   <div className="mt-8 relative w-32 h-32 mx-auto flex items-center justify-center">
                       <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                       <div className="absolute inset-4 bg-blue-200 rounded-full animate-pulse opacity-75"></div>
                       <span className="relative text-4xl">📱</span>
                   </div>
               </div>
           )}
       </div>
    </main>
  );
}
