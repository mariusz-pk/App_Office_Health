import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Activity, Coffee, Moon, Footprints, Sun, CheckCircle2, Droplet, CheckSquare, Square } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RoutineHistory } from '../types';
import { HABITS_LIST } from '../data';

const HABIT_ICONS: Record<string, React.ElementType> = {
  "Poranny Izotonik": Droplet,
  "Kawa po 90 minutach": Coffee,
  "Mikro-przerwa (Ruch co 60 min)": Activity,
  "Wieczorny Magnez": Moon,
  "Dzienny limit kroków": Footprints
};

export default function DailyRoutine() {
  const [history, setHistory] = useLocalStorage<RoutineHistory>('corp_dailyRoutineHistory', {});
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDateStr(today);
    setHistory((prev) => {
      if (!prev[today]) {
        return {
          ...prev,
          [today]: { checkedHabits: [], energyLevel: 5, sleepQuality: 5 }
        };
      }
      return prev;
    });
  }, []);

  const changeDate = (days: number) => {
    if (!currentDateStr) return;
    const date = new Date(currentDateStr);
    date.setDate(date.getDate() + days);
    const newDateStr = date.toISOString().split('T')[0];
    setCurrentDateStr(newDateStr);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = currentDateStr === todayStr;
  const currentData = history[currentDateStr] || { checkedHabits: [], energyLevel: 0, sleepQuality: 0 };

  const handleHabitToggle = (habit: string) => {
    if (!isToday) return;
    setHistory(prev => {
      const dayData = prev[currentDateStr] || { checkedHabits: [], energyLevel: 0, sleepQuality: 0 };
      const checked = dayData.checkedHabits.includes(habit);
      const newHabits = checked 
        ? dayData.checkedHabits.filter(h => h !== habit)
        : [...dayData.checkedHabits, habit];
      return {
        ...prev,
        [currentDateStr]: { ...dayData, checkedHabits: newHabits }
      };
    });
  };

  const handleSliderChange = (type: 'energy' | 'sleep', value: number) => {
    if (!isToday) return;
    setHistory(prev => {
      const dayData = prev[currentDateStr] || { checkedHabits: [], energyLevel: 0, sleepQuality: 0 };
      return {
        ...prev,
        [currentDateStr]: { 
          ...dayData, 
          energyLevel: type === 'energy' ? value : dayData.energyLevel,
          sleepQuality: type === 'sleep' ? value : dayData.sleepQuality
        }
      };
    });
  };

  const score = Math.min(100, Math.round(
    (currentData.checkedHabits.length * 14) + 
    (currentData.energyLevel * 1.5) + 
    (currentData.sleepQuality * 1.5)
  ));
  
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between text-sm">
        <button onClick={() => changeDate(-1)} className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        <div className="text-center">
          <div className="font-semibold text-white tracking-wide">{isToday ? 'Dzisiaj' : currentDateStr}</div>
          <div className="text-xs text-slate-400 mt-0.5">{isToday ? currentDateStr : 'Historia'}</div>
        </div>
        <button onClick={() => changeDate(1)} disabled={isToday} className={`p-2.5 rounded-xl border transition-colors ${isToday ? 'bg-slate-800/50 border-slate-800 opacity-50 cursor-not-allowed' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-slate-900/50">
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="transform -rotate-90 w-full h-full">
            <circle cx="64" cy="64" r="54" className="stroke-slate-700" strokeWidth="10" fill="none" />
            <circle cx="64" cy="64" r="54" className="stroke-emerald-500 transition-all duration-1000 ease-out" strokeWidth="10" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center pt-1">
            <span className="text-[32px] font-bold text-emerald-500 leading-none">{score}<span className="text-lg font-medium">%</span></span>
            <span className="text-[9px] text-emerald-500 tracking-wider mt-1 opacity-90 font-semibold uppercase">Witalność</span>
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="text-[10px] text-slate-400 tracking-wider mb-1.5 uppercase font-medium">Wskaźnik witalności i efektywności</div>
          <div className="text-sm font-medium text-slate-200 leading-relaxed mb-4">
            {score >= 80 ? 'Świetna forma. Utrzymuj rytm dnia.' : score >= 50 ? 'Dobra baza. Zadbaj o regenerację.' : 'Zauważalny spadek. Skup się na fundamentach.'}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{currentData.checkedHabits.length} / {HABITS_LIST.length} nawyków</span>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1">Lista Nawyków Dnia</div>
        <div className="space-y-3">
          {HABITS_LIST.map(habit => {
            const Icon = HABIT_ICONS[habit] || Activity;
            const isChecked = currentData.checkedHabits.includes(habit);
            return (
              <div 
                key={habit} 
                onClick={() => handleHabitToggle(habit)}
                className={`flex items-center gap-4 border p-4 rounded-xl transition-all duration-200 ${!isToday ? 'opacity-80 cursor-default' : 'cursor-pointer hover:border-slate-500'} ${isChecked ? 'bg-slate-800 border-slate-700' : 'bg-slate-800/50 border-slate-700/50'}`}
              >
                <div className={`w-11 h-11 shrink-0 rounded-[10px] flex items-center justify-center transition-colors ${isChecked ? 'bg-emerald-500/10' : 'bg-slate-700/50'}`}>
                  <Icon className={`w-[22px] h-[22px] ${isChecked ? 'text-emerald-500' : 'text-slate-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate transition-colors ${isChecked ? 'text-white' : 'text-slate-300'}`}>{habit}</div>
                </div>
                {isChecked ? (
                  <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : (
                  <Square className="w-6 h-6 text-slate-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1 pt-2">Samoocena</div>
        <div className="space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg shadow-slate-900/20">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2.5">
                <Sun className="w-[18px] h-[18px] text-amber-400" />
                <span className="text-sm font-medium text-slate-200">Energia i Skupienie</span>
              </div>
              <div className="text-base font-bold text-amber-400">{currentData.energyLevel}<span className="text-slate-500 text-xs font-medium">/10</span></div>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={currentData.energyLevel} 
              onChange={(e) => handleSliderChange('energy', parseInt(e.target.value))}
              disabled={!isToday}
              className={`w-full accent-amber-400 ${!isToday ? 'opacity-50' : ''}`} 
            />
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg shadow-slate-900/20">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2.5">
                <Moon className="w-[18px] h-[18px] text-blue-400" />
                <span className="text-sm font-medium text-slate-200">Sen i Regeneracja</span>
              </div>
              <div className="text-base font-bold text-blue-400">{currentData.sleepQuality}<span className="text-slate-500 text-xs font-medium">/10</span></div>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={currentData.sleepQuality}
              onChange={(e) => handleSliderChange('sleep', parseInt(e.target.value))}
              disabled={!isToday}
              className={`w-full accent-blue-400 ${!isToday ? 'opacity-50' : ''}`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
