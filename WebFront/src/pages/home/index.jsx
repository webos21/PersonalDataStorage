// material-ui
import { Grid, Typography, useTheme } from '@mui/material';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import Logo from '../../components/Logo/Logo';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const HomeDefault = () => {
    const theme = useTheme();

    return (
        <ComponentSkeleton>
            <Grid container>
                <Grid item lg={12} xs={12} sx={{ p: 5, bgcolor: theme.palette.background }}>
                    <Typography
                        align="right"
                        color="#8d6e63"
                        sx={{
                            fontFamily: 'Malgun Gothic',
                            fontSize: 'h3.fontSize',
                            fontWeight: 700
                        }}
                    >
                        Auth v1.0
                    </Typography>
                    <Typography color="#344457" sx={{ fontFamily: 'Malgun Gothic', fontSize: 'h1.fontSize', fontWeight: 800 }}>
                        콜드체인 상태정보 관리 및<br />
                        실시간 모니터링체계 구축 기술 개발
                    </Typography>
                    <Typography color="#60879A" sx={{ fontFamily: 'Malgun Gothic', fontSize: 'h2.fontSize', fontWeight: 700 }}>
                        통합 인증 페이지
                    </Typography>
                    <Grid item lg={4} xs={12} sx={{ p: 0.5, mt: 5, mb: 10, bgcolor: '#344457', borderRadius: '16px' }}>
                        <Typography
                            align="center"
                            color="#ffffff"
                            sx={{ fontFamily: 'Malgun Gothic', fontSize: 'h5.fontSize', fontWeight: 700 }}
                        >
                            Keycloak을 활용한 SSO 서비스
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item lg={12} xs={12} sx={{ mt: 5, textAlign: 'center', bgcolor: theme.palette.background }}>
                    <Logo width="380px" height="90px" color="#005CAC" />
                    <Typography color="#005CAC" sx={{ fontFamily: 'Malgun Gothic', fontSize: 'h4.fontSize', fontWeight: 700 }}>
                        TCLS 서비스 플랫폼 (SL-C1000)
                    </Typography>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default HomeDefault;
