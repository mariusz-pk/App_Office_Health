import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, signIn, logOut, observeAuthState } from '../firebase';
import { LogIn } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: () => {},
  logOut: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading...</div>;
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold tracking-[0.15em] text-emerald-500 uppercase mb-2">Office Health V2.0</div>
          <h1 className="text-2xl font-bold tracking-wide text-white">Logowanie do Systemu</h1>
        </div>
        <button 
          onClick={signIn}
          className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors"
        >
          <LogIn className="w-5 h-5" />
          Zaloguj przez Google
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}
