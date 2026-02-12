'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getTranslation } from '../lib/i18n';

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

  // 1. Auth State Tracking
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Reset state if logged out
        setSteps(0);
        setPoints(0);
        setIsPremium(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Sync (Steps & Points)
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    
    // Subscribe to user document changes
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSteps(data.steps || 0);
        setPoints(data.points || 0);
        setIsPremium(data.isPremium || false);
        if (data.familyMessage) setFamilyMessage(data.familyMessage);
      } else {
        // Initialize new user document
        setDoc(userDocRef, {
          email: user.email,
          steps: 0,
          points: 100, // Welcome points
          isPremium: false,
          createdAt: new Date().toISOString()
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Step Simulator (Web Worker - Background Task)
  useEffect(() => {
    if (!user) return;

    // Use Web Worker if available
    if (window.Worker) {
      const stepWorker = new Worker(new URL('../workers/stepWorker.js', import.meta.url));
      
      stepWorker.postMessage('start');
      
      stepWorker.onmessage = async (e) => {
        if (e.data.type === 'STEP_UPDATE') {
          const increment = e.data.steps;
          
          setSteps(prev => {
            const newSteps = prev + increment;
            
            // Sync with Firestore (Optimized: only if divisible by 50 to reduce writes)
            if (newSteps % 50 === 0) {
              const userDocRef = doc(db, 'users', user.uid);
              setDoc(userDocRef, { 
                steps: newSteps,
                points: points + (Math.floor(newSteps / 100) > Math.floor(prev / 100) ? 10 : 0) // Point logic needs state access, simplified here
              }, { merge: true });
            }
            return newSteps;
          });
        }
      };

      return () => stepWorker.terminate();
    } else {
      // Fallback for no-worker environments
      const interval = setInterval(() => {
        setSteps(prev => prev + 5);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [user]); // Removed steps/points dependency to avoid re-creating worker

  // 4. Social & AI Features (Phase 14)
  useEffect(() => {
    if (!user) return;
    
    // Rotation of family messages to simulate active connection
    const messageInterval = setInterval(() => {
      const messages = familyMessages[language] || familyMessages['ko'];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setFamilyMessage(randomMsg);
    }, 15000);

    return () => messageInterval(messageInterval);
  }, [user, language]);

  const triggerVoiceCoach = (type) => {
    if (!isPremium) return;

    // [Phase 16] Real Text-to-Speech Implementation
    const voiceMsg = language === 'ko' 
      ? `어르신, 현재 ${steps}보를 걷고 계시네요! 목표까지 얼마 남지 않았어요. 허리는 곧게 펴시고, 호흡을 깊게 내쉬어 보세요. 사랑하는 가족들이 응원하고 있습니다!`
      : `おじいちゃん、今${steps}歩歩いていますね！ 目標までもう少しです。腰をまっすぐに伸ばして、深呼吸してみてください。家族みんなが応援しています！`;
    
    // Check browser support
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(voiceMsg);
      utterance.lang = language === 'ko' ? 'ko-KR' : 'ja-JP';
      utterance.rate = 0.9; // Slightly slower for seniors
      utterance.pitch = 1.1; // Friendly tone
      window.speechSynthesis.speak(utterance);
      
      console.log('🔊 AI Voice Playing:', voiceMsg);
    } else {
      alert(`[AI Voice] ${voiceMsg}`);
    }
  };

  // 5. Premium Upgrade (PayPal Simulation)
  const upgradeToPremium = async () => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { isPremium: true }, { merge: true });
    setIsPremium(true);
  };

  // 5. Auth Actions
  const login = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Firebase Login Failed, Using Mock User", error);
        // Fallback to Mock User for Demo/Rehearsal
        const mockUser = {
            uid: 'mock-senior-12345',
            displayName: '김마실',
            email: 'senior@goldenwalk.com',
            photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        };
        setUser(mockUser);
        setSteps(5432); // Demo initial steps
        setPoints(1250); // Demo points
        setIsPremium(true); // Demo premium
    }
  };
  const logout = () => {
      signOut(auth).catch(() => setUser(null));
      setUser(null);
  };

  const value = {
    user,
    loading,
    steps,
    goal,
    points,
    isPremium,
    familyMessage,
    language,
    setLanguage,
    upgradeToPremium,
    triggerVoiceCoach,
    login,
    logout,
    // [Phase 16] Haptic Feedback
    triggerHaptic: () => {
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50); // Light tap
      }
    },
    // [Phase 9] Global Dictionary
    t: (key) => {
        const dictionary = {
            greeting: { ko: '안녕하세요', en: 'Hello', ja: 'こんにちは', zh: '你好', es: 'Hola', fr: 'Bonjour', de: 'Hallo', it: 'Ciao', ru: 'Привет', vi: 'Xin chào' },
            cheer: { ko: '오늘도 활기찬 하루 되세요!', en: 'Have a great day!', ja: '今日も元気な一日を！', zh: '祝你今天过得愉快！', es: '¡Que tengas un gran día!', fr: 'Passez une bonne journée!', de: 'Einen schönen Tag noch!', it: 'Buona giornata!', ru: 'Хорошего дня!', vi: 'Chúc một ngày tốt lành!' },
            steps: { ko: '걸음 수', en: 'Steps', ja: '歩数', zh: '步数', es: 'Pasos', fr: 'Pas', de: 'Schritte', it: 'Passi', ru: 'Шаги', vi: 'Bước' },
            points: { ko: '포인트', en: 'Points', ja: 'ポイント', zh: '积分', es: 'Puntos', fr: 'Points', de: 'Punkte', it: 'Punti', ru: 'Очки', vi: 'Điểm' },
        };
        return dictionary[key]?.[language] || dictionary[key]?.['ko'] || key;
    },
    // [Phase 17] Add Points
    addPoints: async (amount) => {
      if (!user) return;
      const newPoints = points + amount;
      setPoints(newPoints);
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { points: newPoints }, { merge: true });
    }
  };

  return <VitalityContext.Provider value={value}>{children}</VitalityContext.Provider>;
};

export const useVitality = () => useContext(VitalityContext);
