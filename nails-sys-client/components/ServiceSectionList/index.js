import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';



//! comps
// import ServiceItem from './ServiceItem';
import ServiceCategoryItem from './ServiceCategoryItem';
import ServiceItem from './ServiceItem';

const ServiceSectionList = (props) => {
    const { navigation, route, indexColor, serviceCategory } = props;

    const isMounted = React.useRef(true);
    const [categories, setCategories] = React.useState([]);
    const serviceCount = 5;

    //! clean-up
    React.useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const ServiceList = () =>
        serviceCategory.services.slice(0, serviceCount).map((service) => <ServiceItem key={service._id} indexColor={indexColor} service={service} navigation={navigation} />);

    return (
        <View style={styles.container}>
            <ServiceCategoryItem style={styles.category} indexColor={indexColor} serviceCategory={serviceCategory} navigation={navigation} route={route} />
            <ServiceList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    category: {
        marginBottom: 15,
    },
});

export default ServiceSectionList;
