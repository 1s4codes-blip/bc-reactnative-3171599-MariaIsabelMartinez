// ============================================================
// COMPONENT: ItemCard
// ============================================================
// Tarjeta reutilizable para mostrar un proveedor del dominio
// de empresa de importación. Se renderiza por cada item en HomeScreen.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Supplier } from '../types';

interface ItemCardProps {
  item: Supplier;
  onPress: (item: Supplier) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
   
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >

      <Image
        source={{ uri: item.imageUri }}
        style={styles.cardImage}
        resizeMode="cover"
      />

     <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>🌍 {item.subtitle}</Text>
        <Text style={styles.cardProducts} numberOfLines={2}>{item.products}</Text>
        <Text style={styles.cardShipment}>🚢 {item.shipmentStatus}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
  card: {
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d3448',
    flex: 1,
    margin: 6,
  },
  
  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
 
  cardImage: {
    width: '100%',
    height: 110,
  },
  
  cardBody: {
    padding: 10,
    gap: 3,
  },
 
  cardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
 
  cardSubtitle: {
    fontSize: 12,
    color: '#8b949e',
  },
  
  cardProducts: {
    fontSize: 11,
    color: '#58a6ff',
    marginTop: 2,
  },

    cardShipment: {
    fontSize: 11,
    color: '#3fb950',
    marginTop: 2,
  },

});