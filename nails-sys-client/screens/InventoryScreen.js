import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const InventoryScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>InventoryScreen</Text>
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

export default InventoryScreen;
