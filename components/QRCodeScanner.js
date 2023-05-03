import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import base64 from 'react-native-base64'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function QRCodeScanner() {
  // const { setToken } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setQrData(data);
  };

  const handleQrScan = () => {
    setScanned(false);
    setQrData(null);
  };

  async function get_token(qrdata) {
    try {
      console.log(typeof qrdata)
      const response = await axios.post('https://mspr4.gwendal.online/login', JSON.stringify(qrdata));
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      console.log(token)
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to retrieve token. Please try again.');
    }
  }

  let content;

  if (qrData) {

    const parsedQrData = JSON.parse(qrData);
    const password = parsedQrData.password;
    const decodedPassword = base64.decode(password);
    // console.log(decodedPassword)
    parsedQrData.password = decodedPassword;
    // console.log(parsedQrData);
    content = (
      <View style={styles.container}>
        <Text>Password: {qrData}</Text>
        <Button title="Scan again" onPress={handleQrScan} />
      </View>
    );
    get_token(parsedQrData)
  } else if (scanned) {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>Scanned QR code: {qrData}</Text>
        <Button title="Scan again" onPress={handleQrScan} />
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
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
