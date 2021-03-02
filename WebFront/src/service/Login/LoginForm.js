import React from 'react';
import { withRouter } from "react-router-dom";
import {
    CButton, CCol, CRow,
    CForm, CInputGroup, CInputGroupPrepend, CInputGroupText
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';

const LoginForm = props => {
    const crypto = require('crypto');

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/auth' : '/pds/v1/auth';

    const { register, handleSubmit, errors, setError } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        var iv = Buffer.from("PasswordBook1234");
        var sha256 = crypto.createHash('sha256');
        sha256.update('PasswordBook');

        var aesCipher = crypto.createCipheriv('aes-256-cbc', sha256.digest(), iv);
        aesCipher.update(e.target.pbpwd.value);
        var cryptBytes = aesCipher.final();
        var base64Result = cryptBytes.toString('base64');

        // console.log("base64Result = " + base64Result);

        e.target.pbpwd.value = base64Result;

        const formData = new FormData(e.target);

        formData.pbpwd = base64Result;
        fetch(REQ_URI, {
            method: 'POST',
            body: formData,
            credentials: "include"
        }).then(function (res) {
            if (!res.ok) {
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log(resJson.result);
            if (resJson.auth && resJson.auth.ckey && resJson.auth.cval) {
                let cookies = new Cookies();
                cookies.set(resJson.auth.ckey, resJson.auth.cval);
                props.history.push('/');
            }
        }).catch(function (error) {
            setError("pbpwd", "serverResponse", error.message);
            console.log(error);
            e.target.reset();
        });
    };

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your PasswordBook</p>
            <CRow className="form-group">
                <CInputGroup>
                    <CInputGroupPrepend>
                        <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <input
                        type="password"
                        className={"form-control" + (errors.pbpwd ? " is-invalid" : " is-valid")}
                        name="pbpwd"
                        placeholder="Password"
                        tabIndex="0"
                        ref={register({
                            required: true,
                            minLength: 4,
                            maxLength: 16,
                        })}
                    />
                </CInputGroup>

                {errors.pbpwd && errors.pbpwd.type === "required" && <small id="pbpwdError" className="text-danger">비밀번호를 입력해 주세요.</small>}
                {errors.pbpwd && errors.pbpwd.type === "minLength" && <small id="pbpwdError" className="text-danger">비밀번호는 4자 이상입니다.</small>}
                {errors.pbpwd && errors.pbpwd.type === "serverResponse" && <small id="pbpwdError" className="text-danger">{errors.pbpwd.message}</small>}
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
