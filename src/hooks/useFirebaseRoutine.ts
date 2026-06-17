import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../components/AuthProvider';
import { handleFirestoreError, OperationType } from '../firebaseErrors';
import { RoutineHistory, DailyRoutineLog } from '../types';

export function useFirebaseRoutine() {
  const { user } = useAuth();
  
  // Local fallback
  const getLocal = (): RoutineHistory => {
    try {
      const item = window.localStorage.getItem('corp_dailyRoutineHistory');
      return item ? JSON.parse(item) : {};
    } catch {
      return {};
    }
  };
  
  const [history, setHistoryState] = useState<RoutineHistory>(getLocal());
  
  useEffect(() => {
    if (!user) {
      setHistoryState(getLocal());
      return;
    }
    const path = `users/${user.uid}/routineHistory`;
    const q = query(collection(db, path), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result: RoutineHistory = {};
      snapshot.forEach(docSnap => {
        result[docSnap.id] = docSnap.data() as DailyRoutineLog;
      });
      setHistoryState(result);
      // also sync to local storage just in case
      window.localStorage.setItem('corp_dailyRoutineHistory', JSON.stringify(result));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
    
    return () => unsubscribe();
  }, [user]);

  const setHistory = (updater: RoutineHistory | ((prev: RoutineHistory) => RoutineHistory)) => {
    const newState = typeof updater === 'function' ? updater(history) : updater;
    
    // Always store to local
    window.localStorage.setItem('corp_dailyRoutineHistory', JSON.stringify(newState));
    setHistoryState(newState);

    if (user) {
      // Find what changed and update only those docs
      Object.keys(newState).forEach((date) => {
        if (JSON.stringify(newState[date]) !== JSON.stringify(history[date])) {
          const path = `users/${user.uid}/routineHistory`;
          setDoc(doc(db, path, date), { ...newState[date], userId: user.uid }).catch(err => {
            console.error(err);
          });
        }
      });
    }
  };

  return [history, setHistory] as const;
}
