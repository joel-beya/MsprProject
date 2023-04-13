import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const produits = [
  { id: 1, nom: 'Produit 1', description: 'Description du produit 1' },
  { id: 2, nom: 'Produit 2', description: 'Description du produit 2' },
  { id: 3, nom: 'Produit 3', description: 'Description du produit 3' },
];

function ProductsList({ navigation }) {
  const [data, setData] = useState(produits);

  function onPressItem(item) {
    navigation.navigate('ProductDetails', { produit: item });
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.nom}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
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

