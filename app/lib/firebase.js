import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcS7Q0A3Pr2-0wc_SIDU1MAKm1jlXbuF8",
  authDomain: "goldenwalk-mvp.firebaseapp.com",
  projectId: "goldenwalk-mvp",
  storageBucket: "goldenwalk-mvp.firebasestorage.app",
  messagingSenderId: "374002680942",
  appId: "1:374002680942:web:d3d11130d161eb4513927f",
  measurementId: "G-EYHX2L5ZB6"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
