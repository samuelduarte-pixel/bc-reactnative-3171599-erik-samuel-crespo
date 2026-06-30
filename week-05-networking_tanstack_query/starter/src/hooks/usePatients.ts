// src/hooks/usePatients.ts
// Hooks para gestionar pacientes con TanStack Query
// Clínica de Fertilidad

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreatePatientPayload, Patient, RawPost, RawUser } from '../types';

export const PATIENTS_QUERY_KEY = ['patients'] as const;

const TREATMENTS: Patient['treatmentType'][] = [
  'IVF', 'IUI', 'FET', 'ICSI', 'Ovodonación', 'Estimulación ovárica',
];

const STATUSES: Patient['cycleStatus'][] = [
  'Activo', 'En espera', 'Completado', 'Cancelado',
];

const DOCTORS = [
  'Dra. María Andrade',
  'Dr. Carlos Méndez',
  'Dra. Lucía Vega',
  'Dr. Felipe Rojas',
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function mapToPatient(user: RawUser, post: RawPost): Patient {
  const s = seededRandom(user.id);
  return {
    id: user.id,
    name: user.name,
    age: 25 + Math.floor(s * 20),
    diagnosis: post.title,
    description: post.body,
    treatmentType: TREATMENTS[Math.floor(seededRandom(user.id + 1) * TREATMENTS.length)],
    cycleStatus: STATUSES[Math.floor(seededRandom(user.id + 2) * STATUSES.length)],
    assignedDoctor: DOCTORS[Math.floor(seededRandom(user.id + 3) * DOCTORS.length)],
    cycleNumber: 1 + Math.floor(seededRandom(user.id + 4) * 4),
    startDate: `2025-0${1 + Math.floor(s * 9)}-${10 + Math.floor(s * 18)}`,
    nextAppointment: `2025-0${3 + Math.floor(s * 7)}-${10 + Math.floor(s * 18)}`,
  };
}

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: async () => {
      const [usersRes, postsRes] = await Promise.all([
        apiClient.get<RawUser[]>('/users?_limit=15'),
        apiClient.get<RawPost[]>('/posts?_limit=15'),
      ]);
      return usersRes.data.map((user, i) =>
        mapToPatient(user, postsRes.data[i] ?? postsRes.data[0]),
      );
    },
  });
}

export function usePatientById(id: string | number) {
  return useQuery<Patient>({
    queryKey: [...PATIENTS_QUERY_KEY, id],
    queryFn: async () => {
      const numId = Number(id);
      const [userRes, postRes] = await Promise.all([
        apiClient.get<RawUser>(`/users/${numId}`),
        apiClient.get<RawPost>(`/posts/${numId}`),
      ]);
      return mapToPatient(userRes.data, postRes.data);
    },
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, CreatePatientPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<RawPost>('/posts', {
        title: payload.diagnosis,
        body: payload.description,
        userId: 1,
      });
      return {
        id: data.id,
        name: payload.name,
        age: payload.age,
        diagnosis: payload.diagnosis,
        description: payload.description,
        treatmentType: payload.treatmentType,
        cycleStatus: payload.cycleStatus,
        assignedDoctor: payload.assignedDoctor,
        cycleNumber: payload.cycleNumber,
        startDate: payload.startDate,
        nextAppointment: payload.nextAppointment,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error al crear paciente:', error.message);
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}
