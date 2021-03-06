import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'


const PbFormDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/pwbook' : '/pds/v1/pwbook';

    const { handleSubmit, formState: { errors }, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?siteId=' + data.siteId, {
            method: 'DELETE',
            headers: Helper.auth.makeAuthHeader(),
        }).then(function (res) {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location = "/#/logout";
                }
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log("PbFormDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                //toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("PbFormDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    return (
        <span>
            <CButton color="danger" className="btn-sm" onClick={toggleOpen}>
                <i className="fa fa-trash-o"></i>&nbsp;삭제</CButton>
            <CModal isOpen={modalShow} toggle={toggleOpen}
                className={'modal-danger ' + props.className}>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalHeader closeButton>비밀번호 삭제</CModalHeader>
                    <CModalBody>
                        <p>다음 항목을 삭제할까요?</p>
                        <ul>
                            <li>일련번호 : {props.dataFromParent.id}</li>
                            <li>U R L : {props.dataFromParent.siteUrl}</li>
                            <li>사이트명 : {props.dataFromParent.siteName}</li>
                            <li>유 형 : {props.dataFromParent.siteType}</li>
                            <li>아 이 디 : {props.dataFromParent.myId}</li>
                            <li>등 록 일 : {Helper.date.dateFormat(new Date(props.dataFromParent.regDate))}</li>
                        </ul>
                        <CFormGroup>
                            <Controller
                                name="siteId"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={({field}) => (
                                    <CInput
                                        type="hidden"
                                        name="siteId"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            {errors.siteId && <CInvalidFeedback>{errors.siteId.message}</CInvalidFeedback>}
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="danger">삭제</CButton>{' '}
                        <CButton color="secondary" onClick={toggleOpen}>취소</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </span>
    );
};

export default PbFormDel;
