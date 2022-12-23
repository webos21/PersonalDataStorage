// library import
import { useDispatch, useSelector } from 'react-redux';

// project import
import ScrollTop from './components/ScrollTop';
import config from './config';
import Routes from './routes';
import ThemeCustomization from './themes';

// redux
import { isLogin, setUserInfo } from './store/reducers/auth';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const hasUserInfo = useSelector(isLogin);
    const dispatch = useDispatch();

    if (config.ignoreAuth) {
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
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );

    const renderNoUserInfo = () => (
        <ThemeCustomization>
            <ScrollTop>
                <Routes locationArgs="/checking" />
            </ScrollTop>
        </ThemeCustomization>
    );

    return config.ignoreAuth ? renderHasUserInfo() : hasUserInfo ? renderHasUserInfo() : renderNoUserInfo();
};

export default App;
