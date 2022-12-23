import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'

const DiaryDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/diary' : '/pds/v1/diary';

    const { handleSubmit, formState: { errors }, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?diaryId=' + data.diaryId, {
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
            console.log("DiaryDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                //toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("DiaryDel::fetch => " + error);
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
                    <CModalHeader closeButton={toggleOpen}>일기 삭제</CModalHeader>
                    <CModalBody>
                        <p>다음 항목을 삭제할까요?</p>
                        <ul>
                            <li>일기 번호 : {props.dataFromParent.id}</li>
                            <li>일기 날짜 : {Helper.date.dateFormat(new Date(props.dataFromParent.wdate))}</li>
                            <li>일기 제목 : {props.dataFromParent.title}</li>
                        </ul>
                        <CFormGroup>
                            <Controller
                                name="diaryId"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={({field}) => (
                                    <CInput
                                        type="hidden"
                                        name="diaryId"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            {errors.diaryId && <CInvalidFeedback>{errors.diaryId.message}</CInvalidFeedback>}
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="danger">삭제</CButton>
                        <CButton color="secondary" onClick={toggleOpen}>취소</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </span>
    );
};

export default DiaryDel;
