import React from 'react';
import { Share2, BellOff, Bell } from 'lucide-react';
import { useAuth } from './AuthProvider';

export default function CloudAlerts() {
  const { user, signIn, logOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <div className="space-y-8 pb-10 fade-in">
      {/* Przypomnienia */}
      <section>
        <div className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-3 pl-1">
          Przypomnienia
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="mt-1">
                {notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-emerald-500" />
                ) : (
                  <BellOff className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">
                  Powiadomienia o zadaniach
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                  Przypomni Tobie o zaznaczeniu punktów w zakładce Rutyna o wybranej godzinie.
                </p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Cloud Sync */}
      <section>
        <div className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-3 pl-1">
          Konta i Synchronizacja
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-lg shadow-slate-900/50 flex flex-col items-center text-center">
          <div className="mb-6 opacity-60">
            <Share2 className="w-10 h-10 text-emerald-500" />
          </div>
          
          {!user ? (
            <>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-[260px]">
                Zaloguj się kontem Google, aby odblokować synchronizację danych z chmurą i kopie zapasowe.
              </p>
              
              <button 
                onClick={signIn}
                className="w-full max-w-[220px] bg-slate-900 hover:bg-slate-950 text-white border border-slate-700 hover:border-emerald-500/50 font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Zaloguj przez Google
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-emerald-500 font-bold mb-2">
                Zalogowano jako {user.email}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-[260px]">
                Twoje dane są na bieżąco synchronizowane z chmurą i zabezpieczone w archiwum bazy danych.
              </p>
              
              <button 
                onClick={logOut}
                className="w-full max-w-[220px] bg-slate-900 hover:bg-rose-500/10 text-white hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 font-bold py-3 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              >
                Wyloguj ze wszystkich urządzeń
              </button>
            </>
          )}
          
        </div>
      </section>
    </div>
  );
}
