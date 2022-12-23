import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInputRadio, CLabel, CTextarea
} from '@coreui/react';

import Helper from '../../helpers'

const ScheduleAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/schedule' : '/pds/v1/schedule';

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
            console.log("ScheduleAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("ScheduleAdd::fetch => " + error);
            setError("title", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>일정 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>제목</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={props.dataFromParent.title}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="title"
                                            placeholder="제목을 입력해 주세요."
                                            className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "제목을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "제목은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "제목은 100자 이내 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>계획일시</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="pdate"
                                    control={control}
                                    defaultValue={Helper.date.datetimeFormat(new Date(props.dataFromParent.pdate))}
                                    render={({field}) => (
                                        <CInput
                                            type="datetime-local"
                                            name="pdate"
                                            placeholder="계획일시를 선택해 주세요."
                                            className={"form-control" + (errors.pdate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "계획일시를 선택해 주세요."
                                        }
                                    }}
                                />
                                {errors.pdate && <CInvalidFeedback>{errors.pdate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>확인여부</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="readOk"
                                    control={control}
                                    defaultValue={"" + props.dataFromParent.readOk}
                                    render={({field}) => (
                                        <CFormGroup className={"form-control" + (errors.readOk ? " is-invalid" : " is-valid")}>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="readOk"
                                                    value="0"
                                                    id="readOk-add-radio1"
                                                    checked={field.value === '0'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="readOk-add-radio1">미확인</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="readOk"
                                                    value="1"
                                                    id="readOk-add-radio2"
                                                    checked={field.value === '1'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="readOk-add-radio2">확인완료</CLabel>
                                            </CFormGroup>
                                        </CFormGroup>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.readOk && <CInvalidFeedback>{errors.readOk.message}</CInvalidFeedback>}
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

export default ScheduleAdd;
