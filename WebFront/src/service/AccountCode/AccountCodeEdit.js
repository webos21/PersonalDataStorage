import React from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput,
} from '@coreui/react';

import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const AccountCodeEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/accountCode' : '/pds/v1/accountCode';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onDelete = () => {
        const cookies = new Cookies();

        fetch(REQ_URI + '?accId=' + props.dataFromParent.id, {
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
            console.log("AccountCodeDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("AccountCodeDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        const cookies = new Cookies();

        fetch(REQ_URI, {
            method: 'PUT',
            headers: new Headers({
                'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
                'Authorization': 'Basic ' + btoa('username:password'),
            }),
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
            console.log("AccountCodeEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("AccountCodeEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>계정코드 수정</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                <CFormGroup row>
                        <CCol xs="12" md="12">
                        <Controller
                                name="accId"
                                key={"accId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="accId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />

                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 70 }}>코드</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="acodeId"
                                    key={"acodeId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.accountCode}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="acodeId"
                                            placeholder="코드를 입력해 주세요."
                                            className={"form-control" + (errors.acodeId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Required) 코드를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "(MinLength) 코드는 2자 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(MaxLength) 코드는 2자 입니다."
                                        }
                                    }}
                                />
                                {errors.accId && <CInvalidFeedback>{errors.accId.message}</CInvalidFeedback>}
                                {errors.acodeId && <CInvalidFeedback>{errors.acodeId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 70 }}>코드명</CInputGroupText>
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
                                            placeholder="코드명을 입력해 주세요."
                                            className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "코드명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "코드명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "코드명은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.memoId && <CInvalidFeedback>{errors.memoId.message}</CInvalidFeedback>}
                                {errors.title && <CInvalidFeedback>{errors.title.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>

                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" className="mr-auto" onClick={onDelete}>삭제</CButton>
                    <CButton type="submit" color="warning">수정</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default AccountCodeEdit;
