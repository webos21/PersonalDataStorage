// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableRow(theme) {
    return {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.common.tableRow,
                    borderWidth: '0px',
                    marginTop: '10px',
                    boxShadow: theme.palette.common.tableShadow,
                    cursor: 'pointer'
                },
                head: {
                    boxShadow: 'none'
                }
            }
        }
    };
}
