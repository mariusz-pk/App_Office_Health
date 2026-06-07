import React, { useMemo } from 'react';
import { BarChart3, Activity, Sun, Moon, CheckSquare, Target } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RoutineHistory } from '../types';
import { HABITS_LIST } from '../data';

export default function Reports() {
  const [history] = useLocalStorage<RoutineHistory>('corp_dailyRoutineHistory', {});

  const stats = useMemo(() => {
    const dates = Object.keys(history).sort();
    if (dates.length === 0) return null;

    // Get last 30 days logic
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentDates = dates.filter(d => new Date(d) >= thirtyDaysAgo);
    
    if (recentDates.length === 0) return null;

    let totalScore = 0;
    let totalEnergy = 0;
    let totalSleep = 0;
    const habitCounts: Record<string, number> = {};
    HABITS_LIST.forEach(h => habitCounts[h] = 0);

    recentDates.forEach(date => {
      const data = history[date];
      const score = Math.min(100, Math.round((data.checkedHabits.length * 14) + (data.energyLevel * 1.5) + (data.sleepQuality * 1.5)));
      totalScore += score;
      totalEnergy += data.energyLevel;
      totalSleep += data.sleepQuality;
      
      data.checkedHabits.forEach(h => {
        if (habitCounts[h] !== undefined) habitCounts[h]++;
      });
    });

    const daysCount = recentDates.length;

    // Generate last 7 days chart data
    const last7Days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const data = history[dateStr];
      const score = data ? Math.min(100, Math.round((data.checkedHabits.length * 14) + (data.energyLevel * 1.5) + (data.sleepQuality * 1.5))) : 0;
      
      const dayName = ['Ni', 'Po', 'Wt', 'Śr', 'Cz', 'Pi', 'So'][d.getDay()];
      last7Days.push({
        label: dayName,
        value: score,
        color: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : score > 0 ? '#f43f5e' : 'transparent'
      });
    }

    return {
      avgScore: Math.round(totalScore / daysCount),
      avgEnergy: (totalEnergy / daysCount).toFixed(1),
      avgSleep: (totalSleep / daysCount).toFixed(1),
      consistency: Math.round((daysCount / 30) * 100),
      habitStats: HABITS_LIST.map(h => ({
        title: h,
        percentage: Math.round((habitCounts[h] / daysCount) * 100)
      })),
      chart: last7Days
    };
  }, [history]);

  if (!stats) {
    return <div className="text-center py-20 text-slate-500">Brak danych do wygenerowania raportu. Wypełniaj rutynę codziennie!</div>;
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 tracking-wider uppercase font-semibold mb-6">
          <BarChart3 className="w-4 h-4 text-emerald-500" /> Witalność — Ostatnie 7 dni
        </div>
        
        <div className="flex items-end justify-between h-36 px-1">
          {stats.chart.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 w-10">
              {d.value > 0 ? (
                <span className="text-[11px] text-white font-medium">{d.value}</span>
              ) : (
                <span className="text-[11px] text-transparent">0</span>
              )}
              
              <div className="w-full flex items-end justify-center h-[90px]">
                {d.value > 0 ? (
                  <div
                    className="w-full max-w-[22px] rounded-sm transition-all duration-700 ease-out animate-in slide-in-from-bottom-5"
                    style={{ height: `${d.value}%`, backgroundColor: d.color }}
                  />
                ) : (
                  <div className="w-full max-w-[22px] h-[2px] bg-slate-700/50 rounded-sm" />
                )}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1">Raport 30-dniowy Executive</div>
        <div className="grid grid-cols-2 gap-3.5">
          
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> Śr. Witalność
            </div>
            <div className="text-2xl font-bold text-emerald-500">{stats.avgScore}<span className="text-sm font-medium text-slate-500">%</span></div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              <CheckSquare className="w-3.5 h-3.5 text-blue-400" /> Ciągłość
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.consistency}<span className="text-sm font-medium text-slate-500">%</span></div>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Śr. Skupienie
            </div>
            <div className="text-2xl font-bold text-amber-400">{stats.avgEnergy}<span className="text-sm font-medium text-slate-500">/10</span></div>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              <Moon className="w-3.5 h-3.5 text-indigo-400" /> Efekt. Odpoczynku
            </div>
            <div className="text-2xl font-bold text-indigo-400">{stats.avgSleep}<span className="text-sm font-medium text-slate-500">/10</span></div>
          </div>

        </div>
      </div>

      <div>
        <div className="text-[11px] font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1 pt-2">Wykonanie Procesów (30 dni)</div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-6">
          {stats.habitStats.map((habit, i) => {
            const color = habit.percentage >= 80 ? '#10b981' : habit.percentage >= 50 ? '#f59e0b' : '#f43f5e';
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-2.5">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-200">{habit.title}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color }}>
                    {habit.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${habit.percentage}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
