// src/navigation/types.ts
// Tipado del stack de navegación — Dominio: Empresa de Importación

export type RootStackParamList = {
  Home:   undefined;
  Create: undefined;
  Edit:   { id: number; name: string };
};
