import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

const ActiveButton = (props) => {
    const onPress = () => {
        //!  props: onPress, style,
        //! colorButton, title, activeIndex, activeColorButton,
    };
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={[styles.categoryItem, props.style, { backgroundColor: props?.index === props.activeIndex ? (props?.activeColorButton ? props.activeColorButton : '#A0A0A0') : props.colorButton }]}>
                {props.title ? <Text style={[styles.itemText, {color: props.style?.color}]}>{props.title}</Text> : { children }}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        // padding: 10,
        borderRadius: 10,
    },
    itemText: {
        color: 'black',
    },
});

export default ActiveButton;
