import React from 'react';

// library import
import { useDispatch, useSelector } from 'react-redux';

// project import
import ScrollTop from './components/ScrollTop';
import config from './config';
import Routes from './routes';

// redux
import { isLogOn, setUserInfo } from './store/reducers/auth';
import { themeMode } from './store/reducers/theme';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App: React.FC = () => {
    const currentThemeMode = useSelector(themeMode);
    const hasUserInfo = useSelector(isLogOn);
    const dispatch = useDispatch();

    config.mode = currentThemeMode;
    config.color.mainBgColor = config.mode === 'dark' ? '#060709' : config.color.grayPale;

    if (config.ignoreAuth && !hasUserInfo) {
        dispatch(
            setUserInfo({
                userInfo: {
                    email: 'test@syszone.kr',
                    user: 'test',
                    preferredUsername: '테스터',
                    groups: ['Tester', 'access-account'],
                    createAt: new Date().getTime(),
                    expireOn: new Date().getTime() + 600000,
                    accessToken: 'INVALID-TEST-TOKEN',
                    idToken: 'INVALID-TEST-TOKEN',
                    refreshToken: 'INVALID-TEST-TOKEN'
                }
            })
        );
    }

    const renderHasUserInfo = () => (
        <ScrollTop>
            <Routes locationArgs="/" />
        </ScrollTop>
    );

    const renderNoUserInfo = () => (
        <ScrollTop>
            <Routes locationArgs="/login" />
        </ScrollTop>
    );

    return config.ignoreAuth ? renderHasUserInfo() : hasUserInfo ? renderHasUserInfo() : renderNoUserInfo();
};

export default App;
