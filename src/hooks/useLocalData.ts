import { useState } from 'react';

// Lokalne hooki danych (localStorage) — dane NIE trafiają do Firestore. Spójnie z wariantem IT:
// do chmury synchronizuje się wyłącznie dzienna rutyna (useFirebaseRoutine), a pomiary z modułu
// Kontrola, nawodnienie i lista zakupów zostają na urządzeniu.

// Kolekcja dokumentów (odpowiednik dawnego useFirebaseCollection, ale bez chmury).
export function useLocalCollection<T extends { id?: string }>(collectionName: string) {
  const key = `corp_${collectionName}`;

  const getLocal = (): T[] => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  };

  const [data, setData] = useState<T[]>(getLocal());

  const persist = (next: T[]) => {
    setData(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // brak dostępu do localStorage (tryb prywatny) — dane zostają w pamięci sesji
    }
  };

  const addOrUpdateDoc = (id: string, value: any) => {
    const next = [...data];
    const index = next.findIndex(item => item.id === id);
    if (index >= 0) next[index] = { ...value, id };
    else next.push({ ...value, id });
    persist(next);
  };

  const removeDoc = (id: string) => {
    persist(data.filter(item => item.id !== id));
  };

  return { data, addOrUpdateDoc, removeDoc };
}

// Pojedynczy dokument (odpowiednik dawnego useFirebaseDoc, ale bez chmury). `updateDoc` scala
// z aktualnym stanem w localStorage, więc kilka pól tego samego dokumentu (np. cel nawodnienia
// i lista zakupów) nie nadpisuje się nawzajem.
export function useLocalDoc<T>(collectionName: string, docId: string, initialData: T) {
  const key = `corp_${collectionName}_${docId}`;

  const read = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? { ...initialData, ...JSON.parse(item) } : initialData;
    } catch {
      return initialData;
    }
  };

  const [data, setData] = useState<T>(read());

  const updateDoc = (value: Partial<T>) => {
    const merged = { ...read(), ...value };
    setData(merged);
    try {
      window.localStorage.setItem(key, JSON.stringify(merged));
    } catch {
      // tryb prywatny — dane zostają w pamięci sesji
    }
  };

  return { data, updateDoc };
}
