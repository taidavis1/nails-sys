import { Platform } from 'react-native';

const baseApiUrl = (api) => {
    // const ipAdress = '192.168.1.4';
    // const ipAdress = '10.36.33.22'; //! Bệnh viện
    const ipAdress = '192.168.1.25'; // Bambi
    // const iOSBaseUrl = '192.168.0.101'; //! Home
    // const androidBaseUrl = '10.0.2.2';
    const port = '5000';
    // const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://192.168.1.4:5000';
    const baseUrl = Platform.OS === 'android' ? `http://${androidBaseUrl}:${port}${api}` : `http://${ipAdress}:${port}${api}`;
    // const baseUrl =
    //     Platform.OS === 'android'
    //         ? `http://${androidBaseUrl}:${port}${api}`
    //         : Platform.OS === 'ios'
    //         ? `http://${iOSBaseUrl}:${port}${api}`
    //         : `http://localhost:${port}${api}`;
    return baseUrl;
};

const PlatformBaseUrl = { baseApiUrl };
export default PlatformBaseUrl;