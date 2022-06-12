import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';

//! logo
import LogoNailsSys from '../assets/icons/LogoNailsSys';

function CustomDrawerContent(props) {
    //! props: navigation, route, drawerItems, theme
    //! _props.navigation: NavigationContainer --> Stack.Navigator ~> Screen component={} -> navigation/MainDrawerNavigation --> CustomDrawerContent
    //! _props.drawerItems: navigation/MainDrawerNavigation --> passing drawerItems <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
    //! _props.theme : MainDrawerNavigation
    const [activeKey, setActiveKey] = React.useState('Home');
    const [mainDrawer, setMainDrawer] = React.useState(true);
    const [filteredItems, setFilteredItems] = React.useState([]);

    //! onPress to select mainDrawer
    const toggleMainDrawer = () => {
        //! RESET TO HOME
        setMainDrawer(true);
        setFilteredItems([]);
        setActiveKey('Home');
        props.navigation.navigate('MainDrawer', {
            screen: 'Home',
        });
    };

    const onDrawerItemPress = (key) => {
        setActiveKey(key);
        //     //! so sánh key -> find Routes
        const filteredMainDrawerRoutes = props.drawerItems.find((item) => {
            return item.key === key;
        });

        if (filteredMainDrawerRoutes.routes.length === 1) {
            const selectedRoute = filteredMainDrawerRoutes.routes[0];
            props.navigation.toggleDrawer();
            props.navigation.dispatch(
                CommonActions.navigate({
                    name: selectedRoute.nav,
                    params: {
                        service: selectedRoute.routeName,
                    },
                })
            );
            // props.navigation.navigate(selectedRoute.nav, {
            //     screen: selectedRoute.routeName,
            // });
        } else {
            setMainDrawer(false);
            setFilteredItems(filteredMainDrawerRoutes);
        }
        // const selectedRoute = filteredMainDrawerRoutes.route; //! nav: { 'MainDrawer', routeName: 'Home', title: 'Home' } { nav: 'MainDrawer', routeName: 'Settings', title: 'Settings' },
    };

    const logOut = async () => console.log('log out');

    function renderMainDrawer() {
        return (
            <View style={{flex: 1}}>
                <DrawerContentScrollView {...props}>
                    {props.drawerItems.map((parent) => (
                        <DrawerItem
                            focused={activeKey === parent.key} //! kích hoạt focus khi activeNameIcon = nameIcon
                            activeTintColor={props.theme.colors.primary}
                            key={parent.key}
                            onPress={() => onDrawerItemPress(parent.key)}
                            label={({ focused }) => {
                                return (
                                    <View style={styles.parentItem}>
                                        <View style={{ marginRight: 20 }}>
                                            {React.cloneElement(parent.icon, {
                                                keyIcon: parent.key,
                                                activeKeyIcon: activeKey,
                                                sizeIcon: 25,
                                                theme: props.theme,
                                            })}
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: focused ? 'bold' : 'normal',
                                            }}
                                        >
                                            {parent.title}
                                        </Text>
                                    </View>
                                );
                            }}
                        ></DrawerItem>
                    ))}
                </DrawerContentScrollView>
            </View>
        );
    }

    const renderFilteredItemsDrawer = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => toggleMainDrawer()} style={styles.backButtonRow}>
                    <Text style={[styles.backButtonText, styles.title]}>Home</Text>
                </TouchableOpacity>
                {filteredItems.routes.map((route) => (
                    <DrawerItem
                        focused={activeKey === route.key} //! kích hoạt focus khi activeNameIcon = nameIcon
                        activeTintColor={props.theme.colors.primary}
                        key={route.key}
                        onPress={() => {
                            setActiveKey(route.key);
                            console.log(`route.routeName: `, route.routeName);
                            props.navigation.toggleDrawer();

                            props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: route.routeName }],
                                })
                            );
                        }}
                        label={({ focused }) => {
                            return (
                                <View style={styles.parentItem}>
                                    <View
                                        style={{
                                            marginRight: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {React.cloneElement(route.icon, {
                                            keyIcon: route.key,
                                            activeKeyIcon: activeKey,
                                            sizeIcon: 25,
                                            theme: props.theme,
                                        })}
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: focused ? 'bold' : 'normal',
                                        }}
                                    >
                                        {route.title}
                                    </Text>
                                </View>
                            );
                        }}
                    ></DrawerItem>
                ))}
            </View>
        );
    };

    function renderLogoutBtn() {
        return (
            <View>
                <TouchableOpacity onPress={logOut} testID="customDrawer-logout">
                    <View style={styles.parentItem}>
                        <Text style={styles.title}>{'Log out'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.drawerContainer, { backgroundColor: props.theme.colors.boxBackground }]}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.logoContainer}>
                    <LogoNailsSys width={100} height={100}/>
                </View>
                {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        flexDirection: 'row',
        paddingVertical: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 75,
    },
    drawerContainer: {
        backgroundColor: '#222222',
    },
    container: {
        flex: 1,
        zIndex: 1000,
    },
    logoContainer: {
        alignItems: 'center',
        padding: 20
    },
    parentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        margin: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 17,
        paddingLeft: 3,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
    },
    backButtonText: {
        marginLeft: 10,
    },
});

export default CustomDrawerContent;
