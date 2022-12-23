import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'


const RealEstateAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';

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
            console.log("RealEstateAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("RealEstateAdd::fetch => " + error);
            setError("estateType", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>부동산 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
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
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>자산유형</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="estateType"
                                    control={control}
                                    defaultValue={props.dataFromParent.estateType}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="estateType"
                                            placeholder="자산유형을 입력해 주세요."
                                            className={"form-control" + (errors.estateType ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 자산유형을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 자산유형은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 자산유형은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.reId && <CInvalidFeedback>{errors.reId.message}</CInvalidFeedback>}
                                {errors.estateType && <CInvalidFeedback>{errors.estateType.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>자산이름</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={props.dataFromParent.title}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="title"
                                            placeholder="자산이름을 입력해 주세요."
                                            className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 자산이름을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 자산이름은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 자산이름은 60자 이내 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>소유자명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="holder"
                                    control={control}
                                    defaultValue={props.dataFromParent.holder}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="holder"
                                            placeholder="소유자명을 입력해 주세요."
                                            className={"form-control" + (errors.holder ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 소유자명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 소유자명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 소유자명은 60자 이내 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>예상가격</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="estimate"
                                    control={control}
                                    defaultValue={props.dataFromParent.estimate}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="estimate"
                                            placeholder="예상가격을 입력해 주세요."
                                            className={"form-control" + (errors.estimate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 예상가격을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 예상가격은 1자 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 예상가격은 20자 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>담보대출</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="loan"
                                    control={control}
                                    defaultValue={props.dataFromParent.loan}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="loan"
                                            placeholder="담보대출을 입력해 주세요."
                                            className={"form-control" + (errors.loan ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 담보대출을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 담보대출은 1자 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 담보대출은 20자 입니다."
                                        }
                                    }}
                                />
                                {errors.loan && <CInvalidFeedback>{errors.loan.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>취득일자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="acquisitionDate"
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.acquisitionDate))}
                                    render={({field}) => (
                                        <CInput
                                            type="date"
                                            name="acquisitionDate"
                                            placeholder="취득일자를 선택해 주세요."
                                            className={"form-control" + (errors.acquisitionDate ? " is-invalid" : " is-valid")}
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
                                {errors.acquisitionDate && <CInvalidFeedback>{errors.acquisitionDate.message}</CInvalidFeedback>}
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

export default RealEstateAdd;
