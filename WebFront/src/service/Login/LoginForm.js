import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import {
    CButton, CCol, CRow,
    CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInvalidFeedback
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { useForm, Controller } from "react-hook-form";
import AllActions from 'src/actions';

const LoginForm = props => {
    const dispatch = useDispatch()

    const authError = useSelector(state => AllActions.auth.getAuthError(state));

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        dispatch(AllActions.auth.authLogin(e.target.pbpwd.value));
    };

    if (!errors.pbpwd && authError && authError.message) {
        setError("pbpwd", { type: "ServerResponse", message: authError.message });
        dispatch(AllActions.auth.authReset());
    }

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your PersonalDataStorage</p>
            <CRow className="form-group">
                <CInputGroup>
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="uid" autoComplete="username" style={{ display: "none" }} />
                    <Controller
                        name="pbpwd"
                        control={control}
                        defaultValue={''}
                        render={(ctrlProps) => (
                            <CInput
                                type="password"
                                name="pbpwd"
                                placeholder="Password"
                                className={"form-control" + (errors.pbpwd ? " is-invalid" : " is-valid")}
                                tabIndex="0"
                                autoComplete="current-password"
                                value={ctrlProps.value}
                                onChange={ctrlProps.onChange}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: "(Req) 비밀번호를 입력해 주세요."
                            },
                            minLength: {
                                value: 4,
                                message: "(Min) 비밀번호는 4자 이상입니다."
                            },
                        }}
                    />
                    {errors.pbpwd && <CInvalidFeedback>{errors.pbpwd.message}</CInvalidFeedback>}
                </CInputGroup>
            </CRow>
            <CRow className="mt-2">
                <CCol xs="6">
                    <CButton type="submit" color="primary" className="px-4">Login</CButton>
                </CCol>
            </CRow>
        </CForm>
    );
};

export default withRouter(LoginForm);
