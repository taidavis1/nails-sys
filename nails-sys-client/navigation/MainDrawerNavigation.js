//! database
import { drawerItemsMain } from './app-routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

//! imp screens
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            {
                //! Settings
            }
            <Drawer.Screen name="Services" component={ServicesScreen} />
            <Drawer.Screen name="Home2" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default MainDrawerNavigation;
