// src/schemas/patientSchema.ts
// Schema Zod para formularios de paciente — Clínica de Fertilidad

import { z } from 'zod';

const TREATMENTS = ['IVF', 'IUI', 'FET', 'ICSI', 'Ovodonación', 'Estimulación ovárica'] as const;
const STATUSES = ['Activo', 'En espera', 'Completado', 'Cancelado'] as const;
const DOCTORS = ['Dra. María Andrade', 'Dr. Carlos Méndez', 'Dra. Lucía Vega', 'Dr. Felipe Rojas'] as const;

export const patientSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  age: z.coerce
    .number()
    .min(18, 'La edad mínima es 18 años')
    .max(60, 'La edad máxima es 60 años'),

  diagnosis: z
    .string()
    .min(1, 'El diagnóstico es requerido')
    .max(120, 'Máx. 120 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),

  treatmentType: z.enum(TREATMENTS, {
    errorMap: () => ({ message: 'Selecciona un tipo de tratamiento' }),
  }),

  cycleStatus: z.enum(STATUSES, {
    errorMap: () => ({ message: 'Selecciona el estado del ciclo' }),
  }),

  assignedDoctor: z.enum(DOCTORS, {
    errorMap: () => ({ message: 'Selecciona un médico' }),
  }),

  cycleNumber: z.coerce
    .number()
    .min(1, 'El ciclo debe ser mayor a 0')
    .max(10, 'Máx. 10 ciclos'),

  startDate: z.string().min(1, 'La fecha de inicio es requerida'),

  nextAppointment: z.string().optional().or(z.literal('')),
});

export type PatientFormData = z.infer<typeof patientSchema>;
