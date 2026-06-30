// src/types/index.ts
// Tipos del dominio: Empresa de Importación (productos, proveedores, envíos, aduanas)

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originCountry: string;
}

// Payload para crear un producto nuevo (sin id — lo asigna el servidor)
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  originCountry: string;
}

// Payload para actualizar un producto (id requerido + campos editables)
export interface UpdateProductPayload {
  id: number;
  name: string;
  description: string;
  price: number;
  originCountry: string;
}
