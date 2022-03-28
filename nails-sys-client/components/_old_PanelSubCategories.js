import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

//! imp ServiceCategory
import SubCategoryItem from './SubCategoryItem';

//! Actions
import { hideModal, showModal } from '../redux/slices/modal/modalSlice';

function PanelSubCategories(props) {
    // style // theme // selectedCategoryId // setSelectedSubCatId // selectedSubCatId

    // const nCount = React.useRef(0);
    // console.log(`PanelSubCategories - render `, (nCount.current += 1));
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} alwaysBounceHorizontal={false}>
                {props.subCategories.map((item) => (
                    <SubCategoryItem
                        key={item._id}
                        title={item.name}
                        index={item._id}
                        activeIndex={props.selectedSubCategoryId}
                        colorButton="#151c47"
                        style={styles.subCategoryItem}
                        onPress={() => {
                            console.log(`subCatId: `, item._id);
                        }}
                    />
                ))}
                <SubCategoryItem
                    title="All"
                    index="0"
                    activeIndex={props.selectedSubCategoryId}
                    colorButton="#151c47"
                    style={{ height: '75%', width: 35, color: 'white' }}
                    onPress={() => {
                    }}
                />
                <SubCategoryItem
                    title="+"
                    index="add"
                    colorButton="#151c47"
                    style={{ height: '75%', width: 35, color: 'white' }}
                    onPress={() => {
                        console.log(`ServicesStack - CREATE_SUBCATEGORY_MODAL`);
                        props.showModal({ modalId: 'CREATE_SUBCATEGORY_MODAL' });
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '5%',
    },
    subCategoryItem: {
        height: '75%',
        width: 35,
        color: 'white',
    },
});

const mapStateToProps = (state) => {
    return {
        selectedSubCategoryId: state.service.selectedSubCategoryId,
        subCategories: state.service.subCategories,
    };
};

const mapDispatchToProps = {
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelSubCategories);
