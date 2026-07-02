// src/hooks/usePreferences.ts
// Hook de preferencias del usuario.
// Usa hooks reactivos de MMKV en build nativo, AsyncStorage como fallback en Expo Go.

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../storage/mmkv';

// ─── Claves de preferencias ─────────────────────────────────────────────────
const PREF_KEYS = {
  SORT_ORDER: 'pref_sortOrder',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
  FILTER_TREATMENT: 'pref_filterTreatment',
} as const;

export type SortOrder = 'asc' | 'desc';

// ─── Detectar hooks de MMKV ────────────────────────────────────────────────
let useMMKVString: ((key: string, store?: import('react-native-mmkv').MMKV) =>
  [string | undefined, (v: string | undefined) => void]) | null = null;
let useMMKVBoolean: ((key: string, store?: import('react-native-mmkv').MMKV) =>
  [boolean | undefined, (v: boolean | undefined) => void]) | null = null;
let useMMKVNumber: ((key: string, store?: import('react-native-mmkv').MMKV) =>
  [number | undefined, (v: number | undefined) => void]) | null = null;

try {
  const mmkv = require('react-native-mmkv');
  useMMKVString = mmkv.useMMKVString;
  useMMKVBoolean = mmkv.useMMKVBoolean;
  useMMKVNumber = mmkv.useMMKVNumber;
} catch {
  // MMKV hooks no disponibles (Expo Go) — usar AsyncStorage como fallback
}

// ─── Fallback: hooks con AsyncStorage ──────────────────────────────────────
function useAsyncStorageString(key: string, defaultValue: string): [string, (v: string) => void] {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then((stored) => {
      if (stored !== null) setValue(stored);
    }).catch(() => {});
  }, [key]);

  const setter = useCallback((v: string) => {
    setValue(v);
    AsyncStorage.setItem(key, v).catch(() => {});
  }, [key]);

  return [value, setter];
}

function useAsyncStorageBoolean(key: string, defaultValue: boolean): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then((stored) => {
      if (stored !== null) setValue(stored === 'true');
    }).catch(() => {});
  }, [key]);

  const setter = useCallback((v: boolean) => {
    setValue(v);
    AsyncStorage.setItem(key, String(v)).catch(() => {});
  }, [key]);

  return [value, setter];
}

function useAsyncStorageNumber(key: string, defaultValue: number): [number, (v: number) => void] {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then((stored) => {
      if (stored !== null) {
        const num = Number(stored);
        if (!isNaN(num)) setValue(num);
      }
    }).catch(() => {});
  }, [key]);

  const setter = useCallback((v: number) => {
    setValue(v);
    AsyncStorage.setItem(key, String(v)).catch(() => {});
  }, [key]);

  return [value, setter];
}

// ─── Hook principal ──────────────────────────────────────────────────────────
// Nota: useMMKVString/Boolean/Number son estables (determinados al cargar el módulo).
// La condición nunca cambia entre renderos, cumpliendo Rules of Hooks.
export function usePreferences() {
  const [sortOrder, setSortOrderRaw] = useMMKVString
    ? useMMKVString(PREF_KEYS.SORT_ORDER, storage!)
    : useAsyncStorageString(PREF_KEYS.SORT_ORDER, 'asc');

  const [compactMode, setCompactModeRaw] = useMMKVBoolean
    ? useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage!)
    : useAsyncStorageBoolean(PREF_KEYS.COMPACT_MODE, false);

  const [itemsPerPage, setItemsPerPageRaw] = useMMKVNumber
    ? useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage!)
    : useAsyncStorageNumber(PREF_KEYS.ITEMS_PER_PAGE, 10);

  const [filterTreatment, setFilterTreatmentRaw] = useMMKVString
    ? useMMKVString(PREF_KEYS.FILTER_TREATMENT, storage!)
    : useAsyncStorageString(PREF_KEYS.FILTER_TREATMENT, 'all');

  return {
    sortOrder: (sortOrder ?? 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrderRaw(value),

    compactMode: compactMode ?? false,
    setCompactMode: (value: boolean) => setCompactModeRaw(value),

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPageRaw(value),

    filterTreatment: filterTreatment ?? 'all',
    setFilterTreatment: (value: string) => setFilterTreatmentRaw(value),
  };
}
