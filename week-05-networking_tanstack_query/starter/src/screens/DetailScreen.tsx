// src/screens/DetailScreen.tsx
// Detalle de paciente — consume datos desde la API con TanStack Query

import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { usePatientById } from '../hooks/usePatients';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': '#58a6ff',
  'Cancelado': COLORS.error,
};

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  const { isLoading, isError, data: patient, error } = usePatientById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando paciente...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
        <Text style={styles.errorDetail}>{(error as Error)?.message}</Text>
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Paciente no encontrado</Text>
      </View>
    );
  }

  const initials = patient.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  const statusColor = STATUS_COLORS[patient.cycleStatus] ?? COLORS.textMuted;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{initials}</Text>
        </View>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.age}>{patient.age} años</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor + '22', borderColor: statusColor + '55' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>{patient.cycleStatus}</Text>
        </View>
      </View>

      <View style={styles.descCard}>
        <Text style={styles.descLabel}>Descripción</Text>
        <Text style={styles.descText}>{patient.description}</Text>
      </View>

      <View style={styles.fieldsCard}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Diagnóstico</Text>
          <Text style={styles.fieldValue}>{patient.diagnosis}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Tipo de tratamiento</Text>
          <View style={styles.treatmentBadge}>
            <Text style={styles.treatmentText}>{patient.treatmentType}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Médico asignado</Text>
          <Text style={styles.fieldValue}>👩‍⚕️ {patient.assignedDoctor}</Text>
        </View>

        <View style={styles.rowFields}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Ciclo N°</Text>
            <Text style={[styles.fieldValue, styles.bigNumber]}>{patient.cycleNumber}</Text>
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Inicio</Text>
            <Text style={styles.fieldValue}>{patient.startDate}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Próxima cita</Text>
          <Text style={[styles.fieldValue, { color: COLORS.accent }]}>
            📅 {patient.nextAppointment}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.accent,
  },
  name: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
  },
  age: {
    ...TYPOGRAPHY.caption,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    marginTop: SPACING.xs,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: RADIUS.full,
  },
  statusPillText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '500',
  },
  descCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  descLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  field: {
    gap: SPACING.xs,
  },
  fieldLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  bigNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.accent,
  },
  rowFields: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  treatmentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent + '22',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  treatmentText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.accent,
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
});
