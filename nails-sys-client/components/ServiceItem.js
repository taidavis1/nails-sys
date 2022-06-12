import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//! update ModalProps
import { setModalProps } from '../redux/slices/modal/modalSlice';

const ServiceItem = (props) => {
    //@props:
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.container}>
            <View style={[props.style, { backgroundColor: props.colorButton }]}>
                {
                    //! SERVICE ITEM
                }
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.itemText, { color: "black" }]}>{props?.title}</Text>
                    </View>
                    <View style={{ borderWidth: 1, width: '50%', height: '60%', backgroundColor: 'white', borderRadius: 5 }}>
                        {
                            //! IMAGE
                        }
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {
                        //! PRICE
                    }
                    <Text style={[styles.itemText, { color: "black" }]}>{props?.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItem);
