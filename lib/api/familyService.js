import { db } from '../firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';

/**
 * 가족 그룹 생성
 * @param {string} userId - 생성자 ID
 * @param {string} familyName - 가족 그룹 이름
 */
export const createFamilyGroup = async (userId, familyName) => {
  try {
    const familyId = `family_${Math.random().toString(36).substring(2, 9)}`;
    const familyRef = doc(db, 'families', familyId);
    
    await setDoc(familyRef, {
      familyId,
      familyName,
      adminId: userId,
      members: [userId],
      createdAt: new Date().toISOString()
    });

    // 사용자 정보에 familyId 업데이트
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      familyId: familyId
    });

    return { success: true, familyId };
  } catch (error) {
    console.error('Error creating family group:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 가족 초대 링크 생성 (Mock)
 * @param {string} familyId 
 */
export const generateInviteLink = (familyId) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/family/invite?id=${familyId}`;
};

/**
 * 가족 그룹 가입
 * @param {string} userId 
 * @param {string} familyId 
 */
export const joinFamilyGroup = async (userId, familyId) => {
  try {
    const familyRef = doc(db, 'families', familyId);
    const familySnap = await getDoc(familyRef);

    if (!familySnap.exists()) {
      return { success: false, message: '존재하지 않는 가족 그룹입니다.' };
    }

    await updateDoc(familyRef, {
      members: arrayUnion(userId)
    });

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      familyId: familyId
    });

    return { success: true };
  } catch (error) {
    console.error('Error joining family group:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 가족 활력 데이터 실시간 리스너
 * @param {string} familyId 
 * @param {function} callback 
 */
export const listenFamilyVitals = (familyId, callback) => {
  if (!familyId) return null;
  
  const q = query(collection(db, 'users'), where('familyId', '==', familyId));
  
  return onSnapshot(q, (snapshot) => {
    const familyData = [];
    snapshot.forEach((doc) => {
      familyData.push({ id: doc.id, ...doc.data() });
    });
    callback(familyData);
  });
};

/**
 * 가족 의사결정 제안 (Phase 10.0)
 * @param {string} familyId 
 * @param {object} actionData 
 */
export const proposeFamilyAction = async (familyId, actionData) => {
  try {
    const actionId = `action_${Date.now()}`;
    const actionRef = doc(db, 'family_actions', actionId);
    
    await setDoc(actionRef, {
      id: actionId,
      familyId,
      title: actionData.title,
      description: actionData.description,
      proposerId: actionData.proposerId,
      proposerName: actionData.proposerName,
      status: 'pending', // pending, approved, rejected
      votes: {}, // { userId: 'yes' | 'no' }
      createdAt: new Date().toISOString()
    });

    return { success: true, actionId };
  } catch (error) {
    console.error('Error proposing family action:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 가족 의사결정 투표 (Phase 10.0)
 * @param {string} actionId 
 * @param {string} userId 
 * @param {string} vote (yes/no)
 */
export const voteOnAction = async (actionId, userId, vote) => {
  try {
    const actionRef = doc(db, 'family_actions', actionId);
    const updatePath = `votes.${userId}`;
    await updateDoc(actionRef, {
      [updatePath]: vote
    });
    return { success: true };
  } catch (error) {
    console.error('Error voting on action:', error);
    return { success: false, error: error.message };
  }
};
