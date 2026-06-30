# Zustand — Fundamentos y Selectores

## 🎯 Objetivos

- Entender qué problema resuelve Zustand y cuándo usarlo
- Crear un store básico con estado y acciones tipadas
- Consumir el store en componentes usando selectores optimizados

---

## 1. ¿Qué es Zustand y por qué usarlo?

En React Native, el estado puede vivir en tres lugares:

| Nivel | Herramienta | Cuándo usar |
|---|---|---|
| Local (1 componente) | `useState` | Formularios, UI temporal |
| Global (toda la app) | Zustand | Envíos, sesión de usuario, productos importados |
| Servidor | TanStack Query (semana 05) | Datos de una API |

**Zustand** es una librería de estado global minimalista. No necesita `Provider`, no usa *reducers* ni *actions* al estilo Redux, y funciona con un simple hook.

```tsx
// Con useState: el estado no se puede compartir entre pantallas
function ProductScreen() {
  const [shipments, setShipments] = useState<Shipment[]>([]);  // solo visible aquí
}

// Con Zustand: cualquier componente accede al mismo estado
function ProductScreen() {
  const shipments = useShipmentStore(state => state.shipments);  // compartido
}
function ShipmentsScreen() {
  const shipments = useShipmentStore(state => state.shipments);  // mismo estado
}
```

---

## 2. Crear un store básico

```tsx
import { create } from 'zustand';

// 1. Definir la interface del store (estado + acciones)
interface SupplierStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 2. Crear el store con create<T>()
// La función recibe `set` para actualizar el estado
export const useSupplierStore = create<SupplierStore>((set) => ({
  // Estado inicial
  count: 0,

  // Acciones — siempre usan `set` para actualizar
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  // `set` también acepta un objeto parcial (sin función)
  reset: () => set({ count: 0 }),
}));
```

> 💡 **diferencia con Redux**: no hay `dispatch`, no hay `reducers`, no hay `Provider`. El store se importa directamente en el componente.

---

## 3. Consumir el store con selectores

```tsx
import { useSupplierStore } from '../stores/supplierStore';

export function SupplierScreen(): React.JSX.Element {
  // Selector: función que extrae la parte del store que necesita el componente
  // Este componente solo se re-renderiza cuando `count` cambia
  const count = useSupplierStore((state) => state.count);

  // Leer acciones también usa selector
  const increment = useSupplierStore((state) => state.increment);
  const reset = useSupplierStore((state) => state.reset);

  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={increment}>
        <Text>+1</Text>
      </Pressable>
      <Pressable onPress={reset}>
        <Text>Reset</Text>
      </Pressable>
    </View>
  );
}
```

### ¿Por qué usar selectores y no leer todo el store?

```tsx
// ❌ MAL — el componente re-renderiza cuando CUALQUIER campo del store cambia
const store = useShipmentStore();

// ✅ BIEN — solo re-renderiza cuando `shipments` cambia
const shipments = useShipmentStore((state) => state.shipments);
const totalCount = useShipmentStore((state) => state.shipments.length);
```

---

## 4. Store con TypeScript completo

```tsx
import { create } from 'zustand';

interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
}

interface ShipmentItemStore {
  items: ShipmentItem[];
  addItem: (name: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useShipmentItemStore = create<ShipmentItemStore>((set) => ({
  items: [],

  addItem: (name, quantity) =>
    set((state) => ({
      items: [
        ...state.items,
        { id: Date.now().toString(), name, quantity },
      ],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearAll: () => set({ items: [] }),
}));
```

---

## 5. Usar `get` para leer el store dentro de acciones

```tsx
import type { Shipment } from '../types';

interface ShipmentStore {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
}

// `get` permite leer el estado actual dentro de una acción
export const useShipmentStore = create<ShipmentStore>((set, get) => ({
  shipments: [],

  addShipment: (shipment) => {
    const { shipments } = get();  // leer estado actual
    const exists = shipments.find((s) => s.productId === shipment.productId);
    if (exists) return;  // no duplicar
    set((state) => ({
      shipments: [...state.shipments, shipment],
    }));
  },
}));
```

---

## 6. Middleware `devtools`

En desarrollo, puedes conectar el store a Redux DevTools Browser Extension:

```tsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useShipmentStore = create<ShipmentStore>()(
  devtools(
    (set, get) => ({
      shipments: [],
      addShipment: (s) => set((state) => ({ shipments: [...state.shipments, s] }), false, 'addShipment'),
    }),
    { name: 'ShipmentStore' }  // nombre visible en DevTools
  )
);
```

> ⚠️ Usa `devtools` solo en desarrollo. En producción no tiene efecto pero agrega código innecesario.

---

## ✅ Checklist de Verificación

- [ ] El store exporta un hook que empieza con `use` (`useShipmentStore`)
- [ ] Todas las acciones usan `set` (nunca mutan directamente el estado)
- [ ] Cada componente lee solo la parte del store que necesita (selector)
- [ ] La interface TypeScript define todos los campos y acciones
- [ ] No se usa `as any` en ningún punto del store
