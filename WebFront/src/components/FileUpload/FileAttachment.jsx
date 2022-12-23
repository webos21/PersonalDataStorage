import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Typography, Avatar, IconButton, Box } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

function FileAttachment(props) {
    const { file, index, disabled, onRemoveAttach } = props;

    const theme = useTheme();

    const oneMega = 1024 * 1024;

    let size = file.size;
    if (size > oneMega) {
        size = (file.size / oneMega).toFixed(2) + ' Mb';
    } else {
        size = (file.size / 1024).toFixed(2) + ' Kb';
    }

    let icon = <InsertDriveFileOutlinedIcon color="primary" fontSize="large" />;
    // Set icon for compressed files
    if (/\.(g?zip|tar|gz|rar)$/i.test(file?.name)) {
        icon = <ArchiveOutlinedIcon color="primary" fontSize="large" />;
    }
    // Set icon for media files
    if (/\.(mp.|midi|mkv|avi)$/i.test(file?.name)) {
        icon = <PlayCircleOutlineIcon color="primary" fontSize="large" />;
    }

    return (
        <Box
            sx={{
                mb: 0,
                display: 'flex',
                alignItems: 'center',
                '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.action.hover
                }
            }}
        >
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <Avatar
                    alt=""
                    src={file.path}
                    variant="rounded"
                    sx={{
                        m: 0.5,
                        width: 32,
                        height: 32,
                        display: 'flex',
                        background: 'transparent'
                    }}
                >
                    {icon}
                </Avatar>
                <Typography component="div" sx={{ display: 'inline-grid', alignItems: 'center' }}>
                    <Typography variant="body2" noWrap>
                        {file?.name}
                    </Typography>
                    <Typography variant="caption" noWrap>
                        <b>{size}</b> | <b>{file?.contentType?.toLowerCase()}</b>
                    </Typography>
                </Typography>
            </Box>
            <Typography component="div" sx={{ textAlign: 'right' }}>
                <IconButton disabled={disabled} onClick={() => onRemoveAttach(index)}>
                    <CloseIcon />
                </IconButton>
            </Typography>
        </Box>
    );
}

FileAttachment.propTypes = {
    file: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onRemoveAttach: PropTypes.func.isRequired
};

export default FileAttachment;
