import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const ServiceItem = (props) => {
    //! props: navigation, route, theme, style, item, empty
    //! props Redux:

    // const { style, navigation, item, colorIndex, empty, onLongPress, showModal } = props;
    // console.log(`ServiceCategoryItem-serviceCategory: `, serviceCategory);

    //! RESPONSIVE
    const serviceStyle = {
        height: (Dimensions.get('window').width * 25) / 100,
    };

    const onPress = () => {
        // props.navigation.navigate({ name: 'ServiceDetails', params: { service: props.item } });
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'ServiceDetails',
                params: {
                    service: props.item,
                },
            })
        );
    };

    const onLongPress = () => {
        console.log(`ServiceItem - handleLongPress -> LongPress`); //! OK
    };
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onLongPress={onLongPress} onPress={onPress}>
            <View style={props.empty ? [styles.item, styles.itemInvisible, props.style] : [styles.item, props.style, serviceStyle]}>
                <Text style={styles.itemText}>{!props.empty && props.item.name && props.item.name}</Text>
                <Text style={styles.itemText}>{!props.empty && props.item.price && props.item.price + ' $'} </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'red',
        padding: 5,
        margin: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
    },
    itemInvisible: {
        flex: 1,
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
    },
    itemText: {
        color: 'white',
    },
});

export default ServiceItem;
