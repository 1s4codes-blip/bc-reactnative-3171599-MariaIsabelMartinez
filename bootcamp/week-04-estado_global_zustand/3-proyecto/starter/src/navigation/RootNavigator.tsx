// src/navigation/RootNavigator.tsx
// Tab Navigator raíz con Stack anidado en la pestaña Products.
// El badge del tab "Envíos" refleja el conteo del store Zustand.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen as ProductsScreen } from '../screens/HomeScreen';
import { ShipmentsScreen } from '../screens/ShipmentsScreen';
import { COLORS } from '../theme';
import type { ProductsStackParamList, RootTabParamList } from './types';

// Lee el store de envíos para el badge
import { useShipmentStore } from '../stores/shipmentStore';

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

function ProductsStackNavigator(): React.JSX.Element {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent,
        headerTitleStyle: { fontWeight: 'bold' as const },
      }}
    >
      <ProductsStack.Screen
        name="ProductList"
        component={ProductsScreen}
        options={{ title: 'Productos' }}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </ProductsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  // Lee el conteo de envíos desde el store para el badge
  const shipmentCount = useShipmentStore((state) => state.shipments.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.surface },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Products') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else {
            iconName = focused ? 'boat' : 'boat-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{ tabBarLabel: 'Productos' }}
      />
      <Tab.Screen
        name="Shipments"
        component={ShipmentsScreen}
        options={{
          tabBarLabel: 'Envíos',
          tabBarBadge: shipmentCount > 0 ? shipmentCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
