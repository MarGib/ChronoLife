import React from 'react';

const GrimReaper: React.FC = () => {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 opacity-90 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
        {/* Glow behind hood */}
        <circle cx="100" cy="80" r="40" fill="#7f1d1d" className="animate-pulse opacity-50" />
        
        {/* Scythe Handle */}
        <path 
          d="M140,180 L140,40" 
          stroke="#4a4a4a" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Scythe Blade */}
        <path 
          d="M138,45 Q100,10 60,60 L70,65 Q105,30 138,55" 
          fill="#cbd5e1" 
          className="animate-[pulse_4s_infinite]"
        />
        
        {/* Cloak/Body */}
        <path 
          d="M100,40 Q130,40 130,80 L140,190 L60,190 L70,80 Q70,40 100,40 Z" 
          fill="#0f0f0f" 
          stroke="#262626" 
          strokeWidth="2"
        />
        
        {/* Hood Opening (Void face) */}
        <path 
          d="M100,45 Q120,45 120,75 Q120,100 100,100 Q80,100 80,75 Q80,45 100,45" 
          fill="#000000" 
        />
        
        {/* Spooky Eyes */}
        <circle cx="92" cy="70" r="2" fill="#ef4444" className="animate-[pulse_1s_infinite]" />
        <circle cx="108" cy="70" r="2" fill="#ef4444" className="animate-[pulse_1s_infinite]" style={{ animationDelay: '0.5s' }} />
        
        {/* Hand holding scythe */}
        <circle cx="140" cy="100" r="8" fill="#e2e8f0" />
        <path d="M136,100 L144,100" stroke="#000" strokeWidth="1" />
        <path d="M136,102 L144,102" stroke="#000" strokeWidth="1" />
        <path d="M136,98 L144,98" stroke="#000" strokeWidth="1" />
      </svg>
      
      {/* Fog/Smoke effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-red-900/20 to-transparent blur-md"></div>
    </div>
  );
};

export default GrimReaper;