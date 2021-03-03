import React, { useState } from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInputRadio, CLabel
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const AnniversaryAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

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
            console.log("AnniversaryAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("AnniversaryAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <div className="float-right">
            <CButton color="success" size="sm" onClick={toggleOpen}>
                <CIcon content={freeSet.cilPlus} size="sm" />&nbsp;추가</CButton>
            <CModal show={modalShow} onClose={toggleOpen}
                className={'modal-success ' + props.className}>
                <CModalHeader closeButton>기념일 추가</CModalHeader>
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
                                        <CInputGroupText style={{ minWidth: 70 }}>적용일</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="adate"
                                        control={control}
                                        defaultValue={''}
                                        render={(ctrlProps) => (
                                            <CInput
                                                type="text"
                                                name="adate"
                                                placeholder="적용일을 입력해 주세요. (월일 4자리)"
                                                className={"form-control" + (errors.adate ? " is-invalid" : " is-valid")}
                                                value={ctrlProps.value}
                                                onChange={ctrlProps.onChange}
                                            />
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Required!! 적용일을 입력해 주세요. (월일 4자리)."
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "MinLength!! 적용일을 입력해 주세요. (월일 4자리)"
                                            },
                                            maxLength: {
                                                value: 4,
                                                message: "MaxLength!! 적용일을 입력해 주세요. (월일 4자리)"
                                            }
                                        }}
                                    />
                                    {errors.adate && <CInvalidFeedback>{errors.adate.message}</CInvalidFeedback>}
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 70 }}>양음력</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="lunar"
                                        control={control}
                                        defaultValue={'0'}
                                        render={(ctrlProps) => (
                                            <CFormGroup className={"form-control" + (errors.lunar ? " is-invalid" : " is-valid")}>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio
                                                        custom
                                                        name="lunar"
                                                        value="0"
                                                        id="lunar-radio1"
                                                        checked={ctrlProps.value === '0'}
                                                        onChange={ctrlProps.onChange}
                                                    /><CLabel variant="custom-checkbox" htmlFor="lunar-radio1">양력</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio
                                                        custom
                                                        name="lunar"
                                                        value="1"
                                                        id="lunar-radio2"
                                                        checked={ctrlProps.value === '1'}
                                                        onChange={ctrlProps.onChange}
                                                    /><CLabel variant="custom-checkbox" htmlFor="lunar-radio2">음력</CLabel>
                                                </CFormGroup>
                                                <div>{ctrlProps.value}</div>
                                            </CFormGroup>
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "양력/음력을 선택해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.lunar && <CInvalidFeedback>{errors.lunar.message}</CInvalidFeedback>}
                                </CInputGroup>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 70 }}>휴무일</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        name="holiday"
                                        control={control}
                                        defaultValue={'0'}
                                        render={(ctrlProps) => (
                                            <CFormGroup className={"form-control" + (errors.holiday ? " is-invalid" : " is-valid")}>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio
                                                        custom
                                                        name="holiday"
                                                        value="0"
                                                        id="holiday-radio1"
                                                        checked={ctrlProps.value === '0'}
                                                        onChange={ctrlProps.onChange}
                                                    /><CLabel variant="custom-checkbox" htmlFor="holiday-radio1">평일</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio
                                                        custom
                                                        name="holiday"
                                                        value="1"
                                                        id="holiday-radio2"
                                                        checked={ctrlProps.value === '1'}
                                                        onChange={ctrlProps.onChange}
                                                    /><CLabel variant="custom-checkbox" htmlFor="holiday-radio2">휴일</CLabel>
                                                </CFormGroup>
                                                <div>{ctrlProps.value}</div>
                                            </CFormGroup>
                                        )}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "휴일여부를 선택해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.holiday && <CInvalidFeedback>{errors.holiday.message}</CInvalidFeedback>}
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

export default AnniversaryAdd;
