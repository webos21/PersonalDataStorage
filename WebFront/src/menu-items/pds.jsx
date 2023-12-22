// assets
import { ElectricMeter } from '@mui/icons-material';

// icons
const icons = {
    ElectricMeter
};

// ==============================|| MENU ITEMS - TB ||============================== //

const pds = {
    id: 'group-pds',
    title: 'Personal Data Storage',
    type: 'collapse-group',
    icon: icons.ElectricMeter,
    children: [
        {
            id: 'AccountClass',
            title: 'AccountClass',
            type: 'item',
            url: '/AccountClass',
            level: 1.0
        },
        {
            id: 'AccountCode',
            title: 'AccountCode',
            type: 'item',
            url: '/AccountCode',
            icon: icons.ElectricMeter,
            level: 1.0
        },
        {
            id: 'AddressBook',
            title: 'AddressBook',
            type: 'item',
            url: '/AddressBook',
            icon: icons.ElectricMeter,
            level: 1.0
        },
        {
            id: 'Test',
            title: 'Test',
            type: 'item',
            url: '/Test',
            icon: icons.ElectricMeter,
            level: 1.0
        }
    ]
};

export default pds;
