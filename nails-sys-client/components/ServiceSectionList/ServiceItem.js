import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { showModal } from '../../redux/slices/modal/modalSlice';

//! theme
import theme from '../../themes/Light';

const ServiceItem = (props) => {
    const { style, navigation, service, colorIndex, empty, onLongPress, showModal } = props;
    // console.log(`ServiceCategoryItem-serviceCategory: `, serviceCategory);
    const handleTouch = () => {
        navigation?.navigate('ServicecDetails', { service: service, colorIndex: colorIndex });
    };

    const handleLongPress = () => {
        // console.log(`ServiceItem - handleLongPress -> LongPress`); //! OK
        // showModal({
        //     modalId: 'OPTIONS_SERVICE_MODAL',
        //     modalProps: {
        //         serviceCategoryId: service.category,
        //         serviceId: service._id,
        //         serviceName: service.name,
        //         servicePrice: service.price,
        //         serviceDesc: service.description,
        //     },
        // });
    };

    const styles = {
        screen: {},
        item: {
            width: ((Dimensions.get('window').width * 65) / 100 - 50) / 4,
            height: ((Dimensions.get('window').width * 45) / 100 - 50) / 4,
            // flex: 1,
            backgroundColor: theme.colors.service[colorIndex],
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
            color: 'white',
        },
    };

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={handleLongPress}
            onPress={() => handleTouch()}
            style={empty ? { ...styles.itemInvisible, ...style } : { ...styles.item, ...style }}
        >
            <View>
                <Text style={styles.itemText}>{!empty && service.name && service.name}</Text>
                <Text style={styles.itemText}>{!empty && service.price && service.price + ' $'} </Text>
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = (state) => {
    return {
        // serviceCategories: state.service.serviceCategories,
    };
};

const mapDispatchToProps = {
    showModal,
    // getServiceCategoriesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItem);
