// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Define aquí la interfaz del elemento de tu dominio asignado.
// Este type se usará en mockData.ts, ItemCard.tsx y HomeScreen.tsx
// ============================================================

// Interfaz principal para un proveedor de la empresa importadora
export interface Supplier {
  id: string;           
  name: string;         
  imageUri: string;     
  subtitle: string;     
  products: string;     
  shipmentStatus: string; 
}