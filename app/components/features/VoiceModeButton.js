'use client';

import { useState } from 'react';
import { useVoiceCoach } from '../../hooks/useVoiceCoach';
import Icon from '../Icon';

export default function VoiceModeButton() {
  const { isCoaching, startCoaching, stopCoaching } = useVoiceCoach();

  const toggleCoaching = () => {
    if (isCoaching) {
      stopCoaching();
    } else {
      startCoaching();
    }
  };

  return (
    <div className="fixed z-50 bottom-40 right-5">
      {/* Pulse Effect Ring when Active */}
      {isCoaching && (
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
      )}
      
      <button
        onClick={toggleCoaching}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isCoaching 
            ? 'bg-primary text-white scale-110' 
            : 'bg-white text-primary border border-gray-100'
        }`}
        aria-label={isCoaching ? "Stop Voice Coaching" : "Start Voice Coaching"}
      >
        <Icon name={isCoaching ? "Mic" : "MicOff"} size={24} />
      </button>
      
      {/* Label (Only when not active to save space) */}
      {!isCoaching && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          음성 코치
        </span>
      )}
    </div>
  );
}
