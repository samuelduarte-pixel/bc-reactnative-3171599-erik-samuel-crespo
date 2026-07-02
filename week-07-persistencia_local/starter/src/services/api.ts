// src/services/api.ts
// Cliente Axios para la Clínica de Fertilidad

import axios from 'axios';
import type { Patient } from '../types';
import { SPANISH_PATIENTS } from '../data/patientData';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchPatients(): Promise<Patient[]> {
  await api.get('/posts?_limit=1');
  return SPANISH_PATIENTS.map((p, i) => ({ id: i + 1, ...p }));
}

export async function fetchPatientById(id: number | string): Promise<Patient> {
  await api.get(`/posts/${id}`);
  const index = Number(id) - 1;
  const p = SPANISH_PATIENTS[index];
  if (!p) throw new Error('Paciente no encontrado');
  return { id: Number(id), ...p };
}

export async function createPatient(
  payload: Omit<Patient, 'id'>,
): Promise<Patient> {
  const { data } = await api.post<{ id: number }>('/posts', {
    title: payload.diagnosis,
    body: payload.description,
    userId: 1,
  });
  return { id: data.id, ...payload };
}

export async function updatePatient(
  id: number | string,
  payload: Partial<Omit<Patient, 'id'>>,
): Promise<Patient> {
  await api.put(`/posts/${id}`, {
    title: payload.diagnosis,
    body: payload.description,
    userId: 1,
  });
  return { id: Number(id), ...payload } as Patient;
}
