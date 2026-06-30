// src/screens/EditScreen.tsx
// Formulario para editar un paciente existente con React Hook Form + Zod

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { patientSchema, type PatientFormData } from '../schemas/patientSchema';
import { usePatientById, useUpdatePatient } from '../hooks/usePatients';
import { FormField } from '../components/FormField';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const { data: patient, isLoading } = usePatientById(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      age: undefined,
      diagnosis: '',
      description: '',
      treatmentType: 'IVF',
      cycleStatus: 'Activo',
      assignedDoctor: 'Dra. María Andrade',
      cycleNumber: 1,
      startDate: '',
      nextAppointment: '',
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name,
        age: patient.age,
        diagnosis: patient.diagnosis,
        description: patient.description,
        treatmentType: patient.treatmentType as 'IVF',
        cycleStatus: patient.cycleStatus as 'Activo',
        assignedDoctor: patient.assignedDoctor as 'Dra. María Andrade',
        cycleNumber: patient.cycleNumber,
        startDate: patient.startDate,
        nextAppointment: patient.nextAppointment,
      });
    }
  }, [patient, reset]);

  const { mutate: updatePatient, isPending } = useUpdatePatient();

  function onSubmit(data: PatientFormData): void {
    updatePatient(
      {
        id: Number(id),
        name: data.name,
        age: data.age,
        diagnosis: data.diagnosis,
        description: data.description ?? '',
        treatmentType: data.treatmentType,
        cycleStatus: data.cycleStatus,
        assignedDoctor: data.assignedDoctor,
        cycleNumber: data.cycleNumber,
        startDate: data.startDate,
        nextAppointment: data.nextAppointment ?? '',
      },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending && isDirty;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando paciente...</Text>
      </View>
    );
  }

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
        <Text style={styles.sectionLabel}>Editar paciente</Text>

        <FormField
          control={control}
          name="name"
          label="Nombre completo *"
          placeholder="Nombre del paciente..."
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="age"
          label="Edad *"
          placeholder="Edad..."
          keyboardType="numeric"
          returnKeyType="next"
          errorMessage={errors.age?.message}
        />

        <FormField
          control={control}
          name="diagnosis"
          label="Diagnóstico *"
          placeholder="Diagnóstico..."
          returnKeyType="next"
          errorMessage={errors.diagnosis?.message}
        />

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción del caso..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          errorMessage={errors.description?.message}
        />

        <Text style={styles.sectionLabel}>Tratamiento</Text>

        <FormField
          control={control}
          name="treatmentType"
          label="Tipo de tratamiento *"
          placeholder="IVF, IUI, FET, ICSI, Ovodonación..."
          errorMessage={errors.treatmentType?.message}
        />

        <FormField
          control={control}
          name="cycleStatus"
          label="Estado del ciclo *"
          placeholder="Activo, En espera, Completado, Cancelado"
          errorMessage={errors.cycleStatus?.message}
        />

        <FormField
          control={control}
          name="assignedDoctor"
          label="Médico asignado *"
          placeholder="Dra. María Andrade, Dr. Carlos Méndez..."
          errorMessage={errors.assignedDoctor?.message}
        />

        <FormField
          control={control}
          name="cycleNumber"
          label="Número de ciclo *"
          placeholder="1"
          keyboardType="numeric"
          errorMessage={errors.cycleNumber?.message}
        />

        <FormField
          control={control}
          name="startDate"
          label="Fecha de inicio *"
          placeholder="2025-06-30"
          errorMessage={errors.startDate?.message}
        />

        <FormField
          control={control}
          name="nextAppointment"
          label="Próxima cita"
          placeholder="2025-07-15"
          errorMessage={errors.nextAppointment?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Guardar cambios</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  loadingText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
