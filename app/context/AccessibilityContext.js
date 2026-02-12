'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSizeLevel, setFontSizeLevel] = useState(2); // 1: small, 2: medium, 3: large
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('accessibility');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFontSizeLevel(parsed.fontSizeLevel || 2);
      setHighContrast(parsed.highContrast || false);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('accessibility', JSON.stringify({ fontSizeLevel, highContrast }));
    
    // Apply font size to document
    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeLevel === 1 ? '0.875' : fontSizeLevel === 2 ? '1' : '1.125');
  }, [fontSizeLevel, highContrast]);

  return (
    <AccessibilityContext.Provider value={{ fontSizeLevel, setFontSizeLevel, highContrast, setHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
