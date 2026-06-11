import { useState, useEffect } from 'react';
import { useFirebaseDoc } from './useFirebaseData';

export function useFirebaseHydrationTarget() {
  const { data, updateDoc } = useFirebaseDoc<{ hydrationTarget: number }>('settings', 'default', { hydrationTarget: 2000 });

  const setTarget = (val: number | ((prev: number) => number)) => {
    const newVal = typeof val === 'function' ? val(data.hydrationTarget || 2000) : val;
    updateDoc({ hydrationTarget: newVal });
  };

  return [data.hydrationTarget || 2000, setTarget] as const;
}
