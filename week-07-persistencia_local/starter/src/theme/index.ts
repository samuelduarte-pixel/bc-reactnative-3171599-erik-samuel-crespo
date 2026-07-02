// src/theme/index.ts
// Sistema de diseño — Clínica de Fertilidad

import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#0d1117',
  card: '#161b22',
  border: '#30363d',
  accent: '#61DAFB',
  accentLight: '#61DAFB88',
  text: '#e6edf3',
  textMuted: '#484f58',
  textSecondary: '#8b949e',
  error: '#f85149',
  errorLight: '#f85149cc',
  success: '#3fb950',
  warning: '#d29922',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
};

export const TYPOGRAPHY = StyleSheet.create({
  h2:      { fontSize: 20, fontWeight: '700', color: COLORS.text },
  h3:      { fontSize: 16, fontWeight: '700', color: COLORS.text },
  body:    { fontSize: 14, fontWeight: '400', color: COLORS.text },
  label:   { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  caption: { fontSize: 12, fontWeight: '400', color: COLORS.textMuted },
  error:   { fontSize: 12, fontWeight: '400', color: COLORS.errorLight },
});
