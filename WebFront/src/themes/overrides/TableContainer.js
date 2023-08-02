// ==============================|| OVERRIDES - TABLE CONTAINER ||============================== //

export default function TableContainer(theme) {
    return {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    padding: 10,
                    fontSize: '0.875rem',
                    borderColor: theme.palette.divider
                    // backgroundColor: '#f6f7f9'
                }
            }
        }
    };
}
