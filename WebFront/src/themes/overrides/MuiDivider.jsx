// ==============================|| OVERRIDES - MuiDivider ||============================== //

export default function MuiDivider(theme) {
    return {
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.common.grayPale
                }
            }
        }
    };
}
