// src/screens/HomeScreen.tsx
// Lista de pacientes con pull-to-refresh y acceso a Create / Edit

import React from 'react';
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
import { usePatients, useDeletePatient } from '../hooks/usePatients';
import type { Patient } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': '#58a6ff',
  'Cancelado': COLORS.error,
};

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch } = usePatients();
  const { mutate: deletePatient, isPending: isDeleting } = useDeletePatient();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando pacientes...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar la lista</Text>
        <Pressable style={styles.retryBtn} onPress={() => void refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Patient> = ({ item }) => {
    const initials = item.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
    const statusColor = STATUS_COLORS[item.cycleStatus] ?? COLORS.textMuted;

    return (
      <Pressable
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
        onPress={() => navigation.navigate('Edit', { id: item.id, name: item.name })}
      >
        <View style={styles.rowLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{initials}</Text>
          </View>
          <View style={styles.rowText}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowTitle} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.ageChip}>{item.age} a.</Text>
            </View>
            <Text style={styles.rowDiagnosis} numberOfLines={1}>{item.diagnosis}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.treatmentBadge}>
                <Text style={styles.treatmentText}>{item.treatmentType}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>{item.cycleStatus}</Text>
              </View>
            </View>
            <Text style={styles.doctorText}>👩‍⚕️ {item.assignedDoctor}</Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.6 }]}
          onPress={(e) => { e.stopPropagation?.(); if (!isDeleting) deletePatient(item.id); }}
        >
          <Text style={styles.deleteBtnText}>✕</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data ?? []}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshing={isFetching && !isLoading}
      onRefresh={refetch}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.empty}>No hay pacientes registrados</Text>
        </View>
      }
      ListHeaderComponent={
        data?.length ? <Text style={styles.count}>{data.length} paciente{data.length !== 1 ? 's' : ''}</Text> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.xxl },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, backgroundColor: COLORS.background },
  loadingText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.errorLight },
  retryBtn: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm },
  retryText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.background },
  empty: { ...TYPOGRAPHY.caption, textAlign: 'center', marginTop: SPACING.xxl },
  count: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: SPACING.sm },
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
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
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
  deleteBtn: { width: 30, height: 30, borderRadius: RADIUS.sm, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  deleteBtnText: { fontSize: 12, color: COLORS.error, fontWeight: '600' },
});
