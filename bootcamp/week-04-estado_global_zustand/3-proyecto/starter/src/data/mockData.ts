// src/data/mockData.ts
// Datos de ejemplo para el dominio: Empresa de Importación.
// Productos importados de diferentes proveedores y países.

import type { Product, Supplier } from '../types';

// ============================================================
// LISTA DE PROVEEDORES
// ============================================================
export const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'TechSource China', country: 'China', rating: 4, productsCount: 3 },
  { id: 's2', name: 'AutoParts GmbH', country: 'Alemania', rating: 5, productsCount: 2 },
  { id: 's3', name: 'FoodExport Brasil', country: 'Brasil', rating: 3, productsCount: 2 },
  { id: 's4', name: 'Textile India Ltd', country: 'India', rating: 4, productsCount: 1 },
];

// ============================================================
// LISTA DE PRODUCTOS IMPORTADOS
// ============================================================
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sensor IoT 3000',
    description: 'Sensor industrial para monitoreo remoto de temperatura y humedad. Ideal para smart buildings.',
    category: 'Electrónica',
    price: 45.50,
    weight: 0.3,
    originCountry: 'China',
    hsCode: '8542.31.00',
    supplier: 'TechSource China',
    supplierRating: 4,
  },
  {
    id: 'p2',
    name: 'Batería de Litio 12V 100Ah',
    description: 'Batería recargable de litio para sistemas solares y vehículos eléctricos.',
    category: 'Electrónica',
    price: 280.00,
    weight: 12.5,
    originCountry: 'China',
    hsCode: '8507.60.00',
    supplier: 'TechSource China',
    supplierRating: 4,
  },
  {
    id: 'p3',
    name: 'Panel Solar 450W',
    description: 'Panel fotovoltaico monocristalino de alta eficiencia para instalaciones comerciales.',
    category: 'Energía',
    price: 320.00,
    weight: 22.0,
    originCountry: 'China',
    hsCode: '8541.43.00',
    supplier: 'TechSource China',
    supplierRating: 4,
  },
  {
    id: 'p4',
    name: 'Turbo Compresor A45',
    description: 'Turbo compresor para motores diésel de maquinaria pesada.',
    category: 'Autopartes',
    price: 1250.00,
    weight: 15.0,
    originCountry: 'Alemania',
    hsCode: '8414.80.00',
    supplier: 'AutoParts GmbH',
    supplierRating: 5,
  },
  {
    id: 'p5',
    name: 'Filtro de Aceite HF-7000',
    description: 'Filtro de alta presión para motores industriales. Certificación ISO 9001.',
    category: 'Autopartes',
    price: 38.75,
    weight: 0.8,
    originCountry: 'Alemania',
    hsCode: '8421.23.00',
    supplier: 'AutoParts GmbH',
    supplierRating: 5,
  },
  {
    id: 'p6',
    name: 'Café Arábica Premium',
    description: 'Café gourmet en grano, cosecha seleccionada de Minas Gerais.',
    category: 'Alimentos',
    price: 18.90,
    weight: 5.0,
    originCountry: 'Brasil',
    hsCode: '0901.11.00',
    supplier: 'FoodExport Brasil',
    supplierRating: 3,
  },
  {
    id: 'p7',
    name: 'Jugo de Açaí Natural',
    description: 'Pulpa de açaí orgánico congelado, ideal para exportación.',
    category: 'Alimentos',
    price: 12.50,
    weight: 10.0,
    originCountry: 'Brasil',
    hsCode: '2009.89.00',
    supplier: 'FoodExport Brasil',
    supplierRating: 3,
  },
  {
    id: 'p8',
    name: 'Tejido Algodón Orgánico',
    description: 'Rollo de tela de algodón orgánico certificado. 100m x 1.5m.',
    category: 'Textiles',
    price: 220.00,
    weight: 25.0,
    originCountry: 'India',
    hsCode: '5208.11.00',
    supplier: 'Textile India Ltd',
    supplierRating: 4,
  },
];

// Helper: obtener producto por ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// Helper: obtener productos por proveedor
export function getProductsBySupplier(supplierName: string): Product[] {
  return PRODUCTS.filter((p) => p.supplier === supplierName);
}
