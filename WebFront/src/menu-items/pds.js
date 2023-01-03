// assets
import { ElectricMeter, HomeOutlined } from '@mui/icons-material';

// icons
const icons = {
    HomeOutlined,
    ElectricMeter
};

// ==============================|| MENU ITEMS - TB ||============================== //

const pds = {
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
            id: 'test',
            title: 'Test',
            type: 'item',
            url: '/test',
            icon: icons.ElectricMeter,
            breadcrumbs: true
        }
    ]
};

export default pds;
