import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

//! imp reducer - actions
import { showModal, hideModal } from '../redux/slices/modal/modalSlice';

//! imp theme
import theme from '../themes/Light';

//! imp Screens
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import AboutScreen from '../screens/AboutScreen';

//! imp Icons
import IconAddServiceOutline from '../assets/icons/IconAddServiceOutline';
import IconBarsOutline from '../assets/icons/IconBarsOutline';
import IconAddOutline from '../assets/icons/IconAddOutline';
import IconEditOutline from '../assets/icons/IconEditOutline';

const Stack = createStackNavigator();

const ServicesNavigator = (props) => {
    const { navigation, route, modalId, showModal, hideModal } = props;
    // console.log(`ServicesNavigator - route: `, route);

    return (
        <Stack.Navigator initialRouteName="ServicesStack" screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen
                name="ServicesStack"
                component={ServicesScreen}
                options={({ navigation }) => ({
                    // headerLeft: () => <IconBarsOutline sizeIcon={24} theme={theme} onPress={() => props.navigation.toggleDrawer()} />,
                    headerLeft: () => (
                        <IconBarsOutline style={{ marginLeft: 15 }} sizeIcon={24} theme={theme} onPress={() => navigation.toggleDrawer()} />
                    ),
                    headerRight: () => (
                        <IconAddServiceOutline
                            style={{ marginRight: 5 }}
                            sizeIcon={24}
                            theme={theme}
                            onPress={() => {
                                console.log(`ServicesStack - CREATE_SERVICE_MODAL`);
                                showModal({ modalId: 'CREATE_SERVICE_MODAL' });
                            }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="ServiceDetails"
                component={ServiceDetailsScreen}
                options={{
                    // headerLeft: (props) => null,
                    headerRight: () => (
                        <View style={{ marginRight: 5 }}>
                            <TouchableOpacity
                                style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    console.log(`ServicesStack - CREATE_SERVICE_MODAL`);
                                    showModal({ modalId: 'CREATE_SERVICE_MODAL' });
                                }}
                            >
                                <IconEditOutline sizeIcon={24} theme={theme} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen name="StackAbout" component={AboutScreen} />
        </Stack.Navigator>
    );
};

// const screenOptionStyle = StyleSheet.create({
//     headerStyle: {
//         backgroundColor: '#9AC4F8',
//     },
//     headerTintColor: 'white',
//     headerBackTitle: 'Back',
// });

const mapStateToProps = (state) => {
    return {
        modalId: state.modal.modalId,
    };
};

const mapDispatchToProps = {
    showModal,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesNavigator);
