export const drawerItemsMain = [
    {
        key: 'Home', //! key of Main Drawer
        title: 'Home',
        routes: [{ nav: 'MainDrawer', routeName: 'Home', title: 'Home' }],
    },
    {
        key: 'Settings', //! key of Main Drawer
        title: 'Settings',
        routes: [
            { nav: 'MainDrawer', routeName: 'Services', title: 'Services' },
            { nav: 'MainDrawer', routeName: 'Settings2', title: 'Settings 2' },
        ],
    },
];
