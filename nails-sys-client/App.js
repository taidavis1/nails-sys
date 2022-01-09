import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useCachedResources from './hooks/useCachedResources';

//! comps
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import CategoryScreen from './screens/CategoryScreen';

const App = () => {
    //! expo fetch Fonts
    useCachedResources();

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Category">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>

        // <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        //     <View>
        //         <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#141466' }}>NAILSYS</Text>
        //     </View>
        //     <TouchableOpacity
        //         activeOpacity={0.75}
        //         style={{
        //             backgroundColor: '#6677CC',
        //             width: '90%',
        //             padding: 20,
        //             borderRadius: 5,
        //             flexDirection: 'row',
        //             justifyContent: 'space-between',
        //         }}
        //     >
        //         <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', fontFamily: 'Roboto-MediumItalic' }}>Let's Begin</Text>
        //         <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
        //     </TouchableOpacity>
        // </SafeAreaView>

    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});