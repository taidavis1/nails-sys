import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import React from 'react';
import theme from '../../themes/Light';
import { connect } from 'react-redux';

//! imp Actions
import { hideModal } from '../../redux/slices/modal/modalSlice';
import { addServiceCategoryAsync } from '../../redux/slices/services/servicesSlice';
import { useSharedValue } from 'react-native-reanimated';

//! imp Comps
import ColorPicker from '../ColorPicker';


const CreateServiceCategoryModal = (props) => {
    const { hideModal, addServiceCategoryAsync } = props;
    const DIM_WIDTH = Dimensions.get('window').width;
    const PICKER_WIDTH = DIM_WIDTH * 0.65;

    const COLORS = ['red', 'purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'black', 'white'];
    const pickedColor = useSharedValue(COLORS[0]);
    
    const [values, setValues] = React.useState({
        name: '',
        color: '#f2f2f2',
    });

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };
    
    React.useEffect(() => {
        setValues({ ...values, color: pickedColor.value });
    }, [pickedColor.value]);


    const handleCreate = () => {
        console.log(`Create Button`);
        addServiceCategoryAsync({ name: values.name, color: values.color });
        hideModal();
    };

    let containerStyles = [styles.container, { backgroundColor: theme.colors.background }];
    let inputControlStyles = styles.inputControl;
    let buttonStyles = [styles.button, { color: theme.colors.success }];
    let gradientStyles = [styles.gradient, { width: PICKER_WIDTH }];


    // Just like "@media screen and (max-width: 350px)"
    if (DIM_WIDTH < 480) {
        containerStyles = [styles.containerSmall, { backgroundColor: theme.colors.background }];
        inputControlStyles = styles.inputControlSmall;
    }

    // const styles = {
    //     container: {
    //         width: '70%',
    //         height: 350,
    //         borderRadius: 10,
    //         backgroundColor: theme.colors.background,
    //         padding: 10,
    //     },
    //     containerSmall: {
    //         width: 300,
    //         height: 250,
    //         borderRadius: 5,
    //         backgroundColor: theme.colors.background,
    //         padding: 20,
    //     },
    //     title: {},
    //     input: {
    //         height: 40,
    //         margin: 12,
    //         padding: 10,
    //         borderBottomWidth: 1,
    //     },
    //     footer: {
    //         flexDirection: 'row-reverse',
    //     },
    //     button: {
    //         fontSize: 16,
    //         textTransform: 'uppercase',
    //         fontWeight: 'bold',
    //         margin: 15,
    //         color: theme.colors.success,
    //     },
    // };

    const onColorChanged = React.useCallback((color) => {
        'worklet';
        pickedColor.value = color;
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pickedColor.value,
        };
    });

    return (
        <View style={containerStyles}>
            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Create New Category</Text>
            </View>
            <View style={styles.inputControl}>
                <Text>Name:</Text>
                <TextInput style={styles.input} onChangeText={(text) => handleChange('name', text)} value={values.name} />
            </View>
            <View style={inputControlStyles}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Pick color: </Text>
                    <Animated.View style={[{ borderWidth: 1, height: 20, width: 40 }, rStyle]} />
                </View>
                <View style={{ marginTop: 20 }}>
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
        height: 250,
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
    return {};
};

const mapDispatchToProps = {
    hideModal,
    addServiceCategoryAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateServiceCategoryModal);
