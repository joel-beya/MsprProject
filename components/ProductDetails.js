import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProductDetails({ route }) {
  const { produit } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{produit.nom}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.label}>Prix:</Text>
          <Text style={styles.value}>{produit.price}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Couleur:</Text>
          <Text style={styles.value}>{produit.color}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{produit.description}</Text>
        </View>
      </View>
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
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

export default ProductDetails;