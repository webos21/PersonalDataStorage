import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import Logo from '../../components/Logo';

// redux
import { isLogOn, setUserInfo } from '../../store/reducers/auth';

const REQ_URI = '/api/v1/auth';

const Checking = () => {
    const hasUserInfo = useSelector(isLogOn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [checkMessage, setCheckMessage] = useState('Checking the session...');

    const fetchUserInfo = () => {
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
                dispatch(setUserInfo({ userInfo: resJson }));
                navigate('/');
            })
            .catch(function (error) {
                setCheckMessage('Checking::fetch => ' + error);
            });
    };

    useEffect(() => {
        if (!hasUserInfo) {
            fetchUserInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: '100vh'
                }}
            >
                <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 120px)', md: 'calc(100vh - 120px)' } }}
                    >
                        <Grid item>
                            <Typography variant="h3">{checkMessage}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    Footer
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checking;
