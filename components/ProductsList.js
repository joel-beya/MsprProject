import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

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
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <View>
          <Text>{item.nom}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default ProductsList;
