import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const GiftCardScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>GiftCardScreen</Text>
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

export default GiftCardScreen;
