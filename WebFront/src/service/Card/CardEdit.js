import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux'

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CSelect, CInputRadio, CLabel, CTextarea,
} from '@coreui/react';

import AllActions from '../../actions'
import Helper from '../../helpers'

const CardEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const bankList = useSelector(state => AllActions.bank.getBanks(state));

    const onDelete = () => {
        fetch(REQ_URI + '?cardId=' + props.dataFromParent.id, {
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
            console.log("CardDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("CardDel::fetch => " + error);
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
            console.log("CardEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("CardEdit::fetch => " + error);
            setError("company", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>카드 수정</CModalHeader>

            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="cardId"
                                key={"cardId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="cardId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드사</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="company"
                                    key={"company" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.company}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="company"
                                            placeholder="카드사를 입력해 주세요."
                                            className={"form-control" + (errors.company ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드사를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 카드사는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 카드사는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cardId && <CInvalidFeedback>{errors.cardId.message}</CInvalidFeedback>}
                                {errors.company && <CInvalidFeedback>{errors.company.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cardName"
                                    key={"cardName" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cardName}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="cardName"
                                            placeholder="카드명을 입력해 주세요."
                                            className={"form-control" + (errors.cardName ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 카드명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 카드명은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cardName && <CInvalidFeedback>{errors.cardName.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cardNumber"
                                    key={"cardNumber" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cardNumber}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="cardNumber"
                                            placeholder="카드번호를 입력해 주세요."
                                            className={"form-control" + (errors.cardNumber ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 12,
                                            message: "(Min) 카드번호는 12자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 카드번호는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cardNumber && <CInvalidFeedback>{errors.cardNumber.message}</CInvalidFeedback>}
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
                                    name="cardPassword"
                                    key={"cardPassword" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cardPassword}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="cardPassword"
                                            placeholder="비밀번호를 입력해 주세요."
                                            className={"form-control" + (errors.cardPassword ? " is-invalid" : " is-valid")}
                                            minLength="4"
                                            maxLength="4"
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
                                            message: "(Max) 비밀번호는 4자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cardPassword && <CInvalidFeedback>{errors.cardPassword.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>유효년도</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="validYear"
                                    key={"validYear" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.validYear}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="validYear"
                                            placeholder="유효년도를 입력해 주세요."
                                            className={"form-control" + (errors.validYear ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 유효년도를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 유효년도는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(Max) 유효년도는 2자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.validYear && <CInvalidFeedback>{errors.validYear.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>유효월</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="validMonth"
                                    key={"validMonth" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.validMonth}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="validMonth"
                                            placeholder="유효월을 입력해 주세요."
                                            className={"form-control" + (errors.validMonth ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 유효월을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 유효월은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(Max) 유효월은 2자 이하 입니다."
                                        }
                                    }}
                                />
                                {errors.validMonth && <CInvalidFeedback>{errors.validMonth.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>결제일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="chargeDate"
                                    key={"chargeDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.chargeDate + 1}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="chargeDate"
                                            placeholder="결제일을 입력해 주세요."
                                            className={"form-control" + (errors.chargeDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 결제일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 결제일은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(Max) 결제일은 2자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.chargeDate && <CInvalidFeedback>{errors.chargeDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>CVC번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cvcNumber"
                                    key={"cvcNumber" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cvcNumber}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="cvcNumber"
                                            placeholder="카드번호를 입력해 주세요."
                                            className={"form-control" + (errors.cvcNumber ? " is-invalid" : " is-valid")}
                                            minLength="3"
                                            maxLength="3"
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) CVC번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "(Min) CVC번호는 3자 입니다."
                                        },
                                        maxLength: {
                                            value: 3,
                                            message: "(Max) CVC번호는 3자 입니다."
                                        }
                                    }}
                                />
                                {errors.cvcNumber && <CInvalidFeedback>{errors.cvcNumber.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>결제계좌</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="bankId"
                                    key={"bankId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.bankId}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="bankId"
                                            placeholder="계좌를 선택해 주세요."
                                            className={"form-control" + (errors.bankId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'bankId-item--1'} value={-1}>계좌를 선택해 주세요.</option>
                                            <option key={'bankId-item--2'} value={-2}>----------------</option>
                                            {
                                                bankList.map((data, index) => {
                                                    return (
                                                        <option key={'bankId-item-' + data.id} value={data.id}>{data.bankName} - {data.accountName}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계좌를 선택해 주세요."
                                        },
                                        min: {
                                            value: 0,
                                            message: "(Min) 계좌를 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.bankId && <CInvalidFeedback>{errors.bankId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드한도</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="creditLimit"
                                    key={"creditLimit" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.creditLimit}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="creditLimit"
                                            placeholder="카드한도를 입력해 주세요."
                                            className={"form-control" + (errors.creditLimit ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드한도를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "(Min) 카드한도는 5자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 카드한도는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.creditLimit && <CInvalidFeedback>{errors.creditLimit.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>현금한도</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cashAdvance"
                                    key={"cashAdvance" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cashAdvance}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="cashAdvance"
                                            placeholder="현금서비스 한도를 입력해 주세요."
                                            className={"form-control" + (errors.cashAdvance ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 현금서비스 한도를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "(Min) 현금서비스 한도는 5자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 현금서비스 한도는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cashAdvance && <CInvalidFeedback>{errors.cashAdvance.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드론</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cardLoan"
                                    key={"cardLoan" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cardLoan}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="cardLoan"
                                            placeholder="카드론 한도를 입력해 주세요."
                                            className={"form-control" + (errors.cardLoan ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드론 한도를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "(Min) 카드론 한도는 5자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 카드론 한도는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.cardLoan && <CInvalidFeedback>{errors.cardLoan.message}</CInvalidFeedback>}
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
                                            placeholder="카드 발행일을 선택해 주세요."
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
                                    <CInputGroupText style={{ minWidth: 80 }}>갱신일반</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="refreshNormal"
                                    key={"refreshNormal" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.refreshNormal + 1}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="refreshNormal"
                                            placeholder="일반 갱신일을 입력해 주세요."
                                            className={"form-control" + (errors.refreshNormal ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 일반 갱신일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 일반 갱신일은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(Max) 일반 갱신일은 2자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.refreshNormal && <CInvalidFeedback>{errors.refreshNormal.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>갱신단축</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="refreshShort"
                                    key={"refreshShort" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.refreshShort + 1}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="refreshShort"
                                            placeholder="단축 갱신일을 입력해 주세요."
                                            className={"form-control" + (errors.refreshShort ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 단축 갱신일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 단축 갱신일은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: "(Max) 단축 갱신일은 2자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.refreshShort && <CInvalidFeedback>{errors.refreshShort.message}</CInvalidFeedback>}
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
