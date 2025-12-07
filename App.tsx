import React, { useState, useEffect } from 'react';
import SetupForm from './components/SetupForm';
import Dashboard from './components/Dashboard';
import BackgroundQuotes from './components/BackgroundQuotes';
import { UserConfig } from './types';

// Simple helper to generate stars
const StarField = () => {
  const [stars, setStars] = useState<{id: number, top: string, left: string, size: number, duration: string, delay: string, opacity: number}[]>([]);

  useEffect(() => {
    const count = 150; // Increased star count
    const newStars = [];
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1, // 1-3px
        duration: `${Math.random() * 3 + 2}s`, // 2-5s twinkle
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="stars-container">
      {stars.map(star => (
        <div 
          key={star.id} 
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            '--delay': star.delay,
            '--opacity': star.opacity
          } as React.CSSProperties}
        />
      ))}
      {/* Nebula/Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<UserConfig | null>(null);

  return (
    <div className="min-h-screen bg-cosmic-void text-gray-100 font-sans selection:bg-cosmic-accent selection:text-black relative overflow-hidden">
      
      {/* Background Layer 1: Stars */}
      <StarField />
      
      {/* Background Layer 2: Quotes */}
      <BackgroundQuotes />
      
      {/* Content Layer */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {!config ? (
          <SetupForm onComplete={setConfig} />
        ) : (
          <Dashboard config={config} />
        )}
      </main>

    </div>
  );
};

export default App;