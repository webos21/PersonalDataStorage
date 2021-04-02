import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux'

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CSelect, CTextarea,
} from '@coreui/react';

import AllActions from '../../actions'
import Helper from '../../helpers'


const InsuranceRecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insuranceRecord' : '/pds/v1/insuranceRecord';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const insuranceList = useSelector(state => AllActions.insure.getInsurances(state));

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'POST',
            headers: Helper.auth.makeAuthHeader(),
            body: formData
        }).then(function (res) {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location = "/#/logout";
                }
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log("InsuranceRecordAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("InsuranceRecordAdd::fetch => " + error);
            setError("cardId", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>카드거래내역 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>보험선택</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="insuranceId"
                                    key={"insuranceId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.insuranceId}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="insuranceId"
                                            placeholder="보험을 선택해 주세요."
                                            className={"form-control" + (errors.insuranceId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'insuranceId-item--1'} value={-1}>보험을 선택해 주세요.</option>
                                            <option key={'insuranceId-item--2'} value={-2}>----------------</option>
                                            {
                                                insuranceList.map((data, index) => {
                                                    return (
                                                        <option key={'insuranceId-item-' + data.id} value={data.id}>{data.company} - {data.product}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 보험을 선택해 주세요."
                                        },
                                        min: {
                                            value: 0,
                                            message: "(Min) 보험을 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.insuranceId && <CInvalidFeedback>{errors.insuranceId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>거래일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="transactionDate"
                                    key={"transactionDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.transactionDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="transactionDate"
                                            placeholder="거래일을 입력해 주세요."
                                            className={"form-control" + (errors.transactionDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 거래일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 거래일을 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "(Max) 거래일을 15자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.transactionDate && <CInvalidFeedback>{errors.transactionDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>적요</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="title"
                                    key={"title" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.title}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="title"
                                            placeholder="적요를 입력해 주세요."
                                            className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}

                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 적요를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 적요는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 적요는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.title && <CInvalidFeedback>{errors.title.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>입금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="deposit"
                                    key={"deposit" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.deposit}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="deposit" placeholder="입금액을 입력해 주세요."
                                            className={"form-control" + (errors.deposit ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 입금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 입금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 입금액은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.deposit && <CInvalidFeedback>{errors.deposit.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>출금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="withdrawal"
                                    key={"withdrawal" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.withdrawal}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="withdrawal"
                                            placeholder="출금액을 입력해 주세요."
                                            className={"form-control" + (errors.withdrawal ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 출금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 출금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 출금액은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.withdrawal && <CInvalidFeedback>{errors.withdrawal.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>메모</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="memo"
                                    key={"memo" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.memo}
                                    render={(ctrlProps) => (
                                        <CTextarea
                                            type="text"
                                            name="memo"
                                            placeholder="메모를 입력해 주세요."
                                            className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                            style={{ minHeight: 120 }}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: false,
                                        }
                                    }}
                                />
                                {errors.memo && <CInvalidFeedback>{errors.memo.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>

                </CModalBody>
                <CModalFooter>
                    <CButton type="submit" color="success">추가</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default InsuranceRecordAdd;
