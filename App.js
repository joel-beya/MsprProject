import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import ProductsList from './components/ProductsList'; // Importation du composant ProductsList depuis le fichier ./components/ProductsList
import ProductDetails from './components/ProductDetails'; // Importation du composant ProductDetails depuis le fichier ./components/ProductDetails
import QRCodeScanner from './components/QRCodeScanner'; // Importation du composant QRCodeScanner depuis le fichier ./components/QRCodeScanner
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importation du module AsyncStorage pour le stockage de données asynchrone
import { TouchableOpacity, Text, Alert } from 'react-native';
import { AppContext } from './AppContext'; // Importation du contexte de l'application depuis le fichier ./AppContext
import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator(); // Initialisation du navigateur de pile createStackNavigator

function App() {
  const [token, setToken] = useState(null); // Déclaration de l'état pour stocker le token

  async function getToken() {
    try {
      const token = await AsyncStorage.getItem('token'); // Récupération du token depuis AsyncStorage
      if (token !== null) {
        setToken(token); // Mise à jour de l'état avec le token récupéré
      }
    } catch (error) {
      console.log(error); // Affichage de l'erreur dans la console
      Alert.alert('Error', 'Failed to retrieve token. Please try again.'); // Affichage d'une alerte en cas d'erreur lors de la récupération du token
    }
  }

  async function resetToken(navigation) {
    try {
      await AsyncStorage.removeItem('token'); // Suppression du token depuis AsyncStorage
      setToken(null); // Mise à jour de l'état pour supprimer le token
      navigation.reset({
        index: 0,
        routes: [{ name: 'QR Code Scanner' }],
      }); // Réinitialisation de la navigation pour revenir à l'écran de scan du QR Code
    } catch (error) {
      console.log(error); // Affichage de l'erreur dans la console
      Alert.alert('Error', 'Failed to reset token. Please try again.'); // Affichage d'une alerte en cas d'erreur lors de la réinitialisation du token
    }
  }

  useEffect(() => {
    getToken(); // Appel de la fonction pour récupérer le token au montage du composant
  }, []);

  return (
    <AppContext.Provider value={{ refresh: getToken }}>
      {/* Conteneur de navigation */}
      <NavigationContainer>
        {/* Navigateur de pile */}
        <Stack.Navigator>
          {/* Écran de scan du QR Code si le token n'existe pas */}
          {!token ? (
            <Stack.Screen name="QR Code Scanner" component={QRCodeScanner} />
          ) : null}
          {/* Écran de la liste des produits */}
          <Stack.Screen
            name="Products List"
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={() => resetToken(navigation)}
                >
                  {/* Texte pour le bouton de déconnexion */}
                  <Text style={{ color: 'red' }}>Logout</Text>
                </TouchableOpacity>
              ),
              headerLeft: null,
            })}
            component={ProductsList}
          />
          {/* Écran des détails du produit */}
          <Stack.Screen name="Product Details" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;

