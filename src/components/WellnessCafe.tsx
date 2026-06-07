import React, { useState, useEffect } from 'react';
import { Droplet, RefreshCw, Plus, ChevronDown, Play, StopCircle, Sunrise, Sun, Sunset, Clock } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DRINKS_CATALOG } from '../data';
import { HydrationLog } from '../types';

export default function WellnessCafe() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [target, setTarget] = useLocalStorage('corp_hydrationTarget', 2000);
  const [history, setHistory] = useLocalStorage<HydrationLog[]>('corp_hydrationLogs_v2', []);
  
  // Timer State
  const [activeTimer, setActiveTimer] = useState<{ id: number, remaining: number } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = history.filter(log => log.date === todayStr);
  const currentAmount = todayLogs.reduce((sum, log) => sum + log.amount, 0);
  const percentage = Math.min(100, Math.round((currentAmount / target) * 100)) || 0;

  const addWater = (amount: number) => {
    const now = new Date();
    const newLog: HydrationLog = {
      amount,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: todayStr
    };
    setHistory(prev => [newLog, ...prev]);
  };

  const resetTargetParams = () => {
    const val = prompt('Ustaw nowy dzienny cel nawodnienia (ml):', target.toString());
    if (val && !isNaN(Number(val))) setTarget(Number(val));
  };


  useEffect(() => {
    let interval: number;
    if (activeTimer && activeTimer.remaining > 0) {
      interval = window.setInterval(() => {
        setActiveTimer(prev => prev ? { ...prev, remaining: prev.remaining - 1 } : null);
      }, 1000);
    } else if (activeTimer && activeTimer.remaining === 0) {
      if (navigator.vibrate) navigator.vibrate([100, 100, 100]);
      alert('Czas parzenia zakończony! Twój napój jest gotowy.');
      setActiveTimer(null);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const startTimer = (id: number, seconds: number) => {
    setActiveTimer({ id, remaining: seconds });
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const categories = [
    { name: 'PORANEK', label: 'Poranek (Aktywacja i Skupienie)', icon: Sunrise },
    { name: 'W TRAKCIE DNIA', label: 'W Trakcie Dnia (Energia i Trawienie)', icon: Sun },
    { name: 'WIECZÓR', label: 'Wieczór (Wyciszenie i Sen)', icon: Sunset },
    { name: 'DOWOLNA PORA', label: 'Dowolna Pora (Wsparcie Całodobowe)', icon: Clock }
  ];

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 tracking-wider uppercase font-medium">
            <Droplet className="w-3.5 h-3.5 text-blue-400" /> Nawodnienie
          </div>
          <button onClick={resetTargetParams} className="px-3 py-1 text-xs font-medium border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">Zmień Cel</button>
        </div>
        
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white">{currentAmount}</span>
          <span className="text-base text-slate-400 font-medium">/ {target} ml</span>
        </div>

        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mb-2 border border-slate-700/50">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.4)]" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="text-right text-[11px] text-slate-500 mb-6 font-medium">{percentage}% celu</div>

        <div className="flex gap-3">
          <button onClick={() => addWater(250)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Plus className="w-5 h-5" /> 250 ml
          </button>
          <button onClick={() => addWater(500)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3.5 rounded-xl border border-slate-600 flex items-center justify-center gap-2 transition-colors">
            <Plus className="w-5 h-5" /> 500 ml
          </button>
        </div>

        {todayLogs.length > 0 && (
          <div className="mt-8">
            <div className="text-[11px] font-medium tracking-widest text-slate-500 uppercase mb-4">Dzisiejsze wpisy</div>
            <div className="space-y-4">
              {todayLogs.slice(0, 5).map((entry, i) => (
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

      <div className="space-y-8">
        {categories.map((cat) => {
          const catDrinks = DRINKS_CATALOG.filter(d => d.category === cat.name);
          if (catDrinks.length === 0) return null;
          const CatIcon = cat.icon;
          
          return (
            <div key={cat.name} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4 pl-1">
                <CatIcon className="w-4 h-4 text-emerald-500" />
                {cat.label}
              </div>
              
              <div className="space-y-3">
                {catDrinks.map(recipe => {
                  const Icon = recipe.icon;
                  const isOpen = openAccordion === recipe.id;
                  const timerObj = activeTimer?.id === recipe.id ? activeTimer : null;

                  return (
                    <div key={recipe.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 shadow-sm">
                      <div 
                        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800/80"
                        onClick={() => setOpenAccordion(isOpen ? null : recipe.id)}
                      >
                        <div className={`w-11 h-11 shrink-0 rounded-[10px] ${recipe.bg} flex items-center justify-center`}>
                          <Icon className={`w-[22px] h-[22px] ${recipe.color}`} />
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-sm font-semibold text-white truncate">{recipe.title}</div>
                          <div className="text-[11px] text-slate-400 mt-1 truncate">{recipe.effect}</div>
                        </div>
                        {timerObj ? (
                          <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-md flex items-center gap-1 animate-pulse">
                            <RefreshCw className="w-3 h-3 animate-spin" /> {formatTime(timerObj.remaining)}
                          </div>
                        ) : (
                          <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                      {isOpen && (
                        <div className="p-4 pt-2 text-sm text-slate-400 border-t border-slate-700/50 bg-slate-900/30">
                          <div className="space-y-3">
                            <div><strong className="text-slate-300">Składniki:</strong> {recipe.ingredients}</div>
                            <div><strong className="text-slate-300">Kiedy pić:</strong> {recipe.when}</div>
                            
                            {recipe.timer && (
                              <div className="pt-2">
                                {timerObj ? (
                                  <button onClick={() => setActiveTimer(null)} className="w-full bg-rose-500/10 text-rose-400 font-semibold py-2.5 rounded-lg border border-rose-500/20 flex items-center justify-center gap-2">
                                    <StopCircle className="w-5 h-5" /> Przerwij parzenie
                                  </button>
                                ) : (
                                  <button onClick={() => startTimer(recipe.id, recipe.timer!)} className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold py-2.5 rounded-lg border border-emerald-500/20 flex items-center justify-center gap-2 transition-colors">
                                    <Play className="w-5 h-5" /> Uruchom stoper parzenia ({formatTime(recipe.timer)})
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
