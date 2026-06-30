# Proyecto Semana 04 — Estado Global con Zustand

## 🎯 Objetivo

Construir una app con **navegación Tab + Stack** y **estado global Zustand** aplicado al dominio de una **Empresa de Importación**.

---

## 📋 Dominio: Empresa de Importación

Sistema para gestionar el proceso de importación de productos desde diferentes proveedores internacionales.

### Entidades

| Entidad | Descripción |
|---|---|
| **Suppliers** | Proveedores internacionales (TechSource China, AutoParts GmbH, etc.) |
| **Products** | Catálogo de productos importables con código HS, precio, peso, país de origen |
| **Shipments** | Envíos/embarques que el usuario arma con productos seleccionados |
| **Customs** | Trámites aduaneros con estados (pending, in_review, cleared, held) |

### Mapas del Proyecto

| Pestaña (Tab) | Stack | Store Zustand | Contenido |
|---|---|---|---|
| **Productos** | Lista → Detalle | `useShipmentStore` | Catálogo de productos importados |
| **Envíos** | — | `useShipmentStore` | Envíos activos con seguimiento |

### Funcionalidad por Pantalla

| Pantalla | Función |
|---|---|
| `ProductList` | Catálogo con nombre, proveedor, país de origen, precio y código HS |
| `ProductDetail` | Info completa del producto + botón "Agregar a envío" con cantidad |
| `ShipmentsScreen` | Lista de envíos con estado (pendiente → en tránsito → aduana → entregado) |

---

## 🗂️ Estructura del Proyecto

```
starter/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx    ← Tab (Products + Shipments) + Stack anidado
    │   └── types.ts             ← RootTabParamList, ProductsStackParamList
    ├── screens/
    │   ├── HomeScreen.tsx       ← catálogo de productos
    │   ├── DetailScreen.tsx     ← detalle de producto + botón "Agregar a envío"
    │   └── ShipmentsScreen.tsx  ← lista de envíos con seguimiento de estado
    ├── stores/
    │   └── shipmentStore.ts     ← store de envíos (Zustand)
    ├── data/
    │   └── mockData.ts          ← Productos y proveedores mock
    ├── types/
    │   └── index.ts             ← Product, Supplier, Shipment, CustomsRecord
    └── theme/
        └── index.ts
```

---

## ✅ Requisitos Funcionales

1. **Tab Navigator** con dos pestañas: `Productos` y `Envíos`
2. **Stack anidado en Productos**: lista → detalle con params tipados
3. **Store Zustand de envíos**: métodos para agregar, eliminar, limpiar y actualizar estado
4. **Badge en tab "Envíos"** con conteo en tiempo real desde el store (sin prop drilling)
5. **Detalle** muestra botón "Agregar a envío" / "En envío" que lee y escribe el store

### Requisitos de Código

- Creado con `create<Interface>()` sin `any`
- Selectores específicos (no `useStore()` sin selector)
- Mínimo 2 acciones en el store de envíos
- TypeScript sin errores de compilación

---

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

---

## 🛠️ Entregables

1. App con Tab + Stack funcional y estado Zustand compartido entre pestañas
2. Badge en el tab bar actualizado en tiempo real
3. TypeScript sin errores, sin `any`
4. Código y datos adaptados al dominio de importación
5. Capturas de pantalla de Products, Detail y Shipments screens

---

## 📊 Criterios de Evaluación

Ver [rubrica-evaluacion.md](../../rubrica-evaluacion.md) — sección **Producto 📦 (30%)**
