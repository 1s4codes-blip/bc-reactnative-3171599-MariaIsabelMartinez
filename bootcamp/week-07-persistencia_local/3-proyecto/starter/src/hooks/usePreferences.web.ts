// src/hooks/usePreferences.web.ts
// Versión web: usa React state + localStorage en lugar de MMKV hooks nativos.
// En dispositivos móviles se usa la versión con MMKV (usePreferences.ts).

import { useState, useCallback } from 'react';
import { storage } from '../storage/mmkv';
import type { SortBy } from '../types';

type SortDirection = 'asc' | 'desc';

function useLocalStorageString(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => storage.getString(key) ?? defaultValue);
  const set = useCallback((newVal: string | undefined) => {
    if (newVal === undefined) {
      storage.remove(key);
      setValue(defaultValue);
    } else {
      storage.set(key, newVal);
      setValue(newVal);
    }
  }, [key, defaultValue]);
  return [value, set] as const;
}

function useLocalStorageBoolean(key: string, defaultValue: boolean) {
  const [value, setValue] = useState(() => {
    const v = storage.getBoolean(key);
    return v ?? defaultValue;
  });
  const set = useCallback((newVal: boolean | undefined) => {
    if (newVal === undefined) {
      storage.remove(key);
      setValue(defaultValue);
    } else {
      storage.set(key, newVal);
      setValue(newVal);
    }
  }, [key, defaultValue]);
  return [value, set] as const;
}

function useLocalStorageNumber(key: string, defaultValue: number) {
  const [value, setValue] = useState(() => {
    const v = storage.getNumber(key);
    return v ?? defaultValue;
  });
  const set = useCallback((newVal: number | undefined) => {
    if (newVal === undefined) {
      storage.remove(key);
      setValue(defaultValue);
    } else {
      storage.set(key, newVal);
      setValue(newVal);
    }
  }, [key, defaultValue]);
  return [value, set] as const;
}

const PREF_KEYS = {
  SORT_BY:      'pref_sortBy',
  SORT_DIR:     'pref_sortDirection',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
} as const;

export function usePreferences() {
  const [sortBy, setSortBy]             = useLocalStorageString(PREF_KEYS.SORT_BY, 'name');
  const [sortDir, setSortDir]           = useLocalStorageString(PREF_KEYS.SORT_DIR, 'asc');
  const [compactMode, setCompactMode]   = useLocalStorageBoolean(PREF_KEYS.COMPACT_MODE, false);
  const [itemsPerPage, setItemsPerPage] = useLocalStorageNumber(PREF_KEYS.ITEMS_PER_PAGE, 10);

  return {
    sortBy: sortBy as SortBy,
    setSortBy: (value: SortBy) => setSortBy(value),

    sortDirection: sortDir as SortDirection,
    setSortDirection: (value: SortDirection) => setSortDir(value),

    compactMode,
    setCompactMode,

    itemsPerPage,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}
