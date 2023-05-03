import React, { useState , useEffect} from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      try {
        const token = await AsyncStorage.getItem('token'); // récupérer le token depuis le cache
        if (token !== null) {
          return axios.get('https://mspr4.gwendal.online/products/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to retrieve token. Please try again.');
      }
    }

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
