import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import QRCodeScanner from './components/QRCodeScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';

import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState(null);

  async function getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setToken(token);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to retrieve token. Please try again.');
    }
  }

  async function resetToken(navigation) {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'QR Code Scanner' }],
      });
      
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to reset token. Please try again.');
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen name="QR Code Scanner" component={QRCodeScanner} />
        ) : null}
        <Stack.Screen
          name="Products List"
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => resetToken(navigation)}
              >
                <Text style={{ color: 'red' }}>Logout</Text>
              </TouchableOpacity>
            ),
            headerLeft: null, // Supprimer le bouton de retour
          })}
          component={ProductsList}
        />
        <Stack.Screen name="Product Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
export default  App;