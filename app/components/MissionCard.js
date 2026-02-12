'use client';
import { useState } from 'react';
import Icon from './Icon';

export default function MissionCard() {
  const [missions, setMissions] = useState([
    { id: 1, text: "3,000걸음 걷기", icon: "Footprints", target: 3000, current: 1200, done: false },
    { id: 2, text: "물 한 잔 마시기", icon: "GlassWater", target: 1, current: 0, done: false },
    { id: 3, text: "가족에게 안부 묻기", icon: "MessageCircleHeart", target: 1, current: 0, done: false },
  ]);

  const toggleMission = (id) => {
    setMissions(prev => prev.map(m => 
      m.id === id ? { ...m, done: !m.done, current: m.done ? 0 : m.target } : m
    ));
  };

  const allDone = missions.every(m => m.done);

  return (
    <section className="mb-lg">
      <div className="card" style={{ padding: '20px' }}>
        <div className="flex-between mb-md">
          <h2 className="h3 flex items-center gap-2">
            <Icon name="Target" size={24} color="var(--primary)" />
            오늘의 미션
          </h2>
          <span className="text-sm text-secondary">
            {missions.filter(m => m.done).length}/{missions.length} 달성
          </span>
        </div>

        <div className="flex flex-col gap-sm">
          {missions.map((mission) => (
            <div 
              key={mission.id} 
              onClick={() => toggleMission(mission.id)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all pressable ${
                mission.done ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${mission.done ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-400'}`}>
                  <Icon name={mission.icon} size={20} />
                </div>
                <span className={`font-medium ${mission.done ? 'text-gray-800' : 'text-gray-600'}`}>
                  {mission.text}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full flex-center border-2 ${
                mission.done ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
              }`}>
                {mission.done && <Icon name="Check" size={14} color="white" />}
              </div>
            </div>
          ))}
        </div>

        {allDone && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <button className="btn-primary w-full flex-center gap-2 py-3">
              <Icon name="Gift" size={20} />
              <span className="font-bold">보너스 100P 받기</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
