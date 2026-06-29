export interface DailyRoutineLog {
  checkedHabits: string[];
  energyLevel: number;
  sleepQuality: number;
  stepCount?: string;
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
  id?: string;
  amount: number;
  time: string;
  date: string;
}
