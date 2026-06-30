// src/screens/CreateScreen.tsx
// Crear nuevo paciente — usa useMutation para enviar datos a la API

import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCreatePatient } from '../hooks/usePatients';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import type { CycleStatus, TreatmentType } from '../types';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

const TREATMENTS: TreatmentType[] = [
  'IVF', 'IUI', 'FET', 'ICSI', 'Ovodonación', 'Estimulación ovárica',
];

const STATUSES: CycleStatus[] = ['Activo', 'En espera'];

const DOCTORS = [
  'Dra. María Andrade',
  'Dr. Carlos Méndez',
  'Dra. Lucía Vega',
  'Dr. Felipe Rojas',
];

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [description, setDescription] = useState('');
  const [treatmentType, setTreatmentType] = useState<TreatmentType>('IVF');
  const [cycleStatus, setCycleStatus] = useState<CycleStatus>('Activo');
  const [assignedDoctor, setAssignedDoctor] = useState(DOCTORS[0]);

  const { isPending, mutate } = useCreatePatient();

  function handleSubmit(): void {
    if (!name.trim() || !age.trim()) return;

    mutate(
      {
        name: name.trim(),
        age: Number(age),
        diagnosis: diagnosis.trim() || 'Sin diagnóstico',
        description: description.trim() || 'Paciente nueva en seguimiento',
        treatmentType,
        cycleStatus,
        assignedDoctor,
        cycleNumber: 1,
        startDate: new Date().toISOString().split('T')[0],
        nextAppointment: '',
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  }

  const canSubmit = name.trim().length > 0 && age.trim().length > 0 && !isPending;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Datos del nuevo paciente</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre completo..."
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Edad <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Edad..."
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Diagnóstico</Text>
          <TextInput
            style={styles.input}
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Diagnóstico..."
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción del caso..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Tratamiento</Text>
          <View style={styles.chipRow}>
            {TREATMENTS.map((t) => (
              <Pressable
                key={t}
                style={[styles.chip, treatmentType === t && styles.chipActive]}
                onPress={() => setTreatmentType(t)}
              >
                <Text style={[styles.chipText, treatmentType === t && styles.chipTextActive]}>
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Estado del ciclo</Text>
          <View style={styles.chipRow}>
            {STATUSES.map((s) => (
              <Pressable
                key={s}
                style={[styles.chip, cycleStatus === s && styles.chipActive]}
                onPress={() => setCycleStatus(s)}
              >
                <Text style={[styles.chipText, cycleStatus === s && styles.chipTextActive]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Médico asignado</Text>
          <View style={styles.chipRow}>
            {DOCTORS.map((d) => (
              <Pressable
                key={d}
                style={[styles.chip, assignedDoctor === d && styles.chipActive]}
                onPress={() => setAssignedDoctor(d)}
              >
                <Text style={[styles.chipText, assignedDoctor === d && styles.chipTextActive]}>
                  {d}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear paciente</Text>
          )}
        </Pressable>

        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  field: {
    gap: SPACING.xs,
  },
  fieldLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: '500',
  },
  required: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
  },
  multiline: {
    minHeight: 80,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  chip: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  chipActive: {
    backgroundColor: COLORS.accent + '22',
    borderColor: COLORS.accent,
  },
  chipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.background,
  },
  cancel: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  cancelText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
