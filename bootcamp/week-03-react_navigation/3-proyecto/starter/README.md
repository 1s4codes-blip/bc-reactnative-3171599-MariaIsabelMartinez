# Proyecto Semana 03 — React Navigation 7

## 🎯 Dominio: Import Company

App móvil de gestión de envíos para una **empresa de importación**. Permite consultar el estado de shipments internacionales, ver el detalle logístico y de aduana de cada envío, y acceder a los envíos marcados como prioritarios.

---

## 🗂️ Estructura del Proyecto

```
starter/
├── App.tsx                         ← NavigationContainer raíz
├── index.js                        ← Entry point con registerRootComponent
├── app.json                        ← Configuración Expo
├── package.json                    ← Dependencias
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx       ← Tab + Stack anidado
    │   └── types.ts                ← RootTabParamList, HomeStackParamList
    ├── screens/
    │   ├── HomeScreen.tsx          ← Lista de shipments (FlatList)
    │   ├── DetailScreen.tsx        ← Detalle con params del Stack
    │   └── FavoritesScreen.tsx     ← Envíos prioritarios
    ├── data/
    │   └── mockData.ts             ← 8 shipments internacionales de prueba
    ├── types/
    │   └── index.ts                ← interface Item (Shipment)
    └── theme/
        └── index.ts                ← COLORS, TYPOGRAPHY, SPACING, RADIUS
```

---

## 📱 Pantallas

### Home — Lista de Shipments
Muestra todos los envíos activos con estado visual codificado por color, ruta origen → destino, proveedor y valor total.

### Detail — Detalle del Shipment
Muestra la información completa del envío seleccionado organizada en tres secciones: **Shipment Info**, **Supplier** y **Customs**.

### Priority — Envíos Prioritarios
Lista los envíos de mayor valor o prioridad operativa marcados con ★.

---

## 🖼️ Capturas de Pantalla

| Home | Priority | Detail |
|------|----------|--------|
| ![Home](../../0-assets/home.png) | ![Priority](../../0-assets/priority.png) | ![Detail](../../0-assets/detail.png) |

---

## ✅ Requisitos Implementados

- [x] **Tab Navigator** con dos pestañas: `Shipments` y `Priority`
- [x] **Stack anidado en Home**: navega de lista (`HomeList`) a detalle (`HomeDetail`)
- [x] **Params tipados**: 15 campos tipados en `HomeDetail` sin ningún `any`
- [x] **Iconos en Tab Bar** con `Ionicons` — `boat` y `star` con variante `outline`
- [x] **Tipado completo** con `RootTabParamList` y `HomeStackParamList`
- [x] **Título dinámico** en el header del detalle desde `route.params.name`
- [x] `tabBarActiveTintColor` con color `#61DAFB`

---

## 🧩 Adaptación al Dominio

### `interface Item` — campos del dominio

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Identificador del envío (ej. SHP-001) |
| `name` | `string` | Nombre descriptivo del batch |
| `origin` | `string` | Ciudad y país de origen |
| `destination` | `string` | Ciudad y país de destino |
| `status` | `ShipmentStatus` | Estado logístico del envío |
| `estimatedArrival` | `string` | Fecha estimada de llegada |
| `totalValue` | `number` | Valor comercial total |
| `currency` | `'USD' \| 'EUR' \| 'CNY'` | Divisa del envío |
| `trackingNumber` | `string` | Número de rastreo |
| `weightKg` | `number` | Peso en kilogramos |
| `supplierName` | `string` | Nombre del proveedor |
| `supplierCountry` | `string` | País del proveedor |
| `customsStatus` | `CustomsStatus` | Estado de la declaración aduanera |
| `customsDeclarationNumber` | `string` | Número de declaración |
| `estimatedDuty` | `number` | Arancel estimado |

### Estados de envío (`ShipmentStatus`)
`pending` · `in_transit` · `customs_review` · `cleared` · `delivered`

### Estados de aduana (`CustomsStatus`)
`not_submitted` · `under_review` · `approved` · `rejected`

---

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

Seleccionar simulador iOS (`i`), Android (`a`) o web (`w`) en el menú de Expo CLI.

---

## 🛠️ Dependencias principales

| Paquete | Versión |
|---|---|
| expo | ~53.0.27 |
| @react-navigation/native | 7.1.6 |
| @react-navigation/stack | ^7.9.2 |
| @react-navigation/bottom-tabs | 7.3.10 |
| react-native | 0.79.6 |