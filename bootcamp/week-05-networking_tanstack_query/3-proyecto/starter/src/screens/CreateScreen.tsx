// src/screens/CreateScreen.tsx
// Pantalla modal para crear un nuevo producto importado.
// Conecta useMutation y maneja el retorno al listado.

import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useCreateProduct } from '../hooks/useProducts';
import type { Product } from '../types';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

// ============================================================
// ETIQUETAS DE ESTADOS ADUANALES PARA EL SELECTOR
// ============================================================

const CUSTOMS_STATUS_OPTIONS: { value: Product['customsStatus']; label: string }[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in_customs', label: 'En Aduana' },
  { value: 'cleared', label: 'Liberado' },
  { value: 'in_transit', label: 'En Tránsito' },
  { value: 'delivered', label: 'Entregado' },
];

// ============================================================
// PANTALLA: CreateScreen
// ============================================================

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();
  const { mutate: createProduct, isPending } = useCreateProduct();

  // Campos del formulario — dominio de importación
  const [name, setName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [customsStatus, setCustomsStatus] = useState<Product['customsStatus']>('pending');
  const [description, setDescription] = useState('');

  function handleSubmit(): void {
    if (!name.trim() || !supplier.trim()) return;

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    createProduct(
      {
        name: name.trim(),
        supplier: supplier.trim(),
        originCountry: originCountry.trim(),
        price: isNaN(parsedPrice) ? 0 : parsedPrice,
        stock: isNaN(parsedStock) ? 0 : parsedStock,
        customsStatus,
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = name.trim().length > 0 && supplier.trim().length > 0 && !isPending;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Datos del nuevo producto importado</Text>

        {/* Nombre del producto */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre del producto <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej. Laptop HP ProBook"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Proveedor */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Proveedor <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={supplier}
            onChangeText={setSupplier}
            placeholder="Ej. TechSupply GmbH"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* País de origen */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>País de origen</Text>
          <TextInput
            style={styles.input}
            value={originCountry}
            onChangeText={setOriginCountry}
            placeholder="Ej. Alemania"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Precio y Stock en fila */}
        <View style={styles.row}>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.fieldLabel}>Precio (USD)</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
          </View>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.fieldLabel}>Stock</Text>
            <TextInput
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              placeholder="0"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Estado en aduana */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Estado en aduana</Text>
          <View style={styles.statusRow}>
            {CUSTOMS_STATUS_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.statusOption,
                  customsStatus === option.value && styles.statusOptionActive,
                ]}
                onPress={() => setCustomsStatus(option.value)}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    customsStatus === option.value && styles.statusOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Notas adicionales del producto…"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botón de envío */}
        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear producto</Text>
          )}
        </Pressable>

        {/* Botón cancelar */}
        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  field: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  required: { color: COLORS.error },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfField: { flex: 1 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  multiline: { minHeight: 96, paddingTop: SPACING.sm },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  statusOption: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs + 2,
    backgroundColor: COLORS.card,
  },
  statusOptionActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '22',
  },
  statusOptionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  statusOptionTextActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
