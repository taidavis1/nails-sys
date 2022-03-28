import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

import theme from '../../themes/Light';
//! Actions
import { hideModal } from '../../redux/slices/modal/modalSlice';
import { addSubCategoryAsync } from '../../redux/slices/services/servicesSlice';

const CreateSubCategoryModal = (props) => {
    const [values, setValues] = React.useState({
        name: '',
    });

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleCreate = () => {
        props.addSubCategoryAsync({ name: values.name });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>CREATE SUBCATEGORY</Text>
            </View>
            <View style={styles.inputControl}>
                <Text>Name:</Text>
                <TextInput style={styles.input} onChangeText={(text) => handleChange('name', text)} value={values.name} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => props.hideModal()}>
                    <Text style={styles.button}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCreate()}>
                    <Text style={[styles.button, { color: theme.colors.success }]}>Create</Text>
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
    addSubCategoryAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubCategoryModal);
