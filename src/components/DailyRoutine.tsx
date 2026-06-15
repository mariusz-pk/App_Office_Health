import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Activity, Coffee, Moon, Footprints, Sun, CheckCircle2, Droplet, CheckSquare, Square, Plus, Save } from 'lucide-react';
import { useFirebaseRoutine } from '../hooks/useFirebaseRoutine';
import { useFirebaseHydrationTarget } from '../hooks/useFirebaseHydrationTarget';
import { useFirebaseCollection } from '../hooks/useFirebaseData';
import { RoutineHistory, HydrationLog } from '../types';
import { HABITS_LIST } from '../data';

const HABIT_ICONS: Record<string, React.ElementType> = {
  "Poranny Izotonik": Droplet,
  "Kawa po 90 minutach": Coffee,
  "Mikro-przerwa (Ruch co 60 min)": Activity,
  "Wieczorny Magnez": Moon,
  "Dzienny limit kroków": Footprints
};

export default function DailyRoutine() {
  const [history, setHistory] = useFirebaseRoutine();
  const [currentDateStr, setCurrentDateStr] = useState('');
  
  const [target, setTarget] = useFirebaseHydrationTarget();
  const { data: hydrationLogsData, addOrUpdateDoc: addHydrationDoc } = useFirebaseCollection<HydrationLog>('hydrationLogs');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [showStepSaveMsg, setShowStepSaveMsg] = useState(false);

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
  const currentData = history[currentDateStr] || { checkedHabits: [], energyLevel: 5, sleepQuality: 5 };

  const todayLogs = hydrationLogsData.filter(log => log.date === currentDateStr);
  const currentAmount = todayLogs.reduce((sum, log) => sum + log.amount, 0);
  const percentage = Math.round((currentAmount / target) * 100) || 0;

  const addWater = (amount: number) => {
    if (!currentDateStr) return;
    const now = new Date();
    const logId = Date.now().toString();
    const newLog: HydrationLog = {
      amount,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: currentDateStr
    };
    addHydrationDoc(logId, newLog);
  };

  const handleSaveTarget = () => {
    const val = Number(tempTarget);
    if (!isNaN(val) && val > 0) {
      setTarget(val);
    }
    setIsEditingTarget(false);
  };

  const resetTargetParams = () => {
    setTempTarget(target.toString());
    setIsEditingTarget(true);
  };

  const handleHabitToggle = (habit: string) => {
    if (!isToday) return;
    setHistory(prev => {
      const dayData = prev[currentDateStr] || { checkedHabits: [], energyLevel: 5, sleepQuality: 5 };
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
      const dayData = prev[currentDateStr] || { checkedHabits: [], energyLevel: 5, sleepQuality: 5 };
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

  const handleStepCountChange = (val: string) => {
    if (!isToday) return;
    setHistory(prev => {
      const dayData = prev[currentDateStr] || { checkedHabits: [], energyLevel: 5, sleepQuality: 5 };
      return {
        ...prev,
        [currentDateStr]: { ...dayData, stepCount: val }
      };
    });
  };

  const handleSaveSteps = () => {
    setShowStepSaveMsg(true);
    setTimeout(() => setShowStepSaveMsg(false), 2000);
  };

  const score = Math.min(100, Math.round(
    (currentData.checkedHabits.length * 10) + 
    (currentData.energyLevel * 1.5) + 
    (currentData.sleepQuality * 1.5) +
    ((Math.min(currentAmount, target) / target) * 20)
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

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-5 shadow-lg shadow-slate-900/50">
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
                className={`flex items-center gap-3.5 border p-3 rounded-xl transition-all duration-200 ${!isToday ? 'opacity-80 cursor-default' : 'cursor-pointer hover:border-slate-500'} ${isChecked ? 'bg-slate-800 border-slate-700' : 'bg-slate-800/50 border-slate-700/50'}`}
              >
                <div className={`w-[38px] h-[38px] shrink-0 rounded-[10px] flex items-center justify-center transition-colors ${isChecked ? 'bg-emerald-500/10' : 'bg-slate-700/50'}`}>
                  <Icon className={`w-5 h-5 ${isChecked ? 'text-emerald-500' : 'text-slate-500'}`} />
                </div>
                <div className="flex-1 min-w-0 pr-4 flex flex-col justify-center">
                  <div className={`text-sm font-semibold truncate transition-colors ${isChecked ? 'text-white' : 'text-slate-300'}`}>{habit}</div>
                  {habit === "Dzienny limit kroków" && (
                    <div className="flex items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        placeholder="kroki"
                        value={currentData.stepCount !== undefined && currentData.stepCount !== null ? currentData.stepCount : '5000'}
                        onChange={(e) => handleStepCountChange(e.target.value)}
                        disabled={!isToday}
                        className="w-24 bg-slate-900 border border-slate-700/50 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={handleSaveSteps}
                        disabled={!isToday}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-1.5 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
                        title="Zapisz"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      {showStepSaveMsg && <span className="text-[10px] text-emerald-400 font-medium ml-2">Zapisano!</span>}
                    </div>
                  )}
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

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg shadow-slate-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 tracking-wider uppercase font-medium">
            <Droplet className="w-3.5 h-3.5 text-blue-400" /> Nawodnienie
          </div>
          {!isEditingTarget && (
            <button onClick={resetTargetParams} className="px-3 py-1 text-xs font-medium border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">Zmień Cel</button>
          )}
        </div>
        
        <div className="flex items-baseline gap-1 mb-4 h-9">
          <span className="text-3xl font-bold text-white leading-none">{currentAmount}</span>
          {isEditingTarget ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-base text-slate-400 font-medium">/</span>
              <input
                type="number"
                value={tempTarget}
                onChange={(e) => setTempTarget(e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500 h-8"
                autoFocus
              />
              <span className="text-base text-slate-400 font-medium mr-2">ml</span>
              <button 
                onClick={handleSaveTarget}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors h-8"
              >
                Zapisz
              </button>
              <button 
                onClick={() => setIsEditingTarget(false)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-colors h-8"
              >
                Anuluj
              </button>
            </div>
          ) : (
            <span className="text-base text-slate-400 font-medium">/ {target} ml</span>
          )}
        </div>

        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mb-2 border border-slate-700/50">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.4)]" style={{ width: `${Math.min(100, percentage)}%` }}></div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-[11px] text-emerald-400 font-medium tracking-wide">
            {currentAmount >= target ? 'Gratulacje, cel został osiągnięty! 🎉' : ''}
          </div>
          <div className="text-right text-[11px] text-slate-500 font-medium shrink-0">{percentage}% celu</div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => addWater(250)} disabled={!isToday} className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${!isToday ? 'bg-blue-500/50 text-white/50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}>
            <Plus className="w-5 h-5" /> 250 ml
          </button>
        </div>

        {todayLogs.length > 0 && (
          <div className="mt-8">
            <div className="text-[11px] font-medium tracking-widest text-slate-500 uppercase mb-4">Ostatni wpis</div>
            <div className="space-y-4">
              {[...todayLogs].sort((a,b)=>a.time.localeCompare(b.time)).reverse().slice(0, 1).map((entry, i) => (
                <div key={i} className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-3">
                    <Droplet className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">{entry.time}</span>
                  </div>
                  <span className="text-sm font-medium text-white">+{entry.amount} ml</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1 pt-2">Samoocena</div>
        <div className="space-y-3">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg shadow-slate-900/20">
            <div className="flex justify-between items-center mb-4">
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
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg shadow-slate-900/20">
            <div className="flex justify-between items-center mb-4">
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
