import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Item, ItemType, PatientStatus } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getEmoji(type: ItemType): string {
  const map: Record<ItemType, string> = {
    doctor: '👩‍⚕️',
    patient: '🧑‍🤝‍🧑',
    treatment: '💉',
    cycle: '🧬',
  };
  return map[type];
}

function getTypeLabel(type: ItemType): string {
  const map: Record<ItemType, string> = {
    doctor: 'Doctor',
    patient: 'Paciente',
    treatment: 'Tratamiento',
    cycle: 'Ciclo',
  };
  return map[type];
}

function getStatusColor(status: PatientStatus): string {
  const map: Record<PatientStatus, string> = {
    active: COLORS.success,
    completed: COLORS.info,
    pending: COLORS.warning,
    cancelled: COLORS.error,
  };
  return map[status];
}

function getStatusLabel(status: PatientStatus): string {
  const map: Record<PatientStatus, string> = {
    active: 'Activo',
    completed: 'Completado',
    pending: 'Pendiente',
    cancelled: 'Cancelado',
  };
  return map[status];
}

function formatCOP(value: number): string {
  return `$${value.toLocaleString('es-CO')} COP`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const statusColor = getStatusColor(item.status);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      {/* Header row: emoji + name + status badge */}
      <View style={styles.headerRow}>
        <Text style={styles.emoji}>{getEmoji(item.type)}</Text>
        <View style={styles.headerText}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Type-specific fields */}
      <View style={styles.fieldsRow}>
        {item.type === 'patient' && (
          <>
            <Field label="ID" value={item.patientId ?? '—'} />
            <Field label="Edad" value={`${item.age ?? '—'} años`} />
          </>
        )}

        {item.type === 'treatment' && (
          <>
            <Field label="Categoría" value={item.category ?? '—'} />
            <Field label="Duración" value={`${item.durationWeeks ?? '—'} sem.`} />
            <Field label="Costo" value={item.cost != null ? formatCOP(item.cost) : '—'} />
          </>
        )}

        {item.type === 'doctor' && (
          <>
            <Field label="Especialidad" value={item.specialty ?? '—'} />
            <Field label="Experiencia" value={`${item.yearsExperience ?? '—'} años`} />
            <Field label="Licencia" value={item.licenseNumber ?? '—'} />
          </>
        )}

        {item.type === 'cycle' && (
          <>
            <Field label="Paciente" value={item.patientName ?? '—'} />
            <Field label="Etapa" value={item.stage ?? '—'} />
            <Field label="Inicio" value={item.startDate ?? '—'} />
          </>
        )}
      </View>

      {/* Type label tag */}
      <View style={styles.typeTag}>
        <Text style={styles.typeTagText}>{getTypeLabel(item.type)}</Text>
      </View>
    </Pressable>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  headerText: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  description: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  statusBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  fieldsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  field: {
    minWidth: '30%',
    flex: 1,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  typeTag: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },
  typeTagText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
    textTransform: 'capitalize',
  },
});