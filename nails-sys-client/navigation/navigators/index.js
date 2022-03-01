import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//! Drawer
import DrawerMenu from './DrawerMenu';

//! Modal
import RootModal from '../../components/Modal'

const AppNavigator = () => {
    // // ref
    // const bottomSheetModalRef = React.useRef(null);

    // // variables
    // const snapPoints = React.useMemo(() => ['25%', '50%'], []);

    // // callbacks
    // const handlePresentModalPress = React.useCallback(() => {
    //     bottomSheetModalRef.current?.present();
    // }, []);
    // const handleSheetChanges = React.useCallback((index) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

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
