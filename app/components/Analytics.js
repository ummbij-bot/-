'use client';

import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "../../lib/firebase";
import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const initAnalytics = async () => {
      try {
        if (typeof window !== 'undefined' && await isSupported()) {
          getAnalytics(app);
          console.log("📊 Firebase Analytics Initialized");
        }
      } catch (e) {
        console.error("Analytics init failed", e);
      }
    };
    initAnalytics();
  }, []);

  return null;
}
