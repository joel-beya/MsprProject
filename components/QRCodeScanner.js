import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

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

  let content;

  if (qrData) {
    const [email, password] = qrData.split(',');
    content = (
      <View style={styles.container}>
        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>
        <Button title="Scan again" onPress={handleQrScan} />
      </View>
    );
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
