'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../../context/VitalityContext';
import { toast } from 'react-hot-toast';
import Icon from '../../components/Icon';

export default function PremiumCheckoutPage() {
  const { user, language, t } = useVitality();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Elite Plan Details
  const plan = {
    name: '골든워크 엘리트 멤버십 👑',
    price: 9900,
    currency: 'KRW',
    billingCycle: '월간 결제',
    features: [
      { text: 'AI 정밀 보행 데이터 평생 보관', detail: '당신의 걸음걸이 변화를 10년 뒤에도 확인하세요' },
      { text: '가족 거버넌스 투표권 부여', detail: '가족 포인트 사용처와 모임 장소를 직접 제안하세요' },
      { text: '낙상 감지 시 즉시 출동 연동', detail: '위급 상황 시 지정 병원 및 가족에게 즉시 알림' },
      { text: '글로벌 무장애 산책로 데이터 개방', detail: '파리, 취리히 등 전 세계 100개 도시 연동' }
    ]
  };

  const handlePayPalCheckout = async () => {
    if (!user) return toast.error('로그인이 필요한 서비스입니다.');
    
    setIsProcessing(true);
    toast.loading('PayPal 보안 결제 모듈을 로드 중입니다...', { duration: 2500 });

    // Phase 10.0: Actual Sandbox Logic Placeholder
    console.log('🔗 Initiating PayPal Sandbox for:', plan.name);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success('결제가 성공적으로 완료되었습니다! ✨', {
        style: {
            borderRadius: '24px',
            background: '#333',
            color: '#fff',
            fontWeight: '900',
            fontSize: '18px'
        }
      });
      router.push('/premium/success'); 
    }, 4000);
  };

  return (
    <div className="page-container bg-[#f8fafc] min-h-screen">
      <div className="content-wrapper pb-32">
        <header className="mb-10 pt-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg text-gray-900 font-black text-2xl transition-all active:scale-95">←</button>
          <div className="flex flex-col items-center">
             <h1 className="text-lg font-black text-gray-400 uppercase tracking-[4px]">Elite Checkout</h1>
             <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>
          </div>
          <div className="w-14"></div>
        </header>

        <div className="space-y-8">
          {/* Plan Card */}
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-orange-400 text-white px-8 py-3 rounded-bl-[2rem] text-xs font-black uppercase tracking-widest shadow-lg">
              BEST VALUE
            </div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-2">{plan.name}</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">₩{plan.price.toLocaleString()}</span>
                <span className="text-gray-400 font-black text-xl">/ {plan.billingCycle}</span>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              {plan.features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0 mt-1 shadow-inner font-black">
                    ✓
                  </div>
                  <div>
                    <p className="text-xl text-gray-900 font-black leading-tight group-hover:text-orange-600 transition-colors">{f.text}</p>
                    <p className="text-sm text-gray-400 font-bold mt-1">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handlePayPalCheckout}
                disabled={isProcessing}
                className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white py-8 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-blue-200/50 flex flex-col items-center justify-center gap-1 active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                {isProcessing ? (
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                         <span className="text-3xl font-bold italic tracking-tighter">PayPal</span>
                         <span className="text-xl font-medium opacity-80">Check out</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[3px] opacity-60">Global Secure Payment</span>
                  </>
                )}
              </button>
              
              <div className="text-center mt-2">
                 <button className="text-gray-300 text-sm font-black uppercase tracking-widest hover:text-gray-500 transition-colors">
                    신용카드/체크카드 직접 입력하기
                 </button>
              </div>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="bg-gray-100/50 p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200">
             <div className="flex justify-between items-center mb-6">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 grayscale" />
                 <Icon name="ShieldCheck" size={32} color="#94a3b8" />
             </div>
             <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">결제 안전 보장</h4>
             <ul className="text-xs text-gray-500 space-y-3 font-bold leading-relaxed">
                <li className="flex gap-2"><span>•</span> 256비트 SSL 암호화로 모든 결제 정보는 안전하게 보호됩니다.</li>
                <li className="flex gap-2"><span>•</span> 원클릭으로 간편하게 구독 해지가 가능하며 숨겨진 수수료가 없습니다.</li>
                <li className="flex gap-2"><span>•</span> 미사용 시 7일 이내 100% 환불을 보장해 드립니다.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
