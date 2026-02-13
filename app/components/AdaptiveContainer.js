'use client';

import React from 'react';
import { useVitality } from '../context/VitalityContext';

/**
 * [Phase 3.0] AdaptiveContainer
 * 사용자의 접근성 설정(시력 수준)에 따라 자식 요소들의 스타일을 동적으로 조정합니다.
 */
export default function AdaptiveContainer({ children, className = "" }) {
  const { accessibility } = useVitality();

  // 시력 수준에 따른 클래스 매핑
  const getAdaptiveClass = () => {
    switch (accessibility.visionLevel) {
      case 2: // 약시 모드 (큰 글씨)
        return 'textSize-lg contrast-high';
      case 3: // 고대비 모드 (최대 크기)
        return 'textSize-xl contrast-max';
      default: // 일반 모드
        return 'textSize-base';
    }
  };

  return (
    <div className={`${getAdaptiveClass()} ${className}`}>
      {children}
      <style jsx global>{`
        .textSize-base { font-size: 16px; }
        .textSize-lg { font-size: 20px; }
        .textSize-xl { font-size: 24px; }
        
        .contrast-high {
          --text-main: #000000;
          --bg-card: #ffffff;
        }
        
        .contrast-max {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        /* 시력 보호를 위한 애니메이션 속도 조절 등 추가 가능 */
      `}</style>
    </div>
  );
}
