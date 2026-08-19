import { useLocalDoc } from './useLocalData';

// Cel nawodnienia zostaje WYŁĄCZNIE lokalnie (spójnie z IT) — nie trafia do chmury.
export function useLocalHydrationTarget() {
  const { data, updateDoc } = useLocalDoc<{ hydrationTarget: number }>('settings', 'default', { hydrationTarget: 2000 });

  const setTarget = (val: number | ((prev: number) => number)) => {
    const newVal = typeof val === 'function' ? val(data.hydrationTarget || 2000) : val;
    updateDoc({ hydrationTarget: newVal });
  };

  return [data.hydrationTarget || 2000, setTarget] as const;
}
