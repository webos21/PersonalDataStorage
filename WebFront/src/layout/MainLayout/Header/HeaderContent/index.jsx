// material-ui
import { Box, Grid, useMediaQuery } from '@mui/material';

// project import
import Breadcrumbs from '../../../../components/Breadcrumbs';
import navigation from '../../../../menu-items';

import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode, themeMode } from '../../../../store/reducers/theme';
import DarkModeSwitch from './DarkModeSwitch';
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const mode = useSelector(themeMode);
    const dispatch = useDispatch();
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    // Switch의 상태가 변경될 때 호출되는 핸들러 함수
    const handleModeChange = (event) => {
        const isDark = event.target.checked; // Switch의 새로운 상태

        // 상태에 따라 테마 모드 설정
        if (isDark) {
            dispatch(setThemeMode({ mode: 'dark' }));
        } else {
            dispatch(setThemeMode({ mode: 'light' }));
        }
    };
    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between">
                {/* 왼쪽 요소 - Breadcrumbs */}
                <Grid item xs={12} sm={6}>
                    {!matchesXs && (
                        <Breadcrumbs
                            sx={{ ml: 2, width: '100%' }}
                            navigation={navigation}
                            title={false}
                            titlebottom="true"
                            card="false"
                            divider={false}
                        />
                    )}
                    {matchesXs && <Box sx={{ width: '100%' }} />}
                </Grid>

                {/* 오른쪽 요소 - Switch, Typography, Profile, Notifications */}
                <Grid item xs={12} sm={6} container justifyContent="flex-end" spacing={2} alignItems="center">
                    {/* <Grid item>
                        <Typography sx={{ fontSize: '13px' }}>다크모드</Typography>
                    </Grid> */}
                    <Grid item>
                        <DarkModeSwitch checked={mode === 'dark'} onChange={handleModeChange} />
                    </Grid>

                    {!matchesXs && (
                        <Grid item>
                            <Profile />
                        </Grid>
                    )}
                    <Grid item>
                        <Notification />
                    </Grid>
                    {matchesXs && (
                        <Grid item>
                            <MobileSection />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default HeaderContent;
