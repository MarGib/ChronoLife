
import React, { useEffect, useState, useRef } from 'react';
import { LifeStats, UserConfig, HistoricalEvent } from '../types';
import Hourglass from './Hourglass';
import GrimReaper from './GrimReaper';

interface DashboardProps {
  config: UserConfig;
}

type DisplayMode = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';

// --- STATIC DATA ---
const EVENTS_DB: HistoricalEvent[] = [
  { year: 1989, title: "Upadek Muru / Koniec PRL", description: "Symboliczny koniec komunizmu w Europie." },
  { year: 1990, title: "Wałęsa Prezydentem", description: "Pierwsze w pełni wolne wybory prezydenckie w Polsce." },
  { year: 1990, title: "WWW", description: "Tim Berners-Lee tworzy pierwszą stronę World Wide Web." },
  { year: 1991, title: "Linux", description: "Linus Torvalds publikuje jądro Linuxa." },
  { year: 1992, title: "SMS", description: "Wysłano pierwszą wiadomość SMS w historii." },
  { year: 1993, title: "Jurassic Park", description: "Premiera filmu, który zrewolucjonizował efekty specjalne." },
  { year: 1994, title: "Denominacja Złotego", description: "Sejm uchwala ustawę. 10 000 starych zł = 1 nowy zł." },
  { year: 1994, title: "PlayStation", description: "Sony wypuszcza pierwszą konsolę PlayStation." },
  { year: 1995, title: "Windows 95", description: "Premiera systemu, który zmienił komputery osobiste." },
  { year: 1996, title: "Wisława Szymborska", description: "Polska poetka otrzymuje Nagrodę Nobla." },
  { year: 1997, title: "Konstytucja RP", description: "Uchwalenie obecnej Konstytucji Rzeczypospolitej Polskiej." },
  { year: 1997, title: "Harry Potter", description: "Wydanie pierwszej książki o młodym czarodzieju." },
  { year: 1998, title: "Google", description: "Zarejestrowanie domeny google.com." },
  { year: 1999, title: "Polska w NATO", description: "Wstąpienie Polski do struktur Sojuszu Północnoatlantyckiego." },
  { year: 1999, title: "Matrix", description: "Premiera filmu, który zdefiniował przełom wieków." },
  { year: 2000, title: "Problem Roku 2000", description: "Świat obawia się pluskwy milenijnej (Y2K)." },
  { year: 2001, title: "Wikipedia", description: "Uruchomienie wolnej encyklopedii." },
  { year: 2001, title: "11 Września", description: "Ataki terrorystyczne na World Trade Center." },
  { year: 2001, title: "iPod", description: "Apple prezentuje przenośny odtwarzacz muzyki." },
  { year: 2002, title: "Euro w gotówce", description: "Wprowadzenie waluty Euro do obiegu fizycznego." },
  { year: 2004, title: "Polska w UE", description: "Przystąpienie Polski do Unii Europejskiej." },
  { year: 2004, title: "Facebook", description: "Mark Zuckerberg uruchamia TheFacebook." },
  { year: 2005, title: "YouTube", description: "Opublikowano pierwszy film w serwisie ('Me at the zoo')." },
  { year: 2005, title: "Śmierć Jana Pawła II", description: "Koniec pontyfikatu polskiego papieża." },
  { year: 2007, title: "iPhone", description: "Steve Jobs prezentuje pierwszego iPhone'a." },
  { year: 2007, title: "Wiedźmin", description: "Premiera pierwszej gry z serii Wiedźmin od CD Projekt." },
  { year: 2008, title: "Kryzys Finansowy", description: "Upadek banku Lehman Brothers rozpoczyna globalny kryzys." },
  { year: 2009, title: "Bitcoin", description: "Powstanie pierwszej kryptowaluty." },
  { year: 2010, title: "Instagram", description: "Uruchomienie aplikacji do dzielenia się zdjęciami." },
  { year: 2011, title: "Minecraft", description: "Oficjalna premiera pełnej wersji gry." },
  { year: 2012, title: "Euro 2012", description: "Mistrzostwa Europy w Piłce Nożnej w Polsce i na Ukrainie." },
  { year: 2012, title: "Łazik Curiosity", description: "Lądowanie na Marsie." },
  { year: 2014, title: "Aneksja Krymu", description: "Początek konfliktu na Ukrainie." },
  { year: 2015, title: "SpaceX", description: "Pierwsze udane lądowanie rakiety orbitalnej." },
  { year: 2016, title: "Pokemon GO", description: "Gra mobilna, która wyciągnęła ludzi na ulice." },
  { year: 2019, title: "Olga Tokarczuk", description: "Polska pisarka otrzymuje Nagrodę Nobla." },
  { year: 2020, title: "Pandemia COVID-19", description: "Globalny lockdown i zmiana świata." },
  { year: 2021, title: "NFT Boom", description: "Szaleństwo na punkcie cyfrowej sztuki." },
  { year: 2022, title: "Wojna w Ukrainie", description: "Początek pełnoskalowej inwazji Rosji." },
  { year: 2022, title: "8 Miliardów", description: "Populacja Ziemi przekracza 8 miliardów ludzi." },
  { year: 2023, title: "Era AI", description: "Gwałtowny rozwój sztucznej inteligencji (ChatGPT-4)." },
];

const ZODIAC_SIGNS = [
  { sign: "Koziorożec", start: [12, 22], end: [1, 19] },
  { sign: "Wodnik", start: [1, 20], end: [2, 18] },
  { sign: "Ryby", start: [2, 19], end: [3, 20] },
  { sign: "Baran", start: [3, 21], end: [4, 19] },
  { sign: "Byk", start: [4, 20], end: [5, 20] },
  { sign: "Bliźnięta", start: [5, 21], end: [6, 20] },
  { sign: "Rak", start: [6, 21], end: [7, 22] },
  { sign: "Lew", start: [7, 23], end: [8, 22] },
  { sign: "Panna", start: [8, 23], end: [9, 22] },
  { sign: "Waga", start: [9, 23], end: [10, 22] },
  { sign: "Skorpion", start: [10, 23], end: [11, 21] },
  { sign: "Strzelec", start: [11, 22], end: [12, 21] },
];

const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Koziorożec";

  const found = ZODIAC_SIGNS.find(z => {
    if (month === z.start[0] && day >= z.start[1]) return true;
    if (month === z.end[0] && day <= z.end[1]) return true;
    return false;
  });
  
  return found ? found.sign : "Nieznany";
};

// Helper for breakdown formatting (D:H:M:S)
const formatTimeBreakdown = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  // Pad with leading zeros for stability
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
};

// Helper for memento mori breakdown (Y:D:H:M:S)
const formatMementoMori = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const years = Math.floor(totalSeconds / (3600 * 24 * 365.25));
    const remainingSeconds = totalSeconds % Math.floor(3600 * 24 * 365.25);
    const days = Math.floor(remainingSeconds / (3600 * 24));
    const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    // Using padStart to keep width stable
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${years} lat, ${pad(days)} dni\n${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [userEvents, setUserEvents] = useState<HistoricalEvent[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('seconds');
  const requestRef = useRef<number>();

  // Constants
  const LIFE_EXPECTANCY = config.gender === 'male' ? 75 : config.gender === 'female' ? 82 : 78;
  const EARTH_ORBIT_KM = 940000000;
  const MOON_CYCLE_DAYS = 29.53;

  useEffect(() => {
    const relevantEvents = EVENTS_DB.filter(e => e.year >= config.birthDate.getFullYear());
    relevantEvents.sort((a, b) => a.year - b.year);
    setUserEvents(relevantEvents);
  }, [config.birthDate]);

  const calculateStats = () => {
    const now = new Date();
    const diff = now.getTime() - config.birthDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const milliseconds = diff % 1000;
    const totalDays = seconds / (3600 * 24);

    // Precise Age Breakdown
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

    // Netflix
    const netflixLaunch = new Date('2016-01-06');
    let netflixDays = 0;
    if (config.birthDate > netflixLaunch) {
       netflixDays = totalDays; 
    } else {
       netflixDays = (now.getTime() - netflixLaunch.getTime()) / (1000 * 3600 * 24);
    }

    // Dynamic Counts
    const nextBirthday = new Date(now.getFullYear(), config.birthDate.getMonth(), config.birthDate.getDate());
    if (now > nextBirthday) nextBirthday.setFullYear(now.getFullYear() + 1);
    // Set next birthday to 00:00:00 of that day for cleaner countdown
    nextBirthday.setHours(0,0,0,0);
    const diffBirthday = nextBirthday.getTime() - now.getTime();

    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    const diffEndOfYear = endOfYear.getTime() - now.getTime();
    
    const deathDate = new Date(config.birthDate);
    deathDate.setFullYear(config.birthDate.getFullYear() + LIFE_EXPECTANCY);
    const diffDeath = deathDate.getTime() - now.getTime();

    setStats({
      years, months, days: d, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds(), milliseconds,
      totalDays: Math.floor(totalDays),
      totalSeconds: seconds,
      
      timeSlept: totalDays * 7.8,
      timeEating: totalDays * 1.3,
      timeHygiene: totalDays * 0.8,
      timeWorkSchool: totalDays * 5.5,
      timePhoneScreens: totalDays * 2.5,
      timeNetflix: netflixDays > 0 ? netflixDays * 1.2 : 0,
      
      weekendsLived: Math.floor(totalDays / 7) * 3,
      fullMoonsSeen: totalDays / MOON_CYCLE_DAYS,
      blinks: seconds / 60 * 15, 
      wordsSpoken: totalDays * 16000,
      hairGrowthCm: (totalDays / 30) * 1.25,
      dreamsHad: totalDays * 4,
      bloodPumpedLiters: totalDays * 7000,
      sunrisesSeen: totalDays,
      earthOrbits: totalDays / 365.25,
      
      heartbeats: (diff / 1000 / 60) * 70, // Precise dynamic heartbeats
      breathsTaken: (diff / 1000 / 60) * 16, // Precise dynamic breaths
      distanceWalkedKm: totalDays * 5,
      distanceSpaceKm: (diff / (1000 * 60 * 60 * 24 * 365.25)) * EARTH_ORBIT_KM,
      
      lifeExpectancyYears: LIFE_EXPECTANCY,
      percentageLived: Math.min(percentageLived, 100),
      
      zodiacSign: getZodiacSign(config.birthDate),
      nextBirthdayCountdown: diffBirthday > 0 ? formatTimeBreakdown(diffBirthday) : "Dziś urodziny!",
      endOfYearCountdown: formatTimeBreakdown(diffEndOfYear),
      mementoMoriCountdown: diffDeath > 0 ? formatMementoMori(diffDeath) : "Czas minął...",
      deathDate
    });
  };

  useEffect(() => {
    const animate = () => {
      calculateStats();
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [config]);

  const getBigCounterValue = () => {
    if (!stats) return { val: '0', sub: '' };
    const diff = new Date().getTime() - config.birthDate.getTime();
    switch (displayMode) {
      case 'years': return { val: (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(9), sub: 'Lat' };
      case 'months': return { val: (diff / (1000 * 60 * 60 * 24 * 30.4375)).toFixed(8), sub: 'Miesięcy' };
      case 'days': return { val: (diff / (1000 * 60 * 60 * 24)).toFixed(7), sub: 'Dni' };
      case 'hours': return { val: (diff / (1000 * 60 * 60)).toFixed(6), sub: 'Godzin' };
      case 'minutes': return { val: (diff / (1000 * 60)).toFixed(4), sub: 'Minut' };
      case 'seconds': return { val: (diff / 1000).toLocaleString('pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), sub: 'Sekund' };
      case 'milliseconds': return { val: diff.toLocaleString('pl-PL'), sub: 'Milisekund' };
      default: return { val: '0', sub: '' };
    }
  };

  if (!stats) return null;
  const counter = getBigCounterValue();

  // Helper to format units consistently with padding
  const pad2 = (n: number) => n.toString().padStart(2, '0');
  const pad3 = (n: number) => n.toString().padStart(3, '0');

  return (
    <div className="relative z-20 w-full min-h-screen p-4 md:p-8 flex flex-col items-center pb-20">
      
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">

        {/* --- HEADER --- */}
        <div className="col-span-1 lg:col-span-12 flex flex-col items-center justify-center py-8 glass-panel rounded-2xl relative overflow-hidden group min-h-[300px]">
          <div className="absolute inset-0 bg-cosmic-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          
          <h2 className="text-gray-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-2 animate-pulse-slow">
            Czas Twojego Istnienia
          </h2>
          <p className="text-[9px] text-gray-600 mb-8 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
            Kliknij na jednostkę aby zmienić tryb licznika
          </p>
          
          {/* STABILIZED TIME BREAKDOWN BAR */}
          <div className="flex flex-wrap justify-center items-end gap-2 md:gap-4 mb-8 relative z-10 w-full px-4 select-none font-mono">
            <TimeUnit value={stats.years} label="Lata" color="text-purple-400" borderColor="border-purple-400" active={displayMode === 'years'} onClick={() => setDisplayMode('years')} />
            <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad2(stats.months)} label="M-ce" color="text-cyan-400" borderColor="border-cyan-400" active={displayMode === 'months'} onClick={() => setDisplayMode('months')} />
            <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad2(stats.days)} label="Dni" color="text-emerald-400" borderColor="border-emerald-400" active={displayMode === 'days'} onClick={() => setDisplayMode('days')} />
            <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad2(stats.hours)} label="Godz" color="text-amber-400" borderColor="border-amber-400" active={displayMode === 'hours'} onClick={() => setDisplayMode('hours')} />
            <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad2(stats.minutes)} label="Min" color="text-rose-400" borderColor="border-rose-400" active={displayMode === 'minutes'} onClick={() => setDisplayMode('minutes')} />
             <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad2(stats.seconds)} label="Sek" color="text-blue-400" borderColor="border-blue-400" active={displayMode === 'seconds'} onClick={() => setDisplayMode('seconds')} />
             <div className="hidden md:flex h-12 items-center text-white/20 text-2xl font-light">|</div>
            <TimeUnit value={pad3(stats.milliseconds)} label="Mili" color="text-gray-300" borderColor="border-gray-300" active={displayMode === 'milliseconds'} onClick={() => setDisplayMode('milliseconds')} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center mt-2 w-full px-4">
             <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter text-glow drop-shadow-2xl font-mono text-center break-all transition-all tabular-nums">
               {counter.val}
             </div>
             <div className="text-xs md:text-sm text-cosmic-accent uppercase tracking-[0.3em] mt-4 font-bold animate-pulse">
               {counter.sub}
             </div>
          </div>
        </div>

        {/* --- LEFT: CONSUMPTION --- */}
        <div className="col-span-1 lg:col-span-3 glass-panel rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-2">Pożeracze Czasu</h3>
          
          <StatBar label="Sen" value={stats.timeSlept} max={stats.totalDays * 24} color="bg-indigo-600" icon="🌑" info="~33% życia" />
          <StatBar label="Praca/Szkoła" value={stats.timeWorkSchool} max={stats.totalDays * 24} color="bg-amber-600" icon="💼" info="~23% życia" />
          <StatBar label="Ekrany" value={stats.timePhoneScreens} max={stats.totalDays * 24} color="bg-sky-500" icon="📱" info="~10-15% życia" />
          <StatBar label="Netflix" value={stats.timeNetflix} max={stats.totalDays * 24} color="bg-red-600" icon="🎬" info="Od startu PL (2016)" />
          <StatBar label="Jedzenie" value={stats.timeEating} max={stats.totalDays * 24} color="bg-rose-500" icon="🍽️" info="~5% życia" />
          <StatBar label="Higiena" value={stats.timeHygiene} max={stats.totalDays * 24} color="bg-teal-500" icon="🚿" info="~3% życia" />

           <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
             <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Przeżyte Weekendy</div>
             <div className="text-2xl font-bold text-yellow-400 font-mono">{stats.weekendsLived.toLocaleString('pl-PL')}</div>
             <div className="text-[10px] text-gray-500">Piątek - Niedziela</div>
           </div>
        </div>

        {/* --- CENTER: MAIN VISUALS --- */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          
          {/* Countdowns */}
          <div className="grid grid-cols-2 gap-4">
            <CountdownCard label="Następne urodziny" value={stats.nextBirthdayCountdown} color="text-pink-400" icon="🎂" />
            <CountdownCard label="Koniec roku" value={stats.endOfYearCountdown} color="text-blue-400" icon="🎆" />
          </div>

          {/* Death / Memento Mori */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 border-red-900/30 bg-gradient-to-b from-black/60 to-red-950/20 relative overflow-hidden min-h-[250px]">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 shrink-0"><GrimReaper /></div>
            <div className="flex flex-col flex-grow text-center md:text-left relative z-10 w-full">
              <h3 className="font-serif text-2xl text-red-500 mb-2 text-glow-red">Memento Mori</h3>
              {/* Dynamic Memento Mori Countdown */}
              <div className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono whitespace-pre-line leading-tight tabular-nums">
                {stats.mementoMoriCountdown}
              </div>
              
              <div className="w-full h-3 bg-gray-900 rounded-full border border-red-900/50 overflow-hidden mt-4 relative">
                <div className="h-full bg-gradient-to-r from-green-900 via-yellow-900 to-red-600 transition-all duration-1000" style={{ width: `${stats.percentageLived}%` }}></div>
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-gray-500 font-mono">
                <span>Start</span>
                <span className="text-red-400">{stats.percentageLived.toFixed(6)}% zużyte</span>
                <span>Koniec (~{stats.lifeExpectancyYears} lat)</span>
              </div>
            </div>
          </div>

          {/* Hourglass & Curiosity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Hourglass Column */}
            <div className="col-span-1 md:col-span-4 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]">
               <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Upływ Czasu</div>
               <Hourglass percentage={stats.percentageLived} />
               <div className="text-[10px] text-cosmic-gold mt-4 font-mono tabular-nums">{stats.percentageLived.toFixed(5)}%</div>
            </div>

            {/* Curiosity Grid */}
            <div className="col-span-1 md:col-span-8 glass-panel rounded-2xl p-6">
               <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                 <span>Dynamiczna Biologia & Kosmos</span>
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <CuriosityItem label="Podróż z Ziemią" val={stats.distanceSpaceKm.toLocaleString('pl-PL', {maximumFractionDigits: 1})} unit="km" icon="🌍" sub="Wokół Słońca" />
                  <CuriosityItem label="Dystans Pieszo" val={Math.floor(stats.distanceWalkedKm).toLocaleString('pl-PL')} unit="km" icon="👣" sub="Twoje kroki" />
                  <CuriosityItem label="Uderzenia Serca" val={stats.heartbeats.toLocaleString('pl-PL', {maximumFractionDigits: 0})} unit="" icon="❤️" sub="Pompa życia" />
                  <CuriosityItem label="Oddechy" val={stats.breathsTaken.toLocaleString('pl-PL', {maximumFractionDigits: 0})} unit="" icon="🌬️" sub="Tlen" />
                  <CuriosityItem label="Pełnie Księżyca" val={stats.fullMoonsSeen.toFixed(2)} unit="" icon="🌕" sub="Przeżyte cykle" />
                  <CuriosityItem label="Mrugnięcia" val={stats.blinks.toLocaleString('pl-PL', {maximumFractionDigits: 0})} unit="" icon="👁️" sub="Nawilżenie oka" />
                  <CuriosityItem label="Sny" val={Math.floor(stats.dreamsHad).toLocaleString()} unit="" icon="💤" sub="Marzenia senne" />
                  <CuriosityItem label="Wzrost Włosów" val={(stats.hairGrowthCm / 100).toFixed(4)} unit="m" icon="💇" sub="Łączna długość" />
               </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: EVENTS & HISTORY --- */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-[40px] rounded-full"></div>
            <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Znak Zodiaku</h3>
            <div className="text-3xl font-serif text-purple-300 mb-1">{stats.zodiacSign}</div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-grow flex flex-col h-[500px]">
            <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
              <span>Oś Czasu</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{userEvents.length}</span>
            </h3>
            <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar flex-grow">
              {userEvents.map((event, idx) => (
                <div key={idx} className="relative pl-4 border-l border-white/10 hover:border-cosmic-accent transition-colors group">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-cosmic-accent transition-colors"></div>
                  <div className="text-sm font-bold text-cosmic-gold font-mono">{event.year}</div>
                  <div className="text-xs text-gray-200 font-semibold">{event.title}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const TimeUnit: React.FC<{
  value: string | number, 
  label: string, 
  color: string, 
  borderColor: string,
  active: boolean, 
  onClick: () => void
}> = ({ value, label, color, borderColor, active, onClick }) => (
  <div onClick={onClick} className={`
    relative group cursor-pointer 
    w-20 md:w-24 flex flex-col items-center justify-center py-2
    rounded-lg transition-all duration-300
  `}>
    {/* Animated Border/Glow Effect on Hover */}
    <div className={`
      absolute inset-0 rounded-xl border-2 border-transparent 
      group-hover:${borderColor} group-hover:shadow-[0_0_15px_currentColor] 
      transition-all duration-300 opacity-0 group-hover:opacity-100
      ${active ? `${borderColor} opacity-100 shadow-[0_0_15px_currentColor]` : ''}
    `}></div>

    {/* Value */}
    <div className={`
      text-2xl md:text-3xl font-bold font-mono tabular-nums 
      z-10 transition-transform duration-300 drop-shadow-md
      group-hover:scale-110
      ${color} ${active ? 'scale-110' : ''}
    `}>
      {value}
    </div>

    {/* Label */}
    <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold z-10 mt-1 transition-colors group-hover:text-white">
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
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
      <div className="h-0 overflow-hidden group-hover:h-auto transition-all text-[10px] text-gray-400 mt-1 ml-6">{info}</div>
    </div>
  );
};

const CountdownCard: React.FC<{label: string, value: string, color: string, icon: string}> = ({ label, value, color, icon }) => (
  <div className="glass-panel rounded-xl p-3 flex flex-col items-center justify-center text-center border-t border-white/5">
    <div className="text-xl mb-1">{icon}</div>
    <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-sm md:text-base font-bold font-mono tabular-nums ${color}`}>{value}</div>
  </div>
);

const CuriosityItem: React.FC<{label: string, val: string, unit: string, sub: string, icon: string}> = ({ label, val, unit, sub, icon }) => (
  <div className="bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
     <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-[9px] text-gray-400 uppercase font-bold">{label}</span>
     </div>
     <div className="text-sm font-mono font-bold text-white truncate tabular-nums" title={val}>{val} <span className="text-[10px] text-gray-500 font-sans">{unit}</span></div>
     <div className="text-[9px] text-gray-500/80">{sub}</div>
  </div>
);

export default Dashboard;
