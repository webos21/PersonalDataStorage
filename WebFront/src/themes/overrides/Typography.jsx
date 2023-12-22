// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(theme) {
    return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: theme.palette.common.primary
                },
                gutterBottom: {
                    marginBottom: 12
                }
            }
        }
    };
}
