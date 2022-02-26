import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import React from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { connect } from 'react-redux';

import IconQuit from '../../assets/icons/IconQuit';
//! theme
import theme from '../../themes/Light';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditServiceBottomSheet = (props) => {
    const { bottomSheetRef, snapPoints, onPress, modalProps } = props;
    const [name, setName] = React.useState('');

    //! Responsive
    const screenWidth = Dimensions.get('window').width;
    var bottomInset = 0;
    var detached = false;
    let sheetStyles = {
        marginHorizontal: 0,
    };

    if (screenWidth >= 768) {
        //! Tablet >= 768
        bottomInset = 700;
        detached = true;
        sheetStyles.marginHorizontal = 24;
    }
    //!___DEBUG
    // console.log(`EditServiceBottomSheet - modalProps: `, modalProps);

    React.useEffect(() => {}, []);

    const handleEditService = () => {
        console.log(`EditServiceBottomSheet - handleEditService`);
    };

    const handleRemoveService = () => {
        console.log(`EditServiceBottomSheet - handleRemoveService`);
    };

    // renders Backdrop
    const renderBackdrop = React.useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            detached={detached}
            bottomInset={bottomInset}
            backdropComponent={renderBackdrop}
            style={[styles.sheetContainer, sheetStyles]}
        >
            <View style={styles.contentContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }} onPress={onPress}>
                    <IconQuit sizeIcon={20} theme={theme} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>Service: </Text>
                    <Text style={{ fontSize: 20 }}>{modalProps?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>Price: </Text>
                    <Text style={{ fontSize: 20 }}>{modalProps?.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>Content: </Text>
                    <Text style={{ fontSize: 20 }}>{modalProps?.content}</Text>
                </View>
                <View style={styles.button}>
                    <Button title="Edit Service" onPress={() => console.log(`Edit Service`)} />
                </View>
                <View style={styles.button}>
                    <Button title="Remove Service" onPress={() => console.log(`Remove Service`)} />
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheetContainer: {},
    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
        // alignItems: 'center',
    },
    button: {
        marginVertical: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        // serviceCategories: state.service.serviceCategories,
        modalProps: state.modal.modalProps,
    };
};

const mapDispatchToProps = {
    // setModalProps,
    // getServiceCategoriesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceBottomSheet);
