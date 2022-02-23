import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//! Drawer
import DrawerMenu from './DrawerMenu';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Button, View, Text } from 'react-native';

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
            //! BottomSheetModal (Global + Redux Modal)
            }
            <DrawerMenu />
        </NavigationContainer>
    );
};

export default AppNavigator;
