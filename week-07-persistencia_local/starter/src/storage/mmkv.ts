// src/storage/mmkv.ts
// Instancia global de MMKV para toda la app.
// En Expo Go, MMKV no está disponible — el hook usePreferences usa AsyncStorage como fallback.

import type { MMKV } from 'react-native-mmkv';

let storage: MMKV | null = null;

try {
  const { createMMKV } = require('react-native-mmkv');
  storage = createMMKV({ id: 'clinica-fertilidad-storage' });
} catch {
  // MMKV nativo no disponible (Expo Go) — storage queda null
}

export { storage };
