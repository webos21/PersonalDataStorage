// assets
import { ElectricMeter, HomeOutlined } from '@mui/icons-material';

// icons
const icons = {
    HomeOutlined,
    ElectricMeter
};

// ==============================|| MENU ITEMS - TB ||============================== //

const test = {
    id: 'group-pds',
    title: 'Personal Data Storage',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.HomeOutlined,
            breadcrumbs: false
        },
        {
            id: 'accountClass',
            title: 'AccountClass',
            type: 'item',
            url: '/accountClass',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'accountCode',
            title: 'AccountCode',
            type: 'item',
            url: '/accountCode',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'addressBook',
            title: 'AddressBook',
            type: 'item',
            url: '/addressBook',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm1',
            title: 'AddressBook',
            type: 'item',
            url: '/m1',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm2',
            title: 'AddressBook',
            type: 'item',
            url: '/m2',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm3',
            title: 'AddressBook',
            type: 'item',
            url: '/m3',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm4',
            title: 'AddressBook',
            type: 'item',
            url: '/m4',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm5',
            title: 'AddressBook',
            type: 'item',
            url: '/m5',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm6',
            title: 'AddressBook',
            type: 'item',
            url: '/m6',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm7',
            title: 'AddressBook',
            type: 'item',
            url: '/m7',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm8',
            title: 'AddressBook',
            type: 'item',
            url: '/m8',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'm9',
            title: 'AddressBook',
            type: 'item',
            url: '/m9',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'test',
            title: 'Test',
            type: 'item',
            url: '/test',
            icon: icons.ElectricMeter,
            breadcrumbs: true
        }
    ]
};

export default test;
