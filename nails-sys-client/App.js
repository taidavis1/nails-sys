import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
//! themes -> useTheme
import theme from './themes/Light';
import { Provider } from 'react-redux';
import store from './redux/store';


//! imp Navigation
import { AppNavigator } from './navigation';

export default function App() {

    const styles = {
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight,
            paddingBottom: StatusBar.currentHeight / 2,
            //! Barbottom
            backgroundColor: theme.colors.primary,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        innerContainer: {
            justifyContent: 'flex-start',
            padding: 15,
        },
        avatar: {
            width: 60,
            height: 60,
            borderRadius: 10,
            // marginTop: 10,
        },
        username: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.black,
        },
    };

    return (
        <SafeAreaView style={style.container}>
            <Provider store={store}>
                    <AppNavigator />
            </Provider>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
});
