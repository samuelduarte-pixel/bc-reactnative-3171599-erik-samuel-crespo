// src/types/index.ts
// Tipos del dominio: Clínica de Fertilidad

export type TreatmentType =
  | 'IVF'
  | 'IUI'
  | 'FET'
  | 'ICSI'
  | 'Ovodonación'
  | 'Estimulación ovárica';

export type CycleStatus =
  | 'Activo'
  | 'En espera'
  | 'Completado'
  | 'Cancelado';

export interface Patient {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
  description: string;
  treatmentType: TreatmentType;
  cycleStatus: CycleStatus;
  assignedDoctor: string;
  cycleNumber: number;
  startDate: string;
  nextAppointment: string;
}

export type CreatePatientPayload = Omit<Patient, 'id'>;

export interface RawUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string; catchPhrase: string };
}

export interface RawPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}
