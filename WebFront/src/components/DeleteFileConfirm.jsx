import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';

// material-icon
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

let renderCount = 0;

const DeleteFileConfirm = ({ fileList, open, onClose, ...others }) => {
    renderCount++;

    const oneMega = 1024 * 1024;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...others}>
            <DialogTitle>파일 삭제 확인</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Typography sx={{ color: 'warning' }}>다음 파일(들)을 정말로 삭제하시겠습니까?</Typography>
                    <Stack spacing={0}>
                        {fileList?.map((file, index) => {
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
                                <Box key={'fileitem' + index + '-' + file.name} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                                    <Avatar
                                        alt=""
                                        src={file.path}
                                        variant="rounded"
                                        sx={{
                                            m: 0.5,
                                            width: 64,
                                            height: 64,
                                            display: 'flex',
                                            background: 'transparent'
                                        }}
                                    >
                                        {icon}
                                    </Avatar>
                                    <Typography component="div" sx={{ display: 'inline-grid', alignItems: 'center' }}>
                                        <Typography variant="body1" noWrap>
                                            {file?.name}
                                        </Typography>
                                        <Typography variant="caption" noWrap>
                                            <b>{size}</b> | <b>{file?.contentType?.toLowerCase()}</b>
                                        </Typography>
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk} color="warning">
                    삭제
                </Button>
                <Button onClick={handleCancel} color="secondary">
                    취소
                </Button>
                <Typography component="span" sx={{ ml: 'auto', mr: 2 }}>
                    Render : {renderCount}
                </Typography>
            </DialogActions>
        </Dialog>
    );
};

DeleteFileConfirm.propTypes = {
    fileList: PropTypes.array,
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default DeleteFileConfirm;
