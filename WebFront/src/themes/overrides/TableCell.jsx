// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
    return {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottom: 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    '&:first-of-type': { borderRadius: '6px 0 0 6px' },
                    '&:last-of-type': { borderRadius: '0 6px 6px 0' }
                },
                head: {
                    color: theme.palette.text.tableHeaderText,
                    fontSize: 13,
                    fontWeight: 'bold',
                    paddingTop: 2,
                    paddingBottom: 2,
                    backgroundColor: theme.palette.common.tableHeader
                }
            }
        }
    };
}
