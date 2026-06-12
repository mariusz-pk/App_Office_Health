import React, { useState, useEffect } from 'react';
import { Droplet, RefreshCw, Plus, ChevronDown, Play, StopCircle, Sunrise, Sun, Sunset, Clock } from 'lucide-react';
import { useFirebaseHydrationTarget } from '../hooks/useFirebaseHydrationTarget';
import { useFirebaseCollection } from '../hooks/useFirebaseData';
import { DRINKS_CATALOG } from '../data';
import { HydrationLog } from '../types';

export default function WellnessCafe() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [target, setTarget] = useFirebaseHydrationTarget();
  const { data: history, addOrUpdateDoc } = useFirebaseCollection<HydrationLog>('hydrationLogs');
  
  // Timer State
  const [activeTimer, setActiveTimer] = useState<{ id: number, remaining: number } | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = history.filter(log => log.date === todayStr);
  const currentAmount = todayLogs.reduce((sum, log) => sum + log.amount, 0);
  const percentage = Math.min(100, Math.round((currentAmount / target) * 100)) || 0;

  const addWater = (amount: number) => {
    const now = new Date();
    const logId = Date.now().toString();
    const newLog: HydrationLog = {
      amount,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: todayStr
    };
    addOrUpdateDoc(logId, newLog);
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
