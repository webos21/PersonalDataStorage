// material-ui
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

// project
import LoginForm from './LoginForm';

const Login = () => {
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
            <Card sx={{ width: '350px' }}>
                <CardContent sx={{ height: '300px', display: 'flex', alignItems: 'center' }}>
                    <LoginForm />
                </CardContent>
            </Card>
            <Card sx={{ width: '400px', bgcolor: '#321fdb', color: '#fff', textAlign: 'center' }}>
                <CardContent sx={{ height: '300px', display: 'flex', alignItems: 'center' }}>
                    <Stack spacing={1}>
                        <Typography variant="h3">PersonalDataStorage Web</Typography>
                        <Divider />
                        <Typography sx={{ textAlign: 'left' }}>
                            개인자료보관소 App은 개인의 다양한 데이터를 보관하게 하는 유용한 도구입니다. 여기에 사용 편의성을 돕는
                            웹페이지를 App이 서비스 해 줍니다.
                        </Typography>
                        <Button
                            href="https://webos21.github.io/PersonalDataStorage"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            홈페이지 가기
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Login;
