// src/types/index.ts
// Tipos del dominio: Clínica de Fertilidad

export type TreatmentType =
  | 'IVF'
  | 'IUI'
  | 'FET'
  | 'ICSI'
  | 'Ovodonacion'
  | 'Estimulacion ovarica';

export type CycleStatus =
  | 'Activo'
  | 'En espera'
  | 'Completado'
  | 'Cancelado';

export interface Patient {
  id: string | number;
  userId: number;
  name: string;
  body: string;
  title?: string;
  age?: number;
  diagnosis?: string;
  treatmentType?: TreatmentType;
  cycleStatus?: CycleStatus;
  assignedDoctor?: string;
  nextAppointment?: string;
}

export type CreatePatientPayload = Omit<Patient, 'id'>;
