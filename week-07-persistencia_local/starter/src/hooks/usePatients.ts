// src/hooks/usePatients.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline.
// Implementación completa — Clínica de Fertilidad

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPatients, createPatient, updatePatient } from '../services/api';
import type { Patient, PatientsWithSource } from '../types';

// ─── Query keys ──────────────────────────────────────────────────────────────
const PATIENTS_QUERY_KEY = ['patients'] as const;

// ─── AsyncStorage key para caché offline ────────────────────────────────────
const CACHE_KEY = '@clinica_fertilidad_patients_cache';

// ─── usePatients — lista con caché offline ──────────────────────────────────
export function usePatients() {
  return useQuery<PatientsWithSource>({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: async (): Promise<PatientsWithSource> => {
      try {
        const data = await fetchPatients();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { patients: data, source: 'network' };
      } catch {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { patients: JSON.parse(cached) as Patient[], source: 'cache' };
        }
        throw new Error('Sin red y sin caché disponible');
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useCreatePatient ────────────────────────────────────────────────────────
export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Patient, 'id'>) => createPatient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}

// ─── useUpdatePatient ────────────────────────────────────────────────────────
export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Patient, 'id'>>) =>
      updatePatient(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PATIENTS_QUERY_KEY, variables.id] });
    },
  });
}
