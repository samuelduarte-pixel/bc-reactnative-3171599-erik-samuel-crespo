// src/screens/HomeScreen.tsx
// Lista de pacientes con soporte offline (caché AsyncStorage) y
// respeto de las preferencias del usuario (orden, modo compacto, filtro).

import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePatients } from '../hooks/usePatients';
import { usePreferences } from '../hooks/usePreferences';
import type { Patient } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': '#58a6ff',
  'Cancelado': COLORS.error,
};

interface PatientRowProps {
  patient: Patient;
  compact: boolean;
}

function PatientRow({ patient, compact }: PatientRowProps): React.JSX.Element {
  const initials = patient.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  const statusColor = STATUS_COLORS[patient.cycleStatus] ?? COLORS.textMuted;

  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLetter}>{initials}</Text>
      </View>
      <View style={styles.rowText}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowTitle} numberOfLines={1}>{patient.name}</Text>
          {!compact && <Text style={styles.ageChip}>{patient.age} a.</Text>}
        </View>
        {!compact && (
          <Text style={styles.rowDiagnosis} numberOfLines={1}>{patient.diagnosis}</Text>
        )}
        <View style={styles.badgeRow}>
          <View style={styles.treatmentBadge}>
            <Text style={styles.treatmentText}>{patient.treatmentType}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{patient.cycleStatus}</Text>
          </View>
        </View>
        {!compact && (
          <Text style={styles.doctorText}>👩‍⚕️ {patient.assignedDoctor}</Text>
        )}
      </View>
    </View>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, refetch, isFetching } = usePatients();
  const { sortOrder, compactMode, filterTreatment } = usePreferences();

  const filteredAndSorted = useMemo(() => {
    if (!data?.patients) return [];

    let result = [...data.patients];

    if (filterTreatment && filterTreatment !== 'all') {
      result = result.filter((p) => p.treatmentType === filterTreatment);
    }

    result.sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

    return result;
  }, [data?.patients, sortOrder, filterTreatment]);

  const renderItem: ListRenderItem<Patient> = useCallback(
    ({ item }) => (
      <PatientRow patient={item} compact={compactMode} />
    ),
    [compactMode],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando pacientes...</Text>
      </View>
    );
  }

  if (isError && !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No hay conexión y no hay caché disponible</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.source === 'cache' && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            ⚠️ Sin red — mostrando datos guardados localmente
          </Text>
        </View>
      )}

      <FlatList
        data={filteredAndSorted}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              {filteredAndSorted.length} paciente{filteredAndSorted.length !== 1 ? 's' : ''}
              {' · Orden: '}{sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
              {compactMode ? ' · Compacto' : ''}
              {filterTreatment !== 'all' ? ` · ${filterTreatment}` : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={TYPOGRAPHY.body}>No hay pacientes</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, backgroundColor: COLORS.background },
  loadingText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.errorLight, textAlign: 'center' },
  retryBtn: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm },
  retryText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.background },
  offlineBanner: {
    backgroundColor: '#78350f',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  offlineText: { ...TYPOGRAPHY.caption, color: '#fbbf24' },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.xxl },
  listHeader: { paddingHorizontal: 0, paddingVertical: SPACING.xs },
  listHeaderText: { ...TYPOGRAPHY.caption },
  separator: { height: SPACING.sm },
  row: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCompact: { paddingVertical: SPACING.sm },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { ...TYPOGRAPHY.h3, color: COLORS.accent, fontSize: 14 },
  rowText: { flex: 1, gap: 2 },
  rowHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowTitle: { ...TYPOGRAPHY.body, fontWeight: '600', flex: 1 },
  ageChip: { ...TYPOGRAPHY.caption, backgroundColor: COLORS.background, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.sm, overflow: 'hidden' },
  rowDiagnosis: { ...TYPOGRAPHY.caption },
  badgeRow: { flexDirection: 'row', gap: SPACING.xs, flexWrap: 'wrap' },
  treatmentBadge: { backgroundColor: COLORS.accent + '22', borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  treatmentText: { ...TYPOGRAPHY.label, color: COLORS.accent, fontSize: 10 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  statusDot: { width: 5, height: 5, borderRadius: RADIUS.sm },
  statusText: { ...TYPOGRAPHY.label, fontSize: 10 },
  doctorText: { ...TYPOGRAPHY.label, color: COLORS.textMuted, fontSize: 10 },
});
