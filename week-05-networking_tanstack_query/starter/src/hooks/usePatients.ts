// src/hooks/usePatients.ts
// Hooks para gestionar pacientes con TanStack Query
// Clínica de Fertilidad

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreatePatientPayload, Patient } from '../types';

export const PATIENTS_QUERY_KEY = ['patients'] as const;

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Patient[]>('/posts?_limit=15');
      return data;
    },
  });
}

export function usePatientById(id: string | number) {
  return useQuery<Patient>({
    queryKey: [...PATIENTS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Patient>(`/posts/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, CreatePatientPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Patient>('/posts', payload);
      return data;
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
  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}
