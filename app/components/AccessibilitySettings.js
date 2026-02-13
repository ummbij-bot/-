'use client';

import React from 'react';
import { useVitality } from '../context/VitalityContext';
import Icon from './Icon';

/**
 * [Phase 3.0] AccessibilitySettings
 * 사용자 맞춤형 UI 설정을 조절하는 컴포넌트입니다.
 */
export default function AccessibilitySettings() {
  const { accessibility, updateAccessibility } = useVitality();

  const levels = [
    { id: 1, label: '일반 모드', desc: '표준 글자 크기' },
    { id: 2, label: '큰 글씨 모드', desc: '시력이 약하신 분 추천' },
    { id: 3, label: '고대비 모드', desc: '검정 배경에 흰 글씨' }
  ];

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
        <Icon name="Eye" size={28} className="text-orange-600" /> 화면 보기 설정
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => updateAccessibility({ visionLevel: level.id })}
            className={`p-6 text-left border-4 rounded-[32px] transition-all active:scale-[0.98] shadow-sm ${
              accessibility.visionLevel === level.id 
                ? 'border-orange-600 bg-orange-50' 
                : 'border-gray-100 bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className={`text-xl font-black ${accessibility.visionLevel === level.id ? 'text-orange-600' : 'text-gray-900'}`}>
                  {level.label}
                </div>
                <div className="text-lg text-gray-500 font-bold mt-1">{level.desc}</div>
              </div>
              {accessibility.visionLevel === level.id && (
                <div className="text-orange-600">
                  <Icon name="CheckCircle" size={32} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-6 bg-orange-600 text-white rounded-[24px] font-black text-lg flex items-center gap-4 shadow-xl">
        <Icon name="Lightbulb" size={24} />
        설정한 크기는 앱 전체 화면에 즉시 적용됩니다.
      </div>
    </section>
  );
}
