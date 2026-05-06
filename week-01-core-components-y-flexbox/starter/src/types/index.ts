export interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
  consultorio: string;
  añosExperiencia: number;
  disponibilidad: 'Disponible' | 'Ocupado' | 'Vacaciones';
  imageUri: string;
  subtitle: string;
}