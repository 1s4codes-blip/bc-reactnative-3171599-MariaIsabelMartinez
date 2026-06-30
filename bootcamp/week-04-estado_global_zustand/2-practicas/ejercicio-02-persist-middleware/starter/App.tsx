// App.tsx — Ejercicio 02: Persist Middleware
// Adaptado al dominio: Empresa de Importación — Trámites Aduaneros
// Demuestra cómo usar el middleware `persist` de Zustand con AsyncStorage
// para que los trámites aduaneros sobrevivan al reinicio de la app.
//
// INSTRUCCIONES: Descomenta los PASOx en orden y verifica que los trámites
// persisten al cerrar y reabrir la app.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  ActivityIndicator,
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
// PASO 1 — Store simple con persist + AsyncStorage
// ============================================================
// La clave `name` es el identificador único en AsyncStorage.
// `createJSONStorage` adapta AsyncStorage (async) a la interfaz de persist.
//
// NOTA DE SINTAXIS: create<T>()( middlewares ) — el doble () es necesario
// para que TypeScript infiera correctamente los genéricos de los middlewares.

// Descomenta las siguientes líneas:
// import { persist, createJSONStorage } from 'zustand/middleware';
//
// interface CustomsRecord {
//   id: string;
//   productName: string;
//   status: string;
//   createdAt: number;
// }
//
// interface CustomsStore {
//   records: CustomsRecord[];
//   isLoading: boolean;
//   hasHydrated: boolean;
//   addRecord: (productName: string) => void;
//   removeRecord: (id: string) => void;
//   setHydrated: (value: boolean) => void;
// }
//
// const useCustomsStore = create<CustomsStore>()(
//   persist(
//     (set) => ({
//       records: [],
//       isLoading: false,
//       hasHydrated: false,
//       addRecord: (productName) =>
//         set((state) => ({
//           records: [
//             ...state.records,
//             { id: Date.now().toString(), productName, status: 'Pendiente', createdAt: Date.now() },
//           ],
//         })),
//       removeRecord: (id) =>
//         set((state) => ({
//           records: state.records.filter((r) => r.id !== id),
//         })),
//       setHydrated: (value) => set({ hasHydrated: value }),
//     }),
//     {
//       name: 'customs-storage-v1',
//       storage: createJSONStorage(() => AsyncStorage),
//       // PASO 2 — Solo persistir `records` (excluir flags de UI)
//       // Descomenta la siguiente función:
//       // partialize: (state) => ({ records: state.records }),
//       //
//       // PASO 3 — Callback cuando AsyncStorage terminó de cargar
//       // Descomenta las siguientes líneas:
//       // onRehydrateStorage: () => (state) => {
//       //   state?.setHydrated(true);
//       // },
//     }
//   )
// );

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function App(): React.JSX.Element {
  const [inputText, setInputText] = useState('');

  // PASO 1 — Consumir el store (descomenta cuando actives el store arriba)
  // const records = useCustomsStore((state) => state.records);
  // const addRecord = useCustomsStore((state) => state.addRecord);
  // const removeRecord = useCustomsStore((state) => state.removeRecord);

  // PASO 3 — Leer estado de hidratación
  // const hasHydrated = useCustomsStore((state) => state.hasHydrated);

  // Placeholders mientras el PASO 1 no está activo:
  const records: { id: string; productName: string; createdAt: number }[] = [];
  const addRecord = (_productName: string) => {};
  const removeRecord = (_id: string) => {};

  // PASO 3 — Mostrar pantalla de carga mientras rehidrata:
  // if (!hasHydrated) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <ActivityIndicator size="large" color="#61DAFB" />
  //       <Text style={styles.loadingText}>Cargando trámites aduaneros...</Text>
  //     </SafeAreaView>
  //   );
  // }

  function handleAdd(): void {
    if (inputText.trim() === '') return;
    addRecord(inputText.trim());
    setInputText('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ejercicio 02 — Persist (Aduanas)</Text>

      {/* PASO 4 — Info sobre persistencia */}
      {/* Descomenta las siguientes líneas cuando tengas el store activo: */}
      {/* <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Trámites en AsyncStorage: {records.length}
        </Text>
        <Text style={styles.infoHint}>
          Cierra y reabre la app — los trámites deben seguir aquí
        </Text>
      </View> */}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Producto para trámite aduanero..."
          placeholderTextColor="#6e7681"
          onSubmitEditing={handleAdd}
        />
        <Pressable style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.recordRow}>
            <View style={styles.recordContent}>
              <Text style={styles.recordText}>{item.productName}</Text>
              <Text style={styles.recordDate}>
                {new Date(item.createdAt).toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <Pressable onPress={() => removeRecord(item.id)}>
              <Text style={styles.removeText}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay trámites aduaneros.</Text>
            <Text style={styles.emptyHint}>
              Agrega un producto y reinicia la app para probar persist.
            </Text>
          </View>
        }
      />
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
  loadingText: {
    color: '#8b949e',
    marginTop: 12,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#61DAFB1A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#61DAFB',
  },
  infoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#61DAFB',
  },
  infoHint: {
    fontSize: 11,
    color: '#8b949e',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#161b22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 12,
    color: '#e6edf3',
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#61DAFB',
    borderRadius: 8,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0d1117',
  },
  list: {
    gap: 8,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  recordContent: {
    flex: 1,
  },
  recordText: {
    fontSize: 14,
    color: '#e6edf3',
  },
  recordDate: {
    fontSize: 11,
    color: '#6e7681',
    marginTop: 2,
  },
  removeText: {
    fontSize: 16,
    color: '#f85149',
    paddingLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#8b949e',
  },
  emptyHint: {
    fontSize: 12,
    color: '#6e7681',
    marginTop: 6,
    textAlign: 'center',
  },
});
