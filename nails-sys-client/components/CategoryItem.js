import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! sass
import Colors from '../constants/color';
import Grid from '../constants/layout/grid';

const CategoryItem = (props) => {
    const touchHandler = () => {};
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={touchHandler}
            style={!props.empty ? [styles.item, props.style] : [styles.item, styles.itemInvisible, props.style]}
        >
            <View>
                <Text style={styles.itemText}>{!props.empty && props.item.id && props.item.id}</Text>
                <Text style={styles.itemText}>{!props.empty && props.item.username && props.item.username}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screen: {},
    item: {
        width: Dimensions.get('window').width / Grid.numColumns,
        height: Dimensions.get('window').width / Grid.numColumns,
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
