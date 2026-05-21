// src/navigation/types.ts

import type { ShipmentStatus, CustomsStatus } from '../types';

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    origin: string;
    destination: string;
    status: ShipmentStatus;
    estimatedArrival: string;
    totalValue: number;
    currency: 'USD' | 'EUR' | 'CNY';
    trackingNumber: string;
    weightKg: number;
    supplierName: string;
    supplierCountry: string;
    customsStatus: CustomsStatus;
    customsDeclarationNumber: string;
    estimatedDuty: number;
  };
};
