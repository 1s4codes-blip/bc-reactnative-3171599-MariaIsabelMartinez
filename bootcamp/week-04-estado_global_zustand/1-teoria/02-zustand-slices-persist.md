# Zustand — Patrón Slices y Middleware Persist

## 🎯 Objetivos

- Escalar stores complejos usando el patrón slices
- Combinar múltiples stores en la misma app
- Persistir estado entre sesiones con el middleware `persist` y AsyncStorage

---

## 1. Patrón Slices

Cuando el store crece, conviene dividirlo en **slices** (porciones) que se combinan al final. Cada slice define su propio estado y acciones, y luego se unifican en un solo `create`.

### Ejemplo: Store de Importación con slices

```tsx
import { create } from 'zustand';
import type { Product, Supplier, Shipment } from '../types';

// ─────────────────────────────────────────────────────────
// Slice 1: Productos
// ─────────────────────────────────────────────────────────
interface ProductSlice {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const createProductSlice = (set: any): ProductSlice => ({
  products: [],
  setProducts: (products) => set({ products }),
});

// ─────────────────────────────────────────────────────────
// Slice 2: Proveedores
// ─────────────────────────────────────────────────────────
interface SupplierSlice {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  selectSupplier: (supplier: Supplier | null) => void;
}

const createSupplierSlice = (set: any): SupplierSlice => ({
  suppliers: [],
  selectedSupplier: null,
  selectSupplier: (supplier) => set({ selectedSupplier: supplier }),
});

// ─────────────────────────────────────────────────────────
// Slice 3: Envíos
// ─────────────────────────────────────────────────────────
interface ShipmentSlice {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
  removeShipment: (id: string) => void;
}

const createShipmentSlice = (set: any): ShipmentSlice => ({
  shipments: [],
  addShipment: (shipment) =>
    set((state: any) => ({ shipments: [...state.shipments, shipment] })),
  removeShipment: (id) =>
    set((state: any) => ({ shipments: state.shipments.filter((s: Shipment) => s.id !== id) })),
});

// ─────────────────────────────────────────────────────────
// Store combinado
// ─────────────────────────────────────────────────────────
export type AppStore = ProductSlice & SupplierSlice & ShipmentSlice;

export const useAppStore = create<AppStore>()((set) => ({
  ...createProductSlice(set),
  ...createSupplierSlice(set),
  ...createShipmentSlice(set),
}));
```

### Uso en componentes

```tsx
function ProductList(): React.JSX.Element {
  // Cada componente selecciona solo la parte que necesita
  const products = useAppStore((state) => state.products);
  const addShipment = useAppStore((state) => state.addShipment);

  // ...
}
```

---

## 2. Múltiples stores independientes

No todo necesita estar en un solo store. Puedes tener stores separados:

```tsx
// stores/productStore.ts
export const useProductStore = create<ProductStore>((set) => ({
  // estado y acciones de productos
}));

// stores/shipmentStore.ts
export const useShipmentStore = create<ShipmentStore>((set) => ({
  // estado y acciones de envíos (independiente)
}));

// stores/customsStore.ts
export const useCustomsStore = create<CustomsStore>((set) => ({
  // estado y acciones de trámites aduaneros (independiente)
}));
```

---

## 3. Middleware `persist` con AsyncStorage

El middleware `persist` guarda el store en AsyncStorage para que sobreviva al reinicio de la app.

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CustomsStore {
  records: CustomsRecord[];
  isLoading: boolean;
  addRecord: (productName: string) => void;
  removeRecord: (id: string) => void;
}

export const useCustomsStore = create<CustomsStore>()(
  persist(
    (set) => ({
      records: [],
      isLoading: false,
      addRecord: (productName) =>
        set((state) => ({
          records: [
            ...state.records,
            { id: Date.now().toString(), productName, status: 'Pendiente', createdAt: Date.now() },
          ],
        })),
      removeRecord: (id) =>
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'customs-storage',           // ← clave en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

> 💡 **Nota de sintaxis**: `create<T>()( persist( ... ) )` — el paréntesis vacío `()` después del genérico es necesario para que TypeScript infiera correctamente los tipos de los middlewares.

---

## 4. Opciones avanzadas de persist

### `partialize` — elegir qué persistir

No todo el estado debe guardarse. Los flags de UI (cargando, error, etc.) deben excluirse:

```tsx
persist(
  (set) => ({
    records: [],
    isLoading: false,    // ← NO queremos persistir esto
    hasHydrated: false,  // ← NO queremos persistir esto
    addRecord: (name) => set((state) => ({ records: [...state.records, { ... }] })),
  }),
  {
    name: 'customs-storage',
    storage: createJSONStorage(() => AsyncStorage),
    // Solo persiste `records`
    partialize: (state) => ({ records: state.records }),
  }
)
```

### `onRehydrateStorage` — detectar fin de carga

AsyncStorage es asíncrono. Cuando la app arranca, el store tiene valores iniciales (vacíos) hasta que los datos guardados se cargan. Puedes mostrar un loading:

```tsx
interface CustomsStore {
  records: CustomsRecord[];
  isLoading: boolean;
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
  // ...
}

export const useCustomsStore = create<CustomsStore>()(
  persist(
    (set) => ({
      records: [],
      isLoading: false,
      hasHydrated: false,
      setHydrated: (value) => set({ hasHydrated: value }),
      // ...
    }),
    {
      name: 'customs-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Se llama cuando AsyncStorage terminó de cargar
        state?.setHydrated(true);
      },
    }
  )
);
```

```tsx
// En el componente:
function App(): React.JSX.Element {
  const hasHydrated = useCustomsStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return <ActivityIndicator />;  // pantalla de carga
  }

  return <MainApp />;
}
```

---

## 5. Persist con slices

Si usas slices, aplica `persist` al store combinado:

```tsx
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...createProductSlice(set),
      ...createSupplierSlice(set),
      ...createShipmentSlice(set),
    }),
    {
      name: 'import-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persistir solo productos y envíos (no proveedores seleccionados)
      partialize: (state) => ({
        products: state.products,
        shipments: state.shipments,
      }),
    }
  )
);
```

---

## ✅ Checklist de Verificación

- [ ] Los slices están correctamente tipados (cada uno con su interface)
- [ ] El store combinado exporta un solo hook
- [ ] `persist` configurado con `name` único y `AsyncStorage`
- [ ] `partialize` excluye flags de UI (isLoading, hasHydrated)
- [ ] `onRehydrateStorage` se usa para mostrar loading inicial
- [ ] No se persisten datos sensibles o temporales
