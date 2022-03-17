//! imp Icons
import IconAppointmentOutline from '../assets/icons/IconAppointmentOutline';
import IconHomeOutline from '../assets/icons/IconHomeOutline';
import IconManageOutline from '../assets/icons/IconManageOutline';
import IconServicesOutline from '../assets/icons/IconServicesOutline';
import IconSettingOutline from '../assets/icons/IconSettingOutline';
import IconSignoutOutline from '../assets/icons/IconSignoutOutline';
import IconTurnTrackingOutline from '../assets/icons/IconTurnTrackingOutline';
import IconEmployeesOutline from '../assets/icons/IconEmployeesOutline';
import IconEditOutline from '../assets/icons/IconEditOutline';
import IconGiftCardOutline from '../assets/icons/IconGiftCardOutline';

export const drawerItemsMain = [
    {
        key: 'Home', //! key of Main Drawer
        title: 'Home',
        icon: <IconHomeOutline />,
        routes: [{ nav: 'MainDrawer', key: 'Home', title: 'Home', icon: <IconHomeOutline /> }],
    },
    {
        key: 'Settings', //! key of Main Drawer
        title: 'Settings',
        icon: <IconSettingOutline />,
        routes: [
            { nav: 'MainDrawer', key: 'Services', routeName: 'Services', title: 'Services', icon: <IconServicesOutline /> },
            { nav: 'MainDrawer', key: 'TurnTracking', routeName: 'TurnTracking', title: 'Turn Tracking', icon: <IconTurnTrackingOutline /> },
            { nav: 'MainDrawer', key: 'Employees', routeName: 'Employees', title: 'Employees', icon: <IconEmployeesOutline /> },
            { nav: 'MainDrawer', key: 'Inventory', routeName: 'Inventory', title: 'Inventory', icon: <IconEditOutline /> },
            { nav: 'MainDrawer', key: 'GiftCard', routeName: 'GiftCard', title: 'Gift Card', icon: <IconGiftCardOutline /> },
        ],
    },
];

//! { nameIcon, activeNameIcon, sizeIcon, theme }
