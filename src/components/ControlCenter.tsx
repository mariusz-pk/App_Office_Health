import React, { useState } from 'react';
import { Heart, Activity, Square, CheckSquare, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useFirebaseCollection } from '../hooks/useFirebaseData';
import { HealthLog } from '../types';

const SYMPTOMS_MAP: Record<string, string> = {
  'Mgła mózgowa': 'Uzupełnij witaminy B9/B12 (wątróbka, jaja, szpinak). Zadbaj o mikrodawkę kofeiny z l-teaniną (Matcha).',
  'Skurcze mięśni': 'Niedobór elektrolitów. Zalecany izotonik domowy lub dodatkowy magnez (cytrynian/glicynian) z wodą.',
  'Wypadanie włosów / sucha skóra': 'Możliwy spadek kwasów Omega-3 lub biotyny. Trzymaj olej lniany i ryby w diecie.',
  'Spadek popołudniowy (zjazd energetyczny)': 'Zaburzony rytm kortyzolu. Wstań i zrób 5-minutowy spacer lub wypij Szot z Zakwasu.',
  'Bóle pleców/karku': 'Napięcie powięziowe. Aktywuj przypomnienie o Mikro-przerwach co 60 min na krążenia ramion i miednicy.'
};

export default function ControlCenter() {
  const { data: logs, addOrUpdateDoc } = useFirebaseCollection<HealthLog>('healthLogs');
  const [rhr, setRhr] = useState('');
  const [spo2, setSpo2] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [alertState, setAlertState] = useState<{ type: 'ok' | 'warning' | 'error', msg: string } | null>(null);

  // sort logs internally for display
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSave = () => {
    const rhVal = parseInt(rhr);
    const spVal = parseInt(spo2);

    if (!rhVal && !spVal) {
      setAlertState({ type: 'warning', msg: "Wprowadź chociaż jeden parametr do zapisu." });
      setTimeout(() => setAlertState(null), 5000);
      return;
    }

    // Determine alert
    if (rhVal > 80) {
      setAlertState({ type: 'error', msg: "Wysoki poziom stresu lub zmęczenia. Zrób przerwę na oddech 4-7-8." });
    } else if (spVal > 0 && spVal < 95) {
      setAlertState({ type: 'warning', msg: "Niskie natlenienie komórkowe. Przewietrz pokój lub wyjdź na krótki spacer." });
    } else if (rhVal >= 40 && rhVal <= 80) {
      setAlertState({ type: 'ok', msg: "Parametry w normie. Stabilna wydajność." });
    }

    const logId = Date.now().toString();
    const newLog = {
      rhr: rhVal || 0,
      spo2: spVal || 0,
      symptoms: [...selectedSymptoms],
      date: new Date().toISOString()
    };

    addOrUpdateDoc(logId, newLog);
    setRhr('');
    setSpo2('');
    setSelectedSymptoms([]);
    
    // Clear alert after 8s
    setTimeout(() => setAlertState(null), 8000);
  };

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const activeRemedies = selectedSymptoms.map(sym => SYMPTOMS_MAP[sym]).filter(Boolean);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50">
        <div className="flex items-center gap-2 text-[10px] text-amber-500 tracking-wider uppercase font-semibold mb-5">
          <Heart className="w-3.5 h-3.5" /> Autodiagnoza poranna
        </div>
        
        {alertState && (
          <div className={`mb-5 p-4 rounded-xl flex items-start gap-3 border ${
            alertState.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
            alertState.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {alertState.type === 'error' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : 
             alertState.type === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : 
             <CheckCircle className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{alertState.msg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1.5 ml-1">Tętno spocz. (BPM)</label>
            <input 
              type="number" 
              value={rhr}
              onChange={(e) => setRhr(e.target.value)}
              placeholder="np. 62" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1.5 ml-1">Saturacja SpO₂ (%)</label>
            <input 
              type="number" 
              value={spo2}
              onChange={(e) => setSpo2(e.target.value)}
              placeholder="np. 98" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
        
        <button onClick={handleSave} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Activity className="w-5 h-5" />
          Zapisz Autodiagnozę
        </button>
      </div>

      <div>
        <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1">Zgłoś Objawy</div>
        <div className="space-y-3">
          {Object.keys(SYMPTOMS_MAP).map((symptom, i) => {
            const isChecked = selectedSymptoms.includes(symptom);
            return (
              <div key={i} onClick={() => toggleSymptom(symptom)} className={`flex items-start gap-4 border p-4 rounded-xl cursor-pointer transition-colors text-justify ${isChecked ? 'bg-slate-800 border-slate-600' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'}`}>
                {isChecked ? <CheckSquare className="w-5 h-5 mt-0.5 text-amber-500 shrink-0" /> : <Square className="w-5 h-5 mt-0.5 text-slate-600 shrink-0" />}
                <span className={`flex-1 text-sm font-medium leading-relaxed ${isChecked ? 'text-white' : 'text-slate-300'}`}>{symptom}</span>
              </div>
            );
          })}
        </div>

        {activeRemedies.length > 0 && (
          <div className="mt-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-3">
            <div className="text-[10px] font-bold tracking-widest uppercase text-amber-500 mb-3">Rekomendacje z bazy Office Health</div>
            <ul className="space-y-3">
              {activeRemedies.map((remedy, idx) => (
                <li key={idx} className="text-sm text-amber-200/90 leading-relaxed flex items-start gap-3 text-justify">
                  <span className="text-amber-500 shrink-0 mt-[1px] text-base">•</span> 
                  <span className="flex-1">{remedy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4 pl-1 pt-2">Historia Dzienników</div>
        {sortedLogs.length === 0 ? (
          <div className="text-sm text-slate-500 text-center py-6">Brak dzienników w bazie.</div>
        ) : (
          <div className="space-y-3">
            {sortedLogs.map(log => {
              const d = new Date(log.date);
              const fmtDate = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
              
              const isHighRhr = log.rhr > 80;
              const isLowSpo2 = log.spo2 > 0 && log.spo2 < 95;

              return (
                <div key={log.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex gap-4">
                  <div className="mt-0.5"><Clock className="w-4 h-4 text-slate-500" /></div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1.5">{fmtDate}</div>
                    <div className="flex gap-4 mb-2">
                      {log.rhr > 0 && (
                        <span className={`text-[15px] font-bold ${isHighRhr ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {log.rhr} <span className="text-xs font-medium text-slate-500">BPM</span>
                        </span>
                      )}
                      {log.spo2 > 0 && (
                        <span className={`text-[15px] font-bold ${isLowSpo2 ? 'text-amber-500' : 'text-white'}`}>
                          {log.spo2}% <span className="text-xs font-medium text-slate-500">SpO₂</span>
                        </span>
                      )}
                    </div>
                    {log.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {log.symptoms.map(sym => (
                          <span key={sym} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-[10px] text-slate-400">
                            <AlertTriangle className="w-3 h-3 text-slate-500" /> {sym}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
