// src/types/index.ts
// Interfaces del dominio: Empresa de importación
// Entidades: products, suppliers, shipments, customs

// ============================================================
// MODELO PRINCIPAL — Product (producto importado)
// ============================================================
// Representa un producto en el catálogo de importación.
// Vinculado a un proveedor (supplier), con estado en aduana (customs).

export interface Product {
  id: string | number;
  name: string;
  supplier: string;
  originCountry: string;
  price: number;
  stock: number;
  customsStatus: 'pending' | 'in_customs' | 'cleared' | 'in_transit' | 'delivered';
  description?: string;
}

// ============================================================
// PAYLOAD DE CREACIÓN
// ============================================================
// Lo que se envía en el POST para crear un nuevo producto.
// El servidor asigna el id.

export type CreateProductPayload = Omit<Product, 'id'>;

// ============================================================
// MAPA DE ESTADOS DE ADUANA — etiquetas en español para la UI
// ============================================================

export const CUSTOMS_STATUS_LABELS: Record<Product['customsStatus'], string> = {
  pending: 'Pendiente',
  in_customs: 'En Aduana',
  cleared: 'Liberado',
  in_transit: 'En Tránsito',
  delivered: 'Entregado',
};
