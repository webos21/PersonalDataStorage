import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter,
    CButton, CForm, CFormGroup, CInvalidFeedback, CInput
} from '@coreui/react';

import Helper from '../../helpers'

const InsuranceDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?insureId=' + props.dataFromParent.id, {
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
            console.log("InsuranceDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("InsuranceDel::fetch => " + error);
            setError("insureId", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-danger ' + props.className}>
            <CModalHeader closeButton>보험 삭제</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <p>다음 항목을 삭제할까요?</p>
                    <ul>
                        <li>보험ID : {props.dataFromParent.id}</li>
                        <li>보험상품 : <strong>{props.dataFromParent.company + '-' + props.dataFromParent.product}</strong></li>
                        <li>보험형태 : {props.dataFromParent.insuranceType} / {props.dataFromParent.policyType}</li>
                        <li>보험납입 : {props.dataFromParent.payCountDone} / {props.dataFromParent.payCountTotal}</li>
                        <li>납입금액 : {Helper.num.formatDecimal(props.dataFromParent.premiumVolume)}</li>
                        <li>보험기간 : {Helper.date.dateFormat(new Date(props.dataFromParent.contractDate))} ~ {Helper.date.dateFormat(new Date(props.dataFromParent.maturityDate))}</li>
                    </ul>
                    <CFormGroup>
                        <Controller
                            name="insureId"
                            control={control}
                            defaultValue={props.dataFromParent.id}
                            render={({field}) => (
                                <CInput
                                    type="hidden"
                                    name="insureId"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                            rules={{ required: true }} />
                        {errors.insureId && <CInvalidFeedback>{errors.insureId.message}</CInvalidFeedback>}
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

export default InsuranceDel;
