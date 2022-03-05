//! database
import { drawerItemsMain } from './app-routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent.js';

//! imp screens
import HomeScreen from '../screens/HomeScreen';
import Settings1 from '../screens/Settings1';
import Settings2 from '../screens/Settings2';

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings1" component={Settings1} />
            <Drawer.Screen name="Settings2" component={Settings2} />
        </Drawer.Navigator>
    );
}

export default MainDrawerNavigation;
