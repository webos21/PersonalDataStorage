import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInputRadio, CLabel, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'

const InsuranceEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

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
            console.log("InsuranceEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("InsuranceEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-warning ' + props.className}>
            <CModalHeader closeButton>보험 수정</CModalHeader>

            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="insureId"
                                key={"insureId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="insureId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>보험사</CInputGroupText>
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
                                            placeholder="보험사를 입력해 주세요."
                                            className={"form-control" + (errors.company ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 보험사를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 보험사는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 보험사는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.insureId && <CInvalidFeedback>{errors.insureId.message}</CInvalidFeedback>}
                                {errors.company && <CInvalidFeedback>{errors.company.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>상품명</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="product"
                                    key={"product" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.product}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="product"
                                            placeholder="상품명을 입력해 주세요."
                                            className={"form-control" + (errors.product ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 상품명을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 상품명은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 상품명은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.product && <CInvalidFeedback>{errors.product.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>보험종류</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="insuranceType"
                                    key={"insuranceType" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.insuranceType}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="insuranceType"
                                            placeholder="보험종류를 입력해 주세요."
                                            className={"form-control" + (errors.insuranceType ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 보험종류를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 보험종류는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 보험종류는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.insuranceType && <CInvalidFeedback>{errors.insuranceType.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>정책형태</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="policyType"
                                    key={"policyType" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.policyType}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="policyType"
                                            placeholder="정책형태를 입력해 주세요."
                                            className={"form-control" + (errors.policyType ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 정책형태를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 정책형태는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 정책형태는 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.policyType && <CInvalidFeedback>{errors.policyType.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계약번호</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="contractId"
                                    key={"contractId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.contractId}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="contractId"
                                            placeholder="계약번호를 입력해 주세요."
                                            className={"form-control" + (errors.contractId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계약번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 12,
                                            message: "(Min) 계약번호는 12자 입니다."
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "(Max) 계약번호는 30자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.contractId && <CInvalidFeedback>{errors.contractId.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>보험소유</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="policyHolder"
                                    key={"policyHolder" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.policyHolder}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="policyHolder"
                                            placeholder="보험소유(계약자)를 입력해 주세요."
                                            className={"form-control" + (errors.policyHolder ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 보험소유(계약자)를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 보험소유(계약자)는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 보험소유(계약자)는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.policyHolder && <CInvalidFeedback>{errors.policyHolder.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>피보험자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="insured"
                                    key={"insured" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.insured}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="insured"
                                            placeholder="피보험자를 입력해 주세요."
                                            className={"form-control" + (errors.insured ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 피보험자를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 피보험자는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 피보험자는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.insured && <CInvalidFeedback>{errors.insured.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>총납입수</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="payCountTotal"
                                    key={"payCountTotal" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.payCountTotal}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="payCountTotal"
                                            placeholder="총납입횟수를 입력해 주세요."
                                            className={"form-control" + (errors.payCountTotal ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 총납입횟수를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 총납입횟수는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "(Max) 총납입횟수는 5자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.payCountTotal && <CInvalidFeedback>{errors.payCountTotal.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>납입회차</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="payCountDone"
                                    key={"payCountDone" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.payCountDone}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="payCountDone"
                                            placeholder="납입회차를 입력해 주세요."
                                            className={"form-control" + (errors.payCountDone ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 납입회차를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 납입회차는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "(Max) 납입회차는 5자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.payCountDone && <CInvalidFeedback>{errors.payCountDone.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>납입금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="premiumVolume"
                                    key={"premiumVolume" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.premiumVolume}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="premiumVolume"
                                            placeholder="납입금액을 입력해 주세요."
                                            className={"form-control" + (errors.premiumVolume ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 납입금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 납입금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 납입금액은 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.premiumVolume && <CInvalidFeedback>{errors.premiumVolume.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>납입방법</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="premiumMode"
                                    key={"premiumMode" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.premiumMode}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="premiumMode"
                                            placeholder="납입방법을 입력해 주세요."
                                            className={"form-control" + (errors.premiumMode ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 납입방법을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 납입방법은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 납입방법은 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.premiumMode && <CInvalidFeedback>{errors.premiumMode.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계약상태</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="contractStatus"
                                    key={"contractStatus" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={"" + props.dataFromParent.contractStatus}
                                    render={(ctrlProps) => (
                                        <CFormGroup className={"form-control" + (errors.holiday ? " is-invalid" : " is-valid")}>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="contractStatus"
                                                    value="0"
                                                    id="contractStatus-edit-radio1"
                                                    checked={ctrlProps.value === '0'}
                                                    onChange={ctrlProps.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="contractStatus-edit-radio1">정지</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="contractStatus"
                                                    value="1"
                                                    id="contractStatus-edit-radio2"
                                                    checked={ctrlProps.value === '1'}
                                                    onChange={ctrlProps.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="contractStatus-edit-radio2">유지</CLabel>
                                            </CFormGroup>
                                        </CFormGroup>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                        }
                                    }}
                                />
                                {errors.contractStatus && <CInvalidFeedback>{errors.contractStatus.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계약일자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="contractDate"
                                    key={"contractDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.contractDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="contractDate"
                                            placeholder="계약일자를 선택해 주세요."
                                            className={"form-control" + (errors.contractDate ? " is-invalid" : " is-valid")}
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
                                {errors.contractDate && <CInvalidFeedback>{errors.contractDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>만료일자</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="maturityDate"
                                    key={"maturityDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.maturityDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="maturityDate"
                                            placeholder="만료일자를 선택해 주세요."
                                            className={"form-control" + (errors.maturityDate ? " is-invalid" : " is-valid")}
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
                                {errors.maturityDate && <CInvalidFeedback>{errors.maturityDate.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>계약담당</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="arranger"
                                    key={"arranger" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.arranger}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="text"
                                            name="arranger"
                                            placeholder="계약담당을 입력해 주세요."
                                            className={"form-control" + (errors.arranger ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 계약담당을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 계약담당은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: "(Max) 계약담당은 60자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.arranger && <CInvalidFeedback>{errors.arranger.message}</CInvalidFeedback>}
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
                    <CButton type="submit" color="warning">수정</CButton>{' '}
                    <CButton color="secondary" onClick={props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default InsuranceEdit;
