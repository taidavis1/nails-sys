import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//! Drawer
import MainDrawerNavigation from './MainDrawerNavigation';
import CustomHeader from './CustomHeader';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTintColor: '#404554',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    header: (props) => {
                        //! props Stack
                        return <CustomHeader {...props} />;
                    },
                }}
            >
                <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
