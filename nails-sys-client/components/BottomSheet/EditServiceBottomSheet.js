import { StyleSheet, View, Text, Dimensions } from 'react-native';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

// var bottomSheetWidth =

const EditServiceBottomSheet = ({ bottomSheetRef, snapPoints, onClose }) => {
    React.useEffect(() => {
        if (screenWidth >= 768) {
            //! Tablet >= 768
            var snapPointValue = '35%';
            if (screenWidth >= 768) {
                //! Tablet >= 768
                snapPointValue = '75%';
            }
        }
    }, []);

    // ref
    const bottomSheetRef = React.useRef(null);

    // variables
    const snapPoints = React.useMemo(() => [snapPointValue], []);

    // callbacks
    const handleSheetChanges = React.useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // callbacks
    const handleExpand = React.useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleClose = React.useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    //! Responsive
    const screenWidth = Dimensions.get('window').width;
    var bottomInset = 0;
    var detached = false;
    let styles = {
        sheetContainer: {
            marginHorizontal: 0,
        },
    };

    if (screenWidth >= 768) {
        //! Tablet >= 768
        bottomInset = 700;
        detached = true;
        styles.sheetContainer.marginHorizontal = 24;
    }

    React.useEffect(() => {}, []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            detached={detached}
            onClose={onClose}
            style={styles.sheetContainer}
            bottomInset={bottomInset}
        >
            <View style={styles.sheetContainerStyle}>
                <Text>Awesome 🎉</Text>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default EditServiceBottomSheet;
