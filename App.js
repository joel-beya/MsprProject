import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductsList from './components/ProductsList';

const PRODUCTS = [
  { "id": "01", "name": "Iphone 14 Pro max", "price": "1400", "description": "le beau Iphone tout noir", "color": "Black" },
  { "id": "02", "name": "S23 ultra", "price": "1400", "description": "le beau Samsung tout gris", "color": "Grey" }
];

export default function App() {
  return (
    <View style={styles.container}>
     
      <StatusBar style="auto" />
      <ProductsList products={PRODUCTS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
