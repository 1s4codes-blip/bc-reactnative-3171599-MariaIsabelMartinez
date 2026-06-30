# Ejercicio 01 — Store Básico con Zustand

## 🎯 Objetivo

Crear un store Zustand con estado tipado, consumirlo en componentes usando selectores, y verificar que el estado es compartido sin prop drilling.

**Dominio**: Empresa de Importación — SupplierStore + ShipmentItemStore

## 📋 Prerrequisitos

- Teoría [01-zustand-fundamentos.md](../../1-teoria/01-zustand-fundamentos.md) leída

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

---

## Diagrama de Referencia

![Flujo de datos con Zustand](../../0-assets/01-zustand-store-flow.svg)

---

## Paso 1 — Crear el store con `create<T>()`

En Zustand, el store se crea con `create<Interface>()` que recibe una función con `set`. Toda la lógica de actualización vive dentro de esa función.

```tsx
import { create } from 'zustand';

interface SupplierStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useSupplierStore = create<SupplierStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

**Abre `starter/App.tsx`** y descomenta la sección **PASO 1**.

---

## Paso 2 — Consumir el store con selector

El selector es la función que le pasas al hook `useSupplierStore`. Solo extrae la parte que el componente necesita.

```tsx
// Selector de solo el conteo (re-render solo cuando count cambia)
const count = useSupplierStore((state) => state.count);

// Selector de solo las acciones (las acciones no cambian → no re-renderiza)
const increment = useSupplierStore((state) => state.increment);
```

**Abre `starter/App.tsx`** y descomenta la sección **PASO 2**.

---

## Paso 3 — Agregar un store de productos para importar (`ShipmentItemStore`)

Ahora añade un segundo store en el mismo archivo:

```tsx
interface ShipmentItem {
  id: string;
  name: string;
}
interface ShipmentItemStore {
  items: ShipmentItem[];
  addItem: (name: string) => void;
  removeItem: (id: string) => void;
}
const useShipmentItemStore = create<ShipmentItemStore>((set) => ({
  items: [],
  addItem: (name) =>
    set((state) => ({
      items: [...state.items, { id: Date.now().toString(), name }],
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((t) => t.id !== id) })),
}));
```

**Abre `starter/App.tsx`** y descomenta la sección **PASO 3**.

---

## Paso 4 — Componente separado leyendo el mismo store

El punto clave de Zustand: un componente `StatsPanel` que vive en otro lugar del árbol puede leer el mismo `useShipmentItemStore` sin recibir props.

```tsx
// StatsPanel no recibe props — lee el store directamente
function StatsPanel(): React.JSX.Element {
  const count = useShipmentItemStore((state) => state.items.length);
  return <Text>Total de productos: {count}</Text>;
}
```

**Abre `starter/App.tsx`** y descomenta la sección **PASO 4**.

---

## ✅ Validación

La app debe mostrar:
- Un contador de proveedores calificados con botones `+` y `−`
- Un input para agregar productos a importar y una lista con botón eliminar
- Un panel de estadísticas que se actualiza en tiempo real al agregar/eliminar productos
- Sin errores TypeScript en la consola
