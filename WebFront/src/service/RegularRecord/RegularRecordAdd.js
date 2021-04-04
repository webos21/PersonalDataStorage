import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux'

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CSelect, CTextarea,
} from '@coreui/react';

import ASelector from '../../components/AcodeSelector'
import Helper from '../../helpers'


const RegularRecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularRecord' : '/pds/v1/regularRecord';

    const { handleSubmit, errors, setError, setValue, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const rpayList = useSelector(state => state.rpay.rpays);

    const acodeSelected = (retVal) => {
        console.log("accountCodeSelected", retVal);
        setValue("accountCode", retVal.codeNo);
    }

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
            console.log("RegularRecordAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("RegularRecordAdd::fetch => " + error);
            setError("cardId", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>정기납입기록 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="rrId"
                                key={"rrId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="rrId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>납입선택</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="regularPayId"
                                    key={"regularPayId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.regularPayId}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="regularPayId"
                                            placeholder="정기납입을 선택해 주세요."
                                            className={"form-control" + (errors.accountId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'regularPayId-item--1'} value={-1}>정기납입을 선택해 주세요.</option>
                                            <option key={'regularPayId-item--2'} value={-2}>----------------</option>
                                            {
                                                rpayList.map((data, index) => {
                                                    return (
                                                        <option key={'regularPayId-item-' + data.id} value={data.id}>{data.title}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 정기납입을 선택해 주세요."
                                        },
                                        min: {
                                            value: 0,
                                            message: "(Min) 정기납입을 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.rrId && <CInvalidFeedback>{errors.rrId.message}</CInvalidFeedback>}
                                {errors.regularPayId && <CInvalidFeedback>{errors.regularPayId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>등록일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="wdate"
                                    key={"wdate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.wdate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="wdate"
                                            placeholder="등록일을 입력해 주세요."
                                            className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 등록일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 등록일을 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "(Max) 등록일을 15자 이내 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>적요</CInputGroupText>
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
                                            placeholder="적요를 입력해 주세요."
                                            className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}

                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 적요를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 적요는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 적요는 60자 이내 입니다."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>입금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="deposit"
                                    key={"deposit" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.deposit}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="deposit" placeholder="입금액을 입력해 주세요."
                                            className={"form-control" + (errors.deposit ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 입금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 입금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 입금액은 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.deposit && <CInvalidFeedback>{errors.deposit.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>출금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="withdrawal"
                                    key={"withdrawal" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.withdrawal}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="withdrawal"
                                            placeholder="출금액을 입력해 주세요."
                                            className={"form-control" + (errors.withdrawal ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 출금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 출금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 출금액은 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.withdrawal && <CInvalidFeedback>{errors.withdrawal.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계정분류</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="accountCode"
                                    key={"accountCode" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.accountCode}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="accountCode"
                                            placeholder="계정분류를 선택해 주세요."
                                            className={"form-control" + (errors.accountCode ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "계정분류를 선택해 주세요."
                                        }
                                    }}
                                />
                                <ASelector initVal={props.dataFromParent.accountCode} accountCodeSelected={acodeSelected} />
                                {errors.accountCode && <CInvalidFeedback>{errors.accountCode.message}</CInvalidFeedback>}
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

export default RegularRecordAdd;
