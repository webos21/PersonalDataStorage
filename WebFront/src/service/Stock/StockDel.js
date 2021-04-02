import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'

const StockDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stock' : '/pds/v1/stock';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?stockId=' + props.dataFromParent.id, {
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
            console.log("StockDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("StockDel::fetch => " + error);
            setError("stockId", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-danger ' + props.className}>
            <CModalHeader closeButton>주식계좌 삭제</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <p>다음 항목을 삭제할까요?</p>
                    <ul>
                        <li>주식ID : {props.dataFromParent.id}</li>
                        <li>계좌명칭 : <strong>[{props.dataFromParent.company}] {props.dataFromParent.accountName}</strong></li>
                        <li>계좌번호 : {props.dataFromParent.accountNumber}</li>
                        <li>예탁금액 : {Helper.num.formatDecimal(props.dataFromParent.deposit)}</li>
                        <li>산정금액 : {Helper.num.formatDecimal(props.dataFromParent.estimate)} (산정일 : {Helper.date.dateFormat(new Date(props.dataFromParent.estimateDate))})</li>
                    </ul>
                    <CFormGroup>
                        <Controller
                            name="stockId"
                            control={control}
                            defaultValue={props.dataFromParent.id}
                            render={(ctrlProps) => (
                                <CInput
                                    type="hidden"
                                    name="stockId"
                                    value={ctrlProps.value}
                                    onChange={ctrlProps.onChange}
                                />
                            )}
                            rules={{ required: true }} />
                        {errors.stockId && <CInvalidFeedback>{errors.stockId.message}</CInvalidFeedback>}
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

export default StockDel;
