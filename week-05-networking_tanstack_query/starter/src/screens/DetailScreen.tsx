// src/screens/DetailScreen.tsx
// Detalle de paciente — consume datos desde la API con TanStack Query

import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { usePatientById } from '../hooks/usePatients';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  const { isLoading, isError, data: patient, error } = usePatientById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.idBadge}>ID: {id}</Text>
      </View>

      {patient ? (
        <View style={styles.fieldsCard}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Diagnostico</Text>
            <Text style={styles.fieldValue}>{patient.body}</Text>
          </View>
          {patient.title && (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Titulo</Text>
              <Text style={styles.fieldValue}>{patient.title}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Usuario ID</Text>
            <Text style={styles.fieldValue}>{patient.userId}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            No se encontro informacion del paciente.
          </Text>
        </View>
      )}
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
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.accent,
  },
  title: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
  },
  idBadge: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
