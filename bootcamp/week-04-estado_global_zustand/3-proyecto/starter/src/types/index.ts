// src/types/index.ts
// Interfaz principal del dominio: Empresa de Importación
// Define productos, proveedores, envíos y aduanas.

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  weight: number;
  originCountry: string;
  hsCode: string;
  supplier: string;
  supplierRating: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  rating: number;
  productsCount: number;
}

export interface Shipment {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'in_transit' | 'customs_clearance' | 'delivered';
  addedAt: number;
  estimatedArrival: string;
}

export interface CustomsRecord {
  id: string;
  shipmentId: string;
  productName: string;
  status: 'pending' | 'in_review' | 'cleared' | 'held';
  notes: string;
  createdAt: number;
}
