import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProductDetails({ route }) {
  const { produit } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{produit.nom}</Text>
      <Text style={styles.description}>{produit.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default ProductDetails;
