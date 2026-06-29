// src/types/index.ts
// Interface principal — Clínica de Fertilidad

export type TreatmentType = 'IVF' | 'IUI' | 'FET' | 'ICSI' | 'Ovodonación' | 'Estimulación ovárica';
export type CycleStatus = 'Activo' | 'En espera' | 'Completado' | 'Cancelado';

export interface Item {
  id: string;
  name: string;
  description: string;
  age: number;
  diagnosis: string;
  treatmentType: TreatmentType;
  cycleStatus: CycleStatus;
  assignedDoctor: string;
  startDate: string;
  nextAppointment: string;
  cycleNumber: number;
}
