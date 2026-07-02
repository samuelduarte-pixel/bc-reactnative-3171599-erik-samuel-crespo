// src/types/index.ts
// Tipos del dominio: Clínica de Fertilidad — Persistencia Local

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

export interface CreatePatientPayload {
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

export interface UpdatePatientPayload {
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

export interface PatientsWithSource {
  patients: Patient[];
  source: 'network' | 'cache';
}
