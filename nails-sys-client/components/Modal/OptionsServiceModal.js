import { StyleSheet, View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
//! Icon
import IconQuit from '../../assets/icons/IconQuit';
//! theme
import theme from '../../themes/Light';
//! Actions
import { hideModal, showModal } from '../../redux/slices/modal/modalSlice';
import { removeServiceAsync } from '../../redux/slices/services/servicesSlice';

const OptionsServiceModal = (props) => {
    const { hideModal, showModal, modalProps, removeServiceAsync } = props;

    const handleClose = () => {
        console.log(`OptionsServiceModal - handleClose`);
        hideModal();
    };

    const handleRemoveService = async () => {
        console.log(`OptionsServiceModal - handleRemove`);
        await hideModal();
        showConfirmDialog();
    };

    const handleEditService = async () => {
        console.log(`OptionsServiceModal - handleEditService`);
        await hideModal();
        await showModal({ modalId: 'EDIT_SERVICE_MODAL' });
    };

    //! Alert Yes/No
    const showConfirmDialog = () => {
        return Alert.alert('Are your sure?', 'Are you sure you want to remove this Service?', [
            // The "Yes" button
            {
                text: 'Yes',
                onPress: () => {
                    console.log(`Yes`);
                    removeServiceAsync();
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: 'No',
                onPress: () => {
                    console.log(`No`);
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }} onPress={handleClose}>
                <IconQuit sizeIcon={20} theme={theme} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>Service: </Text>
                <Text style={{ fontSize: 20 }}>{modalProps?.serviceName}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>Price: </Text>
                <Text style={{ fontSize: 20 }}>{modalProps?.servicePrice}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>Content: </Text>
                <Text style={{ fontSize: 20 }}>{modalProps?.serviceContent}</Text>
            </View>
            <View style={styles.button}>
                <Button title="Edit Service" onPress={() => handleEditService()} />
            </View>
            <View style={styles.button}>
                <Button title="Remove Service" onPress={() => handleRemoveService()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: 350,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
        padding: 10,
    },
    contentContainer: {
        flex: 1,
    },
    button: {
        marginVertical: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        modalProps: state.modal.modalProps,
    };
};

const mapDispatchToProps = {
    hideModal,
    showModal,
    removeServiceAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsServiceModal);
