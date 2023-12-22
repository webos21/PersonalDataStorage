import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// material-ui
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    Modal,
    OutlinedInput,
    Paper,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Utils from '../../utils';

const AccountClassEdit = (props) => {
    console.log('AccountClassEdit', props);

    const REQ_URI =
        process.env.NODE_ENV !== 'production'
            ? 'http://' + window.location.hostname + ':28080/pds/v1/accountClass'
            : '/pds/v1/accountClass';

    const validationSchema = Yup.object().shape({
        acId: Yup.string().max(1, 'ID는 1자리 숫자입니다.').required('ID는 필수 입력입니다.'),
        title: Yup.string().max(255, '분류명은 최대 255자까지 입니다.').required('분류명은 필수 입력입니다.')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(validationSchema),
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false
    });

    const onDelete = () => {
        fetch(REQ_URI + '?acId=' + props.dataFromParent.id, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader()
        })
            .then(function (res) {
                if (!res.ok) {
                    if (res.status === 401) {
                        window.location = '/#/logout';
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then(function (resJson) {
                console.log('AccountClassDel::fetch => ' + resJson.result);
                if (resJson.result === 'OK') {
                    props.modalToggle();
                    props.callbackFromParent();
                }
            })
            .catch(function (error) {
                console.log('AccountClassDel::fetch => ' + error);
                setError('siteId', 'serverResponse', error.message);
            });
    };

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'PUT',
            headers: Utils.auth.makeAuthHeader(),
            body: formData
        })
            .then(function (res) {
                if (!res.ok) {
                    if (res.status === 401) {
                        window.location = '/#/logout';
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then(function (resJson) {
                console.log('AccountClassEdit::fetch => ' + resJson.result);
                if (resJson.result === 'OK') {
                    props.modalToggle();
                    props.callbackFromParent(resJson.data[0]);
                }
            })
            .catch(function (error) {
                console.log('AccountClassEdit::fetch => ' + error);
                setError('siteUrl', 'serverResponse', error.message);
            });
    };

    return (
        <Modal
            open={props.modalFlag}
            disableScrollLock={false}
            onClose={(_, reason) => {
                if (reason !== 'backdropClick') {
                    props.modalToggle(false);
                }
            }}
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(20px)', overflow: 'hidden' }}
        >
            <Paper sx={{ padding: 0, width: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 250,
                        maxHeight: 650,
                        overflow: 'auto',
                        p: 0,
                        backgroundColor: '#f6f7f9',
                        opacity: 1,
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px RGBA(0, 0, 0, 0.15)'
                    }}
                >
                    <CardHeader
                        title={'계정분류 수정'}
                        subheader={
                            errors.comm && (
                                <FormHelperText error id="fht-comm">
                                    {errors.comm?.message}
                                </FormHelperText>
                            )
                        }
                        action={
                            <IconButton onClick={() => props.modalToggle(false)} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="acId" error={Boolean(errors.acId)}>
                                    ID
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="acId"
                                    type="text"
                                    error={Boolean(errors.acId)}
                                    {...register('acId', { required: true, maxLength: 64 })}
                                    defaultValue={props.dataFromParent.id}
                                    placeholder="숫자 1자리"
                                />
                                {errors.acId && (
                                    <FormHelperText id="fht-acId" error>
                                        {errors.acId?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel htmlFor="title" error={Boolean(errors.title)}>
                                    분류명
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="title"
                                    type="text"
                                    error={Boolean(errors.title)}
                                    {...register('title', { required: true, maxLength: 64 })}
                                    defaultValue={props.dataFromParent.title}
                                    placeholder="숫자 1자리"
                                />
                                {errors.title && (
                                    <FormHelperText id="fht-title" error>
                                        {errors.title?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>
                        <Button type="submit">수정</Button>
                        <Button color="secondary" onClick={() => props.modalToggle(false)}>
                            취소
                        </Button>
                        <Button sx={{ ml: 'auto' }} color="warning" onClick={onDelete}>
                            삭제
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Modal>
    );
};

export default AccountClassEdit;
