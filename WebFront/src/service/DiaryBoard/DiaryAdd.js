import React, { useState } from 'react';
import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput,
} from '@coreui/react';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const DiaryAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

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
            console.log("DiaryAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("DiaryAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <div className="pull-right">
            <CButton color="success" className="btn-sm pull-right" onClick={toggleOpen}>
                <i className="fa fa-plus"></i>&nbsp;추가</CButton>
            <CModal isOpen={modalShow} toggle={toggleOpen}
                className={'modal-success ' + props.className}>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CModalHeader closeButton>일기 추가</CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol xs="12" md="12">
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <CInputGroupText style={{ minWidth: 70 }}>제목</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        as={<CInput />}
                                        type="text"
                                        control={control}
                                        defaultValue={''}
                                        name="title" id="title" placeholder="제목을 입력해 주세요."
                                        className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
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
                                        as={<CInput />}
                                        type="date"
                                        control={control}
                                        defaultValue={''}
                                        name="wdate" id="wdate" placeholder="작성일을 선택해 주세요."
                                        className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "작성일을 선택해 주세요."
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
                                        <CInputGroupText style={{ minWidth: 70 }}>날씨</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <Controller
                                        as={<CInput>
                                            <option value={0}>눈</option>
                                            <option value={1}>맑음</option>
                                            <option value={2}>구름조금</option>
                                            <option value={3}>흐림</option>
                                            <option value={4}>비온뒤갬</option>
                                            <option value={5}>비</option>
                                        </CInput>}
                                        type="select"
                                        control={control}
                                        defaultValue={1}
                                        name="weather" id="weather" placeholder="날씨를 선택해 주세요."
                                        className={"form-control" + (errors.weather ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "날씨를 선택해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.weather && <CInvalidFeedback>{errors.weather.message}</CInvalidFeedback>}
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
                                        as={<textarea />}
                                        control={control}
                                        defaultValue={''}
                                        name="content" id="content" placeholder="내용을 입력해 주세요."
                                        className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "내용을 입력해 주세요."
                                            }
                                        }}
                                        style={{ minHeight: 120 }}
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

export default DiaryAdd;
