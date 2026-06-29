// src/navigation/types.ts
// Tipos de parámetros — Clínica de Fertilidad

export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    age: number;
    diagnosis: string;
    treatmentType: string;
    cycleStatus: string;
    assignedDoctor: string;
    startDate: string;
    nextAppointment: string;
    cycleNumber: number;
    description: string;
  };
};
