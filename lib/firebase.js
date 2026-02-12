import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "goldenwalk-mvp",
  appId: "1:374002680942:web:d3d11130d161eb4513927f",
  storageBucket: "goldenwalk-mvp.firebasestorage.app",
  apiKey: "AIzaSyBcS7Q0A3Pr2-0wc_SIDU1MAKm1jlXbuF8",
  authDomain: "goldenwalk-mvp.firebaseapp.com",
  messagingSenderId: "374002680942",
  measurementId: "G-EYHX2L5ZB6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
