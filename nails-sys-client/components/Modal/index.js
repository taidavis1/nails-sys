// import CreateServiceCategoryModal from './CreateServiceCategoryModal';
// export { CreateServiceCategoryModal };
import { StyleSheet, Keyboard, View, Text, Modal } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
//! imp Actions
import { showModal, hideModal } from '../../redux/slices/modal/modalSlice';

//! imp Modals
import CreateServiceCategoryModal from './CreateServiceCategoryModal';
import CreateServiceModal from './CreateServiceModal';
import EditServiceModal from './EditServiceModal';

const RootModal = (props) => {
    const { modalId, showModal, hideModal } = props;

    const MODAL_COMPONENTS = {
        CREATE_SERVICE_CATEGORY_MODAL: CreateServiceCategoryModal,
        CREATE_SERVICE_MODAL: CreateServiceModal,
        EDIT_SERVICE_MODAL: EditServiceModal,
    };

    //! no Id in store
    //! assign a constant that is either one of our custom views or a noop function if the id is not set
    //! if no set id empty const ModalView = MODAL_COMPONENTS[id] || function () {};

    if (!modalId) {
        return null;
    }

    const ModalView = MODAL_COMPONENTS[modalId];

    //! show the Modal if the id is set to a truthy value
    return (
        <Modal visible={Boolean(modalId)} animationType="fade" testID="modals" transparent={true}>
            <View style={styles.container}>
                <ModalView />
            </View>
            {/* <View
                style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'space-between',
                }}
            >
            </View> */}
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        modalId: state.modal.modalId,
    };
};

const mapDispatchToProps = {
    showModal,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootModal);
