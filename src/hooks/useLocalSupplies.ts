import { useLocalDoc } from './useLocalData';

// Lista zakupów / spiżarnia zostaje WYŁĄCZNIE lokalnie (spójnie z IT) — nie trafia do chmury.
export function useLocalSupplies() {
  const { data, updateDoc } = useLocalDoc<{ vitalSupplies: string[] }>('settings', 'default', { vitalSupplies: [] });

  const setSupplies = (updater: string[] | ((prev: string[]) => string[])) => {
    const newVal = typeof updater === 'function' ? updater(data.vitalSupplies || []) : updater;
    updateDoc({ vitalSupplies: newVal });
  };

  return [data.vitalSupplies || [], setSupplies] as const;
}
