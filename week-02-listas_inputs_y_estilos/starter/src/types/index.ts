// ============================================
// TYPES — Semana 03
// Clínica de Fertilidad — Erik Samuel Crespo Duarte
// ============================================

export type ItemType = 'patient' | 'treatment' | 'doctor' | 'cycle';

export type PatientStatus = 'active' | 'completed' | 'pending' | 'cancelled';
export type TreatmentCategory = 'IVF' | 'IUI' | 'hormonal' | 'surgical' | 'consultation';
export type DoctorSpecialty = 'reproductive endocrinology' | 'embryology' | 'gynecology' | 'urology';
export type CycleStage = 'stimulation' | 'retrieval' | 'fertilization' | 'transfer' | 'waiting' | 'completed';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  status: PatientStatus;

  // Patient fields
  age?: number;
  patientId?: string;

  // Treatment fields
  cost?: number;
  durationWeeks?: number;
  category?: TreatmentCategory;

  // Doctor fields
  specialty?: DoctorSpecialty;
  yearsExperience?: number;
  licenseNumber?: string;

  // Cycle fields
  startDate?: string;
  stage?: CycleStage;
  patientName?: string;
}