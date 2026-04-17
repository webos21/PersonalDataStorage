import Navigation from './Navigation';
import CustomScroller from '../../../../components/CustomScroller';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <CustomScroller className="h-full max-h-full">
        <Navigation />
    </CustomScroller>
);

export default DrawerContent;
