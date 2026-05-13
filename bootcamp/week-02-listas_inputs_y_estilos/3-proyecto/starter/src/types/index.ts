// ============================================
// TYPES — Semana 02
// Import domain: Import Company
// ============================================

export type ShipmentStatus = 'in_transit' | 'delivered' | 'pending' | 'delayed';
export type CustomsStatus = 'cleared' | 'in_review' | 'hold';

export interface Item {
  id: string;
  name: string;
  supplier: string; 
  origin: string; 
  category: 'electronics' | 'textiles' | 'machinery' | 'food' | 'chemicals';
  unitPrice: number; 
  quantity: number;
  shipmentStatus: ShipmentStatus;
  customsStatus: CustomsStatus;
  arrivalDate: string; 
}
