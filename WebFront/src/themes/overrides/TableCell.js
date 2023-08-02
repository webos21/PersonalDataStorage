// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
    return {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                    paddingTop: 5,
                    paddingBottom: 5,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    '&:first-of-type': { borderRadius: '6px 0 0 6px' },
                    '&:last-of-type': { borderRadius: '0 6px 6px 0' }
                },
                head: {
                    color: '#666b73',
                    fontSize: 12,
                    fontWeight: 500,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: theme.palette.background.default
                }
            }
        }
    };
}
