import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import React, { useState, useEffect } from 'react';
import QRCodeScanner from './components/QRCodeScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const response = await fetch('https://mspr4.gwendal.online/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'retailer@mspr4.com', password: 'password' }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.token) {
        console.log('Token retrieved successfully!');
        await AsyncStorage.setItem('token', data.token);
        setToken(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Stack.Screen name="QR Code Scanner" component={QRCodeScanner} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
