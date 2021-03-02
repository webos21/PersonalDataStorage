import React, { useState } from 'react';
import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput,
} from '@coreui/react';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const PbFormEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/pwbook' : '/pds/v1/pwbook';

    const cookies = new Cookies();

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShowEdit, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShowEdit);
    }

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

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
            console.log("PbFormEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("PbFormEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <span>
            <CButton color="warning" className="btn-sm" onClick={toggleOpen}>
                <i className="fa fa-edit"></i>&nbsp;수정</CButton>
            <CModal isOpen={modalShowEdit} toggle={toggleOpen}
                className={'modal-warning ' + props.className}>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalHeader closeButton>비밀번호 수정</CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <Controller
                                    as={<CInput />}
                                    type="hidden"
                                    control={control}
                                    defaultValue={props.dataFromParent.id}
                                    name="siteId"
                                    rules={{ required: true }} />
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 80 }}>URL</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        as={<CInput />}
                                        type="url"
                                        control={control}
                                        defaultValue={props.dataFromParent.siteUrl}
                                        name="siteUrl" id="siteUrl" placeholder="URL을 입력해 주세요."
                                        className={"form-control" + (errors.siteUrl ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.siteName}
                                        name="siteName" id="siteName" placeholder="사이트명을 입력해 주세요."
                                        className={"form-control" + (errors.siteName ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.siteType}
                                        name="siteType" id="siteType" placeholder="유형을 입력해 주세요."
                                        className={"form-control" + (errors.siteType ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.myId}
                                        name="myId" id="myId" placeholder="아이디를 입력해 주세요."
                                        className={"form-control" + (errors.myId ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.myPw}
                                        name="myPw" id="myPw" placeholder="비밀번호를 입력해 주세요."
                                        className={"form-control" + (errors.myPw ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="date"
                                        control={control}
                                        defaultValue={dateFormat(new Date(props.dataFromParent.regDate))}
                                        name="regDate" id="regDate" placeholder="가입일자를 선택해 주세요."
                                        className={"form-control" + (errors.regDate ? " is-invalid" : " is-valid")}
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
                                        as={<textarea />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.memo}
                                        name="memo" id="memo" placeholder="메모를 입력해 주세요."
                                        className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                    />
                                    {errors.memo && <CInvalidFeedback>{errors.memo.message}</CInvalidFeedback>}
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>

                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="warning">수정</CButton>{' '}
                        <CButton color="secondary" onClick={toggleOpen}>취소</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </span>
    );
};

export default PbFormEdit;
