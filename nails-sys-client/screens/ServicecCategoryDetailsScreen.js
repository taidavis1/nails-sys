import { StyleSheet, Dimensions, View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

//! imp Comps
import ServiceItem from '../components/ServiceSectionList/ServiceItem';
import EditServiceBottomSheet from '../components/Modal/EditServiceBottomSheet';

//! imp Actions
import { setModalProps } from '../redux/slices/modal/modalSlice';
import { getServiceCategoriesAsync } from '../redux/slices/services/servicesSlice';

const ServicecCategoryDetailsScreen = (props) => {
    const { navigation, route, getServiceCategoriesAsync, serviceCategories, setModalProps } = props;
    
    const { colorIndex } = route.params;
    const [isOpen, setIsOpen] = React.useState(false);
    const [buttonWidth, setButtonWidth] = React.useState(((Dimensions.get('window').width * 65) / 100 - 50) / 4);
    const [numColumns, setNumColumns] = React.useState(4);
    
    //! Response
    const screenWidth = Dimensions.get('window').width;
    var snapPointValue = '35%';

    if (screenWidth >= 768) {
        //! Tablet >= 768
        if (screenWidth >= 768) {
            //! Tablet >= 768
            snapPointValue = '75%';
        }
    }

    //__ DEBUG
    // console.log(`ServicecCategoryDetailsScreen - route.params?._id`, route.params?._id)
    // console.log(`ServicecCategoryDetailsScreen - route: `, route);



    React.useEffect(() => {
    }, []);

    React.useEffect(() => {
        getServiceCategoriesAsync();
        setModalProps({ serviceCategoryId: route.params?._id });
        //!__DEBUG
        // console.log(`ServicecCategoryDetailsScreen - serviceCategories: `, serviceCategories);
    }, []);

    const selectedServiceCategory = serviceCategories.find((sc) => sc._id === route.params?._id);
    //!__DEBUG
    // console.log(`ServicecCategoryDetailsScreen - selectedServiceCategory: `, selectedServiceCategory.services)
    const services = selectedServiceCategory.services;

    const formatData = (data, numColumns) => {
        console.log(`data: `, data);
        let numberOfFullRows = Math.floor(data.length / numColumns); //! chia lay nguyen

        //!___DEBUG
        console.log(`numberOfFullRows: `, numberOfFullRows);

        console.log(`data.length: `, data.length);

        //! phan tu le
        let numberOfElementLastRows = data.length - numberOfFullRows * numColumns;

        while (numberOfElementLastRows !== 0 && numberOfElementLastRows !== numColumns) {
            // data.push({ name: `blank-${numberOfElementLastRows}`, empty: true });
            data = [...data, { name: 'black', empty: true }];
            numberOfElementLastRows += 1;
        }
        return data;
    };

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

    const handleEditService = () => {
        console.log(`onLongPress`);
    };

    const ServiceItemWithEmpty = (serviceData) => {
        if (serviceData.item.empty === true) {
            return <ServiceItem service={serviceData.item} empty={true} />;
        }
        return <ServiceItem colorIndex={colorIndex} service={serviceData.item} navigation={navigation} onLongPress={handleExpand} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item._id}
                data={formatData(services, numColumns)}
                // data={categories}
                style={styles.container}
                renderItem={(serviceData) => ServiceItemWithEmpty(serviceData)}
                numColumns={numColumns}
            />

            <EditServiceBottomSheet bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} onChange={handleSheetChanges} onPress={handleClose}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sheetContainer: {
        // add horizontal space
        marginHorizontal: 24,
    },
});

const mapStateToProps = (state) => {
    return {
        serviceCategories: state.service.serviceCategories,
    };
};

const mapDispatchToProps = {
    setModalProps,
    getServiceCategoriesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicecCategoryDetailsScreen);
