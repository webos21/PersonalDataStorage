// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableRow(theme) {
    return {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    marginTop: '10px',
                    boxShadow: '0 10px 30px RGBA(229, 231, 245, 1)'
                },
                head: {
                    boxShadow: 'none'
                }
            }
        }
    };
}
