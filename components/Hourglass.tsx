
import React from 'react';

interface HourglassProps {
  percentage: number; // 0 to 100
}

const Hourglass: React.FC<HourglassProps> = ({ percentage }) => {
  // Clamp percentage between 0% and 100%
  const safePercent = Math.min(Math.max(percentage, 0), 100);
  
  // Calculations for visual sand simulation
  // Top sand starts full and decreases. Bottom starts empty and increases.
  const topLevel = 100 - safePercent; 
  const bottomLevel = safePercent;

  return (
    <div className="relative w-32 h-64 opacity-90 transition-all duration-1000 mx-auto drop-shadow-2xl">
      
      {/* SVG Filters for grain effect */}
      <svg className="absolute w-0 h-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
      </svg>

      {/* --- TOP BULB --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 z-10">
        {/* Glass Container */}
        <div className="w-full h-full bg-cosmic-800/10 border-4 border-gray-600/50 rounded-t-[50%] rounded-b-[10px] backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative border-b-0">
            
            {/* Sand Mass (Decreasing) */}
            <div 
                className="absolute top-0 left-0 w-full bg-[#d4af37] transition-all duration-[1000ms] ease-linear"
                style={{ 
                    height: `${topLevel}%`,
                    // Create a funnel shape effect as it drains
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 115%, 0% 100%)'
                }}
            >
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ filter: 'url(#noiseFilter)' }}></div>
                {/* Surface Shine */}
                <div className="absolute top-0 left-0 w-full h-4 bg-white/20 blur-sm rounded-[100%]"></div>
            </div>
        </div>
      </div>

      {/* --- CONNECTION --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-gray-600/50 z-20 flex items-center justify-center overflow-hidden border-x border-gray-500/30">
          {/* Falling Stream */}
          {percentage < 100 && (
             <div className="w-1 h-full bg-[#d4af37] animate-sand-fall opacity-90 shadow-[0_0_10px_#fbbf24]"></div>
          )}
      </div>

      {/* --- FALLING STREAM IN BOTTOM BULB --- */}
      {percentage < 100 && (
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[2px] h-[48%] bg-gradient-to-b from-[#d4af37] to-transparent z-0 opacity-80"></div>
      )}

      {/* --- BOTTOM BULB --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 z-10">
         {/* Glass Container */}
         <div className="w-full h-full bg-cosmic-800/10 border-4 border-gray-600/50 rounded-b-[50%] rounded-t-[10px] backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative border-t-0 flex items-end justify-center">
            
            {/* Sand Mass (Accumulating Pile) */}
            <div 
                className="w-full bg-[#d4af37] relative transition-all duration-[1000ms] ease-linear"
                style={{ 
                    height: `${bottomLevel}%`,
                    // Create a mound/hill shape
                    clipPath: 'ellipse(150% 100% at 50% 100%)' 
                }}
            >
                 {/* Texture Overlay */}
                 <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ filter: 'url(#noiseFilter)' }}></div>
                 
                 {/* Top of the pile highlight */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-white/20 blur-md rounded-full"></div>
            </div>
         </div>
      </div>

      {/* Lighting/Reflection */}
      <div className="absolute top-4 right-4 w-8 h-16 bg-white/5 rounded-full blur-xl -rotate-12 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-8 h-16 bg-white/5 rounded-full blur-xl -rotate-12 pointer-events-none"></div>

    </div>
  );
};

export default Hourglass;
