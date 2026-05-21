// src/screens/FavoritesScreen.tsx
// Pestaña de Seguimiento — pacientes prioritarias / en seguimiento activo

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': COLORS.info,
  'Cancelado': COLORS.error,
};

export function FavoritesScreen(): React.JSX.Element {
  function renderFavorite({ item }: { item: Item }): React.JSX.Element {
    const statusColor = STATUS_COLORS[item.cycleStatus] ?? COLORS.textMuted;

    return (
      <View style={styles.card}>
        {/* Icono de seguimiento */}
        <View style={styles.iconCol}>
          <Text style={styles.heartIcon}>♥</Text>
        </View>

        <View style={styles.cardContent}>
          {/* Nombre y edad */}
          <View style={styles.cardHeader}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.ageChip}>{item.age} a.</Text>
          </View>

          {/* Diagnóstico */}
          <Text style={styles.diagnosisText}>{item.diagnosis}</Text>

          {/* Tratamiento y estado */}
          <View style={styles.badgeRow}>
            <View style={styles.treatmentBadge}>
              <Text style={styles.treatmentText}>{item.treatmentType}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.cycleStatus}
              </Text>
            </View>
          </View>

          {/* Próxima cita */}
          <Text style={styles.appointmentText}>
            📅 Próxima cita: {item.nextAppointment}
          </Text>

          {/* Doctor */}
          <Text style={styles.doctorText}>
            👩‍⚕️ {item.assignedDoctor} · Ciclo {item.cycleNumber}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Seguimiento</Text>
        <Text style={styles.subtitle}>Pacientes en seguimiento prioritario</Text>
      </View>

      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🩺</Text>
            <Text style={styles.emptyText}>No hay pacientes en seguimiento</Text>
          </View>
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
  headerContainer: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconCol: {
    paddingTop: 2,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.error,
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
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  ageChip: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  diagnosisText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  treatmentBadge: {
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  treatmentText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
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
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  appointmentText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.accent,
    marginTop: 2,
  },
  doctorText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});