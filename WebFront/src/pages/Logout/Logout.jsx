import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Grid, Card, CardContent, Typography } from '@mui/material';

// project import
import { aclassClear } from '../../store/reducers/aclass';

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(aclassClear());
        //     dispatch(AllActions.acode.acodeClear());
        //     dispatch(AllActions.anni.anniClear());
        //     dispatch(AllActions.bank.bankClear());
        //     dispatch(AllActions.card.cardClear());
        //     dispatch(AllActions.insure.insureClear());
        //     dispatch(AllActions.restate.restateClear());
        //     dispatch(AllActions.rpay.rpayClear());
        //     dispatch(AllActions.stock.stockClear());
        //     dispatch(AllActions.auth.authLogout());
        //     dispatch(AllActions.auth.authHome());
    }, [dispatch]);

    return (
        <Grid
            item
            md={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh'
            }}
        >
            <Card sx={{ width: '500px' }}>
                <CardContent sx={{ height: '300px', display: 'flex', alignItems: 'center', pl: 5 }}>
                    <Grid clearfix>
                        <Typography variant="h1">Logout...</Typography>
                        <Typography variant="h4">Remove the login information...</Typography>
                        <Typography>The page you are looking for is temporarily unavailable.</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Logout;
