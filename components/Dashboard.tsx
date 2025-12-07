import React, { useEffect, useState, useRef } from 'react';
import { LifeStats, UserConfig } from '../types';
import Hourglass from './Hourglass';

interface DashboardProps {
  config: UserConfig;
}

const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  const [stats, setStats] = useState<LifeStats | null>(null);
  const requestRef = useRef<number>();

  // Constants
  const HOURS_SLEEP = 7.8;
  const HOURS_EAT = 1.3;
  const HOURS_HYGIENE = 0.8;
  const HOURS_SCREENS = 3.5;
  const HEART_RATE_AVG = 70;
  const BREATH_RATE_AVG = 14;
  const WALKING_SPEED_KMH = 4.5; // Average walking speed includes downtime movements approx
  const DAILY_WALKING_HOURS = 1.5; // Average active movement
  const EARTH_ORBIT_VELOCITY_KMH = 107200; // Speed of Earth around Sun

  // Life Expectancy (Approximate PL stats)
  const LIFE_EXPECTANCY = config.gender === 'male' ? 75 : config.gender === 'female' ? 82 : 78;

  const calculateStats = () => {
    const now = new Date();
    const diff = now.getTime() - config.birthDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const milliseconds = diff % 1000;
    const totalDays = seconds / (3600 * 24);
    const totalHours = seconds / 3600;

    // Accurate Age Calculation
    let tempDate = new Date(config.birthDate);
    let years = now.getFullYear() - tempDate.getFullYear();
    tempDate.setFullYear(now.getFullYear());
    if (now < tempDate) {
      years--;
      tempDate.setFullYear(now.getFullYear() - 1);
    }
    let months = now.getMonth() - tempDate.getMonth();
    if (months < 0) months += 12;
    
    let d = now.getDate() - config.birthDate.getDate();
    if (d < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      d += prevMonth.getDate();
    }

    const percentageLived = (years + (months/12) + (d/365)) / LIFE_EXPECTANCY * 100;

    setStats({
      years,
      months,
      days: d,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: milliseconds,
      totalDays: Math.floor(totalDays),
      totalSeconds: seconds,
      
      timeSlept: totalDays * HOURS_SLEEP,
      timeEating: totalDays * HOURS_EAT,
      timeHygiene: totalDays * HOURS_HYGIENE,
      timeScreens: totalDays * HOURS_SCREENS,
      
      heartbeats: seconds / 60 * HEART_RATE_AVG,
      breathsTaken: seconds / 60 * BREATH_RATE_AVG,
      
      distanceWalkedKm: totalDays * DAILY_WALKING_HOURS * WALKING_SPEED_KMH,
      distanceSpaceKm: totalHours * EARTH_ORBIT_VELOCITY_KMH,
      
      lifeExpectancyYears: LIFE_EXPECTANCY,
      percentageLived: Math.min(percentageLived, 100),
    });
  };

  useEffect(() => {
    const animate = () => {
      calculateStats();
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [config]);

  if (!stats) return null;

  return (
    <div className="relative z-20 w-full h-screen overflow-hidden p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* MASTER GRID CONTAINER */}
      <div className="w-full max-w-[1600px] h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-[auto_1fr_auto] lg:grid-rows-2 gap-6 content-center">

        {/* --- HEADER / CLOCK SECTION (Spans Full Width) --- */}
        <div className="col-span-1 lg:col-span-12 flex flex-col items-center justify-center py-4 glass-panel rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-cosmic-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          
          <h2 className="text-cosmic-accent font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-2 animate-pulse-slow">Czas Twojego Istnienia</h2>
          
          {/* Main Clock */}
          <div className="relative z-10 flex items-baseline gap-1 md:gap-4 font-mono leading-none select-none">
             <div className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter text-glow drop-shadow-2xl">
               {stats.totalSeconds.toLocaleString('pl-PL')}
             </div>
             <div className="text-2xl md:text-4xl text-cosmic-accent font-light w-16 md:w-24">
               .{stats.milliseconds.toString().padStart(3, '0')}
             </div>
          </div>

          {/* Years/Months/Days Breakdown */}
          <div className="flex gap-8 md:gap-16 mt-6 md:mt-8 relative z-10">
            <TimeUnit value={stats.years} label="Lata" color="text-purple-400" glow="shadow-purple-500/50" />
            <div className="w-px bg-white/10 h-12 self-center"></div>
            <TimeUnit value={stats.months} label="Miesiące" color="text-cyan-400" glow="shadow-cyan-500/50" />
            <div className="w-px bg-white/10 h-12 self-center"></div>
            <TimeUnit value={stats.days} label="Dni" color="text-emerald-400" glow="shadow-emerald-500/50" />
          </div>
        </div>

        {/* --- LEFT COLUMN: CONSUMPTION STATS --- */}
        <div className="col-span-1 lg:col-span-3 glass-panel rounded-2xl p-6 flex flex-col justify-center gap-6 overflow-y-auto custom-scrollbar">
          <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-2">Dystrybucja Czasu</h3>
          <p className="text-[10px] text-gray-500 italic mb-2">
            Szacunki oparte na średnich danych WHO i badaniach społecznych.
          </p>
          
          <StatBar 
            label="Sen (33%)" 
            value={stats.timeSlept} 
            max={stats.totalDays * 24} 
            color="bg-indigo-600" 
            icon="🌑"
            info="Średnio 7.8h dziennie"
          />
          <StatBar 
            label="Ekrany & Praca (20%)" 
            value={stats.timeScreens} 
            max={stats.totalDays * 24} 
            color="bg-sky-500" 
            icon="💻"
            info="Praca, szkoła, telefon"
          />
          <StatBar 
            label="Jedzenie (5%)" 
            value={stats.timeEating} 
            max={stats.totalDays * 24} 
            color="bg-rose-500" 
            icon="🍽️"
            info="Przygotowanie i konsumpcja"
          />
          <StatBar 
            label="Higiena (3%)" 
            value={stats.timeHygiene} 
            max={stats.totalDays * 24} 
            color="bg-teal-500" 
            icon="🚿"
            info="Pielęgnacja ciała"
          />
        </div>

        {/* --- CENTER COLUMN: VISUALIZATIONS --- */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          
          {/* Life Line Progress */}
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center relative min-h-[160px]">
            <div className="w-full flex justify-between text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">
              <span>Narodziny</span>
              <span>Średnia długość ({stats.lifeExpectancyYears} lat)</span>
            </div>
            
            <div className="w-full h-8 bg-gray-900 rounded-full border border-white/10 relative overflow-hidden shadow-inner">
              {/* Progress Bar */}
              <div 
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 relative"
                style={{ width: `${stats.percentageLived}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_white]"></div>
              </div>
              
              {/* Markers */}
              <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white/20" title="25%"></div>
              <div className="absolute top-0 bottom-0 left-[50%] w-px bg-white/20" title="50%"></div>
              <div className="absolute top-0 bottom-0 left-[75%] w-px bg-white/20" title="75%"></div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-3xl font-bold text-white">{stats.percentageLived.toFixed(4)}%</span>
              <span className="text-gray-500 text-sm ml-2">Twojego szacowanego czasu minęło.</span>
            </div>
          </div>

          {/* Hourglass & Fun Physics */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hourglass Visual */}
            <div className="glass-panel rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
               <Hourglass />
               <div className="absolute bottom-4 text-xs text-cosmic-gold text-center w-full uppercase tracking-widest opacity-70">
                 Nieustanny przepływ
               </div>
            </div>

            {/* Fun Stats */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center gap-6">
              <PhysicsStat 
                label="Podróż z Ziemią"
                value={Math.floor(stats.distanceSpaceKm).toLocaleString('pl-PL')}
                unit="km"
                sub="Wokół Słońca (Orbita)"
                color="text-cyan-300"
              />
              <PhysicsStat 
                label="Przebyty Dystans"
                value={Math.floor(stats.distanceWalkedKm).toLocaleString('pl-PL')}
                unit="km"
                sub={`~ ${(stats.distanceWalkedKm / 40075).toFixed(2)} okrążeń Ziemi`}
                color="text-emerald-300"
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="text-center">
                   <div className="text-xl font-bold text-red-400">{Math.floor(stats.heartbeats / 1000000)} mln</div>
                   <div className="text-[10px] text-gray-500 uppercase">Uderzeń serca</div>
                 </div>
                 <div className="text-center">
                   <div className="text-xl font-bold text-blue-400">{Math.floor(stats.breathsTaken / 1000000)} mln</div>
                   <div className="text-[10px] text-gray-500 uppercase">Oddechów</div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MOTIVATION --- */}
        <div className="col-span-1 lg:col-span-3 glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>
           
           <h3 className="text-2xl font-serif text-white mb-6 italic relative z-10">"Carpe Aeternitatem"</h3>
           
           <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
             Każda sekunda na tym ekranie to kawałek historii, który już się dokonał. Zostało Ci około <span className="text-white font-bold">{(100 - stats.percentageLived).toFixed(1)}%</span> szacowanego czasu. 
             <br/><br/>
             To Twój najcenniejszy zasób. Nieodnawialny.
           </p>

           <button 
             onClick={() => window.location.reload()} 
             className="px-6 py-2 border border-white/20 hover:border-white hover:bg-white/5 rounded-full text-xs uppercase tracking-[0.2em] transition-all relative z-10"
           >
             Restart
           </button>
        </div>

      </div>
    </div>
  );
};

// --- Sub-components ---

const TimeUnit: React.FC<{value: number, label: string, color: string, glow: string}> = ({ value, label, color, glow }) => (
  <div className="text-center">
    <div className={`text-4xl md:text-6xl font-bold ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
      {value}
    </div>
    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em] font-semibold mt-1">
      {label}
    </div>
  </div>
);

const StatBar: React.FC<{label: string, value: number, max: number, color: string, icon: string, info: string}> = ({ label, value, max, color, icon, info }) => {
  const percent = Math.min((value / max) * 100, 100);
  const years = (value / (24 * 365)).toFixed(1);

  return (
    <div className="group cursor-help">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-300 font-bold flex items-center gap-2">{icon} {label}</span>
        <span className="text-white font-mono">{years} lat</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
      <div className="h-0 overflow-hidden group-hover:h-auto transition-all">
         <p className="text-[10px] text-gray-500 mt-1">{info}</p>
      </div>
    </div>
  );
};

const PhysicsStat: React.FC<{label: string, value: string, unit: string, sub: string, color: string}> = ({ label, value, unit, sub, color }) => (
  <div className="border-l-2 border-white/10 pl-4">
    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-2xl md:text-3xl font-mono font-bold ${color} leading-none mb-1`}>
      {value} <span className="text-xs text-gray-500 font-sans">{unit}</span>
    </div>
    <div className="text-[10px] text-gray-400">{sub}</div>
  </div>
);

export default Dashboard;