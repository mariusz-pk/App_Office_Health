export interface DailyRoutineLog {
  checkedHabits: string[];
  energyLevel: number;
  sleepQuality: number;
}

export interface RoutineHistory {
  [date: string]: DailyRoutineLog;
}

export interface HealthLog {
  id: string;
  date: string;
  rhr: number;
  spo2: number;
  symptoms: string[];
}

export interface HydrationLog {
  amount: number;
  time: string;
  date: string;
}
