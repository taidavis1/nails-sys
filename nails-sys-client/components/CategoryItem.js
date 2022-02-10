import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! sass
import Colors from '../constants/color';
import Grid from '../constants/layout/grid';

const CategoryItem = ({ item, empty, style }) => {
    const touchHandler = () => {};
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={touchHandler}
            style={!empty ? [styles.item, style] : [styles.item, styles.itemInvisible, style]}
        >
            <View>
<<<<<<< HEAD
                <Text style={styles.itemText}>{!props.empty && props.item.id && props.item.id}</Text>
                <Text style={styles.itemText}>{!props.empty && props.item.name_cat && props.item.name_cat}</Text>
=======
                <Text style={styles.itemText}>{!empty && item.id && item.id}</Text>
                <Text style={styles.itemText}>{!empty && item.username && item.username}</Text>
>>>>>>> e90e1993c7a5ad3aa381fe01152a798945efe1fa
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
