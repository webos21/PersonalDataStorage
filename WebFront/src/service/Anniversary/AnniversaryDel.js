import React, { useState } from 'react';
import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const AnniversaryDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/anniversary' : '/pds/v1/anniversary';

    const initValues = props.dataFromParent;
    const cookies = new Cookies();

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
        defaultValues: {
            siteId: initValues.id,
        }
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?anniId=' + data.anniId, {
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
                    <CModalHeader closeButton>기념일 삭제</CModalHeader>
                    <CModalBody>
                        <p>다음 항목을 삭제할까요?</p>
                        <ul>
                            <li>기념일 번호 : {props.dataFromParent.id}</li>
                            <li>기념일 날짜 : {props.dataFromParent.applyDate.substring(0, 2) + '월 ' + props.dataFromParent.applyDate.substring(2, 4) + '일' + ((props.dataFromParent.lunar === 1) ? '(음력)' : '')}</li>
                            <li>기념일 제목 : {props.dataFromParent.title}</li>
                        </ul>
                        <CFormGroup>
                            <Controller
                                as={<CInput />}
                                type="hidden"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                name="anniId"
                                rules={{ required: true }} />
                            {errors.anniId && <CInvalidFeedback>{errors.anniId.message}</CInvalidFeedback>}
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

export default AnniversaryDel;
