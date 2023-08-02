// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme) {
    return {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey[900]
                },
                outlined: {
                    marginTop: -8,
                    lineHeight: '0.8em',
                    '&.MuiInputLabel-sizeSmall': {
                        lineHeight: '1em'
                    },
                    '&.MuiInputLabel-shrink': {
                        background: theme.palette.background.default,
                        padding: '0 8px',
                        marginLeft: -6,
                        lineHeight: '1.4375em'
                    }
                }
            }
        }
    };
}
