'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState({
    watch: false,
    cane: false
  });
  const [heartRate, setHeartRate] = useState(72);
  const [fallDetected, setFallDetected] = useState(false);

  const connectDevice = (deviceId) => {
    setDevices(prev => ({ ...prev, [deviceId]: true }));
  };

  const disconnectDevice = (deviceId) => {
    setDevices(prev => ({ ...prev, [deviceId]: false }));
  };

  const triggerFallSimulation = () => {
    setFallDetected(true);
    setTimeout(() => setFallDetected(false), 5000);
  };

  // Simulate heart rate changes
  useEffect(() => {
    if (devices.watch) {
      const interval = setInterval(() => {
        setHeartRate(prev => Math.min(120, Math.max(60, prev + Math.floor(Math.random() * 10 - 5))));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [devices.watch]);

  return (
    <DeviceContext.Provider value={{ 
      devices, 
      connectDevice, 
      disconnectDevice, 
      heartRate, 
      fallDetected, 
      triggerFallSimulation 
    }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};
