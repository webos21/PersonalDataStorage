// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function Table() {
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
