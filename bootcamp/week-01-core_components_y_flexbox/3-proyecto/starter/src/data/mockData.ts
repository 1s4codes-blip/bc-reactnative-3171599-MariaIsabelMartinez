// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================
// Datos de ejemplo para el dominio: Empresa de Importación
// Cada item representa un proveedor con su información de envío
// ============================================================

import { Supplier } from '../types';

export const MOCK_ITEMS: Supplier[] = [
  {
    id: '1',
    name: 'Global Imports Ltd.',
    subtitle: 'China',
    imageUri: 'https://tse3.mm.bing.net/th/id/OIP.oVCOcPnfBME3yl0uGQH5AAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3',
    products: 'Electrónica, microchips',
    shipmentStatus: 'En tránsito',
  },
  {
    id: '2',
    name: 'Textiles World',
    subtitle: 'India',
    imageUri: 'https://tse2.mm.bing.net/th/id/OIP.Tz_Exac3kaooOCPJ3d17XgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    products: 'Telas, ropa',
    shipmentStatus: 'En aduana',
  },
  {
    id: '3',
    name: 'AutoParts Germany',
    subtitle: 'Alemania',
    imageUri: 'https://img.freepik.com/foto-gratis/composicion-diferentes-accesorios-coche_23-2149030439.jpg',
    products: 'Repuestos automotrices',
    shipmentStatus: 'Entregado',
  },
  {
    id: '4',
    name: 'AgroExport Colombia',
    subtitle: 'Colombia',
    imageUri: 'https://prcdn.freetls.fastly.net/release_image/50476/15/50476-15-26abdbbdd5397dfdc6a53c8787d29e64-800x534.jpg?format=jpeg&auto=webp&quality=85&width=1950&height=1350&fit=bounds',
    products: 'Café, soja',
    shipmentStatus: 'En tránsito',
  },
];