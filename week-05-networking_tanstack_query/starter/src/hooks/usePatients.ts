// src/hooks/usePatients.ts
// Hooks para gestionar pacientes con TanStack Query
// Clínica de Fertilidad

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { SPANISH_PATIENTS } from '../data/patientData';
import type { CreatePatientPayload, Patient } from '../types';

export const PATIENTS_QUERY_KEY = ['patients'] as const;

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: async () => {
      await apiClient.get('/posts?_limit=1');
      return SPANISH_PATIENTS.map((p, i) => ({ id: i + 1, ...p }));
    },
  });
}

export function usePatientById(id: string | number) {
  return useQuery<Patient>({
    queryKey: [...PATIENTS_QUERY_KEY, id],
    queryFn: async () => {
      await apiClient.get(`/posts/${id}`);
      const index = Number(id) - 1;
      const p = SPANISH_PATIENTS[index];
      if (!p) throw new Error('Paciente no encontrado');
      return { id: Number(id), ...p };
    },
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, CreatePatientPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<{ id: number }>('/posts', {
        title: payload.diagnosis,
        body: payload.description,
        userId: 1,
      });
      return { id: data.id, ...payload };
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
