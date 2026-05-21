// src/screens/DetailScreen.tsx
// Pantalla de detalle — muestra todos los datos del shipment seleccionado.
// Los params llegan del Stack Navigator desde HomeScreen.

// src/screens/DetailScreen.tsx
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del route hook para leer los params tipados de esta pantalla
type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

// Mapa de colores por estado del shipment
const STATUS_COLORS: Record<string, string> = {
  pending: COLORS.warning,
  in_transit: COLORS.info,
  customs_review: '#a5d6ff',
  cleared: COLORS.success,
  delivered: COLORS.textSecondary,
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  in_transit: 'In Transit',
  customs_review: 'Customs Review',
  cleared: 'Cleared',
  delivered: 'Delivered',
};

const CUSTOMS_LABELS: Record<string, string> = {
  not_submitted: 'Not Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

const CUSTOMS_COLORS: Record<string, string> = {
  not_submitted: COLORS.textMuted,
  under_review: COLORS.warning,
  approved: COLORS.success,
  rejected: COLORS.error,
};

export function DetailScreen(): React.JSX.Element {
  // useRoute devuelve los params tipados pasados desde HomeScreen
  const route = useRoute<DetailScreenRouteProp>();
  const {
    id,
    name,
    origin,
    destination,
    status,
    estimatedArrival,
    totalValue,
    currency,
    trackingNumber,
    weightKg,
    supplierName,
    supplierCountry,
    customsStatus,
    customsDeclarationNumber,
    estimatedDuty,
  } = route.params;

  const statusColor = STATUS_COLORS[status] ?? COLORS.textMuted;
  const customsColor = CUSTOMS_COLORS[customsStatus] ?? COLORS.textMuted;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Nombre del shipment */}
      <Text style={styles.name}>{name}</Text>

      {/* Badges — ID y estado */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{id}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {STATUS_LABELS[status] ?? status}
          </Text>
        </View>
      </View>

      {/* ---- SECCIÓN: Shipment Info ---- */}
      <Text style={styles.sectionTitle}>Shipment Info</Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tracking Number</Text>
        <Text style={styles.fieldValue}>{trackingNumber}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Origin</Text>
        <Text style={styles.fieldValue}>{origin}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Destination</Text>
        <Text style={styles.fieldValue}>{destination}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Estimated Arrival</Text>
        <Text style={styles.fieldValue}>{estimatedArrival}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Total Value</Text>
        <Text style={[styles.fieldValue, styles.highlight]}>
          {currency} {totalValue.toLocaleString()}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Weight</Text>
        <Text style={styles.fieldValue}>{weightKg.toLocaleString()} kg</Text>
      </View>

      {/* ---- SECCIÓN: Supplier ---- */}
      <Text style={styles.sectionTitle}>Supplier</Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Company</Text>
        <Text style={styles.fieldValue}>{supplierName}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Country</Text>
        <Text style={styles.fieldValue}>{supplierCountry}</Text>
      </View>

      {/* ---- SECCIÓN: Customs ---- */}
      <Text style={styles.sectionTitle}>Customs</Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Declaration Status</Text>
        <Text style={[styles.fieldValue, { color: customsColor }]}>
          {CUSTOMS_LABELS[customsStatus] ?? customsStatus}
        </Text>
      </View>

      {customsDeclarationNumber.length > 0 && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Declaration Number</Text>
          <Text style={styles.fieldValue}>{customsDeclarationNumber}</Text>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Estimated Duty</Text>
        <Text style={styles.fieldValue}>
          {estimatedDuty === 0
            ? 'Duty-exempt'
            : `${currency} ${estimatedDuty.toLocaleString()}`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxl,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
  highlight: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});