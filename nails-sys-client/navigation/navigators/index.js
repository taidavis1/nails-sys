import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//! Drawer
import DrawerMenu from './DrawerMenu';

//! Modal
import RootModal from '../../components/Modal'

const AppNavigator = () => {
    return (
        <NavigationContainer>
            {
            //! Modals
            }
            <RootModal />
            <DrawerMenu />
        </NavigationContainer>
    );
};

export default AppNavigator;
