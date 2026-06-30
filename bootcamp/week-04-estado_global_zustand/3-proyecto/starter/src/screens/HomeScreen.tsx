// src/screens/HomeScreen.tsx
// Pantalla principal: catálogo de productos importados.
// Muestra lista de productos con proveedor, origen y precio.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { PRODUCTS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Product } from '../types';
import type { ProductsStackParamList } from '../navigation/types';

type ProductsScreenNavProp = NativeStackNavigationProp<ProductsStackParamList, 'ProductList'>;

// ============================================================
// SUB-COMPONENTE: ProductCard
// ============================================================
interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`product-card-${product.id}`}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{product.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.cardSupplier} numberOfLines={1}>
          {product.supplier}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText}>{product.originCountry}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>${product.price.toFixed(2)}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>Cód. {product.hsCode}</Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// ============================================================
// PANTALLA: ProductList (HomeScreen)
// ============================================================
export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<ProductsScreenNavProp>();
  const products = PRODUCTS;

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          id: item.id,
          name: item.name,
          supplier: item.supplier,
          originCountry: item.originCountry,
          price: item.price,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>
            {products.length} producto{products.length !== 1 ? 's' : ''} importados
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay productos disponibles.</Text>
        }
      />
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
  },
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  separator: {
    height: SPACING.sm,
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
  cardPressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardSupplier: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
  },
  cardDescription: {
    ...TYPOGRAPHY.caption,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  metaDot: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  chevron: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textMuted,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});
