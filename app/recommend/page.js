'use client';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';
import BottomBar from '../components/BottomBar';
import Icon from '../components/Icon';

export default function RecommendPage() {
  const router = useRouter();
  const { steps, language } = useVitality();
  
  // Mock recommendation algorithm based on user data
  const recommendations = [
    {
      id: 1,
      name: '경복궁 둘레길',
      distance: '2.3km',
      duration: '30분',
      difficulty: '쉬움',
      calories: '120 kcal',
      features: ['그늘 많음', '경사 낮음', '화장실 3곳'],
      score: 95,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
      reason: '평소 오전 산책을 선호하시는 패턴에 맞춰 추천드려요',
    },
    {
      id: 2,
      name: '한강 반포공원 산책로',
      distance: '3.5km',
      duration: '45분',
      difficulty: '보통',
      calories: '180 kcal',
      features: ['강변 뷰', '평탄한 길', '카페 근처'],
      score: 88,
      image: 'https://images.unsplash.com/photo-1565099824332-64f750c0ac54?w=400',
      reason: '최근 3일간 평균 3km 이상 걸으셨어요',
    },
    {
      id: 3,
      name: '서울숲 순환로',
      distance: '4.2km',
      duration: '55분',
      difficulty: '보통',
      calories: '220 kcal',
      features: ['자연 풍경', '벤치 많음', '편의점'],
      score: 82,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      reason: '건강한 심박수를 고려한 적절한 강도입니다',
    },
  ];

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
        <h1 className="h1">맞춤 산책로 추천 🗺️</h1>
        <p className="text-sm text-secondary mt-2">
          님의 걷기 패턴을 분석했어요
        </p>
      </header>

      {/* User Stats Card */}
      <section className="card mb-lg bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} color="var(--primary)" />
          <span>이번 주 활동 분석</span>
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xs text-secondary mb-1">평균 걸음</div>
            <div className="font-bold text-lg text-primary">{Math.floor(steps * 0.8).toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-secondary mb-1">선호 시간</div>
            <div className="font-bold text-lg">오전 8시</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-secondary mb-1">평균 속도</div>
            <div className="font-bold text-lg">4.2 km/h</div>
          </div>
        </div>
      </section>

      {/* Recommendations List */}
      <section>
        <h2 className="h3 mb-md">추천 산책로</h2>
        {recommendations.map((route, index) => (
          <div key={route.id} className="card mb-md" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Image */}
            <div className="relative h-40">
              <img 
                src={route.image} 
                alt={route.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Icon name="Star" size={14} color="orange" fill="orange" />
                <span className="text-sm font-bold">{route.score}점</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg">{route.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded-lg mb-3 flex items-start gap-2">
                <Icon name="Lightbulb" size={16} className="mt-0.5" />
                <span>{route.reason}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <Icon name="MapPin" size={16} color="var(--text-secondary)" className="mx-auto mb-1" />
                  <div className="text-xs font-bold">{route.distance}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <Icon name="Clock" size={16} color="var(--text-secondary)" className="mx-auto mb-1" />
                  <div className="text-xs font-bold">{route.duration}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <Icon name="Activity" size={16} color="var(--text-secondary)" className="mx-auto mb-1" />
                  <div className="text-xs font-bold">{route.difficulty}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <Icon name="Flame" size={16} color="var(--text-secondary)" className="mx-auto mb-1" />
                  <div className="text-xs font-bold">{route.calories}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {route.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <button className="btn-primary w-full">
                이 길로 걷기 시작
              </button>
            </div>
          </div>
        ))}
      </section>

      <BottomBar />
    </main>
  );
}
