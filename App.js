import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState('a');

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
          console.log('Token loaded successfully!');
        } else {
          console.log('Token not found!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  //Si le token est présent dans le storage, on affiche la liste des produits
  //Sinon, on affiche le texte Scanner qrcode
  if(token == 'a')
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products List" component={ProductsList} />
          <Stack.Screen name="Product Details" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  else
    return (
      <Text>Scanner qrcode</Text>
    );
}
export default App;
