import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';

function CustomHeader(props) {
    const toggleDrawer = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={toggleDrawer} style={styles.leftButton} testID="CustomHeader-toggleDrawer">
                        <Text style={styles.buttonTxt}>MENU</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>HEADER</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#222222',
        minHeight: 40,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    leftButton: {
        marginLeft: 10,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 40,
    },
    buttonTxt: {
        color: '#ddd',
        fontWeight: 'bold',
        height: 20,
    },
    headerTxt: {
        color: '#ddd',
    },
});

export default CustomHeader;
