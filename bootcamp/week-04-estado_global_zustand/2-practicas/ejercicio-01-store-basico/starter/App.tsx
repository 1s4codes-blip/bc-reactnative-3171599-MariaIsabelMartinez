// App.tsx — Ejercicio 01: Store Básico con Zustand
// Adaptado al dominio: Empresa de Importación
//
// PASO 1-2: SupplierStore — gestiona proveedores y su calificación
// PASO 3-4: ShipmentItemStore — gestiona productos para importar
//
// INSTRUCCIONES: Descomenta los PASOx en orden.
// Cada paso depende del anterior para funcionar correctamente.

import { create } from 'zustand';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';

// ============================================================
// PASO 1 — Definir y crear el store SupplierStore
// ============================================================
// Un store Zustand tiene dos partes en la misma definición:
//   - Estado (datos)
//   - Acciones (funciones que modifican el estado)
//
// `set` recibe una función que devuelve el estado parcialmente actualizado.
// Nunca se muta el estado directamente (igual que con useState).

// Descomenta las siguientes líneas:
// interface SupplierStore {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
//   reset: () => void;
// }
//
// const useSupplierStore = create<SupplierStore>((set) => ({
//   // Estado inicial: proveedores calificados
//   count: 0,
//   // Acciones
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

// ============================================================
// PASO 3 — Definir y crear el store ShipmentItemStore
// ============================================================
// Un segundo store completamente independiente.
// Puedes tener tantos stores como necesites.

// Descomenta las siguientes líneas:
// interface ShipmentItem {
//   id: string;
//   name: string;
// }
//
// interface ShipmentItemStore {
//   items: ShipmentItem[];
//   addItem: (name: string) => void;
//   removeItem: (id: string) => void;
// }
//
// const useShipmentItemStore = create<ShipmentItemStore>((set) => ({
//   items: [],
//   addItem: (name) =>
//     set((state) => ({
//       items: [
//         ...state.items,
//         { id: Date.now().toString(), name },
//       ],
//     })),
//   removeItem: (id) =>
//     set((state) => ({
//       items: state.items.filter((t) => t.id !== id),
//     })),
// }));

// ============================================================
// PANTALLA PRINCIPAL
// ============================================================

function SupplierSection(): React.JSX.Element {
  // PASO 2 — Consumir el store Supplier con selectores
  // Cada selector solo extrae la parte del store que necesita.
  // Este componente solo re-renderiza cuando `count` cambia.
  //
  // Descomenta las siguientes líneas:
  // const count = useSupplierStore((state) => state.count);
  // const increment = useSupplierStore((state) => state.increment);
  // const decrement = useSupplierStore((state) => state.decrement);
  // const reset = useSupplierStore((state) => state.reset);

  // Placeholder que desaparece cuando descomentas el PASO 2:
  const count = 0;
  const increment = () => {};
  const decrement = () => {};
  const reset = () => {};

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Proveedores Calificados</Text>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={decrement}>
          <Text style={styles.btnText}>−</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={increment}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <Pressable style={styles.resetBtn} onPress={reset}>
        <Text style={styles.resetBtnText}>Reset</Text>
      </Pressable>
    </View>
  );
}

function ShipmentItemSection(): React.JSX.Element {
  const [inputText, setInputText] = useState('');

  // PASO 3 — Consumir el store ShipmentItem con selectores
  //
  // Descomenta las siguientes líneas:
  // const items = useShipmentItemStore((state) => state.items);
  // const addItem = useShipmentItemStore((state) => state.addItem);
  // const removeItem = useShipmentItemStore((state) => state.removeItem);

  // Placeholders:
  const items: { id: string; name: string }[] = [];
  const addItem = (_name: string) => {};
  const removeItem = (_id: string) => {};

  function handleAdd(): void {
    if (inputText.trim() === '') return;
    addItem(inputText.trim());
    setInputText('');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Productos para Importar</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nuevo producto..."
          placeholderTextColor="#6e7681"
          onSubmitEditing={handleAdd}
        />
        <Pressable style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Pressable onPress={() => removeItem(item.id)}>
              <Text style={styles.removeText}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sin productos aún</Text>
        }
        scrollEnabled={false}
      />
    </View>
  );
}

// PASO 4 — Componente separado que lee el mismo store sin recibir props
// Esta es la demostración clave: StatsPanel no recibe ningún prop,
// pero puede leer el useShipmentItemStore directamente desde cualquier lugar del árbol.
//
// Descomenta la siguiente función:
// function StatsPanel(): React.JSX.Element {
//   const totalCount = useShipmentItemStore((state) => state.items.length);
//   return (
//     <View style={styles.statsPanel}>
//       <Text style={styles.statsText}>Productos en el store: {totalCount}</Text>
//       <Text style={styles.statsHint}>
//         (Sin prop drilling — lee el store directamente)
//       </Text>
//     </View>
//   );
// }

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ejercicio 01 — Store Básico</Text>
      <SupplierSection />
      <ShipmentItemSection />
      {/* PASO 4 — Descomenta la siguiente línea cuando actives StatsPanel: */}
      {/* <StatsPanel /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6edf3',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b949e',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  counter: {
    fontSize: 48,
    fontWeight: '700',
    color: '#61DAFB',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: '#21262d',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6edf3',
  },
  resetBtn: {
    marginTop: 8,
    backgroundColor: '#21262d',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  resetBtnText: {
    fontSize: 13,
    color: '#8b949e',
  },
  input: {
    flex: 1,
    backgroundColor: '#0d1117',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 10,
    color: '#e6edf3',
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#61DAFB',
    borderRadius: 8,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#e6edf3',
  },
  removeText: {
    fontSize: 14,
    color: '#f85149',
    paddingLeft: 8,
  },
  emptyText: {
    fontSize: 13,
    color: '#6e7681',
    textAlign: 'center',
    paddingVertical: 8,
  },
  statsPanel: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#61DAFB',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#61DAFB',
  },
  statsHint: {
    fontSize: 11,
    color: '#6e7681',
    marginTop: 4,
  },
});
