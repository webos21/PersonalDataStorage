import Navigation from './Navigation';
import CustomScroller from '../../../../components/CustomScroller';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <CustomScroller style={{ maxHeight: 'calc(100vh - 60px)' }}>
        <Navigation />
    </CustomScroller>
);

export default DrawerContent;
