// src/screens/HomeScreen.tsx
// Pantalla principal: lista de productos importados cargada desde la API.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { CUSTOMS_STATUS_LABELS, type Product } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useProducts } from '../hooks/useProducts';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

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
// SUB-COMPONENTE: ProductCard
// ============================================================

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps): React.JSX.Element {
  const statusColor = STATUS_COLORS[product.customsStatus];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`product-card-${product.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>
          {product.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {product.supplier} · {product.originCountry}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {CUSTOMS_STATUS_LABELS[product.customsStatus]}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch, error } = useProducts();

  // ── Estado de carga ───────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  // ── Estado de error ───────────────────────────────────────
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ No se pudo cargar el catálogo</Text>
        <Text style={styles.errorDetail}>{(error as Error)?.message}</Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate('Detail', {
          id: item.id,
          name: item.name,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {!data ? (
        <View style={styles.centered}>
          <Text style={styles.hint}>
            Conecta la API de productos para ver los datos
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onRefresh={refetch}
          refreshing={isFetching && !isLoading}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No hay productos en el catálogo.</Text>
            </View>
          }
          ListHeaderComponent={
            <Text style={styles.countLabel}>
              {data.length} producto{data.length !== 1 ? 's' : ''} importado{data.length !== 1 ? 's' : ''}
            </Text>
          }
        />
      )}
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  separator: { height: SPACING.sm },
  countLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardAvatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  cardContent: { flex: 1, gap: SPACING.xs },
  cardTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.caption },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  cardPrice: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.success,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: { ...TYPOGRAPHY.h2, color: COLORS.textMuted },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  loadingText: { ...TYPOGRAPHY.caption },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  errorDetail: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
  hint: { ...TYPOGRAPHY.caption, textAlign: 'center', color: COLORS.textMuted },
});
