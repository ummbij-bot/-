/**
 * Community & Social Service (Phase 8.0)
 * Handles buddy matching, point donations, and social interactions
 */
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';

// 1. Fetch Social Feed (Masil Photo Exhibition)
export const fetchSocialFeed = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'snap_logs'),
      // we could add where('isPublic', '==', true) later
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString()
    }));
  } catch (error) {
    console.error('Failed to fetch social feed:', error);
    return [];
  }
};

// 2. Donate Points to Campaign
export const donatePoints = async (userId, amount, campaignId) => {
  if (!userId || amount <= 0) return false;
  
  try {
    // 1. Check user points is handled by context, but we write a log here
    const userRef = doc(db, 'users', userId);
    
    // 2. Add donation log
    await addDoc(collection(db, 'donations'), {
      userId,
      amount,
      campaignId,
      createdAt: serverTimestamp()
    });

    // 3. Update user points (atomic decrement)
    await updateDoc(userRef, {
      points: increment(-amount)
    });

    // 4. Update campaign total
    const campaignRef = doc(db, 'campaigns', campaignId);
    await updateDoc(campaignRef, {
      currentAmount: increment(amount)
    });

    return true;
  } catch (error) {
    console.error('Donation failed:', error);
    return false;
  }
};

// 3. Find Nearby Buddies (Mocked Matching)
export const findNearbyBuddies = async (lat, lon) => {
  // In a real app, this would use geohashes
  // For Phase 8.0, we return a randomized list of nearby "virtual" buddies
  return [
    { id: 'b1', name: '영등포 보안관', distance: '300m', status: '산책 중', avatar: '👴' },
    { id: 'b2', name: '여의도 수선화', distance: '500m', status: '산책 중', avatar: '👵' },
    { id: 'b3', name: '마포구 산토끼', distance: '800m', status: '방금 마침', avatar: '👵' },
  ];
};
