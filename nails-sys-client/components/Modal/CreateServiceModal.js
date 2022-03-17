import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import React from 'react';
import theme from '../../themes/Light';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
//! imp Comps
import ColorPicker from '../ColorPicker';

//! imp Actions
import { hideModal } from '../../redux/slices/modal/modalSlice';
import { addServiceAsync } from '../../redux/slices/services/servicesSlice';
import { useSharedValue } from 'react-native-reanimated';

const CreateServiceModal = (props) => {
    const { hideModal, addServiceAsync } = props;
    const { serviceCategoryId, subCategoryId } = props.modalProps;
    const DIM_WIDTH = Dimensions.get('window').width;
    const PICKER_WIDTH = DIM_WIDTH * 0.65;

    const COLORS = ['red', 'purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'black', 'white'];
    const pickedColor = useSharedValue(COLORS[0]);

    const [itemCats, setItemCats] = React.useState();
    const [itemSubs, setItemSubs] = React.useState();
    const [openCat, setOpenCat] = React.useState(false);
    const [valueCat, setValueCat] = React.useState(serviceCategoryId);
    const [openSub, setOpenSub] = React.useState(false);
    const [valueSub, setValueSub] = React.useState(subCategoryId);
    const [values, setValues] = React.useState({
        name: '',
        displayName: '',
        price: 0,
        commission: 0,
        color: '',
        photo: '',
    });

    React.useEffect(() => {
        let categories = props.serviceCategories;
        let arrCats = categories.map((cat) => ({ label: cat.name, value: cat._id }));
        let catIndex = categories.findIndex((item) => item._id === valueCat);
        let arrSubs = categories[catIndex].subCategories.map((sub) => ({ label: sub.name, value: sub._id }));

        setItemCats(arrCats);
        setItemSubs(arrSubs);
    }, [valueCat]);

    const handleChange = (name, type, value) => {
        setValues({
            ...values,
            [name]: type === 'number' ? Number(value) : value,
        });
    };

    const handleCreate = () => {
        addServiceAsync({
            name: values.name,
            displayName: values.displayName,
            price: values.price,
            commission: values.commission,
            color: values.color,
            photo: values.photo,
            subCategory: valueSub,
            category: valueCat,
        });
        hideModal();
    };
    const onColorChanged = React.useCallback((color) => {
        'worklet';
        pickedColor.value = color;
        console.log(pickedColor.value);
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pickedColor.value,
        };
    });
    let containerStyles = [styles.container, { backgroundColor: theme.colors.background }];
    let inputControlStyles = styles.inputControl;
    let buttonStyles = [styles.button, { color: theme.colors.success }];
    let gradientStyles = [styles.gradient, { width: PICKER_WIDTH }];

    // Just like "@media screen and (max-width: 350px)"
    if (DIM_WIDTH < 480) {
        containerStyles = [styles.containerSmall, { backgroundColor: theme.colors.background }];
        inputControlStyles = styles.inputControlSmall;
    }

    return (
        <View style={containerStyles}>
            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Create A Service Category</Text>
            </View>
            <View style={[inputControlStyles, { flexDirection: 'row' }]}>
                <View style={inputControlStyles}>
                    <Text>Name:</Text>
                    <TextInput style={styles.input} onChangeText={(evt) => handleChange('name', 'text', evt)} value={values.name} />
                </View>
                <View style={inputControlStyles}>
                    <Text>Display name:</Text>
                    <TextInput style={styles.input} onChangeText={(evt) => handleChange('displayName', 'text', evt)} value={values.displayName} />
                </View>
            </View>
            <View style={[inputControlStyles, { flexDirection: 'row' }]}>
                <View style={inputControlStyles}>
                    <Text>Price:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(evt) => handleChange('price', 'number', evt)}
                        value={String(values.price)}
                    />
                </View>
                <View style={inputControlStyles}>
                    <Text>Commission:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(evt) => handleChange('commission', 'number', evt)}
                        value={String(values.commission)}
                    />
                </View>
            </View>
            <View style={inputControlStyles}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Pick color: </Text>
                    <Animated.View style={[{ borderWidth: 1, height: 20, width: 40 }, rStyle]} />
                </View>
                <View style={{ marginTop: 50 }}>
                    <ColorPicker
                        colors={COLORS}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={gradientStyles}
                        maxWidth={PICKER_WIDTH}
                        onColorChanged={onColorChanged}
                    />
                </View>
            </View>
            <View style={[inputControlStyles, { marginTop: 60 }]}>
                <Text>Upload photo:</Text>
                <TextInput style={styles.input} onChangeText={(evt) => handleChange('photo', 'text', evt)} value={values.photo} />
            </View>
            <View style={[inputControlStyles, { zIndex: 20 }]}>
                <Text>Category:</Text>
                <DropDownPicker open={openCat} setOpen={setOpenCat} value={valueCat} setValue={setValueCat} items={itemCats} />
            </View>
            <View style={[inputControlStyles, { zIndex: 10 }]}>
                <Text>SubCategory:</Text>
                <DropDownPicker open={openSub} setOpen={setOpenSub} value={valueSub} setValue={setValueSub} items={itemSubs} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => handleCreate()}>
                    <Text style={buttonStyles}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => hideModal()}>
                    <Text style={buttonStyles}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: 400,
        borderRadius: 10,
        padding: 10,
    },
    containerSmall: {
        width: 300,
        height: 550,
        borderRadius: 5,
        padding: 10,
    },
    title: {},
    input: {
        height: 25,
        borderBottomWidth: 1,
    },
    footer: {
        flexDirection: 'row-reverse',
    },
    button: {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        margin: 15,
    },
    inputControl: {
        flex: 1,
        margin: 5,
    },
    inputControlSmall: {
        flex: 1,
        margin: 5,
    },
    gradient: {
        height: 30,
        width: '100%',
        borderRadius: 15,
    },
});

const mapStateToProps = (state) => {
    return {
        modalProps: state.modal.modalProps,
        serviceCategories: state.service.serviceCategories,
    };
};

const mapDispatchToProps = {
    hideModal,
    addServiceAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateServiceModal);
