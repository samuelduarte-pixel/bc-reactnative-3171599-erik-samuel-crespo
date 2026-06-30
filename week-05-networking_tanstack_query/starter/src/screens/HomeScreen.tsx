// src/screens/HomeScreen.tsx
// Lista de pacientes — consume datos desde la API con TanStack Query

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

import { usePatients, useDeletePatient } from '../hooks/usePatients';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Patient } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': '#58a6ff',
  'Cancelado': COLORS.error,
};

interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
  onDelete: () => void;
}

function PatientCard({ patient, onPress, onDelete }: PatientCardProps): React.JSX.Element {
  const initials = patient.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  const statusColor = STATUS_COLORS[patient.cycleStatus] ?? COLORS.textMuted;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`patient-card-${patient.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>{initials}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{patient.name}</Text>
          <Text style={styles.ageChip}>{patient.age} a.</Text>
        </View>
        <Text style={styles.cardDiagnosis} numberOfLines={1}>{patient.diagnosis}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.treatmentBadge}>
            <Text style={styles.treatmentText}>{patient.treatmentType}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {patient.cycleStatus}
            </Text>
          </View>
        </View>
        <Text style={styles.doctorText}>👩‍⚕️ {patient.assignedDoctor}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.6 }]}
        onPress={(e) => { e.stopPropagation?.(); onDelete(); }}
        accessibilityLabel={`Eliminar ${patient.name}`}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </Pressable>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();

  const { isLoading, isError, data, refetch, isFetching, error } = usePatients();
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
        <Text style={styles.errorDetail}>{(error as Error)?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Patient> = ({ item }) => (
    <PatientCard
      patient={item}
      onPress={() => navigation.navigate('Detail', { id: item.id, name: item.name })}
      onDelete={() => {
        if (!isDeleting) deletePatient(item.id);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(patient) => String(patient.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={() => refetch()}
        refreshing={isFetching && !isLoading}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No hay pacientes disponibles.</Text>
          </View>
        }
        ListHeaderComponent={
          data && data.length > 0 ? (
            <Text style={styles.countLabel}>
              {data.length} paciente{data.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  countLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardAvatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
    fontSize: 16,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    flex: 1,
  },
  ageChip: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  cardDiagnosis: {
    ...TYPOGRAPHY.caption,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  treatmentBadge: {
    backgroundColor: COLORS.accent + '22',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  treatmentText: {
    ...TYPOGRAPHY.label,
    color: COLORS.accent,
    fontSize: 11,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: RADIUS.full,
  },
  statusText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
  },
  doctorText: {
    ...TYPOGRAPHY.label,
    color: COLORS.textMuted,
    fontSize: 11,
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  deleteBtnText: {
    fontSize: 12,
    color: COLORS.error,
    fontWeight: '600',
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  errorText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.error,
    textAlign: 'center',
  },
  errorDetail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.background,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
});
