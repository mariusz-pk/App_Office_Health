import React, { useState, useEffect } from 'react';
import { ListChecks, ShoppingCart, Droplet, Sliders, BarChart3, CupSoda, LogOut, Settings, X, Cpu } from 'lucide-react';
import { useAuth } from './components/AuthProvider';
import DailyRoutine from './components/DailyRoutine';
import Essentials from './components/Essentials';
import WellnessCafe from './components/WellnessCafe';
import ControlCenter from './components/ControlCenter';
import Reports from './components/Reports';
import CloudAlerts from './components/CloudAlerts';
import { useNotifications } from './hooks/useNotifications';

const SocketIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="8" fill="none" />
    <rect x="30" y="32" width="12" height="20" />
    <rect x="58" y="32" width="12" height="20" />
    <path d="M 42 66 A 8 10 0 0 1 58 66 Z" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('cloud');
  const [showSplash, setShowSplash] = useState(true);
  const { user } = useAuth();
  const { showBigModal, dismissBigModal, missingCount } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'routine': return <DailyRoutine />;
      case 'essentials': return <Essentials />;
      case 'cafe': return <WellnessCafe />;
      case 'control': return <ControlCenter />;
      case 'reports': return <Reports />;
      case 'cloud': return <CloudAlerts />;
      default: return <DailyRoutine />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'routine': return 'Rutyna Dnia';
      case 'essentials': return 'Baza zakupowa';
      case 'cafe': return 'Kafejka Mocy';
      case 'control': return 'Kontrola samopoczucia';
      case 'reports': return 'Raporty';
      case 'cloud': return 'Powiadomienia i synchronizacja';
      default: return 'IT Health';
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[1000] bg-slate-900 flex flex-col items-center justify-center animate-in fade-in duration-1000">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm px-6 animate-in zoom-in-95 duration-1000 delay-150">
          <div className="relative w-48 h-48 mb-8 rounded-[2rem] shadow-[0_0_80px_-15px_rgba(16,185,129,0.3)] bg-slate-800 p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[2rem] animate-pulse" />
            <img 
              src="/app-icon.png" 
              alt="Office Health Logo" 
              className="w-full h-full object-cover rounded-[1.5rem] relative z-10"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 text-center">
            Office Health v2.0
          </h1>
        </div>
        
        <div className="pb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <p className="text-[10px] text-slate-600 tracking-wider uppercase mt-1">
            by WszystkokolwiekWFormie
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-emerald-500/30">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900 pb-20">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md px-6 py-5 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-emerald-500 uppercase mb-1">
                Office Health V2.0
              </div>
              <h1 className="text-xl font-bold tracking-wide text-white">
                {getTitle()}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-[10px] bg-slate-800 border border-slate-700 flex items-center justify-center shadow-sm">
                <SocketIcon className="w-6 h-6 text-[#5AB4FF]" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="px-5 py-6 min-h-[calc(100vh-160px)]">
          {renderContent()}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
          <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex items-center justify-between px-4 py-3">
            {[
              { id: 'routine', icon: ListChecks, label: 'Rutyna' },
              { id: 'essentials', icon: ShoppingCart, label: 'Baza' },
              { id: 'cafe', icon: CupSoda, label: 'Kafejka' },
              { id: 'control', icon: Sliders, label: 'Kontrola' },
              { id: 'reports', icon: BarChart3, label: 'Raporty' },
              { id: 'cloud', icon: Settings, label: 'Opcje' },
            ].map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 min-w-[3rem] p-1 rounded-xl transition-all duration-300 ${isActive ? 'text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 mb-0.5 shadow-emerald-500/50' : ''}`} />
                  <span className={`text-[9px] font-semibold tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Big Modal */}
        {showBigModal && (() => {
          const isEvening = new Date().getHours() >= 18;
          
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 fade-in">
              <div className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-[24px] shadow-2xl p-8 relative zoom-in-95">
                <button 
                  onClick={dismissBigModal}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                  <ListChecks className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                  {isEvening ? 'DZIEŃ SIĘ KOŃCZY!' : 'CZAS NA ZADANIA!'}
                </h2>
                <p className="text-center text-slate-300 mb-8 leading-relaxed">
                  Masz <strong className="text-rose-400 text-lg">{missingCount}</strong> niezaznaczonych zadań. Sprawdź swoją listę!
                </p>
                <button 
                  onClick={() => {
                    dismissBigModal();
                    setActiveTab('routine');
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)] text-lg"
                >
                  Zróbmy to teraz!
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
