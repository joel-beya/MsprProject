import axios from 'axios';

// Fonction asynchrone pour récupérer le token à partir des données du QR code
export async function getTokenFromQRCode(qrData) {
  try {
    // Effectue une requête POST vers l'URL 'https://mspr4.gwendal.online/login' avec les données du QR code
    const response = await axios.post(
      'https://mspr4.gwendal.online/login',
      JSON.stringify(qrData)
    );

    // Extrait le token de la réponse
    const { token } = response.data;

    // Retourne le token
    return token;
  } catch (error) {
    console.log(error);

    // Lance une erreur en cas d'échec de récupération du token
    throw new Error('Failed to retrieve token. Please try again.');
  }
}

