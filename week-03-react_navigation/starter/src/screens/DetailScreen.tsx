// src/screens/DetailScreen.tsx
// Detalle de paciente — clínica de fertilidad

import type { NativeStackRouteProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type DetailScreenRouteProp = NativeStackRouteProp<HomeStackParamList, 'HomeDetail'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': COLORS.info,
  'Cancelado': COLORS.error,
};

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailScreenRouteProp>();
  const {
    name,
    age,
    diagnosis,
    treatmentType,
    cycleStatus,
    assignedDoctor,
    startDate,
    nextAppointment,
    cycleNumber,
    description,
  } = route.params;

  const statusColor = STATUS_COLORS[cycleStatus] ?? COLORS.textMuted;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Avatar y nombre */}
      <View style={styles.heroSection}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTextLarge}>
            {name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ageText}>{age} años</Text>

        {/* Estado del ciclo */}
        <View style={[styles.statusPill, { backgroundColor: statusColor + '22', borderColor: statusColor + '55' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>{cycleStatus}</Text>
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      {/* Campos de detalle */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Diagnóstico</Text>
        <Text style={styles.fieldValue}>{diagnosis}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tipo de tratamiento</Text>
        <View style={styles.treatmentBadge}>
          <Text style={styles.treatmentBadgeText}>{treatmentType}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Médico asignado</Text>
        <Text style={styles.fieldValue}>👩‍⚕️ {assignedDoctor}</Text>
      </View>

      <View style={styles.rowFields}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>Ciclo N°</Text>
          <Text style={[styles.fieldValue, styles.bigNumber]}>{cycleNumber}</Text>
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>Inicio</Text>
          <Text style={styles.fieldValue}>{startDate}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Próxima cita</Text>
        <Text style={[styles.fieldValue, { color: COLORS.accent }]}>
          📅 {nextAppointment}
        </Text>
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
    padding: SPACING.base,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  avatarTextLarge: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  ageText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
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
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  descriptionCard: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  descriptionText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
  bigNumber: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  rowFields: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  treatmentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  treatmentBadgeText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
});