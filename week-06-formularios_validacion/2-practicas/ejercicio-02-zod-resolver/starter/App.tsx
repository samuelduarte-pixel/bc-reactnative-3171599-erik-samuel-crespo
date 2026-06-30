// App.tsx — Ejercicio 02: Validación Zod + zodResolver
// Formulario de paciente con validación completa y errores inline

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const patientSchema = z.object({
  name: z.string().min(2, 'Mín. 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.coerce.number().int('Debe ser entero').min(18, 'Edad mínima: 18'),
});

type PatientFormData = z.infer<typeof patientSchema>;

export default function App(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: { name: '', email: '', age: 18 },
  });

  async function onSubmit(data: PatientFormData): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    console.log('Paciente registrado:', data);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Registro de Paciente</Text>
        <Text style={styles.subtitle}>Ejercicio 02 — Validación con Zod</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Nombre completo"
                placeholderTextColor="#6B7280"
                returnKeyType="next"
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="tu@email.com"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Edad</Text>
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.age && styles.inputError]}
                value={String(value)}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="18"
                placeholderTextColor="#6B7280"
                keyboardType="number-pad"
              />
            )}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
        </View>

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? <ActivityIndicator size="small" color="#0d1117" />
            : <Text style={styles.buttonText}>Registrar paciente</Text>
          }
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0d1117' },
  container: { flex: 1 },
  content: { padding: 24, gap: 16, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: '700', color: '#e6edf3' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: -8 },
  field: { gap: 4 },
  label: { fontSize: 13, fontWeight: '600', color: '#D1D5DB' },
  input: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#e6edf3',
  },
  inputError: { borderColor: '#f85149' },
  errorText: { fontSize: 12, color: '#f85149', marginTop: 2 },
  button: {
    backgroundColor: '#61DAFB',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { fontSize: 15, fontWeight: '700', color: '#0d1117' },
});
