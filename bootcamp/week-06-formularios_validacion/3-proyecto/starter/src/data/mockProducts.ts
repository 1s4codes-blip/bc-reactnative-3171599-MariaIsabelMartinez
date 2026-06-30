// src/data/mockProducts.ts
// Datos mock en español para el dominio: Empresa de Importación.
// Cada producto tiene nombre, descripción, precio y país de origen.

import type { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Sensor IoT 3000',
    description: 'Sensor industrial para monitoreo remoto de temperatura y humedad',
    price: 45.50,
    originCountry: 'China',
  },
  {
    id: 2,
    name: 'Batería de Litio 12V 100Ah',
    description: 'Batería recargable para sistemas solares y vehículos eléctricos',
    price: 280.00,
    originCountry: 'China',
  },
  {
    id: 3,
    name: 'Panel Solar 450W',
    description: 'Panel fotovoltaico monocristalino de alta eficiencia',
    price: 320.00,
    originCountry: 'China',
  },
  {
    id: 4,
    name: 'Turbo Compresor A45',
    description: 'Turbo compresor para motores diésel de maquinaria pesada',
    price: 1250.00,
    originCountry: 'Alemania',
  },
  {
    id: 5,
    name: 'Filtro de Aceite HF-7000',
    description: 'Filtro de alta presión para motores industriales',
    price: 38.75,
    originCountry: 'Alemania',
  },
  {
    id: 6,
    name: 'Café Arábica Premium',
    description: 'Café gourmet en grano, cosecha seleccionada de Minas Gerais',
    price: 18.90,
    originCountry: 'Brasil',
  },
  {
    id: 7,
    name: 'Jugo de Açaí Natural',
    description: 'Pulpa de açaí orgánico congelado para exportación',
    price: 12.50,
    originCountry: 'Brasil',
  },
  {
    id: 8,
    name: 'Tejido Algodón Orgánico',
    description: 'Rollo de tela de algodón orgánico certificado, 100m x 1.5m',
    price: 220.00,
    originCountry: 'India',
  },
];

// Almacenamiento mutable para simular persistencia en memoria
let nextId = 9;
let products = [...MOCK_PRODUCTS];

// Simula latencia de red
function delay(ms = 400): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchProducts(): Promise<Product[]> {
  await delay();
  return [...products];
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  await delay(200);
  return products.find(p => p.id === id);
}

export async function createProduct(payload: Omit<Product, 'id'>): Promise<Product> {
  await delay(300);
  const newProduct: Product = { id: nextId++, ...payload };
  products = [newProduct, ...products];
  return newProduct;
}

export async function updateProduct(payload: Product): Promise<Product> {
  await delay(300);
  products = products.map(p => (p.id === payload.id ? payload : p));
  return payload;
}
