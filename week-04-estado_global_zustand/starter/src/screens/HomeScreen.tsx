// src/screens/HomeScreen.tsx
// Lista de pacientes — botón "Guardar" usando Zustand store

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

const STATUS_COLORS: Record<string, string> = {
  'Activo': COLORS.success,
  'En espera': COLORS.warning,
  'Completado': COLORS.info,
  'Cancelado': COLORS.error,
};

interface ItemCardProps {
  item: Item;
  onPress: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

function ItemCard({ item, onPress, isSaved, onToggleSave }: ItemCardProps): React.JSX.Element {
  const statusColor = STATUS_COLORS[item.cycleStatus] ?? COLORS.textMuted;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemAge}>{item.age} años</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.saveBtn,
            isSaved && styles.saveBtnActive,
            pressed && { opacity: 0.6 },
          ]}
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleSave();
          }}
          testID={`save-btn-${item.id}`}
          accessibilityLabel={isSaved ? `Quitar ${item.name} de guardados` : `Guardar ${item.name}`}
        >
          <Text style={[styles.saveBtnText, isSaved && styles.saveBtnTextActive]}>
            {isSaved ? '★' : '☆'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.itemDescription} numberOfLines={1}>
        {item.diagnosis}
      </Text>

      <View style={styles.badgeRow}>
        <View style={styles.treatmentBadge}>
          <Text style={styles.treatmentBadgeText}>{item.treatmentType}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {item.cycleStatus}
          </Text>
        </View>
      </View>

      <Text style={styles.doctorText}>👩‍⚕️ {item.assignedDoctor}</Text>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();

  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);
  const isItemSaved = useSavedStore((state) => state.isItemSaved);

  const handleToggleSave = (item: Item): void => {
    if (isItemSaved(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() =>
        navigation.navigate('HomeDetail', {
          id: item.id,
          name: item.name,
          age: item.age,
          diagnosis: item.diagnosis,
          treatmentType: item.treatmentType,
          cycleStatus: item.cycleStatus,
          assignedDoctor: item.assignedDoctor,
          startDate: item.startDate,
          nextAppointment: item.nextAppointment,
          cycleNumber: item.cycleNumber,
          description: item.description,
        })
      }
      isSaved={isItemSaved(item.id)}
      onToggleSave={() => handleToggleSave(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            {ITEMS.length} pacientes registradas
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay pacientes registradas</Text>
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
  list: {
    padding: SPACING.base,
  },
  listHeader: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceAlt,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
  },
  headerInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  itemAge: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  saveBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveBtnActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveBtnText: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.textMuted,
  },
  saveBtnTextActive: {
    color: COLORS.background,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  treatmentBadge: {
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  treatmentBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
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
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});
