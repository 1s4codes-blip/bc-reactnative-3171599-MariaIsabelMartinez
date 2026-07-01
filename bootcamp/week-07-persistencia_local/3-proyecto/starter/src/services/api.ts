// src/services/api.ts
// Cliente Axios contra JSONPlaceholder — mapea respuesta al dominio de importación.

import axios from 'axios';
import type { Product, ShipmentStatus } from '../types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// Datos determinísticos generados a partir del id del post
const COUNTRIES = [
  'China', 'Alemania', 'Japón', 'EE.UU.', 'Brasil',
  'India', 'Corea del Sur', 'Italia', 'México', 'Vietnam',
];

const SUPPLIERS = [
  'Global Imports Ltd', 'EastWest Trading Co', 'Pacific Logistics',
  'Atlantic Shipping', 'Nordic Trade Group', 'AsiaLink Corp',
  'EuroCargo SA', 'AmeriTrade Inc', 'AfroGlobal Exports', 'Oceania Distributors',
];

const CATEGORIES = [
  'Electrónica', 'Textiles', 'Maquinaria', 'Alimentos',
  'Autopartes', 'Productos Químicos', 'Muebles', 'Juguetes',
  'Calzado', 'Equipo Médico',
];

const STATUSES: ShipmentStatus[] = [
  'pending', 'customs', 'transit', 'delivered',
];

const PRICES = [
  1499.99, 249.50, 8999.00, 59.99, 12000.00,
  325.75, 4500.00, 189.99, 6700.50, 99.99,
  2340.00, 799.99, 15000.00, 44.99, 3200.00,
];

function mapPostToProduct(post: { id: number; title: string; body: string; userId: number }): Product {
  const index = post.id % 10;
  return {
    id: post.id,
    name: post.title,
    description: post.body,
    originCountry: COUNTRIES[index],
    supplierName: SUPPLIERS[index],
    category: CATEGORIES[index],
    price: PRICES[post.id % PRICES.length],
    shipmentStatus: STATUSES[post.id % STATUSES.length],
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get('/posts', { params: { _limit: 15 } });
  return data.map(mapPostToProduct);
}

export async function fetchProductById(id: number | string): Promise<Product> {
  const { data } = await api.get(`/posts/${id}`);
  return mapPostToProduct(data);
}

export async function createProduct(
  payload: Omit<Product, 'id' | 'shipmentStatus'>,
): Promise<Product> {
  const { data } = await api.post('/posts', payload);
  return {
    ...mapPostToProduct({ ...data, title: payload.name, body: payload.description ?? '', userId: 1 }),
    name: payload.name,
    description: payload.description ?? '',
    originCountry: payload.originCountry,
    supplierName: payload.supplierName,
    category: payload.category,
    price: payload.price,
  };
}

export async function updateProduct(
  id: number | string,
  payload: Partial<Omit<Product, 'id'>>,
): Promise<Product> {
  const { data } = await api.put(`/posts/${id}`, payload);
  return mapPostToProduct(data);
}
