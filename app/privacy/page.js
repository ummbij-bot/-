'use client';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import SafeWalkMode from '../components/features/SafeWalkMode';
import BottomBar from '../components/BottomBar';
import Icon from '../components/Icon';

export default function PrivacyPage() {
  const router = useRouter();
  const { user } = useVitality();

  const dataUsage = [
    {
      category: '걸음 수 데이터',
      purpose: '일일 목표 달성 및 건강 분석',
      retention: '최근 90일',
      thirdParty: '없음',
      icon: 'Activity',
      color: 'blue',
    },
    {
      category: '위치 정보',
      purpose: '산책로 추천 및 주변 매장 찾기',
      retention: '즉시 삭제 (저장 안함)',
      thirdParty: 'Google Maps',
      icon: 'MapPin',
      color: 'green',
    },
    {
      category: '포인트 내역',
      purpose: '쿠폰 교환 및 리워드 제공',
      retention: '영구 (계정 삭제 시 삭제)',
      thirdParty: '없음',
      icon: 'Gift',
      color: 'orange',
    },
    {
      category: '가족 메시지',
      purpose: '응원 메시지 전송 및 공유',
      retention: '최근 30일',
      thirdParty: '없음',
      icon: 'Heart',
      color: 'red',
    },
  ];

  const handleDeleteData = () => {
    if (confirm('정말로 모든 데이터를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 계정도 함께 삭제됩니다.')) {
      alert('데이터 삭제 요청이 접수되었습니다.\n24시간 내에 처리됩니다.');
    }
  };

  const handleExportData = () => {
    const mockData = {
      user: user?.email || 'demo@goldenwalk.com',
      exportDate: new Date().toISOString(),
      steps: 'See CSV file',
      points: 'See CSV file',
    };
    
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `goldenwalk-data-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <main className="page-content" style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <header className="mb-lg">
        <button 
          onClick={() => router.back()}
          className="mb-md flex items-center gap-2 text-secondary pressable"
        >
          <Icon name="ChevronLeft" size={20} />
          <span>돌아가기</span>
        </button>
        <h1 className="h1">개인정보 관리 🔒</h1>
        <p className="text-sm text-secondary mt-2">
          GoldenWalk에서 수집하는 데이터를 투명하게 공개합니다
        </p>
      </header>

      {/* Trust Badge */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 p-4 rounded-lg mb-lg">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="ShieldCheck" size={24} color="green" />
          <h3 className="font-bold">데이터 투명성 보장</h3>
        </div>
        <p className="text-sm text-gray-700">
          GoldenWalk는 시니어 사용자의 개인정보를 가장 중요하게 생각합니다. 
          수집된 모든 데이터는 서비스 개선 목적으로만 사용되며, 제3자에게 판매하지 않습니다.
        </p>
      </div>

      {/* Data Usage Table */}
      <section className="mb-lg">
        <h2 className="h3 mb-md">수집되는 데이터</h2>
        <div className="space-y-3">
          {dataUsage.map((item, idx) => (
            <div key={idx} className="card bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${item.color}-50`}>
                  <Icon name={item.icon} size={20} color={`var(--${item.color})`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{item.category}</h4>
                  <p className="text-sm text-secondary">{item.purpose}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-secondary mb-1">보관 기간</div>
                  <div className="font-medium">{item.retention}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-secondary mb-1">제3자 공유</div>
                  <div className="font-medium">{item.thirdParty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safe Walk Mode */}
      <section className="mb-lg">
        <h2 className="h3 mb-md">안전 기능</h2>
        <SafeWalkMode />
      </section>

      {/* Data Control */}
      <section className="mb-lg">
        <h2 className="h3 mb-md">데이터 관리</h2>
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full card bg-white pressable flex items-center justify-between"
            style={{ padding: 'var(--space-md)' }}
          >
            <div className="flex items-center gap-3">
              <Icon name="Download" size={20} color="var(--primary)" />
              <div className="text-left">
                <div className="font-bold">내 데이터 다운로드</div>
                <div className="text-sm text-secondary">JSON 형식으로 모든 데이터 내려받기</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} color="var(--gray-400)" />
          </button>

          <button
            onClick={handleDeleteData}
            className="w-full card bg-red-50 border-red-100 pressable flex items-center justify-between"
            style={{ padding: 'var(--space-md)' }}
          >
            <div className="flex items-center gap-3">
              <Icon name="Trash2" size={20} color="red" />
              <div className="text-left">
                <div className="font-bold text-red-600">모든 데이터 삭제</div>
                <div className="text-sm text-red-500">계정 및 활동 내역 영구 삭제</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} color="red" />
          </button>
        </div>
      </section>

      <BottomBar />
    </main>
  );
}
