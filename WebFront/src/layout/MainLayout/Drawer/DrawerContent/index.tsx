import Navigation from './Navigation';
import CustomScroller from '../../../../components/CustomScroller';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <CustomScroller className="max-h-[calc(100vh-60px)]">
        <Navigation />
    </CustomScroller>
);

export default DrawerContent;
