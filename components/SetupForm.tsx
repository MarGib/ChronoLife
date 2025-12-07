import React, { useState } from 'react';
import { Gender, UserConfig } from '../types';

interface SetupFormProps {
  onComplete: (config: UserConfig) => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onComplete }) => {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [gender, setGender] = useState<Gender>('other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateStr) return;

    let finalDate = new Date(dateStr);
    
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      finalDate.setHours(hours, minutes, 0, 0);
    } else {
      // Default to noon (12:00)
      finalDate.setHours(12, 0, 0, 0);
    }

    onComplete({ birthDate: finalDate, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-20">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cosmic-accent/20 rounded-full blur-[80px]"></div>
        
        <h1 className="text-4xl font-serif text-white mb-2 text-center text-glow">ChronoLife</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Skonfiguruj parametry symulacji Twojego istnienia.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cosmic-accent mb-2 font-bold">Data Urodzenia</label>
            <input
              type="date"
              required
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cosmic-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">
              Godzina (Opcjonalnie)
            </label>
            <input
              type="time"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cosmic-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">
              Płeć (do statystyk WHO)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 rounded-md text-sm transition-all ${gender === 'male' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Mężczyzna
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 rounded-md text-sm transition-all ${gender === 'female' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Kobieta
              </button>
              <button
                type="button"
                onClick={() => setGender('other')}
                className={`py-2 rounded-md text-sm transition-all ${gender === 'other' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Inna
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!dateStr}
            className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(56,189,248,0.4)]"
          >
            Inicjalizacja
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupForm;