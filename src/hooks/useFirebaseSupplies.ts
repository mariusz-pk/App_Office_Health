import { useState, useEffect } from 'react';
import { useFirebaseDoc } from './useFirebaseData';

export function useFirebaseSupplies() {
  const { data, updateDoc } = useFirebaseDoc<{ vitalSupplies: string[] }>('settings', 'default', { vitalSupplies: [] });

  const setSupplies = (updater: string[] | ((prev: string[]) => string[])) => {
    const newVal = typeof updater === 'function' ? updater(data.vitalSupplies || []) : updater;
    updateDoc({ vitalSupplies: newVal });
  };

  return [data.vitalSupplies || [], setSupplies] as const;
}
