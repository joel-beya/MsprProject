import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// const products = [
//   { id: "01", name: "expresso", price: "1400", description: "le beau Iphone tout noir", color: "Black" },
//   { id: "02", name: "S23 ultra", price: "1400", description: "le beau Samsung tout gris", color: "Grey" },
//   { id: "03", name: "S23 ultra", price: "1400", description: "le beau Samsung tout gris", color: "Grey" },
// ];

function ProductsList({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setData(response.data);
    }
    fetchData();
  }, []);

  async function getProducts() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODEzMDI1MDAsImV4cCI6MTY4Mzg5NDUwMCwicm9sZXMiOlsiUk9MRV9SRVRBSUxFUiJdLCJ1c2VybmFtZSI6InJldGFpbGVyQG1zcHI0LmNvbSJ9.tLQ3hSpGnRCd8D-vw5j--zTXAhAYC9g_49P6DpqK8sJxEU8AqdvHcBwHx5DYSBCzLFJE7pnYQFMY_GWm73pXeesl4WRMTlGCp3EEfr1KtCCx8pSR49JY-U0PVILRDEnsxLY50ylvLwcAw_Yqgd9r7XscdxlMBBR8Bq-KjlHqsXBRQ4Fkj46cVGvAWZkK4TZNjVSBqLuGk6gG-wg8809WMPQnK3J-embiTr8nz0f9pfcv2oswBv1aQKcUXXLqeSJ5drtT--dfrbGu8aJoYNGmiPGEOlOWUc3bMlJCtdJhFwlB-Up3xlo4mCbSH2TWoz3UoQ4_ASJJ7ax7dxZMYpHG7w';
    return axios.get('https://mspr4.gwendal.online/products/', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  function onPressItem(item) {
    navigation.navigate('ProductDetails', { produit: item });
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