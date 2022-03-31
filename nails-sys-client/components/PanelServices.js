import { StyleSheet, ScrollView, View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

//! imp Comps
import ServiceItem from './ServiceItem';
import SubCategoryItem from './SubCategoryItem';

//! Actions
import { showModal } from '../redux/slices/modal/modalSlice';

import IconPlusOutline from '../assets/icons/IconPlusOutline';

function PanelServices(props) {
    //! props: subCategories
    //! props: selectedCat
    //! RESPONSIVE
    const [numColumns, setNumColumns] = React.useState(2);

    const serviceStyle = {
        height: (Dimensions.get('window').width * 25) / 100,
    };

    let services = []; //! RENDER COMPONENT
    let subCategories = []; //! RENDER COMPONENT

    const onAddPress = () => {
        console.log(`ServicesStack - CREATE_SERVICE_MODAL`);
        props.showModal({
            modalId: 'CREATE_SERVICE_MODAL',
            modalProps: { serviceCategoryId: props.selectedCat, subCategoryId: props.selectedSubCat },
        });
    };

    //! SUBCATEGORIES => ALL
    // if (props.selectedCat === 'all') {
    //     let selectedCategories = props.serviceCategories;
    //     selectedCategories.forEach((cat) => subCategories.push(...cat.subCategories));
    //     // console.log(`PanelServices -> selectedCategories: `, subCategories);
    //     if (props.selectedSubCat === 'all') {
    //         subCategories.forEach((sub) => services.push(...sub.services));
    //     } else {
    //         //! ANCHOR same
    //         let selectedSubCategory = subCategories?.find((sub) => sub._id === props.selectedSubCat);
    //         services = selectedSubCategory?.services;
    //     }
    // } else {
    //     let selectedCategory = props.serviceCategories.find((cat) => cat._id === props.selectedCat);
    //     subCategories = selectedCategory?.subCategories;

    //     if (props.selectedSubCat === 'all') {
    //         subCategories?.forEach((sub) => services.push(...sub.services));
    //         // console.log(`subsTotal: `, services);
    //     } else {
    //         //! ANCHOR Same
    //         let selectedSubCategory = subCategories?.find((sub) => sub._id === props.selectedSubCat);
    //         // console.log(`PanelServices -> selectedSubCategory: `, selectedSubCategory);
    //         services = selectedSubCategory?.services;
    //     }
    // }

    // console.log(`PanelServices -> subCategories: `, subCategories);

    function renderPanelSubCat() {
        // const nCount = React.useRef(0);
        // console.log(`PanelSubCategories - render `, (nCount.current += 1));

        return (
            <View style={styles.subCatContainer}>
                <ScrollView horizontal={true} alwaysBounceHorizontal={false}>
                    {subCategories &&
                        subCategories.map((item) => (
                            <SubCategoryItem
                                key={item._id}
                                title={item.name}
                                index={item._id}
                                activeIndex={props.selectedSubCat}
                                colorButton="#151c47"
                                // style={styles.subCategoryItem}
                                style={styles.subCatItem}
                                onPress={() => {
                                    console.log(`subCatId: `, item._id);
                                    props.setSelectedSubCat(item._id);
                                }}
                            />
                        ))}
                    <SubCategoryItem
                        title="All"
                        index="all"
                        activeIndex={props.selectedSubCat}
                        colorButton="#151c47"
                        style={styles.subCatItem}
                        onPress={() => {
                            props.setSelectedSubCat('all');
                        }}
                    />
                    {props.selectedCat !== 'all' ? (
                        <SubCategoryItem
                            title="+"
                            index="add"
                            colorButton="#151c47"
                            style={styles.subCatItem}
                            onPress={() => {
                                console.log(`ServicesStack - CREATE_SUBCATEGORY_MODAL`);
                                props.showModal({ modalId: 'CREATE_SUBCATEGORY_MODAL', modalProps: { serviceCategoryId: props.selectedCat } });
                            }}
                        />
                    ) : null}
                </ScrollView>
            </View>
        );
    }

    function formatData(data, numColumns) {
        //! Add Button
        data = [...data, { name: 'add', type: 'add' }];

        let numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementLastRows = data.length - numberOfFullRows * numColumns;

        while (numberOfElementLastRows !== 0 && numberOfElementLastRows !== numColumns) {
            data = [...data, { name: 'black', type: 'empty' }];
            numberOfElementLastRows += 1;
        }
        return data;
    }

    //! renderItem //! reducers
    function renderServiceItem(item) {
        //! type === button, item, empty
        if (item.type === 'add') {
            return (
                <TouchableOpacity style={{ flex: 1 }} onPress={onAddPress}>
                    <View
                        style={[styles.item, { height: serviceStyle.height, backgroundColor: '#E9E8E8', alignItems: 'center', justifyContent: 'center' }]}
                    >
                        <IconPlusOutline sizeIcon={25} theme={props.theme} color="#636363" />
                    </View>
                </TouchableOpacity>
            );
        }
        if (item.type === 'empty') {
            return (
                <View style={{flex: 1}}>
                    <View style={[styles.item, { height: serviceStyle.height }]} />
                </View>
            );
        }
        return (
            <ServiceItem
                theme={props.theme}
                title={item.name}
                colorButton={item.color}
                index={item.index}
                price={item.price}
                style={[styles.item, { height: serviceStyle.height, color: 'white' }]}
                onPress={() => {
                    console.log(`onItemPress: `, item._id);
                }}
            />
        );
    }

    function renderPanelServices() {
        return (
            services && (
                <FlatList
                    data={formatData(services, numColumns)}
                    renderItem={(data) => renderServiceItem(data.item)}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    numColumns={numColumns}
                />
            )
        );
    }

    return (
        <View style={[styles.container, props.style]}>
            {renderPanelSubCat()}
            {renderPanelServices()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
    },
    sheetContainer: {
        marginHorizontal: 24,
    },
    subCatContainer: {
        height: '5%',
    },
    subCatItem: {
        height: '75%',
        width: 35,
        color: 'white',
    },
    addButton: {},
    item: {
        padding: 10,
        margin: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        borderRadius: 10,
    },
});

const mapStateToProps = (state) => {
    return {
        services: state.service.services,
    };
};

const mapDispatchToProps = { showModal };

export default connect(mapStateToProps, mapDispatchToProps)(PanelServices);
