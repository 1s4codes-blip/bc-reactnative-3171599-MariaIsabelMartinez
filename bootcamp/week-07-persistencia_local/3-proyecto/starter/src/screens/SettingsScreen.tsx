// src/screens/SettingsScreen.tsx
// Pantalla de ajustes con preferencias de importación persistidas en MMKV
// y código de aduana (dato sensible) persistido con Expo SecureStore.

import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

// SecureStore no está disponible en web — se usa localStorage como fallback
let SecureStore: typeof import('expo-secure-store') | null = null;
try {
  SecureStore = require('expo-secure-store');
} catch {
  // En web no está disponible — se usará el fallback
}

const WEB_STORAGE_KEY = 'aduana_access_code';

async function secureSet(key: string, value: string): Promise<void> {
  if (SecureStore && Platform.OS !== 'web') {
    await SecureStore.setItemAsync(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}

async function secureGet(key: string): Promise<string | null> {
  if (SecureStore && Platform.OS !== 'web') {
    return await SecureStore.getItemAsync(key);
  }
  return localStorage.getItem(key);
}

async function secureDelete(key: string): Promise<void> {
  if (SecureStore && Platform.OS !== 'web') {
    await SecureStore.deleteItemAsync(key);
  } else {
    localStorage.removeItem(key);
  }
}

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';
import type { SortBy } from '../types';

const SENSITIVE_KEY = 'customs_access_code';
const MOCK_CODE = 'ADU-7843-K9X';

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'name',   label: 'Nombre' },
  { value: 'price',  label: 'Precio' },
  { value: 'origin', label: 'Origen' },
  { value: 'status', label: 'Estado' },
];

export function SettingsScreen(): React.JSX.Element {
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
  } = usePreferences();

  const [maskedValue, setMaskedValue] = useState<string | null>(null);

  async function handleSaveSensitive(): Promise<void> {
    await secureSet(SENSITIVE_KEY, MOCK_CODE);
    Alert.alert('Guardado', 'Código de aduana almacenado de forma segura.');
  }

  async function handleReadSensitive(): Promise<void> {
    const value = await secureGet(SENSITIVE_KEY);
    if (value) {
      const masked = value.slice(0, 4) + '•••' + value.slice(-3);
      setMaskedValue(masked);
    } else {
      Alert.alert('No encontrado', 'No hay código de aduana guardado aún.');
    }
  }

  async function handleDeleteSensitive(): Promise<void> {
    await secureDelete(SENSITIVE_KEY);
    setMaskedValue(null);
    Alert.alert('Eliminado', 'El código de aduana fue removido de SecureStore.');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ──────────────────────────────────────────────────────
          SECCIÓN MMKV — Preferencias de importación
      ────────────────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Preferencias de importación</Text>
      <Text style={styles.sectionHint}>
        Estos valores se persisten con MMKV. Cambian en tiempo real.
      </Text>

      {/* Modo compacto */}
      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>
            Muestra menos información por producto en la lista
          </Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={(v) => setCompactMode(v)}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      {/* Ordenar por */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Ordenar por</Text>
        <View style={styles.segmented}>
          {SORT_OPTIONS.map((opt) => (
            <Pressable
              key={opt.value}
              style={[
                styles.segment,
                sortBy === opt.value && styles.segmentActive,
              ]}
              onPress={() => setSortBy(opt.value)}
            >
              <Text
                style={[
                  styles.segmentText,
                  sortBy === opt.value && styles.segmentTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Dirección de orden */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Dirección de orden</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[
                styles.segment,
                sortDirection === opt && styles.segmentActive,
              ]}
              onPress={() => setSortDirection(opt)}
            >
              <Text
                style={[
                  styles.segmentText,
                  sortDirection === opt && styles.segmentTextActive,
                ]}
              >
                {opt === 'asc' ? 'Ascendente ↑' : 'Descendente ↓'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Productos por página */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Productos por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[
                styles.segment,
                itemsPerPage === n && styles.segmentActive,
              ]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text
                style={[
                  styles.segmentText,
                  itemsPerPage === n && styles.segmentTextActive,
                ]}
              >
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ──────────────────────────────────────────────────────
          SECCIÓN SecureStore — Código de aduana
      ────────────────────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
        Seguridad — Código de Aduana
      </Text>
      <Text style={styles.sectionHint}>
        SecureStore cifra el código de acceso aduanal en Keychain/Keystore.
        Nunca se muestra el valor completo en pantalla.
      </Text>

      <Text style={styles.rowDesc}>
        Clave: <Text style={styles.mono}>{SENSITIVE_KEY}</Text>
      </Text>

      {maskedValue && (
        <View style={styles.maskedContainer}>
          <Text style={styles.rowLabel}>Valor leído (enmascarado):</Text>
          <Text style={styles.maskedValue}>{maskedValue}</Text>
        </View>
      )}

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSaveSensitive}>
          <Text style={styles.btnSecureText}>Guardar</Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnSecureAlt]}
          onPress={handleReadSensitive}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>
            Leer
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnDanger]}
          onPress={handleDeleteSensitive}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.danger }]}>
            Eliminar
          </Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          El código de aduana se usa para autorizar el despacho de mercancía
          en la aduana de destino. Solo personal autorizado debe tener acceso.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.sm },

  sectionTitle: { fontSize: 17, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  segmented: { flexDirection: 'row', gap: SPACING.xs, flexWrap: 'wrap' },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: COLORS.background, fontWeight: '700' },

  maskedContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  maskedValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.background },

  infoBox: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoText: { ...TYPOGRAPHY.caption },
});
