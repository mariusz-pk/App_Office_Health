import React, { useMemo } from 'react';
import { BarChart3, Activity, Sun, Moon, CheckSquare, Target, Droplet } from 'lucide-react';
import { useFirebaseRoutine } from '../hooks/useFirebaseRoutine';
import { useFirebaseHydrationTarget } from '../hooks/useFirebaseHydrationTarget';
import { useFirebaseCollection } from '../hooks/useFirebaseData';
import { RoutineHistory, HydrationLog } from '../types';
import { HABITS_LIST } from '../data';

export default function Reports() {
  const [history] = useFirebaseRoutine();
  const [hydrationTarget] = useFirebaseHydrationTarget();
  const { data: hydrationLogs } = useFirebaseCollection<HydrationLog>('hydrationLogs');

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

    // Group hydration by date
    const hydrationByDate: Record<string, number> = {};
    hydrationLogs.forEach(log => {
      const d = log.date;
      if (new Date(d) >= thirtyDaysAgo) {
        hydrationByDate[d] = (hydrationByDate[d] || 0) + log.amount;
      }
    });

    let hydrationGoalAchievedDays = 0;
    let totalVolume = 0;
    let hydrationDaysCount = 0;

    Object.values(hydrationByDate).forEach(amount => {
      hydrationDaysCount++;
      totalVolume += amount;
      if (amount >= hydrationTarget) {
        hydrationGoalAchievedDays++;
      }
    });

    const avgVolume = hydrationDaysCount > 0 ? Math.round(totalVolume / hydrationDaysCount) : 0;
    const hydrationSuccessRate = hydrationTarget > 0 ? Math.round((avgVolume / hydrationTarget) * 100) : 0;

    recentDates.forEach(date => {
      const data = history[date];
      const dailyHydration = hydrationByDate[date] || 0;
      const hydrationPoints = (Math.min(dailyHydration, hydrationTarget) / hydrationTarget) * 20;
      
      const score = Math.min(100, Math.round(
        (data.checkedHabits.length * 10) + 
        (data.energyLevel * 1.5) + 
        (data.sleepQuality * 1.5) + 
        hydrationPoints
      ));

      totalScore += score;
      totalEnergy += data.energyLevel;
      totalSleep += data.sleepQuality;
      
      data.checkedHabits.forEach(h => {
        if (habitCounts[h] !== undefined) habitCounts[h]++;
      });
    });

    const daysCount = recentDates.length;

    const chartDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const earliestDateStr = dates[0];
    const earliestDate = new Date(earliestDateStr);
    earliestDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - earliestDate.getTime();
    const totalDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    for (let i = totalDays; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const data = history[dateStr];
      const dailyHydration = hydrationByDate[dateStr] || 0;
      
      let score = 0;
      if (data) {
        const hydrationPoints = (Math.min(dailyHydration, hydrationTarget) / hydrationTarget) * 20;
        score = Math.min(100, Math.round(
          (data.checkedHabits.length * 10) + 
          (data.energyLevel * 1.5) + 
          (data.sleepQuality * 1.5) + 
          hydrationPoints
        ));
      }
      
      const dayName = ['Ni', 'Po', 'Wt', 'Śr', 'Cz', 'Pi', 'So'][d.getDay()];
      chartDays.push({
        label: dayName,
        dateStr,
        value: score,
        color: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : score > 0 ? '#f43f5e' : 'transparent'
      });
    }

    return {
      avgScore: daysCount > 0 ? Math.round(totalScore / daysCount) : 0,
      avgEnergy: daysCount > 0 ? (totalEnergy / daysCount).toFixed(1) : '0.0',
      avgSleep: daysCount > 0 ? (totalSleep / daysCount).toFixed(1) : '0.0',
      consistency: Math.round((daysCount / 30) * 100),
      hydrationSuccessRate,
      avgVolume,
      habitStats: HABITS_LIST.map(h => ({
        title: h,
        percentage: daysCount > 0 ? Math.round((habitCounts[h] / daysCount) * 100) : 0
      })),
      chart: chartDays
    };
  }, [history, hydrationLogs, hydrationTarget]);

  if (!stats) {
    return <div className="text-center py-20 text-slate-500">Brak danych do wygenerowania raportu. Wypełniaj rutynę codziennie!</div>;
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 tracking-wider uppercase font-semibold mb-6">
          <BarChart3 className="w-4 h-4 text-emerald-500" /> Witalność — Pełna Historia
        </div>
        
        <div className="flex items-end justify-start h-36 px-1 overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {stats.chart.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 w-10 shrink-0">
              <div className="w-full flex items-end justify-center h-[100px]">
                {d.value > 0 ? (
                  <div
                    className="w-full max-w-[22px] rounded-sm transition-all duration-700 ease-out animate-in slide-in-from-bottom-5 relative"
                    style={{ height: `${Math.max(d.value, 4)}%`, backgroundColor: d.color }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white">
                      {d.value}%
                    </span>
                  </div>
                ) : (
                  <div className="w-full max-w-[22px] h-[2px] bg-slate-700/50 rounded-sm relative">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-500">
                      0%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] text-slate-500 font-medium">{d.label}</span>
                <span className="text-[9px] text-slate-600 block">{d.dateStr.slice(5)}</span>
              </div>
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
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-slate-200">Reżim Nawodnienia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-medium">Średnia: {stats.avgVolume} ml/dzień</span>
                <span className="text-xs font-bold" style={{ color: stats.hydrationSuccessRate >= 80 ? '#10b981' : stats.hydrationSuccessRate >= 50 ? '#f59e0b' : '#f43f5e' }}>
                  {stats.hydrationSuccessRate}%
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(100, stats.hydrationSuccessRate)}%`, backgroundColor: stats.hydrationSuccessRate >= 80 ? '#10b981' : stats.hydrationSuccessRate >= 50 ? '#f59e0b' : '#f43f5e' }}
              />
            </div>
          </div>

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
