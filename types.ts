
export interface LifeStats {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalDays: number;
  totalSeconds: number;
  
  // Consumption stats
  timeSlept: number;
  timeEating: number;
  timeHygiene: number;
  timeWorkSchool: number;
  timePhoneScreens: number;
  timeNetflix: number;
  
  // Biological & Physics
  breathsTaken: number;
  heartbeats: number;
  distanceWalkedKm: number;
  distanceSpaceKm: number;
  
  // New Mathematical/Fun Stats
  weekendsLived: number;
  fullMoonsSeen: number;
  blinks: number;
  wordsSpoken: number;
  hairGrowthCm: number;
  dreamsHad: number;
  bloodPumpedLiters: number;
  sunrisesSeen: number;
  earthOrbits: number;
  
  // Life Progress
  lifeExpectancyYears: number;
  percentageLived: number;
  
  // Countdowns & Info
  zodiacSign: string;
  nextBirthdayCountdown: string; // Formatted D:H:M:S
  endOfYearCountdown: string;    // Formatted D:H:M:S
  mementoMoriCountdown: string;  // Formatted Y:D:H:M:S
  deathDate: Date;
}

export type Gender = 'male' | 'female' | 'other';

export interface Quote {
  text: string;
  author: string;
}

export interface UserConfig {
  birthDate: Date;
  gender: Gender;
}

export interface HistoricalEvent {
  year: number;
  title: string;
  description: string;
}
