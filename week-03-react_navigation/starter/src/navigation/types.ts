// src/navigation/types.ts

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
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