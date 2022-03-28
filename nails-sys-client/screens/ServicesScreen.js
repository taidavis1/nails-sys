import React from 'react';
import { StyleSheet, View } from 'react-native';

//imp react-redux
import { connect } from 'react-redux';

//! imp Actions
import { getServiceCategoriesAsync } from '../redux/slices/services/servicesSlice';

//! imp Components
import PanelCategories from '../components/PanelCategories';
import PanelServices from '../components/PanelServices';

//! theme
import theme from '../themes/Light';

const ServicesScreen = (props) => {
    //! props: navigation, route,
    //! props Redux: serviceCategories, getServiceCategoriesAsync
    const [selectedCat, setSelectedCat] = React.useState('');
    const [selectedSubCat, setSelectedSubCat] = React.useState('');

    const nCount = React.useRef(0);
    console.log(`ServicesScreen -> render:`, (nCount.current += 1));
    // console.log(`props.serviceCategories: `, props.serviceCategories);

    React.useEffect(() => {
        let isSubscribed = true;
        // const fetchData = async () => {
        //     try {
        //         await props.getServiceCategoriesAsync();
        //     } catch (error) {
        //         console.log('error', error);
        //     }
        // };
        if (isSubscribed) {
            // fetchData();
            props.getServiceCategoriesAsync();
        }
        return () => {
            isSubscribed = false; //! Cancel the subscription
        };
    }, []);

    // useEffect(() => {
    //     mounted.current = true;
    //     if (list.length && !alert) {
    //         return;
    //     }
    //     getList().then((items) => {
    //         if (mounted.current) {
    //             setCurrentServiceCategory();
    //         }
    //     });
    //     return () => (mounted.current = false);
    // }, [alert, list]);

    //! change ID of ServiceCategory
    // React.useEffect(() => {
    //     // setCurrentServiceCategory();
    //     console.log(`change ID ServiceCategory`);
    // }, [currentServiceCategory]);

    return (
        <View style={styles.container}>
            <PanelCategories
                style={[styles.PanelCategoriesContainer, { width: '20%' }]}
                theme={theme}
                serviceCategories={props.serviceCategories}
                selectedCat={selectedCat}
                setSelectedSubCat={setSelectedSubCat}
                setSelectedCat={setSelectedCat}
            />
            <PanelServices
                theme={theme}
                style={styles.panelServicesConainer}
                serviceCategories={props.serviceCategories}
                selectedCat={selectedCat}
                selectedSubCat={selectedSubCat}
                setSelectedSubCat={setSelectedSubCat}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    PanelCategoriesContainer: {
        padding: 5,
        backgroundColor: '#EAEAEA',
    },
    panelSubCatContainer: {
        backgroundColor: '#222222',
    },
    panelServicesConainer: {
        backgroundColor: 'white',
        padding: 5,
    },
    content: {
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        serviceCategories: state.service.serviceCategories,
    };
};

const mapDispatchToProps = {
    // setModalProps,
    getServiceCategoriesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
