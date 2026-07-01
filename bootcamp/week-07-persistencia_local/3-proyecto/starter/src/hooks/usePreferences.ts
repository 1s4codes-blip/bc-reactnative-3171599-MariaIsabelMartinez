// src/hooks/usePreferences.ts
// Hook de preferencias del usuario almacenadas con MMKV.
// Preferencias específicas del dominio de importación: ordenar por nombre/precio/origen/estado,
// modo compacto y productos por página.

import { useMMKVString, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';
import type { SortBy } from '../types';

const PREF_KEYS = {
  SORT_BY:      'pref_sortBy',
  SORT_DIR:     'pref_sortDirection',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
} as const;

export type SortDirection = 'asc' | 'desc';

export function usePreferences() {
  const [sortBy, setSortBy]             = useMMKVString(PREF_KEYS.SORT_BY, storage);
  const [sortDir, setSortDir]           = useMMKVString(PREF_KEYS.SORT_DIR, storage);
  const [compactMode, setCompactMode]   = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);

  return {
    sortBy: (sortBy ?? 'name') as SortBy,
    setSortBy: (value: SortBy) => setSortBy(value),

    sortDirection: (sortDir ?? 'asc') as SortDirection,
    setSortDirection: (value: SortDirection) => setSortDir(value),

    compactMode: compactMode ?? false,
    setCompactMode,

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}
