import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'

const RealEstateDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?reId=' + props.dataFromParent.id, {
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
            console.log("RealEstateDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("RealEstateDel::fetch => " + error);
            setError("reId", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-danger ' + props.className}>
            <CModalHeader closeButton>부동산 삭제</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <p>다음 항목을 삭제할까요?</p>
                    <ul>
                        <li>부동산ID : {props.dataFromParent.id}</li>
                        <li>물건명칭 : <strong>[{props.dataFromParent.estateType}] {props.dataFromParent.title}</strong></li>
                        <li>취득일자 : {Helper.date.dateFormat(new Date(props.dataFromParent.acquisitionDate))}</li>
                        <li>예상가격 : {Helper.num.formatDecimal(props.dataFromParent.estimate)} (산정일 : {Helper.date.dateFormat(new Date(props.dataFromParent.estimateDate))})</li>
                        <li>담보대출 : {Helper.num.formatDecimal(props.dataFromParent.loan)}</li>
                    </ul>
                    <CFormGroup>
                        <Controller
                            name="reId"
                            control={control}
                            defaultValue={props.dataFromParent.id}
                            render={({field}) => (
                                <CInput
                                    type="hidden"
                                    name="reId"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                            rules={{ required: true }} />
                        {errors.reId && <CInvalidFeedback>{errors.reId.message}</CInvalidFeedback>}
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

export default RealEstateDel;
