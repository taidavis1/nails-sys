import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! sass
import Color from '../constants/color';
import Grid from '../constants/layout/grid';

const RenderItem = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={!props.empty ? styles.item : [styles.item, styles.itemInvisible]}>
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
        flex: 1,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        height: Dimensions.get('window').width / Grid.numColumns,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: Color.mainText,
    },
});

console.log(styles.item.height);

export default RenderItem;
