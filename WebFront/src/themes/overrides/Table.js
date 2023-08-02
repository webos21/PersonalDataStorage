// ==============================|| OVERRIDES - TABLE ||============================== //

export default function Table(theme) {
    return {
        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: 'separate',
                    borderSpacing: '0px 10px'
                }
            }
        }
    };
}
