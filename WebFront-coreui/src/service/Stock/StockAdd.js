import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'


const StockAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stock' : '/pds/v1/stock';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

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
            console.log("StockAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("StockAdd::fetch => " + error);
            setError("bankName", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>주식계좌 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>증권사</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="company"
                                    control={control}
                                    defaultValue={props.dataFromParent.company}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="company"
                                            placeholder="증권사를 입력해 주세요."
                                            className={"form-control" + (errors.company ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 증권사를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 증권사는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 증권사는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.stockId && <CInvalidFeedback>{errors.stockId.message}</CInvalidFeedback>}
                                {errors.company && <CInvalidFeedback>{errors.company.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계좌명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="accountName"
                                    control={control}
                                    defaultValue={props.dataFromParent.accountName}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="accountName"
                                            placeholder="계좌명을 입력해 주세요."
                                            className={"form-control" + (errors.accountName ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계좌명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 계좌명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 계좌명은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.accountName && <CInvalidFeedback>{errors.accountName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계좌번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="accountNumber"
                                    control={control}
                                    defaultValue={props.dataFromParent.accountNumber}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="accountNumber"
                                            placeholder="계좌번호를 입력해 주세요."
                                            className={"form-control" + (errors.accountNumber ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계좌번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 11,
                                            message: "(Min) 계좌번호는 11자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 계좌번호는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.accountNumber && <CInvalidFeedback>{errors.accountNumber.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>소유주</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="holder"
                                    control={control}
                                    defaultValue={props.dataFromParent.holder}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="holder"
                                            placeholder="소유주를 입력해 주세요."
                                            className={"form-control" + (errors.holder ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 소유주를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 소유주는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 소유주는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.holder && <CInvalidFeedback>{errors.holder.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>예탁금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="deposit"
                                    control={control}
                                    defaultValue={props.dataFromParent.deposit}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="deposit"
                                            placeholder="예탁금액을 입력해 주세요."
                                            className={"form-control" + (errors.deposit ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 예탁금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 예탁금액은 1자 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 예탁금액은 20자 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>산정금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="estimate"
                                    control={control}
                                    defaultValue={props.dataFromParent.estimate}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="estimate"
                                            placeholder="산정금액을 입력해 주세요."
                                            className={"form-control" + (errors.estimate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 산정금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 산정금액은 1자 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 산정금액은 20자 입니다."
                                        }
                                    }}
                                />
                                {errors.estimate && <CInvalidFeedback>{errors.estimate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>산정일자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="estimateDate"
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.estimateDate))}
                                    render={({field}) => (
                                        <CInput
                                            type="date"
                                            name="estimateDate"
                                            placeholder="산정일자를 선택해 주세요."
                                            className={"form-control" + (errors.estimateDate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.estimateDate && <CInvalidFeedback>{errors.estimateDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>배열순서</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="arrange"
                                    control={control}
                                    defaultValue={props.dataFromParent.arrange}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="arrange"
                                            placeholder="배열순서를 입력해 주세요."
                                            className={"form-control" + (errors.arrange ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.arrange && <CInvalidFeedback>{errors.arrange.message}</CInvalidFeedback>}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.memo}
                                    render={({field}) => (
                                        <CTextarea
                                            type="text"
                                            name="memo"
                                            placeholder="메모를 입력해 주세요."
                                            className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                            style={{ minHeight: 120 }}
                                            value={field.value}
                                            onChange={field.onChange}
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

export default StockAdd;
