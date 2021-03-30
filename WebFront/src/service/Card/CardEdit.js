import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInputRadio, CLabel, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'

const CardEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onDelete = () => {
        fetch(REQ_URI + '?bankId=' + props.dataFromParent.id, {
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
            console.log("BankDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("BankDel::fetch => " + error);
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
            console.log("BankEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("BankEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>은행계좌 수정</CModalHeader>

            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="bankId"
                                key={"bankId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="bankId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>은행명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="bankName"
                                    key={"bankName" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.bankName}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="bankName"
                                            placeholder="은행명을 입력해 주세요."
                                            className={"form-control" + (errors.bankName ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 은행명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 은행명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 은행명은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.bankId && <CInvalidFeedback>{errors.bankId.message}</CInvalidFeedback>}
                                {errors.bankName && <CInvalidFeedback>{errors.bankName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계좌명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="accountName"
                                    key={"accountName" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.accountName}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="accountName"
                                            placeholder="계좌명을 입력해 주세요."
                                            className={"form-control" + (errors.accountName ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계좌명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 계좌명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 계좌명은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.accountName && <CInvalidFeedback>{errors.accountName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>소유주</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="holder"
                                    key={"holder" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.holder}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="holder"
                                            placeholder="소유주를 입력해 주세요."
                                            className={"form-control" + (errors.holder ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}

                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 소유주를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 소유주는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 소유주는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.holder && <CInvalidFeedback>{errors.holder.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계좌번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="accountNumber"
                                    key={"accountNumber" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.accountNumber}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="tel"
                                            name="accountNumber" placeholder="계좌번호를 입력해 주세요."
                                            className={"form-control" + (errors.accountNumber ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계좌번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 계좌번호는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 계좌번호는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.accountNumber && <CInvalidFeedback>{errors.accountNumber.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>초기잔고</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="initialBalance"
                                    key={"initialBalance" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.initialBalance}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="initialBalance"
                                            placeholder="초기잔고를 입력해 주세요."
                                            className={"form-control" + (errors.initialBalance ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 초기잔고를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 초기잔고는 1자 이상 입니다."
                                        },
                                    }}
                                />
                                {errors.initialBalance && <CInvalidFeedback>{errors.initialBalance.message}</CInvalidFeedback>}
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
                                    name="accountPassword"
                                    key={"accountPassword" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.accountPassword}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="password"
                                            name="accountPassword"
                                            placeholder="비밀번호를 입력해 주세요."
                                            className={"form-control" + (errors.accountPassword ? " is-invalid" : " is-valid")}
                                            autoComplete="password"
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 비밀번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "(Min) 비밀번호는 4자 입니다."
                                        },
                                        maxLength: {
                                            value: 4,
                                            message: "(Max) 비밀번호는 4자 입니다."
                                        }
                                    }}
                                />
                                {errors.accountPassword && <CInvalidFeedback>{errors.accountPassword.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>발행일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="issueDate"
                                    key={"issueDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.issueDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="issueDate"
                                            placeholder="계좌 발행일을 선택해 주세요."
                                            className={"form-control" + (errors.issueDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.issueDate && <CInvalidFeedback>{errors.issueDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>만기일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="expireDate"
                                    key={"expireDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.expireDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="expireDate"
                                            placeholder="계좌 만기일을 선택해 주세요."
                                            className={"form-control" + (errors.expireDate ? " is-invalid" : " is-valid")}
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
                                {errors.expireDate && <CInvalidFeedback>{errors.expireDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>배열순서</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="arrange"
                                    key={"arrange" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.arrange}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="arrange"
                                            placeholder="배열순서를 입력해 주세요."
                                            className={"form-control" + (errors.arrange ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.arrange && <CInvalidFeedback>{errors.arrange.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>미사용</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="notUsed"
                                    key={"notUsed" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={"" + props.dataFromParent.notUsed}
                                    render={(ctrlProps) => (
                                        <CFormGroup className={"form-control" + (errors.holiday ? " is-invalid" : " is-valid")}>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="notUsed"
                                                    value="0"
                                                    id="notUsed-edit-radio1"
                                                    checked={ctrlProps.value === '0'}
                                                    onChange={ctrlProps.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="notUsed-edit-radio1">사용중</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="notUsed"
                                                    value="1"
                                                    id="notUsed-edit-radio2"
                                                    checked={ctrlProps.value === '1'}
                                                    onChange={ctrlProps.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="notUsed-edit-radio2">미사용</CLabel>
                                            </CFormGroup>
                                        </CFormGroup>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.notUsed && <CInvalidFeedback>{errors.notUsed.message}</CInvalidFeedback>}
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

export default CardEdit;
