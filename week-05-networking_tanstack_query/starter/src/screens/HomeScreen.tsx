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

import { usePatients } from '../hooks/usePatients';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Patient } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

function PatientCard({ patient, onPress }: PatientCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`patient-card-${patient.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>
          {String(patient.name).charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{patient.name}</Text>
        {patient.body && (
          <Text style={styles.cardSubtitle} numberOfLines={2}>{patient.body}</Text>
        )}
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();

  const { isLoading, isError, data, refetch, isFetching, error } = usePatients();

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
      onPress={() => navigation.navigate('Detail', { id: item.id, name: String(item.name) })}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardSubtitle: {
    ...TYPOGRAPHY.caption,
  },
  chevron: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textMuted,
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
