import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

import theme from '../../themes/Light';
//! Actions
import { hideModal } from '../../redux/slices/modal/modalSlice';
import { updateServiceAsync } from '../../redux/slices/services/servicesSlice';
// import { removeServiceAsync } from '../../redux/slices/services/servicesSlice'; //!EDIT

const EditServiceModal = (props) => {
    const { modalProps, hideModal, updateServiceAsync } = props;
    const [visiable, setVisiable] = React.useState(false);

    // console.log(`EditServiceModal - modalProps: `, modalProps);
    const [values, setValues] = React.useState({
        name: modalProps.serviceName,
        price: String(modalProps.servicePrice),
        description: modalProps.serviceDesc,
    });

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
        if (values.name !== value) {
            setVisiable(true);
        }
    };

    const handleApply = () => {
        updateServiceAsync({ name: values.name, price: values.price, description: values.description });
        setVisiable(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Edit Service</Text>
            </View>
            <View style={styles.inputControl}>
                <Text>Service name:</Text>
                <TextInput style={styles.input} onChangeText={(text) => handleChange('name', text)} value={values.name} />
            </View>
            <View style={styles.inputControl}>
                <Text>Price</Text>
                <TextInput style={styles.input} onChangeText={(text) => handleChange('price', text)} value={values.price} />
            </View>
            <View style={styles.inputControl}>
                <Text>Description</Text>
                <TextInput style={styles.input} onChangeText={(text) => handleChange('description', text)} value={values.description} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => hideModal()}>
                    <Text style={styles.button}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleApply()}>
                    <Text style={[styles.button, { color: visiable ? theme.colors.success : theme.colors.grey }]}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: 350,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    contentContainer: {
        flex: 1,
    },
    inputControl: {
        padding: 20,
    },
    input: {},
    footer: {
        flexDirection: 'row-reverse',
    },
    button: {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        margin: 15,
        color: theme.colors.success,
    },
});

const mapStateToProps = (state) => {
    return {
        modalProps: state.modal.modalProps,
    };
};

const mapDispatchToProps = {
    hideModal,
    updateServiceAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceModal);
