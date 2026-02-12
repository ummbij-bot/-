'use client';

/**
 * FamilyChallenge Component
 * Displays shared family step goals and locked rewards.
 */
export default function FamilyChallenge({ currentSteps }) {
  // Mock Data
  const familyTotal = currentSteps + 15000 + 12000 + 8000; // User + Daughter + Son + Granddaughter
  const goal = 50000;
  const progress = Math.min((familyTotal / goal) * 100, 100);

  return (
    <div className="card mb-lg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <span style={{ fontSize: '100px' }}>🏆</span>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-4">
            <div>
                <span className="bg-gold-100 text-gold-dark text-xs font-bold px-2 py-1 rounded">이번 주 미션</span>
                <h3 className="h3 mt-1">우리 가족 5만보 걷기</h3>
            </div>
            <div className="text-right">
                <div className="text-xs text-gray-500">남은 시간</div>
                <div className="font-bold text-red-500">2일 5시간</div>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="h-6 bg-gray-100 rounded-full overflow-hidden mb-2 relative shadow-inner">
            <div 
                className="h-full bg-gradient-to-r from-gold-primary to-red-400 transition-all duration-1000 ease-out flex items-center justify-end px-2"
                style={{ width: `${progress}%` }}
            >
                <span className="text-[10px] text-white font-bold">{Math.round(progress)}%</span>
            </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mb-6">
            <span>현재 {familyTotal.toLocaleString()}보</span>
            <span>목표 {goal.toLocaleString()}보</span>
        </div>

        {/* Reward Section */}
        <div className="bg-white/50 rounded-xl p-4 flex items-center gap-4 border border-white/60">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl relative overflow-hidden">
                {progress >= 100 ? '🎁' : '🔒'}
                {progress < 100 && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
                )}
            </div>
            <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase">Mission Reward</p>
                <p className="font-bold text-gray-800">
                    {progress >= 100 ? '홍삼 선물세트 당첨! 🎉' : '?? 선물 상자'}
                </p>
            </div>
            <button 
                disabled={progress < 100}
                className={`px-4 py-2 rounded-full text-sm font-bold ${progress >= 100 ? 'bg-gold-primary text-white shadow-gold cursor-pointer animate-pulse' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
                받기
            </button>
        </div>

        {/* Family Avatars */}
        <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Family" />
                    </div>
                ))}
            </div>
            <span className="text-xs text-gray-500">+ 모두 열심히 걷고 있어요! 🔥</span>
        </div>
      </div>
    </div>
  );
}
