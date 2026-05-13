import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ListRenderItem,
} from 'react-native';
import { Item } from '../types';
import { IMPORTS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function HomeScreen(): React.JSX.Element {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (query.trim() === '') return IMPORTS;
    const lower = query.toLowerCase();
    return IMPORTS.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.supplier.toLowerCase().includes(lower) ||
        item.origin.toLowerCase().includes(lower),
    );
  }, [query]);

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results for "{query}"</Text>
        <Text style={styles.emptySubText}>
          Try searching by product name, supplier or country of origin
        </Text>
      </View>
    ),
    [query],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <ItemCard
        item={item}
        onPress={() => {}}
      />
    ),
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.inner}>

        {/* Screen header */}
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Import Shipments</Text>
          <Text style={styles.screenSubtitle}>
            {filteredItems.length} of {IMPORTS.length} records
          </Text>
        </View>

        {/* Search input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by product, supplier or origin..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            keyboardType="default"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Filtered list */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kvContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
  },
  screenHeader: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  screenTitle: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.borderLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});