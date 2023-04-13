import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FilterableProductList from './components/ProductList';

const PRODUCTS = [
  { "id": "01", "name": "Israel Dooley", "price": "663.00", "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "color": "white"},
  { "id": "02", "name": "Jan Boehm", "price": "80.00", "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "color": "indigo"}
];

export default function App() {
  return (
    <View style={styles.container}>
     
      <StatusBar style="auto" />
      <FilterableProductList products={PRODUCTS} />
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
