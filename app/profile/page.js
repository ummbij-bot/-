'use client';

import AccessibilitySettings from '../components/AccessibilitySettings';
import Icon from '../components/Icon';

export default function Profile() {
  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      <header className="mb-10 pt-4">
        <h1 className="text-3xl font-black text-gray-900 mb-2">내 정보</h1>
        <p className="text-xl font-bold text-gray-500">회원님의 소중한 정보와 설정을 관리해요.</p>
      </header>

      {/* Profile Card */}
      <section className="bg-white rounded-[32px] mb-10 py-10 text-center shadow-lg border-2 border-orange-50">
        <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-6 flex-center border-4 border-orange-100 shadow-inner">
            <Icon name="User" size={60} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">김영희 님</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-black shadow-md">
            <Icon name="Award" size={16} /> 플래티넘 회원
        </div>

        <div className="flex mt-10 border-t-2 border-gray-50 pt-8 px-6">
           <div className="flex-1 border-r-2 border-gray-50">
              <span className="text-sm text-gray-400 block mb-2 font-black">연결된 가족</span>
              <span className="font-black text-2xl text-gray-900">3명</span>
           </div>
           <div className="flex-1">
              <span className="text-sm text-gray-400 block mb-2 font-black">함께한 지</span>
              <span className="font-black text-2xl text-gray-900">124일</span>
           </div>
        </div>
      </section>

      {/* [Phase 3.0] UX Customization */}
      <AccessibilitySettings />

      {/* Settings List */}
      <section className="flex flex-col gap-4">
        {[
            { icon: 'Bell', label: '소식 알림 설정' },
            { icon: 'CreditCard', label: '결제 관리' },
            { icon: 'FileText', label: '서비스 이용 약관' },
        ].map((item, idx) => (
            <button key={idx} className="bg-white rounded-3xl p-6 flex items-center justify-between shadow-sm border-2 border-gray-50 active:bg-gray-50 transition-all active:scale-[0.98]">
                <div className="flex items-center gap-4">
                    <Icon name={item.icon} size={28} className="text-orange-600" />
                    <span className="font-black text-xl text-gray-900">{item.label}</span>
                </div>
                <Icon name="ChevronRight" size={24} className="text-gray-300" />
            </button>
        ))}
        
        <button className="bg-white rounded-3xl p-6 flex items-center justify-between border-2 border-red-50 text-red-500 mt-4 active:bg-red-50 transition-all">
             <div className="flex items-center gap-4">
                <Icon name="LogOut" size={28} />
                <span className="font-black text-xl">로그아웃</span>
             </div>
        </button>
      </section>

    </main>
  );
}
