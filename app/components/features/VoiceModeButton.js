'use client';

import { useState } from 'react';
import { useVoiceCoach } from '../../hooks/useVoiceCoach';
import Icon from '../Icon';

export default function VoiceModeButton() {
  const { isCoaching, isListening, startCoaching, stopCoaching, startListening, transcript } = useVoiceCoach();

  const toggleCoaching = () => {
    if (isCoaching) {
      stopCoaching();
    } else {
      startCoaching();
    }
  };

  return (
    <div className="fixed z-50 bottom-40 right-5 flex flex-col items-end gap-3">
      {/* Transcript Toast (Phase 6.0) */}
      {isListening && transcript && (
        <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm mb-2 animate-bounce max-w-[200px] text-right">
          "{transcript}"
        </div>
      )}

      <div className="relative">
        {/* Pulse Effect Rings */}
        {isCoaching && (
          <div className={`absolute inset-0 rounded-full bg-primary/30 animate-ping`}></div>
        )}
        {isListening && (
          <div className="absolute -inset-2 rounded-full border-4 border-blue-400/50 animate-pulse"></div>
        )}
        
        <button
          onClick={isCoaching ? startListening : toggleCoaching}
          onDoubleClick={isCoaching ? stopCoaching : null}
          className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 active:scale-90 ${
            isListening
              ? 'bg-blue-500 text-white scale-125'
              : isCoaching 
                ? 'bg-primary text-white' 
                : 'bg-white text-primary border-2 border-primary/10'
          }`}
          aria-label={isCoaching ? "Ask Question" : "Start Voice Coaching"}
        >
          {isListening ? (
            <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full animate-bar-1"></div>
                <div className="w-1 h-6 bg-white rounded-full animate-bar-2"></div>
                <div className="w-1 h-4 bg-white rounded-full animate-bar-1"></div>
            </div>
          ) : (
            <Icon name={isCoaching ? "Mic" : "MicOff"} size={28} />
          )}
        </button>

        {/* Status Label */}
        {!isCoaching && (
          <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap tracking-tighter uppercase">
            Voice Guide
          </span>
        )}
      </div>
      
      {isCoaching && !isListening && (
        <button 
            onClick={stopCoaching}
            className="bg-white/90 backdrop-blur-sm text-red-500 text-[10px] font-black px-3 py-1 rounded-full shadow-sm border border-red-100"
        >
            끄기
        </button>
      )}
    </div>
  );
}
