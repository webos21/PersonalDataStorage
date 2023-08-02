// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Breadcrumbs from '../../../../components/Breadcrumbs';
import navigation from '../../../../menu-items';

import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    // console.log('matchesXs : ', matchesXs);
    return (
        <>
            {!matchesXs && (
                <Breadcrumbs
                    sx={{ width: '100%', ml: 1 }}
                    navigation={navigation}
                    title={false}
                    titlebottom="true"
                    card="false"
                    divider={false}
                />
            )}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
