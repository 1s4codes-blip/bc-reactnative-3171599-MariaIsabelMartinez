// src/screens/FavoritesScreen.tsx
// Segunda pestaña del Tab Navigator.
// Muestra una lista de elementos favoritos del dominio.

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

const STATUS_COLORS: Record<Item['status'], string> = {
  pending: COLORS.warning,
  in_transit: COLORS.info,
  customs_review: '#a5d6ff',
  cleared: COLORS.success,
  delivered: COLORS.textSecondary,
};
 
const STATUS_LABELS: Record<Item['status'], string> = {
  pending: 'Pending',
  in_transit: 'In Transit',
  customs_review: 'Customs Review',
  cleared: 'Cleared',
  delivered: 'Delivered',
};

export function FavoritesScreen(): React.JSX.Element {

  function renderFavorite({ item }: { item: Item }): React.JSX.Element {
    const statusColor = STATUS_COLORS[item.status];
    return (
      <View style={styles.card}>
        <Text style={styles.starIcon}>★</Text>

        <View style={styles.cardContent}>
         <View style={styles.cardHeader}>
            <Text style={styles.shipmentId}>{item.id}</Text>
            <View style={[styles.statusBadge, { borderColor: statusColor }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {STATUS_LABELS[item.status]}
              </Text>
            </View>
          </View>

          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.route}>
            {item.origin}
            {'  →  '}
            {item.destination}
          </Text>
 
          <View style={styles.cardFooter}>
            <Text style={styles.supplier}>{item.supplierName}</Text>
            <Text style={styles.value}>
              {item.currency} {item.totalValue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Priority Shipments</Text>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No priority shipments</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  starIcon: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.error,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipmentId: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  route: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  supplier: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
  },
  value: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});