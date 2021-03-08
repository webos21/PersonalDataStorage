import React from 'react';

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CSelect, CTextarea
} from '@coreui/react';

import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const DiaryEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onDelete = () => {
        const cookies = new Cookies();

        fetch(REQ_URI + '?diaryId=' + props.dataFromParent.id, {
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
            console.log("DiaryDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("DiaryDel::fetch => " + error);
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
            console.log("DiaryEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("DiaryEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>일기 수정</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="diaryId"
                                key={"diaryId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="diaryId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 70 }}>제목</CInputGroupText>
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
                                {errors.diaryId && <CInvalidFeedback>{errors.diaryId.message}</CInvalidFeedback>}
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
                                    key={"wdate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.wdate !== '' ? dateFormat(new Date(props.dataFromParent.wdate)) : ''}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="wdate"
                                            placeholder="작성일을 선택해 주세요."
                                            className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
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
                                    name="weather"
                                    key={"weather" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.weather}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            name="weather"
                                            placeholder="날씨를 선택해 주세요."
                                            className={"form-control" + (errors.weather ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        >
                                            <option value={0}>눈</option>
                                            <option value={1}>맑음</option>
                                            <option value={2}>구름조금</option>
                                            <option value={3}>흐림</option>
                                            <option value={4}>비온뒤갬</option>
                                            <option value={5}>비</option>
                                        </CSelect>
                                    )}
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
                                    name="content"
                                    key={"content" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.content}
                                    render={(ctrlProps) => (
                                        <CTextarea
                                            name="content"
                                            placeholder="내용을 입력해 주세요."
                                            className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                            style={{ minHeight: 120 }}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
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
                    <CButton color="danger" className="mr-auto" onClick={onDelete}>삭제</CButton>
                    <CButton type="submit" color="warning">수정</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default DiaryEdit;
