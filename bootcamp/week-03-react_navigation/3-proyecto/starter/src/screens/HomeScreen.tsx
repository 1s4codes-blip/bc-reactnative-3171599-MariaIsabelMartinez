// src/screens/HomeScreen.tsx
// Pantalla de lista — muestra todos los elementos del dominio.
// Al presionar un ítem navega al DetailScreen pasando los params.

import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del navigation hook para este Stack
type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeList'
>;

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

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handleItemPress(item: Item): void {
    navigation.navigate('HomeDetail', {
      id: item.id,
      name: item.name,
      origin: item.origin,
      destination: item.destination,
      status: item.status,
      estimatedArrival: item.estimatedArrival,
      totalValue: item.totalValue,
      currency: item.currency,
      trackingNumber: item.trackingNumber,
      weightKg: item.weightKg,
      supplierName: item.supplierName,
      supplierCountry: item.supplierCountry,
      customsStatus: item.customsStatus,
      customsDeclarationNumber: item.customsDeclarationNumber,
      estimatedDuty: item.estimatedDuty,
    });
  }

  function renderItem({ item }: { item: Item }): React.JSX.Element {
    const statusColor = STATUS_COLORS[item.status];
    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => handleItemPress(item)}
        testID={`shipment-${item.id}`}
      >
        <View style={[styles.statusBar, { backgroundColor: statusColor }]} />
 
        <View style={styles.cardBody}>
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

        <Text style={styles.chevron}>{'›'}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shipments found</Text>
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
  list: {
    padding: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceAlt,
  },
  statusBar: {
    width: 4,
    borderTopLeftRadius: RADIUS.md,
    borderBottomLeftRadius: RADIUS.md,
  },
  cardBody: {
    flex: 1,
    padding: SPACING.base,
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
  chevron: {
    alignSelf: 'center',
    paddingRight: SPACING.sm,
    fontSize: TYPOGRAPHY.size.xl,
    color: COLORS.textMuted,
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
 