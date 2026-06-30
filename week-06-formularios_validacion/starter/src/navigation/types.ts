// src/navigation/types.ts

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: { id: number | string; name: string };
};
