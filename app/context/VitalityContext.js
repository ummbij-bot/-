'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signInAnonymously, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, addDoc, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { getTranslation } from '../lib/i18n';
import { StepCounter } from '../../lib/sensors/stepCounter';
import { fetchWeather } from '../../lib/api/weatherService';
import { GeoFenceManager } from '../../lib/sensors/geoFence';

const VitalityContext = createContext();

export const VitalityProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(0);
  const [points, setPoints] = useState(0);
  const [goal] = useState(4000);
  const [isPremium, setIsPremium] = useState(false);
  const [familyMessage, setFamilyMessage] = useState('가족의 응원을 기다리는 중입니다 💖');
  const [language, setLanguage] = useState('ko');
  const [weatherData, setWeatherData] = useState({
    temp: 20,
    conditionKr: '로딩 중...',
    fineDustStatus: '좋음',
    icon: '☁️'
  });

  // [Phase 3.0] Accessibility Settings
  const [accessibility, setAccessibility] = useState({
    visionLevel: 1, // 1: 보통, 2: 약시(큰 글씨), 3: 고대비(최대 크기)
    textSize: 'base', // base, lg, xl, 2xl
    highContrast: false
  });

  // [Phase 5.0] Wearable Integration Settings
  const [wearableStatus, setWearableStatus] = useState({
    status: 'disconnected', // 'connected', 'disconnected', 'syncing'
    deviceName: null,
    battery: null,
    lastSync: null
  });

  // [Phase 6.0] Family Feed & Messages
  const [familyMessages, setFamilyMessages] = useState([]);

  // 1. Load Settings from localStorage
  useEffect(() => {
    const savedAccess = localStorage.getItem('gw_accessibility');
    if (savedAccess) setAccessibility(JSON.parse(savedAccess));

    const savedWearable = localStorage.getItem('gw_wearable');
    if (savedWearable) setWearableStatus(JSON.parse(savedWearable));
  }, []);

  // 2. Save Settings to localStorage
  useEffect(() => {
    localStorage.setItem('gw_accessibility', JSON.stringify(accessibility));
  }, [accessibility]);

  useEffect(() => {
    localStorage.setItem('gw_wearable', JSON.stringify(wearableStatus));
  }, [wearableStatus]);

  // 3. Auth State Tracking
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) console.log('✅ Redirect login successful:', result.user.email);
      })
      .catch((error) => console.error('❌ Redirect login failed:', error));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setSteps(0);
        setPoints(0);
        setIsPremium(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 4. Real-time Firestore Sync (User Data)
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSteps(data.steps || 0);
        setPoints(data.points || 0);
        setIsPremium(data.isPremium || false);
        if (data.familyMessage) setFamilyMessage(data.familyMessage);
      } else {
        setDoc(userDocRef, {
          email: user.email,
          steps: 0,
          points: 100,
          isPremium: false,
          createdAt: serverTimestamp()
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 5. Family Messages Listener (Phase 6.0)
  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'family_messages'),
      where('targetUserId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString()
      }));
      setFamilyMessages(msgs);
      if (msgs.length > 0) setFamilyMessage(msgs[0].content);
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Real-time Weather & GeoFence Sync (Phase 7.0)
  useEffect(() => {
    let geoManager = null;
    
    // 위험 구역 진입 시 음성 안내
    const handleEntry = (zone) => {
      console.log('🚨 User entered risk zone:', zone.name);
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(zone.msg);
        const langMap = { ko: 'ko-KR', ja: 'ja-JP', en: 'en-US', zh: 'zh-CN' };
        msg.lang = langMap[language] || 'ko-KR';
        window.speechSynthesis.speak(msg);
      }
    };

    geoManager = new GeoFenceManager(handleEntry);

    const updateContext = async () => {
      if (typeof window === 'undefined' || !navigator.geolocation) return;
      
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update Weather
        const weather = await fetchWeather(latitude, longitude);
        if (weather) setWeatherData(weather);
        
        // Check GeoFence
        geoManager.checkProximity(latitude, longitude);
        
      }, (error) => {
        console.warn('📍 Geolocation not available');
      });
    };

    updateContext();
    const interval = setInterval(updateContext, 60000); // 1 min for performance
    return () => clearInterval(interval);
  }, [language]);

  // 6. Step Counter (Real Sensor!)
  useEffect(() => {
    if (!user) return;
    let stepCounter = null;

    const startStepCounter = async () => {
      if (!StepCounter.isSupported()) return;
      try {
        stepCounter = new StepCounter(() => {
          setSteps(prev => {
            const newSteps = prev + 1;
            if (newSteps % 50 === 0) {
              const userDocRef = doc(db, 'users', user.uid);
              updateDoc(userDocRef, { 
                steps: newSteps,
                lastUpdated: serverTimestamp()
              });
            }
            return newSteps;
          });
        });
        await stepCounter.start();
      } catch (e) {
        console.error('❌ Step counter failed:', e);
      }
    };

    startStepCounter();
    return () => { if (stepCounter) stepCounter.stop(); };
  }, [user]);

  // Actions
  const login = async (method = 'redirect') => {
    try {
      if (method === 'redirect') await signInWithRedirect(auth, googleProvider);
      else if (method === 'anonymous') await signInAnonymously(auth);
      else if (method === 'popup') await signInWithPopup(auth, googleProvider);
    } catch (e) { throw e; }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) { setUser(null); }
  };

  const addSteps = async (amount = 100) => {
    if (!user) return;
    const newSteps = steps + amount;
    const pointsToAdd = Math.floor(newSteps / 100) * 10 - Math.floor(steps / 100) * 10;
    setSteps(newSteps);
    setPoints(prev => prev + pointsToAdd);
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { 
      steps: newSteps, 
      points: points + pointsToAdd,
      lastUpdated: serverTimestamp()
    });
  };

  const addPoints = async (amount) => {
    if (!user) return;
    const newPoints = points + amount;
    setPoints(newPoints);
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { points: newPoints });
  };

  const syncWearableData = (data) => {
    setWearableStatus(prev => ({ ...prev, ...data, lastSync: new Date().toISOString() }));
  };

  const saveSnapLog = async (snapData) => {
    if (!user) return null;
    try {
      const docRef = await addDoc(collection(db, 'snap_logs'), {
        userId: user.uid,
        userName: user.displayName,
        imageUrl: snapData.imageUrl,
        emotion: snapData.emotion,
        vitalityScore: snapData.vitalityScore,
        metrics: snapData.metrics || {},
        aiComment: snapData.aiComment,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (e) { return null; }
  };

  const saveGaitLog = async (logData) => {
    if (!user) return null;
    try {
      const docRef = await addDoc(collection(db, 'gait_logs'), {
        userId: user.uid,
        ...logData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (e) { return null; }
  };

  const [healthForecast, setHealthForecast] = useState({
    expectedScore: 75,
    advice: '마실을 시작해 볼까요?',
    predictedAge: 70
  });

  // [Phase 10.0] Family Group State
  const [familyVitals, setFamilyVitals] = useState([]);

  // [Phase 10.0] Listen to Family Vitals
  useEffect(() => {
    let unsubscribe = null;
    if (user?.familyId) {
      import('../../lib/api/familyService').then(({ listenFamilyVitals }) => {
        unsubscribe = listenFamilyVitals(user.familyId, (data) => {
          setFamilyVitals(data);
        });
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.familyId]);

  useEffect(() => {
    if (!user || steps === 0) return;
    import('../../lib/api/aiService').then(({ predictFutureVitality }) => {
      const mockHistory = [
        { steps: Math.max(0, steps - 1000) },
        { steps: Math.max(0, steps - 500) },
        { steps: steps }
      ];
      setHealthForecast(predictFutureVitality(mockHistory));
    });
  }, [user, steps]);

  const t = (key) => getTranslation(language, key);

  const value = {
    user, loading, steps, goal,    points,
    weatherData,
    isPremium,
    familyMessage, familyMessages, language, setLanguage,
    accessibility, 
    updateAccessibility: (settings) => setAccessibility(prev => ({ ...prev, ...settings })),
    login, logout, addSteps, addPoints, 
    wearableStatus, 
    healthForecast, // Added for Phase 9.0
    familyVitals,   // Added for Phase 10.0
    t
  };

  return <VitalityContext.Provider value={value}>{children}</VitalityContext.Provider>;
};

export const useVitality = () => useContext(VitalityContext);
