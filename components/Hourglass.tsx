import React from 'react';

const Hourglass: React.FC = () => {
  return (
    <div className="relative w-24 h-40 opacity-90">
      {/* Top Bulb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-cosmic-accent/30 rounded-t-[50%] rounded-b-[5px] bg-cosmic-800/20 backdrop-blur-sm overflow-hidden z-10 border-b-0 box-content">
         <div className="absolute top-4 left-2 right-2 bottom-0 bg-cosmic-gold/80 rounded-b-[5px] animate-[pulse_3s_infinite]"></div>
         {/* Top sand draining overlay */}
         <div className="absolute top-0 left-0 w-full h-full bg-cosmic-900/90 animate-[floatUp_60s_linear_infinite] origin-bottom"></div>
      </div>

      {/* Connection */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-cosmic-accent/30 z-20"></div>

      {/* Falling Sand Stream */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[2px] h-[45%] bg-cosmic-gold shadow-[0_0_5px_#fbbf24] animate-pulse z-0"></div>

      {/* Bottom Bulb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-cosmic-accent/30 rounded-b-[50%] rounded-t-[5px] bg-cosmic-800/20 backdrop-blur-sm overflow-hidden z-10 border-t-0 box-content">
         {/* Accumulating Sand */}
         <div className="absolute bottom-0 left-2 right-2 h-0 bg-cosmic-gold/80 rounded-b-[40%] animate-[floatUp_60s_reverse_infinite]"></div>
         
         {/* Particle Noise */}
         <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
      </div>
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cosmic-gold/10 rounded-full blur-xl -z-10"></div>
    </div>
  );
};

export default Hourglass;