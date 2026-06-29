// src/screens/SavedScreen.tsx
// Pantalla de guardados — pacientes en seguimiento prioritario
// Lee el estado directamente desde el savedStore (sin props)

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': COLORS.info,
  'Cancelado': COLORS.error,
};

interface SavedItemProps {
  item: Item;
  onRemove: () => void;
}

function SavedItem({ item, onRemove }: SavedItemProps): React.JSX.Element {
  const statusColor = STATUS_COLORS[item.cycleStatus] ?? COLORS.textMuted;

  return (
    <View style={styles.card}>
      <View style={styles.iconCol}>
        <Text style={styles.heartIcon}>♥</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.ageChip}>{item.age} a.</Text>
        </View>

        <Text style={styles.diagnosisText} numberOfLines={1}>{item.diagnosis}</Text>

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

        <Text style={styles.appointmentText}>
          📅 Próxima cita: {item.nextAppointment}
        </Text>

        <Text style={styles.doctorText}>
          👩‍⚕️ {item.assignedDoctor} · Ciclo {item.cycleNumber}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.removeButton, pressed && { opacity: 0.6 }]}
        onPress={onRemove}
        accessibilityLabel={`Quitar ${item.name} de guardados`}
        testID={`remove-btn-${item.id}`}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </Pressable>
    </View>
  );
}

export function SavedScreen(): React.JSX.Element {
  const items = useSavedStore((state) => state.items);
  const removeItem = useSavedStore((state) => state.removeItem);
  const clearAll = useSavedStore((state) => state.clearAll);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <SavedItem item={item} onRemove={() => removeItem(item.id)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Seguimiento</Text>
            <Text style={styles.subtitle}>Pacientes en seguimiento prioritario</Text>
          </View>
          {items.length > 0 && (
            <Pressable onPress={clearAll} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Limpiar todo</Text>
            </Pressable>
          )}
        </View>
        {items.length > 0 && (
          <Text style={styles.countLabel}>
            {items.length} guardado{items.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyTitle}>Sin guardados aún</Text>
            <Text style={styles.emptySubtitle}>
              Ve a la lista de pacientes y guarda las que necesites dar seguimiento.
            </Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  countLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: SPACING.sm,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  clearButtonText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.error,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    flexGrow: 1,
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
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  removeButtonText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyIcon: {
    fontSize: 52,
    color: COLORS.textMuted,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
