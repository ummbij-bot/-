'use client';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import FeedbackForm from '../components/FeedbackForm';
import Icon from '../components/Icon';

export default function FeedbackPage() {
  const router = useRouter();
  const { user } = useVitality();

  const handleFeedbackSubmit = (feedbackData) => {
    // In production, this would send to Firebase or analytics
    console.log('Feedback submitted:', feedbackData);
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
        <h1 className="h1">의견 보내기 💬</h1>
        <p className="text-sm text-secondary mt-2">
          여러분의 소중한 의견이 더 나은 서비스를 만듭니다
        </p>
      </header>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-lg flex items-start gap-3">
        <Icon name="Info" size={20} color="var(--primary)" />
        <div className="text-sm text-gray-700 leading-relaxed">
          <strong>시니어 자문단 운영</strong><br />
          GoldenWalk는 60대 이상 사용자의 피드백을 최우선으로 합니다. 
          제출하신 의견은 24시간 내 검토되며, 주요 개선 사항은 다음 업데이트에 반영됩니다.
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackForm onSubmit={handleFeedbackSubmit} />

      {/* Recent Updates Section */}
      <section className="mt-lg">
        <h2 className="h3 mb-md flex items-center gap-2">
          <Icon name="CheckCircle" size={20} color="green" />
          <span>최근 반영된 의견</span>
        </h2>
        <div className="space-y-3">
          {[
            { 
              feedback: '글자 크기를 더 크게 해주세요',
              status: '✅ 반영 완료 (v1.2)',
              date: '2026-02-10'
            },
            { 
              feedback: '버튼을 더 크게 만들어주세요',
              status: '✅ 반영 완료 (v1.1)',
              date: '2026-02-08'
            },
            { 
              feedback: '걸음 수 그래프가 보기 어려워요',
              status: '🔄 검토 중',
              date: '2026-02-12'
            },
          ].map((item, idx) => (
            <div key={idx} className="card bg-gray-50" style={{ padding: 'var(--space-md)' }}>
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium flex-1">{item.feedback}</p>
                <span className="text-xs text-secondary ml-2">{item.date}</span>
              </div>
              <p className="text-xs text-primary font-bold">{item.status}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
