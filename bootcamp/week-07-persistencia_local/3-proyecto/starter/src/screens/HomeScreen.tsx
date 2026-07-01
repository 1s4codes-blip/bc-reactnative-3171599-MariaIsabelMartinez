// src/screens/HomeScreen.tsx
// Lista de productos con soporte offline (caché AsyncStorage),
// estado de envío visible y respeto de preferencias del usuario.

import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { HomeScreenProps } from '../navigation/types';
import { useProducts } from '../hooks/useProducts';
import { usePreferences } from '../hooks/usePreferences';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Product, ShipmentStatus } from '../types';

const STATUS_LABELS: Record<ShipmentStatus, { label: string; color: string }> = {
  pending:   { label: 'Pendiente',   color: '#f59e0b' },
  customs:   { label: 'En Aduana',   color: '#3b82f6' },
  transit:   { label: 'En Tránsito', color: '#a855f7' },
  delivered: { label: 'Entregado',   color: '#22c55e' },
};

interface ProductRowProps {
  product: Product;
  compact: boolean;
}

function ProductRow({ product, compact }: ProductRowProps): React.JSX.Element {
  const statusInfo = STATUS_LABELS[product.shipmentStatus];

  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
      <View style={styles.rowContent}>
        <Text style={styles.rowName} numberOfLines={compact ? 1 : 2}>
          {product.name}
        </Text>
        {!compact && (
          <>
            <Text style={styles.rowDetail} numberOfLines={1}>
              {product.supplierName} · {product.originCountry}
            </Text>
            <Text style={styles.rowCategory}>{product.category}</Text>
          </>
        )}
        <View style={styles.rowBottom}>
          <Text style={styles.rowPrice}>${product.price.toFixed(2)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '20' }]}>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const { data, isLoading, isError, refetch, isFetching } = useProducts();
  const { sortBy, sortDirection, compactMode } = usePreferences();

  const sortedProducts = React.useMemo(() => {
    if (!data?.products) return [];
    const items = [...data.products];
    const dir = sortDirection === 'asc' ? 1 : -1;
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name':   return dir * a.name.localeCompare(b.name);
        case 'price':  return dir * (a.price - b.price);
        case 'origin': return dir * a.originCountry.localeCompare(b.originCountry);
        case 'status': return dir * a.shipmentStatus.localeCompare(b.shipmentStatus);
        default:       return 0;
      }
    });
    return items;
  }, [data?.products, sortBy, sortDirection]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductRow product={item} compact={compactMode} />
    ),
    [compactMode],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError && !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No hay conexión y no hay caché disponible</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.source === 'cache' && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            ⚠️  Sin red — mostrando datos guardados localmente
          </Text>
        </View>
      )}

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              {sortedProducts.length} productos · Orden: {sortBy}
              {sortDirection === 'asc' ? ' ↑' : ' ↓'}
              {compactMode ? ' · Compacto' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={TYPOGRAPHY.body}>No hay productos</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  list: { paddingVertical: SPACING.sm },
  listHeader: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  listHeaderText: { ...TYPOGRAPHY.caption },
  separator: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  offlineBanner: {
    backgroundColor: '#78350f',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  offlineText: { ...TYPOGRAPHY.caption, color: '#fbbf24' },
  errorText: { ...TYPOGRAPHY.body, textAlign: 'center' },
  retryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryText: { ...TYPOGRAPHY.body, color: '#fff', fontWeight: '700' },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  rowCompact: { paddingVertical: SPACING.sm },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  rowContent: { flex: 1, gap: 2 },
  rowName: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDetail: { ...TYPOGRAPHY.caption },
  rowCategory: { ...TYPOGRAPHY.caption, color: COLORS.accent },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  rowPrice: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.success },
  statusBadge: {
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
});
