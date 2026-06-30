// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra información completa de un producto importado
// y permite agregarlo a un envío usando el store Zustand.
// Demuestra cómo acceder al store desde cualquier screen.

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { ProductsStackParamList } from '../navigation/types';
import { useShipmentStore } from '../stores/shipmentStore';
import { getProductById } from '../data/mockData';

type DetailRouteProp = RouteProp<ProductsStackParamList, 'ProductDetail'>;

// ============================================================
// PANTALLA: ProductDetail
// ============================================================
export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;
  const [quantity, setQuantity] = useState('1');

  // Busca el producto completo en los datos mock
  const product = getProductById(id);

  // Selectores del store de envíos
  const isProductInShipment = useShipmentStore((state) => state.isProductInShipment);
  const addShipment = useShipmentStore((state) => state.addShipment);
  const removeShipment = useShipmentStore((state) => state.removeShipment);

  const isInShipment = product ? isProductInShipment(product.id) : false;

  function handleToggleShipment(): void {
    if (!product) return;

    if (isInShipment) {
      // Encuentra el envío asociado y lo elimina
      const shipments = useShipmentStore.getState().shipments;
      const existing = shipments.find((s) => s.productId === product.id && s.status === 'pending');
      if (existing) {
        removeShipment(existing.id);
      }
    } else {
      const qty = parseInt(quantity, 10) || 1;
      const estimatedArrival = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString('es-CO');
      addShipment(product.id, product.name, qty, estimatedArrival);
    }
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  const statusColor = (rating: number): string => {
    if (rating >= 4) return COLORS.success;
    if (rating >= 3) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <View style={styles.container}>
      {/* Hero / Thumbnail */}
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{product.name.charAt(0)}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.category}</Text>
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        {/* Detalles específicos del dominio */}
        <View style={styles.detailGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Proveedor</Text>
            <Text style={styles.detailValue}>{product.supplier}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>País de Origen</Text>
            <Text style={styles.detailValue}>{product.originCountry}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Precio Unitario</Text>
            <Text style={styles.detailValue}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Peso</Text>
            <Text style={styles.detailValue}>{product.weight} kg</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Código HS</Text>
            <Text style={styles.detailValue}>{product.hsCode}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rating Proveedor</Text>
            <Text style={[styles.detailValue, { color: statusColor(product.supplierRating) }]}>
              {'★'.repeat(product.supplierRating)}{'☆'.repeat(5 - product.supplierRating)}
            </Text>
          </View>
        </View>
      </View>

      {/* Sección de cantidad para el envío */}
      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>Cantidad:</Text>
        <TextInput
          style={styles.quantityInput}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
          editable={!isInShipment}
        />
      </View>

      {/* Botón Agregar/Quitar del envío */}
      <Pressable
        style={({ pressed }) => [
          styles.shipmentButton,
          isInShipment && styles.shipmentButtonActive,
          pressed && styles.shipmentButtonPressed,
        ]}
        onPress={handleToggleShipment}
        testID="shipment-button"
      >
        <Text style={[styles.shipmentButtonText, isInShipment && styles.shipmentButtonTextActive]}>
          {isInShipment ? '✓  En envío' : '➕  Agregar a envío'}
        </Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.accent,
  },
  info: {
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  badge: {
    backgroundColor: COLORS.accent + '20',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  detailGrid: {
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    textAlign: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quantityLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  quantityInput: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    width: 80,
    textAlign: 'center',
  },
  shipmentButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  shipmentButtonActive: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  shipmentButtonPressed: {
    opacity: 0.7,
  },
  shipmentButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  shipmentButtonTextActive: {
    color: '#fff',
  },
});
