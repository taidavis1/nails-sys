import React from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

//! imp Comps
import ServiceItem from '../components/ServiceSectionList/ServiceItem';

//! imp Actions
import { setModalProps } from '../redux/slices/modal/modalSlice';
import { getServiceCategoriesAsync } from '../redux/slices/services/servicesSlice';

const ServicecCategoryDetailsScreen = (props) => {
    const { navigation, route, getServiceCategoriesAsync, serviceCategories, setModalProps } = props;

    const { colorIndex } = route.params;
    const [buttonWidth, setButtonWidth] = React.useState(((Dimensions.get('window').width * 65) / 100 - 50) / 4);
    const [numColumns, setNumColumns] = React.useState(4);

    React.useEffect(() => {
        getServiceCategoriesAsync();
        setModalProps({ serviceCategoryId: route.params.id });
    }, []);

    // console.log(`ServicecCategoryDetailsScreen - route.params?._id: `, route.params?._id) //! OK
    //! ERROR
    const selectedServiceCategory = serviceCategories.find((sc) => sc._id === route.params.id);

    const formatData = (data, numColumns) => {
        let numberOfFullRows = Math.floor(data.length / numColumns); //! chia lay nguyen

        let numberOfElementLastRows = data.length - numberOfFullRows * numColumns;

        while (numberOfElementLastRows !== 0 && numberOfElementLastRows !== numColumns) {
            data = [...data, { name: 'black', empty: true }];
            numberOfElementLastRows += 1;
        }
        return data;
    };

    const ServiceItemWithEmpty = (serviceData) => {
        if (serviceData.item.empty === true) {
            return <ServiceItem service={serviceData.item} empty={true} />;
        }
        return <ServiceItem colorIndex={colorIndex} service={serviceData.item} navigation={navigation} onLongPress={() => handle} />;
    };

    return (
        <View style={styles.container}>
            {selectedServiceCategory.services && (
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={formatData(selectedServiceCategory.services, numColumns)}
                    // data={categories}
                    style={styles.container}
                    renderItem={(serviceData) => ServiceItemWithEmpty(serviceData)}
                    numColumns={numColumns}
                />
            )}
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
