import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

//! imp ServiceCategory
import ServiceCategoryItem from './ServiceCategoryItem';

//! Actions
import { hideModal, showModal } from '../redux/slices/modal/modalSlice';

function PanelCategories(props) {
    // style
    // theme
    // categories
    // selectedCat
    // setSelectedCat

    // const nCount = React.useRef(0);
    // console.log(`PanelCategories - render `, (nCount.current += 1));

    return (
        <View
            style={[
                styles.panelContainer,
                props.style,
                {
                    zIndex: 10,
                    elevation: 10,
                    shadowColor: 'black',
                    shadowOffset: { width: 2, height: 1 },
                    shadowRadius: 4,
                    shadowOpacity: 0.35,
                },
            ]}
        >
            {props.serviceCategories && (
                <FlatList
                    alwaysBounceVertical={false}
                    keyExtractor={(item) => item.id}
                    data={props.serviceCategories}
                    renderItem={({ item}) => (
                        <ServiceCategoryItem
                            colorButton={item.color}
                            name={item.category_name}
                            activeIndex={props.selectedCat}
                            index={item.id}
                            style={styles.catItem}
                            onPress={() => {
                                props.setSelectedCat(item.id);
                                console.log(item.id);
                                props.setSelectedSubCat('all');
                            }}
                        />
                    )}
                />
            )}
            <ServiceCategoryItem
                name="ALL"
                index="all"
                activeIndex={props.selectedCat}
                colorButton="#151c47"
                style={styles.catItem}
                onPress={() => {
                    props.setSelectedCat("all");
                }}
            />
            <ServiceCategoryItem
                name="+"
                index="add"
                colorButton="#151c47"
                style={styles.catItem}
                onPress={() => {
                    console.log(`ServicesStack - CREATE_SERVICE_CATEGORY_MODAL`);
                    props.showModal({ modalId: 'CREATE_SERVICE_CATEGORY_MODAL' });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    panelContainer: {
        flexDirection: 'column',
        width: '20%',
    },
    catItem: {
        height: 50,
        color: 'white',
    },
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    hideModal,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelCategories);
