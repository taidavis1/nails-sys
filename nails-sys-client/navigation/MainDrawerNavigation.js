//! database
import { useWindowDimensions } from 'react-native';
import { drawerItemsMain } from './app-routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

//! imp screens
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import TurnTrackingScreen from '../screens/TurnTrackingScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import InventoryScreen from '../screens/InventoryScreen';
import GiftCardScreen from '../screens/GiftCardScreen';

//! imp Navigation Screen
import ServicesNavigator from '../navigation/services.navigator';

//! theme
import theme from '../themes/Light';

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    return (
        <Drawer.Navigator
        //! ANCHOR
            initialRouteName="Services"
            screenOptions={{
                drawerStyle: {
                    width: isLargeScreen ? '25%' : '60%',
                    // width: '60%',
                    backgroundColor: theme.colors.boxBackground,
                },
                // overlayColor : 1 //! ???
                headerShown: false, //! Visiable Header
                sceneContainerStyle: {
                    backgroundColor: 'transparent',
                },
                drawerType: isLargeScreen ? 'permanent' : 'front', //! parmanent: đẩy screen, //! front: đè lên screen
                // drawerType: 'front',
                overlayColor: 'transparent',
            }}
            drawerContent={(props) => <CustomDrawerContent drawerItems={drawerItemsMain} theme={theme} {...props} />}
        >
            {
                //! HOME
            }
            <Drawer.Screen name="Home" component={HomeScreen} />
            {
                //! SERVICES
            }
            <Drawer.Screen name="Services" component={ServicesNavigator} />
            {
                //! TURN TRACKING
            }
            <Drawer.Screen name="TurnTracking" component={TurnTrackingScreen} />
            {
                //! EMPLOYEES
            }
            <Drawer.Screen name="Employees" component={EmployeesScreen} />
            {
                //! INVENTORY
            }
            <Drawer.Screen name="Inventory" component={InventoryScreen} />
            {
                //! EMPLOYEES
            }
            <Drawer.Screen name="GiftCard" component={GiftCardScreen} />
        </Drawer.Navigator>
    );
}

export default MainDrawerNavigation;
