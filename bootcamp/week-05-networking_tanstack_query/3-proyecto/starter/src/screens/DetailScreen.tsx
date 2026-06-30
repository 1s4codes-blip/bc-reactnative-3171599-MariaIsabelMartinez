// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra los campos completos de un producto importado.

import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { CUSTOMS_STATUS_LABELS, type Product } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useProductById } from '../hooks/useProducts';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// ============================================================
// MAPA DE COLORES PARA CADA ESTADO ADUANAL
// ============================================================

const STATUS_COLORS: Record<Product['customsStatus'], string> = {
  pending: COLORS.warning,
  in_customs: '#d4760a',
  cleared: COLORS.success,
  in_transit: COLORS.accent,
  delivered: COLORS.success,
};

// ============================================================
// SUB-COMPONENTE: FieldRow
// ============================================================

interface FieldRowProps {
  label: string;
  value: string;
}

function FieldRow({ label, value }: FieldRowProps): React.JSX.Element {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;
  const { data: product, isLoading, isError, refetch } = useProductById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle del producto</Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  function formatPrice(price: number): string {
    return `$${price.toFixed(2)} USD`;
  }

  function formatStock(stock: number): string {
    return `${stock} unidad${stock !== 1 ? 'es' : ''}`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header del producto */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.idBadge}>ID: {id}</Text>
      </View>

      {product && (
        <>
          {/* Campos del producto importado */}
          <View style={styles.fieldsCard}>
            <FieldRow label="Proveedor" value={product.supplier} />
            <View style={styles.divider} />
            <FieldRow label="País de origen" value={product.originCountry} />
            <View style={styles.divider} />
            <FieldRow label="Precio" value={formatPrice(product.price)} />
            <View style={styles.divider} />
            <FieldRow label="Stock disponible" value={formatStock(product.stock)} />
            <View style={styles.divider} />
            <FieldRow
              label="Estado en aduana"
              value={CUSTOMS_STATUS_LABELS[product.customsStatus]}
            />
            {product.description && (
              <>
                <View style={styles.divider} />
                <FieldRow label="Descripción" value={product.description} />
              </>
            )}
          </View>

          {/* Badge de estado aduanal */}
          <View style={[styles.statusCard, { borderColor: STATUS_COLORS[product.customsStatus] }]}>
            <Text style={styles.statusCardLabel}>Estado aduanal</Text>
            <Text style={[styles.statusCardValue, { color: STATUS_COLORS[product.customsStatus] }]}>
              {CUSTOMS_STATUS_LABELS[product.customsStatus]}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  idBadge: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1 },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  fieldLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontWeight: '500',
    flex: 1,
  },
  fieldValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  divider: { height: 1, backgroundColor: COLORS.border },
  statusCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statusCardLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusCardValue: {
    ...TYPOGRAPHY.h3,
    fontWeight: '700',
  },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
});
