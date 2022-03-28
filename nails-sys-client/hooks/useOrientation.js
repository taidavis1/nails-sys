import { Dimensions } from 'react-native';

export default useOrientation = () => {
    const [screenInfo, setScreenInfo] = useState(Dimensions.get('window'));
    console.log(`Dimensions.get('window'): `, Dimensions.get('window'));
    
};
