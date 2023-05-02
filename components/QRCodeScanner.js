import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { decode } from 'base-64';

function QRCodeScanner() {
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

  async function get_token(email, password) {
    try {
      const response = await axios.post('https://mspr4.gwendal.online/login', { email, password });
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to retrieve token. Please try again.');
    }
  }

  let content;

  if (qrData) {
    const [email, password] = qrData.split(',');
    const decodedPassword = decode(password);
    content = (
      <View style={styles.container}>
        <Button title="Scan again" onPress={handleQrScan} />
      </View>
    );
    get_token(email,decodedPassword)
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
