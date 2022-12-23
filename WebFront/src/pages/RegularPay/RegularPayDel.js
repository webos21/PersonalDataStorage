import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'

const RegularPayDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularPay' : '/pds/v1/regularPay';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?rpId=' + props.dataFromParent.id, {
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
            console.log("RegularPayDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("RegularPayDel::fetch => " + error);
            setError("rpId", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-danger ' + props.className}>
            <CModalHeader closeButton>정기납입 삭제</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <p>다음 항목을 삭제할까요?</p>
                    <ul>
                        <li>정기납ID : {props.dataFromParent.id}</li>
                        <li>정기납명 : <strong>{props.dataFromParent.title}</strong></li>
                        <li>계정분류 : {props.dataFromParent.accountCode}</li>
                        <li>입금금액 : {Helper.num.formatDecimal(props.dataFromParent.deposit)}</li>
                        <li>출금금액 : {Helper.num.formatDecimal(props.dataFromParent.withdrawal)}</li>
                    </ul>
                    <CFormGroup>
                        <Controller
                            name="rpId"
                            control={control}
                            defaultValue={props.dataFromParent.id}
                            render={({field}) => (
                                <CInput
                                    type="hidden"
                                    name="rpId"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                            rules={{ required: true }} />
                        {errors.rpId && <CInvalidFeedback>{errors.rpId.message}</CInvalidFeedback>}
                    </CFormGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton type="submit" color="danger">삭제</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default RegularPayDel;
