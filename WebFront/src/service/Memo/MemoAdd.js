import React, { useState } from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const MemoAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/memo' : '/pds/v1/memo';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        const cookies = new Cookies();

        fetch(REQ_URI, {
            method: 'POST',
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
            console.log("MemoAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("MemoAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <div className="float-right">
            <CButton color="success" size="sm" onClick={toggleOpen}>
                <CIcon content={freeSet.cilPlus} />&nbsp;추가</CButton>
            <CModal show={modalShow} onClose={toggleOpen}
                className={'modal-success ' + props.className}>
                <CModalHeader closeButton>메모 추가</CModalHeader>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 70 }}>제목</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={''}
                                        render={(ctrlProps) => (
                                            <CInput
                                                type="text"
                                                name="title"
                                                placeholder="제목을 입력해 주세요."
                                                className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                                value={ctrlProps.value}
                                                onChange={ctrlProps.onChange}
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
                                        <CInputGroupText style={{ minWidth: 70 }}>작성일</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="wdate"
                                        control={control}
                                        defaultValue={''}
                                        render={(ctrlProps) => (
                                            <CInput
                                                type="date"
                                                name="wdate"
                                                placeholder="작성일를 선택해 주세요."
                                                className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                                value={ctrlProps.value}
                                                onChange={ctrlProps.onChange}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "작성일를 선택해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.wdate && <CInvalidFeedback>{errors.wdate.message}</CInvalidFeedback>}
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 70 }}>내용</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="content"
                                        control={control}
                                        defaultValue={''}
                                        render={(ctrlProps) => (
                                            <CTextarea
                                                name="content"
                                                placeholder="내용을 입력해 주세요."
                                                className={"form-control" + (errors.content ? " is-invalid" : " is-valid")}
                                                value={ctrlProps.value}
                                                onChange={ctrlProps.onChange}
                                                style={{ minHeight: 120 }}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "내용을 입력해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.content && <CInvalidFeedback>{errors.content.message}</CInvalidFeedback>}
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>

                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="success">추가</CButton>{' '}
                        <CButton color="secondary" onClick={toggleOpen}>취소</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </div>
    );
};

export default MemoAdd;
