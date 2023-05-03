import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import QRCodeScanner from './components/QRCodeScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState(null);
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem('token'); // récupérer le token depuis le cache
      if (token !== null) {
        setToken(token);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to retrieve token. Please try again.');
    }
  }
  
  useEffect(() => {
    getToken();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Products List" component={ProductsList} />
            <Stack.Screen name="Product Details" component={ProductDetails} />
          </>
        ) : (
          <> 
          <Stack.Screen name="QR Code Scanner" >
          {props => <QRCodeScanner {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Products List" component={ProductsList} />
          <Stack.Screen name="Product Details" component={ProductDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;