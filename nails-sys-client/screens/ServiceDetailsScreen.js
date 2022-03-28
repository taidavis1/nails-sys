import { View, Text } from 'react-native';
import React from 'react';

const ServiceDetailsScreen = (props) => {
    // const { navigation, route, colorIndex } = props;
    const { service } = props.route.params;
    // console.log(`ServiceDetailsScreen - route.params.service: `, service); //! OK
    return (
        <View>
            <Text>ServiceDetailsScreen</Text>
            <Text>ID: {service._id}</Text>
            <Text>Name: {service.name}</Text>
            <Text>Price: {service.price}</Text>
            <Text>Description: {service.discription}</Text>

        </View>
    );
};

export default ServiceDetailsScreen;
