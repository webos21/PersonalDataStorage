import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CTextarea,
} from '@coreui/react';

import ASelector from '../../components/AcodeSelector'
import Helper from '../../helpers'


const BudgetEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/budget' : '/pds/v1/budget';

    const { handleSubmit, errors, setError, setValue, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const acodeSelected = (retVal) => {
        console.log("accountCodeSelected", retVal);
        setValue("accountCode", retVal.codeNo);
    }

    const onDelete = () => {
        fetch(REQ_URI + '?bId=' + props.dataFromParent.id, {
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
            console.log("BudgetDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("BudgetDel::fetch => " + error);
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
            console.log("BudgetEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("BudgetEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>예산 수정</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="bId"
                                key={"bId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="bId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>예산월</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="budgetDate"
                                    key={"budgetDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.monthFormat(new Date(props.dataFromParent.budgetDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="month"
                                            name="budgetDate"
                                            placeholder="예산월을 선택해 주세요."
                                            className={"form-control" + (errors.budgetDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "예산월을 선택해 주세요."
                                        }
                                    }}
                                />
                                {errors.bId && <CInvalidFeedback>{errors.bId.message}</CInvalidFeedback>}
                                {errors.budgetDate && <CInvalidFeedback>{errors.budgetDate.message}</CInvalidFeedback>}
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
                                    <CInputGroupText style={{ minWidth: 70 }}>메모</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="memo"
                                    key={"memo" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.memo}
                                    render={(ctrlProps) => (
                                        <CTextarea
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
                    <CButton color="danger" className="mr-auto" onClick={onDelete}>삭제</CButton>
                    <CButton type="submit" color="warning">수정</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default BudgetEdit;