import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const EmployeesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>EmployeesScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EmployeesScreen;
