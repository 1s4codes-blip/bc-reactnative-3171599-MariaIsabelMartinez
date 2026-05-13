import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { COLORS } from './src/theme';

export default function App(): React.JSX.Element {
  return (
    <View  style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <HomeScreen />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
