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


const CardAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const bankList = useSelector(state => AllActions.bank.getBanks(state));

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
            console.log("CardAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("CardAdd::fetch => " + error);
            setError("company", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>카드 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드사</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="company"
                                    control={control}
                                    defaultValue={props.dataFromParent.company}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="company"
                                            placeholder="카드사를 입력해 주세요."
                                            className={"form-control" + (errors.company ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cardName}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="cardName"
                                            placeholder="카드명을 입력해 주세요."
                                            className={"form-control" + (errors.cardName ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cardNumber}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="cardNumber"
                                            placeholder="카드번호를 입력해 주세요."
                                            className={"form-control" + (errors.cardNumber ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cardPassword}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="cardPassword"
                                            placeholder="비밀번호를 입력해 주세요."
                                            className={"form-control" + (errors.cardPassword ? " is-invalid" : " is-valid")}
                                            minLength="4"
                                            maxLength="4"
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.validYear}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="validYear"
                                            placeholder="유효년도를 입력해 주세요."
                                            className={"form-control" + (errors.validYear ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.validMonth}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="validMonth"
                                            placeholder="유효월을 입력해 주세요."
                                            className={"form-control" + (errors.validMonth ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.chargeDate + 1}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="chargeDate"
                                            placeholder="결제일을 입력해 주세요."
                                            className={"form-control" + (errors.chargeDate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cvcNumber}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="cvcNumber"
                                            placeholder="카드번호를 입력해 주세요."
                                            className={"form-control" + (errors.cvcNumber ? " is-invalid" : " is-valid")}
                                            minLength="3"
                                            maxLength="3"
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.bankId}
                                    render={({field}) => (
                                        <CSelect
                                            type="select"
                                            name="bankId"
                                            placeholder="계좌를 선택해 주세요."
                                            className={"form-control" + (errors.bankId ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}>
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
                                    control={control}
                                    defaultValue={props.dataFromParent.creditLimit}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="creditLimit"
                                            placeholder="카드한도를 입력해 주세요."
                                            className={"form-control" + (errors.creditLimit ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cashAdvance}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="cashAdvance"
                                            placeholder="현금서비스 한도를 입력해 주세요."
                                            className={"form-control" + (errors.cashAdvance ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.cardLoan}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="cardLoan"
                                            placeholder="카드론 한도를 입력해 주세요."
                                            className={"form-control" + (errors.cardLoan ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.issueDate))}
                                    render={({field}) => (
                                        <CInput
                                            type="date"
                                            name="issueDate"
                                            placeholder="카드 발행일을 선택해 주세요."
                                            className={"form-control" + (errors.issueDate ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.refreshNormal + 1}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="refreshNormal"
                                            placeholder="일반 갱신일을 입력해 주세요."
                                            className={"form-control" + (errors.refreshNormal ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.refreshShort + 1}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="refreshShort"
                                            placeholder="단축 갱신일을 입력해 주세요."
                                            className={"form-control" + (errors.refreshShort ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.arrange}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="arrange"
                                            placeholder="배열순서를 입력해 주세요."
                                            className={"form-control" + (errors.arrange ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={"" + props.dataFromParent.notUsed}
                                    render={({field}) => (
                                        <CFormGroup className={"form-control" + (errors.holiday ? " is-invalid" : " is-valid")}>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="notUsed"
                                                    value="0"
                                                    id="notUsed-add-radio1"
                                                    checked={field.value === '0'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="notUsed-add-radio1">사용중</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="notUsed"
                                                    value="1"
                                                    id="notUsed-add-radio2"
                                                    checked={field.value === '1'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="notUsed-add-radio2">미사용</CLabel>
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

export default CardAdd;
