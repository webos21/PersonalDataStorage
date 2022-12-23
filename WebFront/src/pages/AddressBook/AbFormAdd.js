import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'


const AbFormAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/address' : '/pds/v1/address';

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
            console.log("AbFormAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("AbFormAdd::fetch => " + error);
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
                                    <CInputGroupText style={{ minWidth: 80 }}>이름</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    defaultValue={props.dataFromParent.fullName}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="fullName"
                                            placeholder="이름을 입력해 주세요."
                                            className={"form-control" + (errors.fullName ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 이름을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 이름은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 이름은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.fullName && <CInvalidFeedback>{errors.fullName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>핸드폰</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="mobile"
                                    control={control}
                                    defaultValue={props.dataFromParent.mobile}
                                    render={({field}) => (
                                        <CInput
                                            type="tel"
                                            name="mobile"
                                            placeholder="핸드폰을 입력해 주세요."
                                            className={"form-control" + (errors.mobile ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 핸드폰을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 12,
                                            message: "(Min) 핸드폰은 12자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: "(Max) 핸드폰은 16자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.mobile && <CInvalidFeedback>{errors.mobile.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>분류</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={props.dataFromParent.category}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="category"
                                            placeholder="분류를 입력해 주세요."
                                            className={"form-control" + (errors.category ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}

                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 분류를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 분류는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "(Max) 분류는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.category && <CInvalidFeedback>{errors.category.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>전화번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="telephone"
                                    control={control}
                                    defaultValue={props.dataFromParent.telephone}
                                    render={({field}) => (
                                        <CInput
                                            type="tel"
                                            name="telephone" placeholder="전화번호를 입력해 주세요."
                                            className={"form-control" + (errors.telephone ? " is-invalid" : " is-valid")}
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
                                {errors.telephone && <CInvalidFeedback>{errors.telephone.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>FAX번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="fax"
                                    control={control}
                                    defaultValue={props.dataFromParent.fax}
                                    render={({field}) => (
                                        <CInput
                                            type="tel"
                                            name="fax"
                                            placeholder="FAX번호를 입력해 주세요."
                                            className={"form-control" + (errors.fax ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: false,
                                        },
                                    }}
                                />
                                {errors.fax && <CInvalidFeedback>{errors.fax.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>전자우편</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue={props.dataFromParent.email}
                                    render={({field}) => (
                                        <CInput
                                            type="email"
                                            name="email"
                                            placeholder="전자우편을 입력해 주세요."
                                            className={"form-control" + (errors.email ? " is-invalid" : " is-valid")}
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
                                {errors.email && <CInvalidFeedback>{errors.email.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>홈페이지</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="homepage"
                                    control={control}
                                    defaultValue={props.dataFromParent.homepage}
                                    render={({field}) => (
                                        <CInput
                                            type="url"
                                            name="homepage"
                                            placeholder="홈페이지 주소를 입력해 주세요."
                                            className={"form-control" + (errors.homepage ? " is-invalid" : " is-valid")}
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
                                {errors.homepage && <CInvalidFeedback>{errors.homepage.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>우편번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="postcode"
                                    control={control}
                                    defaultValue={props.dataFromParent.postcode}
                                    render={({field}) => (
                                        <CInput
                                            type="postcode"
                                            name="postcode"
                                            placeholder="우편번호를 입력해 주세요."
                                            className={"form-control" + (errors.postcode ? " is-invalid" : " is-valid")}
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
                                {errors.postcode && <CInvalidFeedback>{errors.postcode.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>주소</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue={props.dataFromParent.address}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="address"
                                            placeholder="주소를 입력해 주세요."
                                            className={"form-control" + (errors.address ? " is-invalid" : " is-valid")}
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
                                {errors.address && <CInvalidFeedback>{errors.address.message}</CInvalidFeedback>}
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

export default AbFormAdd;
