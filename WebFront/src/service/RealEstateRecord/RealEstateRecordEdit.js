import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux'

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CSelect, CTextarea,
} from '@coreui/react';

import AllActions from '../../actions'
import Helper from '../../helpers'


const RealEstateRecordEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestateRecord' : '/pds/v1/realestateRecord';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const restateList = useSelector(state => AllActions.restate.getRealEstates(state));

    const onDelete = () => {
        fetch(REQ_URI + '?rerId=' + props.dataFromParent.id, {
            method: 'DELETE',
            headers: Helper.auth.makeAuthHeader(),
        }).then(function (res) {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location = "/#/logout";
                }
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log("RealEstateRecordDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("RealEstateRecordDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'PUT',
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
            console.log("RealEstateRecordEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("RealEstateRecordEdit::fetch => " + error);
            setError("realEstateId", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>부동산 거래내역 수정</CModalHeader>

            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="rerId"
                                key={"rerId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="rerId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>부동산ID</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="realEstateId"
                                    key={"realEstateId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.realEstateId}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="realEstateId"
                                            placeholder="부동산ID를 선택해 주세요."
                                            className={"form-control" + (errors.realEstateId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'realEstateId-item--1'} value={-1}>부동산ID를 선택해 주세요.</option>
                                            <option key={'realEstateId-item--2'} value={-2}>----------------</option>
                                            {
                                                restateList.map((data, index) => {
                                                    return (
                                                        <option key={'realEstateId-item-' + data.id} value={data.id}>[{data.estateType}] {data.title}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 부동산ID를 선택해 주세요."
                                        },
                                        min: {
                                            value: 0,
                                            message: "(Min) 부동산ID를 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.rerId && <CInvalidFeedback>{errors.rerId.message}</CInvalidFeedback>}
                                {errors.realEstateId && <CInvalidFeedback>{errors.realEstateId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>거래일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="transactionDate"
                                    key={"transactionDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.transactionDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="transactionDate"
                                            placeholder="거래일을 입력해 주세요."
                                            className={"form-control" + (errors.transactionDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 거래일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 거래일을 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "(Max) 거래일을 15자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.transactionDate && <CInvalidFeedback>{errors.transactionDate.message}</CInvalidFeedback>}
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
                                            value: 60,
                                            message: "(Max) 입금액은 60자 이내 입니다."
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
                                            value: 60,
                                            message: "(Max) 출금액은 60자 이내 입니다."
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
                    <CButton color="danger" className="mr-auto" onClick={onDelete}>삭제</CButton>
                    <CButton type="submit" color="warning">수정</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default RealEstateRecordEdit;
