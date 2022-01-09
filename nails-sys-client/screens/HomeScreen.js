import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



const navigateToCategory = (props) => {
    props.navigation.navigate('Category');
};

const HomeScreen = (props) => {
    console.log(props);
    return (
        <View style={styles.screen}>
            <Text>Hello World</Text>
            <Button title="Category" onPress={navigateToCategory.bind(this, props)} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default HomeScreen;
