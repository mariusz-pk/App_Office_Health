import { useState, FormEvent } from 'react';
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { aktywujKodem, normalizujKod } from '../lib/access';

export function ActivationGate({ onActivated }: { onActivated: () => void }) {
  const [kod, setKod] = useState('');
  const [blad, setBlad] = useState('');
  const [sprawdzanie, setSprawdzanie] = useState(false);

  const wyslij = async (e: FormEvent) => {
    e.preventDefault();
    if (sprawdzanie || kod.trim() === '') return;

    setSprawdzanie(true);
    setBlad('');

    const ok = await aktywujKodem(kod);
    if (ok) {
      onActivated();
      return;
    }

    setBlad('Kod nieprawidłowy. Sprawdź, czy przepisałeś go dokładnie.');
    setSprawdzanie(false);
  };

  return (
    // Bez animacji wejścia sterowanej JS: gdyby nie wystartowała, ekran zostałby
    // przezroczysty i klient nie miałby jak wpisać kodu.
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-emerald-500/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-[1.25rem] bg-slate-800 border border-slate-700 p-1.5 shadow-lg">
            <img
              src="/icon-512.png"
              alt="Office Health"
              className="w-full h-full object-cover rounded-[0.9rem]"
            />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.15em] text-emerald-500 uppercase mb-1">
              Office Health V2.0
            </div>
            <h1 className="text-xl font-bold tracking-wide text-white">Dostęp do aplikacji</h1>
          </div>
          <p className="text-sm text-slate-400">Wpisz kod dostępu, który otrzymałeś przy zakupie.</p>
        </div>

        <form
          onSubmit={wyslij}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl"
        >
          <label
            htmlFor="kod-dostepu"
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-500 font-bold"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Kod dostępu
          </label>

          <input
            id="kod-dostepu"
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            value={kod}
            onChange={(e) => {
              setKod(normalizujKod(e.target.value));
              if (blad) setBlad('');
            }}
            placeholder="OFH-XXXX-XXXX-XXXX"
            disabled={sprawdzanie}
            className="w-full px-4 py-3 text-center text-lg font-mono tracking-widest bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-colors disabled:opacity-60"
          />

          {blad && (
            <p role="alert" className="text-sm text-rose-400 text-center">
              {blad}
            </p>
          )}

          <button
            type="submit"
            disabled={sprawdzanie || kod.trim() === ''}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sprawdzanie ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sprawdzam
              </>
            ) : (
              'Aktywuj'
            )}
          </button>

          <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            Kod podajesz raz — aplikacja zapamięta aktywację.
          </p>
        </form>

        <p className="text-[10px] text-slate-600 tracking-wider uppercase text-center">
          by WszystkokolwiekWFormie
        </p>
      </div>
    </div>
  );
}
