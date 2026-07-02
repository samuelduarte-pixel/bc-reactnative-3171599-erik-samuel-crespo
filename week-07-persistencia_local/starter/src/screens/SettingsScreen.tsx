// src/screens/SettingsScreen.tsx
// Pantalla de ajustes con preferencias persistidas en MMKV
// y un dato sensible persistido con Expo SecureStore.
// Implementación completa — Clínica de Fertilidad

import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';

const SENSITIVE_KEY = 'clinica_fertilidad_session_token';
const MOCK_SENSITIVE = 'TKN-FIV-2025-SUPERSECRETO-3171599';

const TREATMENT_FILTERS = ['all', 'IVF', 'IUI', 'FET', 'ICSI', 'Ovodonación', 'Estimulación ovárica'] as const;

export function SettingsScreen(): React.JSX.Element {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
    filterTreatment,
    setFilterTreatment,
  } = usePreferences();

  const [isSaved, setIsSaved] = useState(false);
  const [maskedValue, setMaskedValue] = useState<string | null>(null);

  async function handleSaveSensitive(): Promise<void> {
    try {
      await SecureStore.setItemAsync(SENSITIVE_KEY, MOCK_SENSITIVE);
      setIsSaved(true);
      Alert.alert('Guardado', 'Token de sesión guardado en SecureStore.');
    } catch {
      Alert.alert('Error', 'No se pudo guardar el dato sensible.');
    }
  }

  async function handleReadSensitive(): Promise<void> {
    try {
      const value = await SecureStore.getItemAsync(SENSITIVE_KEY);
      if (value) {
        const masked = value.slice(0, 3) + '•••' + value.slice(-3);
        setMaskedValue(masked);
        setIsSaved(true);
      } else {
        Alert.alert('No encontrado', 'No hay token de sesión guardado aún.');
      }
    } catch {
      Alert.alert('Error', 'No se pudo leer el dato sensible.');
    }
  }

  async function handleDeleteSensitive(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SENSITIVE_KEY);
      setIsSaved(false);
      setMaskedValue(null);
      Alert.alert('Eliminado', 'El token de sesión fue removido de SecureStore.');
    } catch {
      Alert.alert('Error', 'No se pudo eliminar el dato sensible.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ── SECCIÓN MMKV — Preferencias de la app ────────────── */}
      <Text style={styles.sectionTitle}>Preferencias de la app</Text>
      <Text style={styles.sectionHint}>
        Estos valores se persisten con MMKV. Cambian en tiempo real sin
        necesidad de pulsar "Guardar".
      </Text>

      {/* Modo compacto */}
      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>
            Muestra menos información por paciente en la lista
          </Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      {/* Orden de la lista */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Orden de la lista</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[styles.segment, sortOrder === opt && styles.segmentActive]}
              onPress={() => setSortOrder(opt)}
            >
              <Text style={[styles.segmentText, sortOrder === opt && styles.segmentTextActive]}>
                {opt === 'asc' ? 'A → Z' : 'Z → A'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{sortOrder}</Text>
        </Text>
      </View>

      {/* Ítems por página */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Pacientes por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[styles.segment, itemsPerPage === n && styles.segmentActive]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text style={[styles.segmentText, itemsPerPage === n && styles.segmentTextActive]}>
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{itemsPerPage}</Text>
        </Text>
      </View>

      {/* Filtro por tratamiento */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Filtrar por tratamiento</Text>
        <View style={styles.segmentedWrap}>
          {TREATMENT_FILTERS.map((t) => (
            <Pressable
              key={t}
              style={[styles.segment, filterTreatment === t && styles.segmentActive]}
              onPress={() => setFilterTreatment(t)}
            >
              <Text style={[styles.segmentText, filterTreatment === t && styles.segmentTextActive]}>
                {t === 'all' ? 'Todos' : t}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Filtro actual: <Text style={styles.mono}>{filterTreatment === 'all' ? 'Todos' : filterTreatment}</Text>
        </Text>
      </View>

      {/* ── SECCIÓN SecureStore — Token de sesión ────────────── */}
      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
        Token de sesión (SecureStore)
      </Text>
      <Text style={styles.sectionHint}>
        SecureStore cifra el valor en Keychain (iOS) o Keystore (Android).
        Nunca mostrar el valor completo en pantalla.
      </Text>

      <Text style={styles.rowDesc}>
        Clave: <Text style={styles.mono}>{SENSITIVE_KEY}</Text>
      </Text>

      {maskedValue && (
        <View style={styles.maskedContainer}>
          <Text style={styles.rowLabel}>Token leído (enmascarado):</Text>
          <Text style={styles.maskedValue}>{maskedValue}</Text>
        </View>
      )}

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSaveSensitive}>
          <Text style={styles.btnSecureText}>💾 Guardar</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnSecureAlt]} onPress={handleReadSensitive}>
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>🔍 Leer</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnDanger]} onPress={handleDeleteSensitive}>
          <Text style={[styles.btnSecureText, { color: COLORS.error }]}>🗑️ Eliminar</Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> En una app real
          guardarías en SecureStore el token JWT, el PIN del usuario o la
          clave de cifrado local — nunca en AsyncStorage ni MMKV sin cifrar.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.sm },

  sectionTitle: { ...TYPOGRAPHY.h3, marginBottom: SPACING.xs },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  segmented: { flexDirection: 'row', gap: SPACING.xs },
  segmentedWrap: { flexDirection: 'row', gap: SPACING.xs, flexWrap: 'wrap' },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: COLORS.background, fontWeight: '700' },

  maskedContainer: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  maskedValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.background },

  infoBox: {
    backgroundColor: COLORS.card,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: { ...TYPOGRAPHY.caption },
});
