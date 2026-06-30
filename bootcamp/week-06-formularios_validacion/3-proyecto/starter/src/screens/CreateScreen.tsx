// src/screens/CreateScreen.tsx
// Formulario para registrar un nuevo producto de importación.
// Usa React Hook Form + Zod para validación y TanStack Query para la mutation.

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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { productSchema, type ProductFormData } from '../schemas/itemSchema';
import { useCreateProduct } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

// ──────────────────────────────────────────────
// PANTALLA
// ──────────────────────────────────────────────

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', description: '', price: undefined, originCountry: '' },
  });

  const { mutate: createProduct } = useCreateProduct();

  function onSubmit(data: ProductFormData): void {
    createProduct(
      {
        name: data.name,
        description: data.description ?? '',
        price: data.price,
        originCountry: data.originCountry,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = !isSubmitting;

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
          placeholder="Ej: Sensor IoT 3000"
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción del producto…"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          errorMessage={errors.description?.message}
        />

        <FormField
          control={control}
          name="price"
          label="Precio unitario (USD) *"
          placeholder="0.00"
          keyboardType="numeric"
          returnKeyType="next"
          errorMessage={errors.price?.message}
        />

        <FormField
          control={control}
          name="originCountry"
          label="País de origen *"
          placeholder="Ej: China, Alemania, Brasil"
          returnKeyType="done"
          errorMessage={errors.originCountry?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Crear producto</Text>
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

// ──────────────────────────────────────────────
// ESTILOS
// ──────────────────────────────────────────────

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
