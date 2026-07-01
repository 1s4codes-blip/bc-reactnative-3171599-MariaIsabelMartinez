// src/screens/CreateScreen.tsx
// Formulario para registrar un nuevo producto de importación.
// Adaptado del proyecto semana 06 con RHF + Zod.

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { productSchema, type ProductFormData } from '../schemas/productSchema';
import { useCreateProduct } from '../hooks/useProducts';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      originCountry: '',
      supplierName: '',
      category: '',
      price: undefined,
    },
  });

  const { mutate: createProduct, isPending } = useCreateProduct();

  function onSubmit(data: ProductFormData): void {
    createProduct(
      {
        name: data.name,
        description: data.description ?? '',
        originCountry: data.originCountry,
        supplierName: data.supplierName,
        category: data.category,
        price: data.price,
      },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending;

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
        <FormField
          control={control}
          name="name"
          label="Nombre del producto *"
          placeholder="Ej: Laptop HP ProBook"
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Especificaciones técnicas…"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          errorMessage={errors.description?.message}
        />

        <FormField
          control={control}
          name="originCountry"
          label="País de origen *"
          placeholder="Ej: China, Alemania, Japón"
          returnKeyType="next"
          errorMessage={errors.originCountry?.message}
        />

        <FormField
          control={control}
          name="supplierName"
          label="Proveedor *"
          placeholder="Nombre del proveedor"
          returnKeyType="next"
          errorMessage={errors.supplierName?.message}
        />

        <FormField
          control={control}
          name="category"
          label="Categoría *"
          placeholder="Ej: Electrónica, Textiles, Maquinaria"
          returnKeyType="next"
          errorMessage={errors.category?.message}
        />

        <FormField
          control={control}
          name="price"
          label="Precio (USD) *"
          placeholder="0.00"
          keyboardType="decimal-pad"
          returnKeyType="done"
          errorMessage={errors.price?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Registrar producto</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
