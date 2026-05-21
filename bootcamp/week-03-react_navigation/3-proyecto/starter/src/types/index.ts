// src/types/index.ts
// Define los tipos de datos del dominio.

// ============================================
// TIPOS DE APOYO
// ============================================

export type ShipmentStatus =
  | 'pending'
  | 'in_transit'
  | 'customs_review'
  | 'cleared'
  | 'delivered';
 
export type CustomsStatus =
  | 'not_submitted'
  | 'under_review'
  | 'approved'
  | 'rejected';
export interface Item {
  id: string;
  name: string;
  description: string;
 
  // Logística
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedArrival: string;
  trackingNumber: string;
  weightKg: number;
 
  // Valor comercial
  totalValue: number;
  currency: 'USD' | 'EUR' | 'CNY';
 
  // Proveedor
  supplierName: string;
  supplierCountry: string;
 
  // Aduana
  customsStatus: CustomsStatus;
  customsDeclarationNumber: string;
  estimatedDuty: number;
}