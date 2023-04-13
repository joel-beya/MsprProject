import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';


const products = [
  { id: "01", name: "expresso", price: "1400", description: "le beau Iphone tout noir", color: "Black" },
  { id: "02", name: "S23 ultra", price: "1400", description: "le beau Samsung tout gris", color: "Grey" },
  { id: "03", name: "S23 ultra", price: "1400", description: "le beau Samsung tout gris", color: "Grey" },
];

function ProductsList({ navigation }) {
  const [data, setData] = useState(products);

  function onPressItem(item) {
    navigation.navigate('Product Details', { produit: item });
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemContent: {
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductsList;
