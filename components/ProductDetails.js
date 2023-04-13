import React from 'react';
import { View, Text } from 'react-native';

function DetailsProduit({ route }) {
  const { produit } = route.params;

  return (
    <View>
      <Text>{produit.nom}</Text>
      <Text>{produit.description}</Text>
    </View>
  );
}

export default ProductDetails;
