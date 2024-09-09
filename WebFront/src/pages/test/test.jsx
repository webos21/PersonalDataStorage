import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// library import
import { Button, Card, CardContent, CardHeader, Divider, Paper, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import TimeUtil from '../../utils/TimeUtil';

// redux
import { authLogout, getUserInfo, removeUserInfo } from '../../store/reducers/auth';

const TEST_PORT = ':28080';
const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + TEST_PORT + '/pds/v1/auth' : '/pds/v1/auth';

const Test = () => {
    const userInfo = useSelector(getUserInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserInfo = () => {
        let reqUri = REQ_URI + '/userInfo';

        fetch(reqUri, {
            method: 'GET'
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // window.location = '/#/logout';
                        console.log('401 Error!!!');
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then((resJson) => {
                console.log(resJson);
            })
            .catch(function (error) {
                console.log('UserInfo::fetch => ' + error);
            });
    };

    const handleLogout = () => {
        dispatch(removeUserInfo());
        dispatch(authLogout());
        navigate('/logout');
    };

    return (
        <ComponentSkeleton>
            <Card elevation={1}>
                <CardHeader title={'사용자 인증 테스트 페이지'} />
            </Card>

            <Card elevation={1} sx={{ mt: 2 }}>
                <CardHeader title="사용자 정보" />
                <CardContent>
                    <Typography sx={{ minWidth: 60 }}>사용자ID : {userInfo.user}</Typography>
                    <Divider />
                    <Typography sx={{ minWidth: 60 }}>사용자명 : {userInfo.preferredUsername}</Typography>
                    <Divider />
                    <Typography sx={{ minWidth: 60 }}>전자우편 : {userInfo.email}</Typography>
                    <Divider />
                    <Typography sx={{ minWidth: 60 }}>등록그룹 :{userInfo.groups.join(', ')}</Typography>
                    <Typography sx={{ minWidth: 60 }}>생성시각 :{TimeUtil.formatMilliToYMDhms(userInfo.createAt)}</Typography>
                    <Typography sx={{ minWidth: 60 }}>폐기시각 :{TimeUtil.formatMilliToYMDhms(userInfo.expireOn)}</Typography>
                    <Typography sx={{ minWidth: 60 }}>ID-Token :{userInfo.idToken}</Typography>
                    <Typography sx={{ minWidth: 60 }}>Access-Token :{userInfo.accessToken}</Typography>
                    <Typography sx={{ minWidth: 60 }}>Refresh-Token :{userInfo.refreshToken}</Typography>
                </CardContent>
            </Card>

            <Paper sx={{ mt: 2, p: 2 }}>
                <Stack direction="row" spacing={1}>
                    <Button onClick={handleUserInfo} variant="outlined" color="warning">
                        사용자 정보 확인
                    </Button>
                    <Button onClick={handleLogout} variant="outlined" color="warning">
                        로그아웃
                    </Button>
                </Stack>
            </Paper>
        </ComponentSkeleton>
    );
};

export default Test;
