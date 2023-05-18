import React, { useState, useEffect, useContext } from 'react'; 
import { View, Text, StyleSheet, Button, Alert } from 'react-native'; 
import { BarCodeScanner } from 'expo-barcode-scanner'; // Importation du composant BarCodeScanner d'Expo
import base64 from 'react-native-base64'; // Importation de la bibliothèque base64 pour décoder une chaîne encodée en base64
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importation du module AsyncStorage pour le stockage de données asynchrone
import { useNavigation } from '@react-navigation/native'; // Importation du hook useNavigation pour la navigation entre les écrans
import { AppContext } from '../AppContext'; // Importation du contexte de l'application
import { getTokenFromQRCode } from '../Api'; // Importation de la fonction pour récupérer le token à partir du QR Code

function QRCodeScanner() {
  const navigation = useNavigation(); // Initialisation du hook useNavigation pour accéder à l'objet de navigation
  const { refresh } = useContext(AppContext); // Accès à la fonction de rafraîchissement depuis le contexte de l'application

  const [hasPermission, setHasPermission] = useState(null); // Déclaration de l'état pour stocker la permission d'accès à la caméra
  const [scanned, setScanned] = useState(false); // Déclaration de l'état pour indiquer si un QR Code a été scanné ou non
  const [qrData, setQrData] = useState(null); // Déclaration de l'état pour stocker les données du QR Code scanné
  const [token, setToken] = useState(null); // Déclaration de l'état pour stocker le token

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); // Demande de permission pour accéder à la caméra
      setHasPermission(status === 'granted'); // Mise à jour de l'état avec la valeur de la permission accordée ou non
    };

    requestCameraPermission();
  }, []); // Utilisation du useEffect avec un tableau de dépendances vide pour exécuter cette fonction une seule fois au montage du composant

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true); // Mise à jour de l'état pour indiquer qu'un QR Code a été scanné
    setQrData(data); // Mise à jour de l'état avec les données du QR Code scanné
  };

  const handleQrScan = () => {
    setScanned(false); // Mise à jour de l'état pour indiquer qu'un nouveau scan de QR Code peut être effectué
    setQrData(null); // Réinitialisation des données du QR Code
  };

  async function handleTokenRetrieval(qrData) {
    try {
      const parsedQrData = JSON.parse(qrData); // Analyse des données du QR Code en tant qu'objet JSON
      const password = parsedQrData.password; // Récupération du mot de passe du QR Code
      const decodedPassword = base64.decode(password); // Décodage du mot de passe encodé en base64
      parsedQrData.password = decodedPassword; // Remplacement du mot de passe encodé par le mot de passe décodé

      const token = await getTokenFromQRCode(parsedQrData); // Appel à la fonction pour récupérer le token à partir du QR Code
      await AsyncStorage.setItem('token', token); // Stockage du token dans AsyncStorage
      setToken(token); // Mise à jour de l'état avec le token récupéré
    } catch (error) {
      console.log(error); // Affichage de l'erreur dans la console
      Alert.alert('Error', error.message); // Affichage d'une alerte avec le message d'erreur
    }
  }

  useEffect(() => {
    if (token) {
      refresh(); // Appel de la fonction de rafraîchissement pour actualiser l'application
      navigation.navigate('Products List'); // Navigation vers la page de la liste des produits
    }
  }, [token]); // Utilisation du useEffect avec le token comme dépendance pour exécuter cette fonction lorsque le token est mis à jour

  let content;

  if (qrData) {
    content = (
      <View style={styles.container}>
        <Text>Password: {qrData}</Text> 
        <Button title="Scan again" onPress={handleQrScan} /> 
      </View>
    );
    handleTokenRetrieval(qrData); // Appel de la fonction pour récupérer le token à partir du QR Code
  } else if (scanned) {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>Scanned QR code: {qrData}</Text> 
        <Button title="Scan again" onPress={handleQrScan} /> {/* Bouton pour effectuer un nouveau scan de QR Code */}
      </View>
    );
  } else {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>Scan QR code to retrieve email and password</Text> 
        <Button title="Scan QR code" onPress={() => setScanned(true)} /> 
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>; {/* Affichage d'un texte pendant la demande de permission */}
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>; {/* Affichage d'un texte si l'accès à la caméra est refusé */}
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}  //Gestionnaire d'événement pour le scan de QR Code
        style={StyleSheet.absoluteFillObject}
      />
      {content} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QRCodeScanner;
