import { StyleSheet, View, Text, Dimensions, Button, Alert } from 'react-native';
import React from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';

import IconQuit from '../../assets/icons/IconQuit';
//! theme
import theme from '../../themes/Light';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditServiceBottomSheet = React.forwardRef((props, ref) => {
    const { onPress } = props;

    const dispatch = useDispatch();
    const { modalProps } = useSelector((state) => state.modal);
    // const [name, setName] = React.useState('');

    // console.log(`EditServiceBottomSheet - modalProps: `, modalProps);
    const screenWidth = Dimensions.get('window').width;

    //! Response
    var snapPointValue = '35%';

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

    if (screenWidth >= 768) {
        //! Tablet >= 768
        snapPointValue = '75%';
    }

    // ref
    const bottomSheetRef = React.useRef(null);

    // variables
    const snapPoints = React.useMemo(() => [snapPointValue], []);

    //!___DEBUG
    // console.log(`EditServiceBottomSheet - modalProps: `, modalProps);
    //!=====================================================================

    const handleExpand = () => {
        bottomSheetRef.current.expand();
    };

    const handleClose = () => {
        bottomSheetRef.current.close();
    };

    React.useImperativeHandle(ref, () => {
        return {
            expand: handleExpand,
        };
    });

    // renders Backdrop
    const renderBackdrop = React.useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

    //! Alert Yes/No
    const showConfirmDialog = () => {
        return Alert.alert('Are your sure?', 'Are you sure you want to remove this Service?', [
            // The "Yes" button
            {
                text: 'Yes',
                onPress: () => {
                    console.log(`Yes`);
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: 'No',
                onPress: () => {
                    console.log(`No`);
                    bottomSheetRef.current.expand();
                },
            },
        ]);
    };

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
                    <Button title="Edit Service" onPress={() => console.log(`Edit Service`)} />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Remove Service"
                        onPress={() => {
                            bottomSheetRef.current.close();
                            showConfirmDialog();
                        }}
                    />
                </View>
            </View>
        </BottomSheet>
    );
});

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

// const mapStateToProps = (state) => {
//     return {
//         // serviceCategories: state.service.serviceCategories,
//         modalProps: state.modal.modalProps,
//     };
// };

// const mapDispatchToProps = {
//     // setModalProps,
//     // getServiceCategoriesAsync,
// };

export default EditServiceBottomSheet;
