import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//! themes
import theme from '../../themes/Light';
//! Stack
import Stack from './Stack';

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack />
            {/* <DrawerMenu /> */}
        </NavigationContainer>
    );
};

export default AppNavigator;
