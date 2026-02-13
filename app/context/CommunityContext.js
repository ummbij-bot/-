'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchSocialFeed, findNearbyBuddies, donatePoints } from '../../lib/api/communityService';
import { useVitality } from './VitalityContext';

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
  const { user, points, addPoints } = useVitality();
  const [feed, setFeed] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const [campaigns] = useState([
    { id: 'c1', title: '경로당 시원한 여름나기 에어컨 지원', target: 1000000, current: 750000, icon: '❄️' },
    { id: 'c2', title: '우리동네 아이들 아침밥 챙겨주기', target: 500000, current: 320000, icon: '🍱' },
  ]);

  // Load Feed Data
  useEffect(() => {
    const loadCommunityData = async () => {
      const feedData = await fetchSocialFeed();
      setFeed(feedData);

      // Mock buddies matching
      const nearbyBuddies = await findNearbyBuddies();
      setBuddies(nearbyBuddies);
    };

    if (user) loadCommunityData();
  }, [user]);

  const handleDonate = async (amount, campaignId) => {
    if (points < amount) return { success: false, message: '포인트가 부족합니다.' };
    
    const success = await donatePoints(user.uid, amount, campaignId);
    if (success) {
      // VitalityContext: update points locally is managed by decrement in service
      // but we might need to manually sync if context doesn't refresh
      return { success: true, message: '나눔에 참여해 주셔서 감사합니다! ❤️' };
    }
    return { success: false, message: '기부에 실패했습니다. 다시 시도해 주세요.' };
  };

  return (
    <CommunityContext.Provider value={{ 
      feed, 
      buddies, 
      campaigns,
      handleDonate
    }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  return useContext(CommunityContext);
}
