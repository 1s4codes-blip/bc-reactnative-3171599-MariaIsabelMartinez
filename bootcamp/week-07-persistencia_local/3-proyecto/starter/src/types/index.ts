// src/types/index.ts
// Tipos del dominio: Empresa de Importación (suppliers, products, shipments, customs)

export type ShipmentStatus = 'pending' | 'customs' | 'transit' | 'delivered';

export interface Supplier {
  id: number;
  name: string;
  country: string;
  contactEmail: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  originCountry: string;
  supplierName: string;
  category: string;
  price: number;
  shipmentStatus: ShipmentStatus;
}

export interface ProductsWithSource {
  products: Product[];
  source: 'network' | 'cache';
}

export type SortBy = 'name' | 'price' | 'origin' | 'status';
