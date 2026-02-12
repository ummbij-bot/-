'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
  // Mock data for local walking groups
  const [groups] = useState([
    {
      id: 1,
      name: '서초동 아침 산책단',
      location: '서초구 서초동',
      members: 12,
      nextWalk: '2026-02-13 08:00',
      difficulty: '쉬움',
      distance: '2.5km',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    },
    {
      id: 2,
      name: '강남역 점심 걷기 모임',
      location: '강남구 역삼동',
      members: 8,
      nextWalk: '2026-02-12 12:30',
      difficulty: '보통',
      distance: '3.0km',
      image: 'https://images.unsplash.com/photo-1506126

613408-eca07ce68773?w=400',
    },
    {
      id: 3,
      name: '반포 저녁 한강 산책',
      location: '서초구 반포동',
      members: 15,
      nextWalk: '2026-02-12 18:00',
      difficulty: '쉬움',
      distance: '4.0km',
      image: 'https://images.unsplash.com/photo-1519374948-3e2e2ec0e79e?w=400',
    },
  ]);

  return (
    <CommunityContext.Provider value={{ groups }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  return useContext(CommunityContext);
}
