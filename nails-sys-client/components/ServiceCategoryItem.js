import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! update ModalProps
import { setModalProps } from '../redux/slices/modal/modalSlice';

const ServiceCategoryItem = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View
                style={[
                    styles.categoryItem,
                    props.style,
                    {
                        backgroundColor:
                            props?.index === props.activeIndex ? (props?.activeColorButton ? props.activeColorButton : '#A0A0A0') : props.colorButton,
                    },
                ]}
            >
                <Text style={[styles.itemText, { color: props.style?.color }]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginVertical: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        borderRadius: 10,
    },
    itemText: {
        color: 'black',
    },
});

const mapStateToProps = (state) => {
    return {
        // modalProps: state.modal.modalProps,
    };
};

const mapDispatchToProps = {
    setModalProps,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCategoryItem);
