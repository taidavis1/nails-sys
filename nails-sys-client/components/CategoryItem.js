import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! sass
import Colors from '../constants/color';

const CategoryItem = ({ item, empty, style }) => {
    const touchHandler = () => {};
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={touchHandler}
            style={!empty ? [styles.item, style] : [styles.item, styles.itemInvisible, style]}
        >
            <View>
                <Text style={styles.itemText}>{!empty && item.id && item.id}</Text>
                <Text style={styles.itemText}>{!empty && item.username && item.username}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screen: {},
    item: {

        width: (Dimensions.get('window').width * 65 / 100 - 50) / 4,
        height: (Dimensions.get('window').width * 40 / 100 - 50) / 4,
        // flex: 1,
        backgroundColor: Colors.brandLight,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        padding: 10,
        borderRadius: 10,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
    },
    itemText: {
        color: Colors.mainText,
    },
});

export default CategoryItem;