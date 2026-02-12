'use client';

import BottomBar from '../components/BottomBar';
import Icon from '../components/Icon';

export default function Profile() {
  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <header className="mb-lg pt-2">
        <h1 className="h1 mb-1">내 정보</h1>
        <p className="text-body text-sm text-secondary">회원님의 소중한 정보입니다.</p>
      </header>

      {/* Profile Card */}
      <section className="card mb-lg py-8 text-center bg-white">
        <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 flex-center">
            <Icon name="User" size={40} color="var(--text-tertiary)" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">김영희 님</h2>
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold">
            <Icon name="Award" size={12} /> 플래티넘 회원
        </div>

        <div className="flex mt-8 border-t border-gray-50 pt-6">
           <div className="flex-1 border-r border-gray-50">
              <span className="text-xs text-secondary block mb-1">가족 연결</span>
              <span className="font-bold text-lg">3명</span>
           </div>
           <div className="flex-1">
              <span className="text-xs text-secondary block mb-1">가입일</span>
              <span className="font-bold text-lg">124일</span>
           </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="flex flex-col gap-3">
        {[
            { icon: 'Bell', label: '알림 설정' },
            { icon: 'CreditCard', label: '결제 수단 관리' },
            { icon: 'FileText', label: '이용 약관' },
        ].map((item, idx) => (
            <button key={idx} className="card p-4 flex items-center justify-between active:bg-gray-50" style={{ margin: 0 }}>
                <div className="flex items-center gap-3">
                    <Icon name={item.icon} size={20} color="var(--text-secondary)" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <Icon name="ChevronRight" size={20} color="var(--text-tertiary)" />
            </button>
        ))}
        
        <button className="card p-4 flex items-center justify-between text-red-500 mt-2" style={{ margin: 0 }}>
             <div className="flex items-center gap-3">
                <Icon name="LogOut" size={20} />
                <span className="font-medium">로그아웃</span>
             </div>
        </button>
      </section>

      <BottomBar />
    </main>
  );
}
