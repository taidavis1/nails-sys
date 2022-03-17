import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerActions, useRoute } from '@react-navigation/native';

function CustomHeader(props) {

    const route = useRoute();
    React.useEffect(() => { //This will run whenever params change
         const {params = {}} = route;
        //your logic here
    }, [route]);


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
    surface: {
        padding: 8,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
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
