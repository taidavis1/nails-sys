import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! sass
import Color from '../constants/color';
import Grid from '../constants/layout/grid';


const CategoryItem = (props) => {
    const touchHandler = () => {
    }
    return (
        <TouchableOpacity activeOpacity={0.5} style={!props.empty ? styles.item : [styles.item, styles.itemInvisible]} onPress={touchHandler}>
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
        height: Dimensions.get('window').width / Grid.numColumns,
        flex: 1,
        backgroundColor: Color.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.35,
        padding: 20,
        borderRadius: 10,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
    },
    itemText: {
        color: Color.mainText,
    },
});

export default CategoryItem;
