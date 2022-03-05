import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

//! imp reducer - actions
import { showModal, hideModal } from '../redux/slices/modal/modalSlice';

//! imp theme
import theme from '../themes/Light';

//! imp Screens
import ServicesScreen from '../screens/ServicesScreen';
import ServicecCategoryDetailsScreen from '../screens/ServicecCategoryDetailsScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import AboutScreen from '../screens/AboutScreen';

//! imp Icons
import IconAddServiceOutline from '../assets/icons/IconAddServiceOutline';
import IconAddOutline from '../assets/icons/IconAddOutline';
import IconEditOutline from '../assets/icons/IconEditOutline';


const ServicesNavigator = (props) => {
    const { navigation, route, modalId, showModal, hideModal } = props;
    // console.log(`ServicesNavigator - route: `, route);
    
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ServicesStack"
                component={ServicesScreen}
                options={{
                    headerLeft: (props) => null,
                    headerRight: () => (
                        <View style={{ marginRight: 5 }}>
                            <TouchableOpacity
                                style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    console.log(`ServicesStack - CREATE_SERVICE_CATEGORY_MODAL`);
                                    showModal({ modalId: 'CREATE_SERVICE_CATEGORY_MODAL' });
                                }}
                            >
                                <IconAddOutline sizeIcon={24} theme={theme} />
                            </TouchableOpacity>
                            {/* <ButtonCreate size={25} onPress={() => {}}/> */}
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ServicecCategoryDetails"
                component={ServicecCategoryDetailsScreen}
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
                                <IconAddServiceOutline sizeIcon={24} theme={theme} />
                            </TouchableOpacity>
                            {/* <ButtonCreate size={25} onPress={() => {}}/> */}
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ServicecDetails"
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
                            {/* <ButtonCreate size={25} onPress={() => {}}/> */}
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
