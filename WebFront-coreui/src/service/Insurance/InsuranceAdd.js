import React from 'react';
import { useForm, Controller } from "react-hook-form";

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCol,
    CForm, CFormGroup, CInvalidFeedback,
    CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CInputRadio, CLabel, CTextarea,
} from '@coreui/react';

import Helper from '../../helpers'


const InsuranceAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';

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
            console.log("InsuranceAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("InsuranceAdd::fetch => " + error);
            setError("bankName", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <CModal show={props.modalFlag} onClose={props.modalToggle}
            className={'modal-success ' + props.className}>
            <CModalHeader closeButton>보험 추가</CModalHeader>

            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>보험사</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="company"
                                    control={control}
                                    defaultValue={props.dataFromParent.company}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="company"
                                            placeholder="보험사를 입력해 주세요."
                                            className={"form-control" + (errors.company ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.product}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="product"
                                            placeholder="상품명을 입력해 주세요."
                                            className={"form-control" + (errors.product ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.insuranceType}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="insuranceType"
                                            placeholder="보험종류를 입력해 주세요."
                                            className={"form-control" + (errors.insuranceType ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.policyType}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="policyType"
                                            placeholder="정책형태를 입력해 주세요."
                                            className={"form-control" + (errors.policyType ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.contractId}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="contractId"
                                            placeholder="계약번호를 입력해 주세요."
                                            className={"form-control" + (errors.contractId ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.policyHolder}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="policyHolder"
                                            placeholder="보험소유(계약자)를 입력해 주세요."
                                            className={"form-control" + (errors.policyHolder ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.insured}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="insured"
                                            placeholder="피보험자를 입력해 주세요."
                                            className={"form-control" + (errors.insured ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.payCountTotal}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="payCountTotal"
                                            placeholder="총납입횟수를 입력해 주세요."
                                            className={"form-control" + (errors.payCountTotal ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.payCountDone}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="payCountDone"
                                            placeholder="납입회차를 입력해 주세요."
                                            className={"form-control" + (errors.payCountDone ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.premiumVolume}
                                    render={({field}) => (
                                        <CInput
                                            type="number"
                                            name="premiumVolume"
                                            placeholder="납입금액을 입력해 주세요."
                                            className={"form-control" + (errors.premiumVolume ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.premiumMode}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="premiumMode"
                                            placeholder="납입방법을 입력해 주세요."
                                            className={"form-control" + (errors.premiumMode ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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
                                    control={control}
                                    defaultValue={"" + props.dataFromParent.contractStatus}
                                    render={({field}) => (
                                        <CFormGroup className={"form-control" + (errors.holiday ? " is-invalid" : " is-valid")}>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="contractStatus"
                                                    value="0"
                                                    id="contractStatus-add-radio1"
                                                    checked={field.value === '0'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="contractStatus-add-radio1">정지</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio
                                                    custom
                                                    name="contractStatus"
                                                    value="1"
                                                    id="contractStatus-add-radio2"
                                                    checked={field.value === '1'}
                                                    onChange={field.onChange}
                                                /><CLabel variant="custom-checkbox" htmlFor="contractStatus-add-radio2">유지</CLabel>
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
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.contractDate))}
                                    render={({field}) => (
                                        <CInput
                                            type="date"
                                            name="contractDate"
                                            placeholder="계약일자를 선택해 주세요."
                                            className={"form-control" + (errors.contractDate ? " is-invalid" : " is-valid")}
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
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.maturityDate))}
                                    render={({field}) => (
                                        <CInput
                                            type="date"
                                            name="maturityDate"
                                            placeholder="만료일자를 선택해 주세요."
                                            className={"form-control" + (errors.maturityDate ? " is-invalid" : " is-valid")}
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
                                    control={control}
                                    defaultValue={props.dataFromParent.arranger}
                                    render={({field}) => (
                                        <CInput
                                            type="text"
                                            name="arranger"
                                            placeholder="계약담당을 입력해 주세요."
                                            className={"form-control" + (errors.arranger ? " is-invalid" : " is-valid")}
                                            value={field.value}
                                            onChange={field.onChange}
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

export default InsuranceAdd;
