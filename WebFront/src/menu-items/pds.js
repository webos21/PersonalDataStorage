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
            id: 'accountClass',
            title: 'AccountClass',
            type: 'item',
            url: '/accountClass',
            level: 1.0
        },
        {
            id: 'accountCode',
            title: 'AccountCode',
            type: 'item',
            url: '/accountCode',
            icon: icons.ElectricMeter,
            level: 1.0
        },
        {
            id: 'addressBook',
            title: 'AddressBook',
            type: 'item',
            url: '/addressBook',
            icon: icons.ElectricMeter,
            level: 1.0
        },
        {
            id: 'test',
            title: 'Test',
            type: 'item',
            url: '/test',
            icon: icons.ElectricMeter,
            level: 1.0
        }
    ]
};

export default pds;
