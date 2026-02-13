'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVitality } from '../context/VitalityContext';

export default function QuizPage() {
  const { user, loading, language, t, addPoints, triggerHaptic } = useVitality();
  const router = useRouter();
  const [solved, setSolved] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/start');
  }, [user, loading, router]);

  if (loading || !user) return <div className="loading-screen">퀴즈 로딩 중...</div>;

  const quizData = {
    ko: {
      question: "걷기 운동 전, 무릎 부상을 방지하기 위해 가장 좋은 준비운동은?",
      options: [
        { id: 1, text: "전력 질주", correct: false },
        { id: 2, text: "가벼운 스트레칭", correct: true },
        { id: 3, text: "무거운 역기 들기", correct: false }
      ],
      comment: "정답입니다! 걷기 전 가벼운 스트레칭은 관절을 부드럽게 풀어주어 부상을 예방합니다.",
      wrong_comment: "아쉽네요. 다시 한번 생각해보세요!"
    },
    ja: {
      question: "ウォーキング前、膝の怪我を防ぐために最適な準備運動は？",
      options: [
        { id: 1, text: "全力疾走", correct: false },
        { id: 2, text: "軽いストレッチ", correct: true },
        { id: 3, text: "重いバーベル上げ", correct: false }
      ],
      comment: "正解です！歩く前の軽いストレッチは関節を柔軟にし、怪我を予防します。",
      wrong_comment: "残念。もう一度考えてみてください！"
    }
  };

  const currentQuiz = quizData[language] || quizData['ko'];

  const handleAnswer = (isCorrect) => {
    triggerHaptic();
    if (isCorrect) {
      setCorrect(true);
      setSolved(true);
      addPoints(50); // Reward
    } else {
      alert(currentQuiz.wrong_comment);
    }
  };

  return (
    <main className="page-content">
      <header className="mb-lg">
        <h1 className="onboarding-title" style={{ fontSize: 'var(--fs-lg)', textAlign: 'left', marginBottom: '4px' }}>
          {language === 'ko' ? '오늘의 건강 퀴즈 🧠' : '今日の健康クイズ 🧠'}
        </h1>
        <p className="text-muted">
          {language === 'ko' ? '매일 퀴즈를 풀고 치매 예방하세요!' : '毎日クイズを解いて認知症を予防しましょう！'}
        </p>
      </header>

      <section className="card mb-lg" style={{ padding: 'var(--space-xl) var(--space-lg)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>❓</div>
        <h2 className="fw-bold" style={{ fontSize: 'var(--fs-lg)', marginBottom: '32px', lineHeight: 1.4 }}>
          {currentQuiz.question}
        </h2>

        <div className="flex flex-col gap-md">
          {currentQuiz.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !solved && handleAnswer(option.correct)}
              disabled={solved}
              className={`btn btn-lg ${solved && option.correct ? 'btn-mint' : 'btn-outline'}`}
              style={{ 
                width: '100%', 
                justifyContent: 'flex-start', 
                padding: '20px',
                opacity: solved && !option.correct ? 0.5 : 1
              }}
            >
              <span style={{ marginRight: '12px', fontWeight: 900 }}>{option.id}.</span> 
              {option.text}
              {solved && option.correct && <span style={{ marginLeft: 'auto' }}>✅</span>}
            </button>
          ))}
        </div>
      </section>

      {solved && (
        <div className="card-gold animate-float" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
          <h3 className="fw-black" style={{ fontSize: 'var(--fs-xl)', marginBottom: '8px' }}>+50 P</h3>
          <p className="fw-bold">{currentQuiz.comment}</p>
          <button className="btn btn-white mt-md" onClick={() => router.push('/')}>
            {language === 'ko' ? '메인으로 돌아가기' : 'メインに戻る'}
          </button>
        </div>
      )}

    </main>
  );
}
