'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import { gifticons } from '../../../data/gifticons';
import toast from 'react-hot-toast';

export default function GifticonDetailClient({ params }) {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('detail'); // detail, processing, complete
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    // Unwrap params object for Next.js 15+ if needed, or just access directly in 14
    const itemId = params.id;
    const found = gifticons.find(g => g.id === itemId);
    if (found) {
        setItem(found);
    } else {
        // Handle 404
    }
  }, [params]);

  const handlePurchase = () => {
    // 1. Check points (Mock)
    const userPoints = 3450;
    if (item.price > userPoints) {
        toast.error('포인트가 부족해요! 조금만 더 걸어보세요 💪');
        return;
    }

    // 2. Process
    setStatus('processing');
    
    // 3. Simulate API Call
    setTimeout(() => {
        setStatus('complete');
        setBarcode('1234-5678-9012'); // Mock Barcode
        toast.success(`'${item.name}' 교환 완료!`, { duration: 3000 });
    }, 2000);
  };

  if (!item) return <div className="min-h-screen flex-center">로딩 중...</div>;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4 fixed top-0 w-full bg-white z-10">
        <Link href="/shop" className="p-2 -ml-2 text-gray-800">
            <Icon name="ArrowLeft" size={24} />
        </Link>
        <h1 className="text-lg font-bold">상품 상세</h1>
      </header>

      <div className="pt-16 pb-24 flex-1 flex flex-col">
        {status === 'detail' && (
            <>
                <div className="w-full aspect-square bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                    <span className="text-gray-500 font-bold mb-1">{item.brandName}</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {item.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">보유 포인트</span>
                            <span className="font-bold text-gray-900">3,450 P</span>
                        </div>
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600">차감 포인트</span>
                            <span className="font-black text-orange-600 text-xl">-{item.price.toLocaleString()} P</span>
                        </div>
                        <button 
                            onClick={handlePurchase}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
                        >
                            교환하기
                        </button>
                    </div>
                </div>
            </>
        )}

        {status === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">결제 진행 중...</h3>
                <p className="text-gray-500">포인트를 안전하게 차감하고 있습니다.</p>
            </div>
        )}

        {status === 'complete' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex-center mb-6">
                    <Icon name="Check" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">교환 완료!</h3>
                <p className="text-gray-500 mb-8">{item.name} 쿠폰이 발급되었습니다.</p>

                <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
                    <p className="text-sm text-gray-400 mb-2">바코드를 직원에게 보여주세요</p>
                    <div className="h-24 bg-white flex items-center justify-center mb-2">
                        {/* Mock Barcode Visual */}
                        <div className="flex gap-1 h-16 overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={`w-${Math.random() > 0.5 ? '1' : '2'} h-full bg-black`}></div>
                            ))}
                        </div>
                    </div>
                    <p className="font-mono text-xl font-bold tracking-widest text-gray-800">{barcode}</p>
                </div>

                <Link href="/shop" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg">
                    확인
                </Link>
            </div>
        )}
      </div>
    </main>
  );
}
