// src/types/index.ts
// Define los tipos de datos del dominio.
// Adapta la interfaz Item a tu dominio asignado.

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO — Clínica de Fertilidad
// ============================================

export interface Item {
  id: string;
  name: string;
  description: string;
  age: number;
  diagnosis: string;
  treatmentType: string;
  cycleStatus: string;
  assignedDoctor: string;
  startDate: string;
  nextAppointment: string;
  cycleNumber: number;
}
