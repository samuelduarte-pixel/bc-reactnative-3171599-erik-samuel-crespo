import { Item } from '../types';

// ============================================
// MOCK DATA — Semana 03
// Clínica de Fertilidad — Fertility Care Center
// 12 items: 3 patients, 3 treatments, 3 doctors, 3 cycles
// ============================================

export const ITEMS: Item[] = [
  // ─── PATIENTS ────────────────────────────
  {
    id: 'p1',
    name: 'Laura Martínez Gómez',
    description: 'Paciente en seguimiento de tratamiento FIV',
    type: 'patient',
    status: 'active',
    age: 34,
    patientId: 'FC-2024-001',
  },
  {
    id: 'p2',
    name: 'Camila Torres Reyes',
    description: 'Paciente en espera de resultado de transferencia',
    type: 'patient',
    status: 'pending',
    age: 29,
    patientId: 'FC-2024-002',
  },
  {
    id: 'p3',
    name: 'Valentina Herrera Silva',
    description: 'Tratamiento completado con éxito. Embarazo confirmado.',
    type: 'patient',
    status: 'completed',
    age: 37,
    patientId: 'FC-2023-089',
  },

  // ─── TREATMENTS ──────────────────────────
  {
    id: 't1',
    name: 'Fertilización In Vitro (FIV)',
    description: 'Procedimiento de reproducción asistida de alta complejidad',
    type: 'treatment',
    status: 'active',
    cost: 18500000,
    durationWeeks: 6,
    category: 'IVF',
  },
  {
    id: 't2',
    name: 'Inseminación Intrauterina (IUI)',
    description: 'Tratamiento de baja complejidad para parejas con infertilidad leve',
    type: 'treatment',
    status: 'active',
    cost: 4200000,
    durationWeeks: 3,
    category: 'IUI',
  },
  {
    id: 't3',
    name: 'Estimulación Ovárica Controlada',
    description: 'Terapia hormonal para estimular la producción de óvulos',
    type: 'treatment',
    status: 'active',
    cost: 2800000,
    durationWeeks: 2,
    category: 'hormonal',
  },

  // ─── DOCTORS ─────────────────────────────
  {
    id: 'd1',
    name: 'Dra. Andrea Ospina Vargas',
    description: 'Jefa del departamento de reproducción asistida',
    type: 'doctor',
    status: 'active',
    specialty: 'reproductive endocrinology',
    yearsExperience: 15,
    licenseNumber: 'RM-045872',
  },
  {
    id: 'd2',
    name: 'Dr. Carlos Mendoza Ríos',
    description: 'Especialista en embriología clínica y laboratorio FIV',
    type: 'doctor',
    status: 'active',
    specialty: 'embryology',
    yearsExperience: 12,
    licenseNumber: 'RM-038291',
  },
  {
    id: 'd3',
    name: 'Dra. Patricia Lozano Castro',
    description: 'Ginecóloga especializada en infertilidad femenina',
    type: 'doctor',
    status: 'active',
    specialty: 'gynecology',
    yearsExperience: 10,
    licenseNumber: 'RM-051634',
  },

  // ─── CYCLES ──────────────────────────────
  {
    id: 'c1',
    name: 'Ciclo FIV #12 — Martínez',
    description: 'Ciclo de estimulación ovárica en progreso',
    type: 'cycle',
    status: 'active',
    startDate: '2025-04-10',
    stage: 'stimulation',
    patientName: 'Laura Martínez Gómez',
  },
  {
    id: 'c2',
    name: 'Ciclo IUI #07 — Torres',
    description: 'Transferencia realizada, en período de espera',
    type: 'cycle',
    status: 'pending',
    startDate: '2025-03-28',
    stage: 'waiting',
    patientName: 'Camila Torres Reyes',
  },
  {
    id: 'c3',
    name: 'Ciclo FIV #09 — Herrera',
    description: 'Ciclo completado con embarazo positivo confirmado',
    type: 'cycle',
    status: 'completed',
    startDate: '2025-02-15',
    stage: 'completed',
    patientName: 'Valentina Herrera Silva',
  },
];