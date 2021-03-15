import React from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';

import { useForm, Controller } from "react-hook-form";

const PbFormAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/pwbook' : '/pds/v1/pwbook';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'POST',
            headers: new Headers({
                'X-PDS-AUTH': localStorage.getItem("X-PDS-AUTH"),
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
            console.log("PbFormAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("PbFormAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>비밀번호 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>URL</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="siteUrl"
                                    key={"siteUrl" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.siteUrl}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="url"
                                            name="siteUrl"
                                            placeholder="URL을 입력해 주세요."
                                            className={"form-control" + (errors.siteUrl ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "URL을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "URL은 10자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "URL은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteUrl && <CInvalidFeedback>{errors.siteUrl.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>사이트명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="siteName"
                                    key={"siteName" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.siteName}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="siteName"
                                            placeholder="사이트명을 입력해 주세요."
                                            className={"form-control" + (errors.siteName ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "사이트명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "사이트명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "사이트명은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteName && <CInvalidFeedback>{errors.siteName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>유형</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="siteType"
                                    key={"siteType" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.siteType}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="siteType"
                                            placeholder="유형을 입력해 주세요."
                                            className={"form-control" + (errors.siteType ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}

                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "유형을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "유형은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "유형은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteType && <CInvalidFeedback>{errors.siteType.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>아 이 디</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="myId"
                                    key={"myId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.myId}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="myId" placeholder="아이디를 입력해 주세요."
                                            className={"form-control" + (errors.myId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "아이디를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "아이디는 4자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "아이디는 50자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.myId && <CInvalidFeedback>{errors.myId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>비밀번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="myPw"
                                    key={"myPw" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.myPw}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="myPw"
                                            placeholder="비밀번호를 입력해 주세요."
                                            className={"form-control" + (errors.myPw ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "비밀번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "비밀번호는 4자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "비밀번호는 50자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.myPw && <CInvalidFeedback>{errors.myPw.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>가입일자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="regDate"
                                    key={"regDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={''}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="regDate" id="regDate" placeholder="가입일자를 선택해 주세요."
                                            className={"form-control" + (errors.regDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "가입일자를 선택해 주세요."
                                        }
                                    }}
                                />
                                {errors.regDate && <CInvalidFeedback>{errors.regDate.message}</CInvalidFeedback>}
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
                                            value: true,
                                            message: "메모를 입력해 주세요."
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

export default PbFormAdd;
