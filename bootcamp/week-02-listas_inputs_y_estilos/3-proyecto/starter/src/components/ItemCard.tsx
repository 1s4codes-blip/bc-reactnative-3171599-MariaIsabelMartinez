import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Item, ShipmentStatus, CustomsStatus } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

const SHIPMENT_COLORS: Record<ShipmentStatus, { bg: string; text: string }> = {
  delivered:  { bg: '#3fb95022', text: COLORS.success },
  in_transit: { bg: '#58a6ff22', text: COLORS.info },
  pending:    { bg: '#f0883e22', text: COLORS.warning },
  delayed:    { bg: '#f8514922', text: COLORS.error },
};

const CUSTOMS_COLORS: Record<CustomsStatus, { bg: string; text: string }> = {
  cleared:   { bg: '#3fb95022', text: COLORS.success },
  in_review: { bg: '#f0883e22', text: COLORS.warning },
  hold:      { bg: '#f8514922', text: COLORS.error },
};

const SHIPMENT_LABELS: Record<ShipmentStatus, string> = {
  delivered:  'Delivered',
  in_transit: 'In Transit',
  pending:    'Pending',
  delayed:    'Delayed',
};

const CUSTOMS_LABELS: Record<CustomsStatus, string> = {
  cleared:   'Cleared',
  in_review: 'In Review',
  hold:      'Hold',
};

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const shipmentColor = SHIPMENT_COLORS[item.shipmentStatus];
  const customsColor = CUSTOMS_COLORS[item.customsStatus];
  const totalValue = (item.unitPrice * item.quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      {/* Header: name + category badge */}
      <View style={styles.header}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      {/* Supplier and origin */}
      <Text style={styles.fieldText}>🏭 {item.supplier}</Text>
      <Text style={styles.fieldText}>🌍 {item.origin}</Text>

       {/* Price row */}
      <Text style={styles.priceText}>
        {totalValue}
        <Text style={styles.qtyText}>  ×{item.quantity} units</Text>
      </Text>

      {/* Status badges row */}
      <View style={styles.badgeRow}>
        {/* Shipment status */}
        <View style={[styles.badge, { backgroundColor: shipmentColor.bg }]}>
          <Text style={[styles.badgeText, { color: shipmentColor.text }]}>
            {SHIPMENT_LABELS[item.shipmentStatus]}
          </Text>
        </View>

        {/* Customs status */}
        <View style={[styles.badge, { backgroundColor: customsColor.bg }]}>
          <Text style={[styles.badgeText, { color: customsColor.text }]}>
            Customs: {CUSTOMS_LABELS[item.customsStatus]}
          </Text>
        </View>
      </View>

        {/* Arrival date */}
      <Text style={styles.dateText}>📅 ETA: {item.arrivalDate}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  itemName: {
    flex: 1,
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
    textTransform: 'capitalize',
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: 3,
  },
  priceText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  qtyText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.regular,
    color: COLORS.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
    marginBottom: SPACING.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  dateText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
  },
});
