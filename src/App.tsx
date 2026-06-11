import React, { useState } from 'react';
import { ListChecks, ShoppingCart, Droplet, Sliders, BarChart3, CupSoda, LogOut, Cloud } from 'lucide-react';
import { useAuth } from './components/AuthProvider';
import DailyRoutine from './components/DailyRoutine';
import Essentials from './components/Essentials';
import WellnessCafe from './components/WellnessCafe';
import ControlCenter from './components/ControlCenter';
import Reports from './components/Reports';
import CloudAlerts from './components/CloudAlerts';

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
  const { user } = useAuth();

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
      case 'essentials': return 'Baza';
      case 'cafe': return 'Kafejka Mocy';
      case 'control': return 'Kontrola';
      case 'reports': return 'Raporty';
      case 'cloud': return 'Chmura i Alerty';
      default: return 'IT Health';
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'cloud': return 'Przypomnienia i kopie zapasowe';
      default: return 'Zapisano pomyślnie. Zsynchronizowano.';
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-emerald-500/30">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-slate-900 pb-20">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md px-6 py-5 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-emerald-500 uppercase mb-1">
                Office Health vs 2.0
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
          {activeTab === 'cloud' && (
            <p className="text-sm text-slate-400 mb-6 font-mono pl-1">
              {getSubtitle()}
            </p>
          )}

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
              { id: 'cloud', icon: Cloud, label: 'Chmura' },
            ].map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              // We've 6 tabs now, so let's adjust padding to fit
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

      </div>
    </div>
  );
}
