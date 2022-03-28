import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//! Drawer
import MainDrawerNavigation from './MainDrawerNavigation';
import CustomHeader from './CustomHeader';

import RootModal from '../components/Modal';

const RootStack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <RootModal />
            <RootStack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTintColor: '#404554',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                    // header: (props) => <CustomHeader {...props} />,
                }}
            >
                <RootStack.Screen name="MainDrawer" component={MainDrawerNavigation} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
