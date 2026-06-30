// src/screens/ShipmentsScreen.tsx
// Pantalla de envíos: muestra todos los productos agregados para importar.
// Lee el estado directamente desde el shipmentStore (sin props).
// Demuestra que el mismo store Zustand mantiene consistencia entre tabs.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Shipment } from '../types';
import { useShipmentStore } from '../stores/shipmentStore';

// Mapa de estados a colores y etiquetas
const STATUS_CONFIG: Record<Shipment['status'], { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: COLORS.warning },
  in_transit: { label: 'En tránsito', color: COLORS.accent },
  customs_clearance: { label: 'En aduana', color: '#c9d1d9' },
  delivered: { label: 'Entregado', color: COLORS.success },
};

// ============================================================
// SUB-COMPONENTE: ShipmentCard
// ============================================================
interface ShipmentCardProps {
  shipment: Shipment;
  onRemove: () => void;
  onUpdateStatus: () => void;
}

function ShipmentCard({ shipment, onRemove, onUpdateStatus }: ShipmentCardProps): React.JSX.Element {
  const statusInfo = STATUS_CONFIG[shipment.status];

  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{shipment.productName.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {shipment.productName}
        </Text>
        <Text style={styles.cardQuantity}>Cantidad: {shipment.quantity} ud(s)</Text>
        <Text style={styles.cardDate}>LL estimada: {shipment.estimatedArrival}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <Text style={[styles.statusLabel, { color: statusInfo.color }]}>
            {statusInfo.label}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {/* Botón para avanzar estado (simulación) */}
        {shipment.status !== 'delivered' && (
          <Pressable
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
            onPress={onUpdateStatus}
            accessibilityLabel="Avanzar estado"
          >
            <Text style={styles.actionBtnText}>→</Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.6 }]}
          onPress={onRemove}
          accessibilityLabel={`Quitar ${shipment.productName} de envíos`}
        >
          <Text style={styles.removeBtnText}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================
// PANTALLA: ShipmentsScreen
// ============================================================
export function ShipmentsScreen(): React.JSX.Element {
  const shipments = useShipmentStore((state) => state.shipments);
  const removeShipment = useShipmentStore((state) => state.removeShipment);
  const clearAll = useShipmentStore((state) => state.clearAll);
  const updateShipmentStatus = useShipmentStore((state) => state.updateShipmentStatus);

  // Ciclo de estados: pending → in_transit → customs_clearance → delivered
  const nextStatus: Record<Shipment['status'], Shipment['status']> = {
    pending: 'in_transit',
    in_transit: 'customs_clearance',
    customs_clearance: 'delivered',
    delivered: 'delivered',
  };

  const renderItem: ListRenderItem<Shipment> = ({ item }) => (
    <ShipmentCard
      shipment={item}
      onRemove={() => removeShipment(item.id)}
      onUpdateStatus={() => updateShipmentStatus(item.id, nextStatus[item.status])}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shipments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          shipments.length > 0 ? (
            <View style={styles.header}>
              <Text style={styles.sectionLabel}>
                {shipments.length} envío{shipments.length !== 1 ? 's' : ''}
              </Text>
              <Pressable onPress={clearAll} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Limpiar todo</Text>
              </Pressable>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🚢</Text>
            <Text style={styles.emptyTitle}>Sin envíos aún</Text>
            <Text style={styles.emptySubtitle}>
              Ve al catálogo de productos y agrega artículos a tu lista de importación.
            </Text>
          </View>
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
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  clearButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
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
  thumbnail: {
    width: 44,
    height: 44,
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
  cardQuantity: {
    ...TYPOGRAPHY.caption,
  },
  cardDate: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  actions: {
    gap: SPACING.xs,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyIcon: {
    fontSize: 52,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textSecondary,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
});
