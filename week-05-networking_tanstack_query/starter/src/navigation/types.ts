// src/navigation/types.ts
// Tipos de parámetros — Clínica de Fertilidad

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string | number; name: string };
  Create: undefined;
};
