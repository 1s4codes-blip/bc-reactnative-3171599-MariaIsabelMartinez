// src/screens/EditScreen.tsx
// Formulario para editar un producto de importación existente.
// Carga los datos actuales del servidor y rellena el formulario con defaultValues.
// Usa reset() en useEffect cuando los datos llegan.

import React, { useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { productSchema, type ProductFormData } from '../schemas/itemSchema';
import { useProductById, useUpdateProduct } from '../hooks/useItems';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

// ──────────────────────────────────────────────
// PANTALLA
// ──────────────────────────────────────────────

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  // Obtener el producto actual del servidor
  const { data: product, isLoading } = useProductById(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', description: '', price: undefined, originCountry: '' },
  });

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  // Cuando el producto se carga del servidor, rellenar el formulario
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        originCountry: product.originCountry,
      });
    }
  }, [product, reset]);

  function onSubmit(data: ProductFormData): void {
    updateProduct(
      {
        id,
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

  const canSubmit = !isSubmitting && !isPending && isDirty;

  // Mientras carga los datos del servidor, mostrar indicador de carga
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

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
        <Text style={styles.hint}>
          Los campos se rellenan automáticamente con los datos actuales del producto.
          Modifica lo que necesites y guarda.
        </Text>

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
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Guardar cambios</Text>
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
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  hint: { ...TYPOGRAPHY.caption, fontStyle: 'italic' },
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
