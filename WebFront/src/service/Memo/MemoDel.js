import React, { useState } from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import { useForm,Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const MemoDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/memo' : '/pds/v1/memo';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        const cookies = new Cookies();
    
        fetch(REQ_URI + '?memoId=' + data.memoId, {
            method: 'DELETE',
            headers: new Headers({
                'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
                'Authorization': 'Basic ' + btoa('username:password'),
            }),
        }).then(function (res) {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location = "/#/logout";
                }
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log("MemoDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                //toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("MemoDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    return (
        <span className="float">
            <CButton color="danger" size="sm" variant="ghost" onClick={toggleOpen}>
                <CIcon content={freeSet.cilTrash} /> 삭제</CButton>
            <CModal show={modalShow} onClose={toggleOpen}
                className={'modal-danger ' + props.className}>
                <CModalHeader closeButton>메모 삭제</CModalHeader>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalBody>
                        <p>다음 항목을 삭제할까요?</p>
                        <ul>
                            <li>메모 번호 : {props.dataFromParent.id}</li>
                            <li>메모 날짜 : {dateFormat(new Date(props.dataFromParent.wdate))}</li>
                            <li>메모 제목 : {props.dataFromParent.title}</li>
                        </ul>
                        <CFormGroup>
                            <Controller
                                name="memoId"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="memoId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            {errors.memoId && <CInvalidFeedback>{errors.memoId.message}</CInvalidFeedback>}
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

export default MemoDel;
