// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableContainer(theme) {
    return {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    padding: 10,
                    fontSize: '0.875rem',
                    borderColor: theme.palette.divider
                }
            }
        }
    };
}
