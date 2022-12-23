// assets
import { ElectricMeter, HomeOutlined } from '@mui/icons-material';

// icons
const icons = {
    HomeOutlined,
    ElectricMeter
};

// ==============================|| MENU ITEMS - TB ||============================== //

const auth = {
    id: 'group-auth',
    title: 'Authentication',
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
            id: 'test',
            title: 'Test',
            type: 'item',
            url: '/test',
            icon: icons.ElectricMeter,
            breadcrumbs: true
        }
    ]
};

export default auth;
