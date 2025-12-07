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
  timeScreens: number;
  
  // Biological & Physics
  breathsTaken: number;
  heartbeats: number;
  distanceWalkedKm: number; // Avg 5km/day
  distanceSpaceKm: number; // Earth orbit speed ~107,000 km/h
  
  // Life Progress
  lifeExpectancyYears: number;
  percentageLived: number;
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