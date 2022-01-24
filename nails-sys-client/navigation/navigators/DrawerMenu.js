import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import  from './components/globalStyles';
//! theme
import theme from '../../themes/Light';

//! icons
// import IconAppointmentOutline from './assets/icons/IconAppointmentOutline';
// import IconHomeOutline from './assets/icons/IconHomeOutline';
// import IconManageOutline from './assets/icons/IconManageOutline';
// import IconServicesOutline from './assets/icons/IconServicesOutline';
// import IconSettingOutline from './assets/icons/IconSettingOutline';
// import IconSignoutOutline from './assets/icons/IconSignoutOutline';
// import IconTurnTrackingOutline from './assets/icons/IconTurnTrackingOutline';
// import IconExtensions from './assets/icons/IconExtensions';

//! navigation/navigators
// import TabButton from './components/TabButton';
import DrawerContent from './DrawerContent';

//! screens
// import AppointmentScreen from './screens/AppointmentScreen';
import HomeScreen from '../../screens/HomeScreen';
// import ManageScreen from './screens/ManageScreen';
import ServicesScreen from '../../screens/ServicesScreen';
// import SettingScreen from './screens/SettingScreen';
// import TurnTrackingScreen from './screens/TurnTrackingScreen';

const DrawerMenu = (props) => {
    const [activeIndex, setActiveIndex] = React.useState(0); //! 0 = Home
    // const tabButtons = [
    //     {
    //         icon: <IconHomeOutline sizeIcon={25} />,
    //         title: 'Home',
    //     },
    //     {
    //         icon: <IconServicesOutline sizeIcon={25} />,
    //         title: 'Services',
    //     },
    //     {
    //         icon: <IconTurnTrackingOutline sizeIcon={25} />,
    //         title: 'Turn Tracking',
    //     },
    //     {
    //         icon: <IconAppointmentOutline sizeIcon={25} />,
    //         title: 'Appointment',
    //     },
    //     {
    //         icon: <IconManageOutline sizeIcon={25} />,
    //         title: 'Manage',
    //     },
    //     {
    //         icon: <IconSettingOutline sizeIcon={25} />,
    //         title: 'Setting',
    //     },
    // ];
    // /* <NavItem icon={<IconHomeOutline style={{ width: 25, height: 25 }} />}>Home</NavItem> */

    const Drawer = createDrawerNavigator();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.boxBackground }}>
            <Drawer.Navigator
                hideStatusBar={true}
                drawerContent={(props) => {
                    return (
                        <DrawerContent
                            navigation={props.navigation}
                            theme={theme}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            {...props}
                        />
                    );
                }}
                initialRouteName="Services"
                screenOptions={{
                    drawerStyle: {
                        width: '60%',
                        backgroundColor: theme.colors.boxBackground,
                    },
                    // overlayColor : 1 //! ???
                    // headerShown: false,
                    sceneContainerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    // options={{
                    //     headerShown: false,
                    // }}
                >
                    {(props) => <HomeScreen {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="Services">{(props) => <ServicesScreen {...props} />}</Drawer.Screen>
            </Drawer.Navigator>
        </View>
    );
};

export default DrawerMenu;
