// ============================================================
// SCREEN: HomeScreen
// ============================================================
// Pantalla principal: header con el nombre del dominio
// y lista de tarjetas usando ScrollView.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Supplier } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Import Company';
  const DOMAIN_SUBTITLE = 'Supplier management';

  function handleItemPress(item: Supplier): void {
    console.log('Selected supplier:', item.name); 
  }

    const rows: Supplier[][] = [];
  for (let i = 0; i < MOCK_ITEMS.length; i += 2) {
    rows.push(MOCK_ITEMS.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      {}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      > 

 {}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onPress={handleItemPress}
              />
            ))}
            {/* Si la fila tiene solo 1 item, agrega espacio vacío */}
            {row.length === 1 && <View style={styles.emptyCell} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  // Header — nombre y subtítulo del dominio
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3448',
  },
    headerAccent: {
    height: 3,
    backgroundColor: '#58a6ff',
    borderRadius: 2,
    marginBottom: 12,
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#58a6ff',
    marginTop: 4,
  },

  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
    row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    emptyCell: {
    flex: 1,
    margin: 6,
  },
});