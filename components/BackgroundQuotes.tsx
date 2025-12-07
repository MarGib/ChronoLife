import React, { useEffect, useState, useRef } from 'react';
import { Quote } from '../types';
import { fetchPhilosophicalQuotes } from '../services/quoteService';

const BackgroundQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visibleQuotes, setVisibleQuotes] = useState<{ id: number; quote: Quote; x: number; scale: number; duration: number; delay: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    // Initial fetch
    fetchPhilosophicalQuotes().then(setQuotes);
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const id = nextId.current++;
      const x = Math.random() * 80 + 10; // 10% to 90% width
      const scale = Math.random() * 0.5 + 0.8; // 0.8 to 1.3 scale
      const duration = Math.random() * 10 + 15; // 15s to 25s
      const delay = 0;

      setVisibleQuotes(prev => [...prev, { id, quote, x, scale, duration, delay }]);

      // Cleanup old quotes roughly when they finish
      setTimeout(() => {
        setVisibleQuotes(prev => prev.filter(q => q.id !== id));
      }, (duration + 1) * 1000);

    }, 3500); // Spawn new quote every 3.5 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {visibleQuotes.map((item) => (
        <div
          key={item.id}
          className="absolute text-center opacity-0 animate-float-up w-80 text-cosmic-glow/30"
          style={{
            left: `${item.x}%`,
            fontSize: `${item.scale}rem`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            bottom: '-20%', // Start below screen
          }}
        >
          <p className="font-serif italic mb-2">"{item.quote.text}"</p>
          <p className="text-xs uppercase tracking-widest font-sans">— {item.quote.author}</p>
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 z-10"></div>
    </div>
  );
};

export default BackgroundQuotes;