// src/stores/shipmentStore.ts
// Store Zustand para gestionar los envíos (shipments) de productos importados.
// El usuario puede agregar productos a un envío, eliminarlos y consultar
// el estado de cada envío.

import { create } from 'zustand';
import type { Shipment } from '../types';

// ============================================================
// INTERFAZ DEL STORE
// ============================================================
interface ShipmentStore {
  // Lista de envíos registrados
  shipments: Shipment[];

  // Agrega un producto como nuevo envío
  addShipment: (productId: string, productName: string, quantity: number, estimatedArrival: string) => void;

  // Elimina un envío por ID
  removeShipment: (id: string) => void;

  // Vacía todos los envíos
  clearAll: () => void;

  // Actualiza el estado de un envío (pending → in_transit → customs_clearance → delivered)
  updateShipmentStatus: (id: string, status: Shipment['status']) => void;

  // Helper: devuelve true si el producto ya está en algún envío pendiente
  isProductInShipment: (productId: string) => boolean;
}

// ============================================================
// CREAR EL STORE
// ============================================================
export const useShipmentStore = create<ShipmentStore>((set, get) => ({
  shipments: [],

  addShipment: (productId, productName, quantity, estimatedArrival) => {
    // Verifica que el producto no esté ya en un envío pendiente
    const alreadyAdded = get().shipments.some(
      (s) => s.productId === productId && s.status !== 'delivered'
    );
    if (alreadyAdded) return;

    const newShipment: Shipment = {
      id: `ship-${Date.now()}`,
      productId,
      productName,
      quantity,
      status: 'pending',
      addedAt: Date.now(),
      estimatedArrival,
    };

    set((state) => ({
      shipments: [...state.shipments, newShipment],
    }));
  },

  removeShipment: (id) => {
    set((state) => ({
      shipments: state.shipments.filter((s) => s.id !== id),
    }));
  },

  clearAll: () => {
    set({ shipments: [] });
  },

  updateShipmentStatus: (id, status) => {
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === id ? { ...s, status } : s
      ),
    }));
  },

  isProductInShipment: (productId) => {
    return get().shipments.some(
      (s) => s.productId === productId && s.status !== 'delivered'
    );
  },
}));
