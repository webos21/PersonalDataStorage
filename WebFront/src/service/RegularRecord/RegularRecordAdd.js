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


const RegularRecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/cardRecord' : '/pds/v1/cardRecord';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const cardList = useSelector(state => AllActions.card.getCards(state));

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
            <CModalHeader closeButton>카드거래내역 추가</CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                <CFormGroup row>
                        <CCol xs="12" md="12">
                            <Controller
                                name="crId"
                                key={"crId" + props.dataFromParent.id}
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={(ctrlProps) => (
                                    <CInput
                                        type="hidden"
                                        name="crId"
                                        value={ctrlProps.value}
                                        onChange={ctrlProps.onChange}
                                    />
                                )}
                                rules={{ required: true }} />
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>카드선택</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="cardId"
                                    key={"cardId" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.cardId}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="cardId"
                                            placeholder="카드를 선택해 주세요."
                                            className={"form-control" + (errors.accountId ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'cardId-item--1'} value={-1}>카드를 선택해 주세요.</option>
                                            <option key={'cardId-item--2'} value={-2}>----------------</option>
                                            {
                                                cardList.map((data, index) => {
                                                    return (
                                                        <option key={'cardId-item-' + data.id} value={data.id}>{data.company} - {data.cardName}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 카드를 선택해 주세요."
                                        },
                                        min: {
                                            value: 0,
                                            message: "(Min) 카드를 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.crId && <CInvalidFeedback>{errors.crId.message}</CInvalidFeedback>}
                                {errors.cardId && <CInvalidFeedback>{errors.cardId.message}</CInvalidFeedback>}
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
                                    <CInputGroupText style={{ minWidth: 80 }}>결제금액</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="price"
                                    key={"price" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.price}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="price" placeholder="결제금액을 입력해 주세요."
                                            className={"form-control" + (errors.price ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 결제금액을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 결제금액은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 결제금액은 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.price && <CInvalidFeedback>{errors.price.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>수수료</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="commission"
                                    key={"commission" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.commission}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="number"
                                            name="commission"
                                            placeholder="수수료를 입력해 주세요."
                                            className={"form-control" + (errors.commission ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 수수료를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 수수료는 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "(Max) 수수료는 20자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.commission && <CInvalidFeedback>{errors.commission.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>할부개월</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="installment"
                                    key={"installment" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={props.dataFromParent.installment}
                                    render={(ctrlProps) => (
                                        <CSelect
                                            type="select"
                                            name="installment"
                                            placeholder="할부개월을 선택해 주세요."
                                            className={"form-control" + (errors.installment ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}>
                                            <option key={'installment-item-0'} value={0}>일시불</option>
                                            <option key={'installment-item-2'} value={2}>2개월</option>
                                            <option key={'installment-item-3'} value={3}>3개월</option>
                                            <option key={'installment-item-4'} value={4}>4개월</option>
                                            <option key={'installment-item-5'} value={5}>5개월</option>
                                            <option key={'installment-item-6'} value={6}>6개월</option>
                                            <option key={'installment-item-9'} value={9}>9개월</option>
                                            <option key={'installment-item-10'} value={10}>10개월</option>
                                            <option key={'installment-item-12'} value={12}>12개월</option>
                                            <option key={'installment-item-15'} value={15}>15개월</option>
                                            <option key={'installment-item-18'} value={18}>18개월</option>
                                            <option key={'installment-item-24'} value={24}>24개월</option>
                                            <option key={'installment-item-30'} value={30}>30개월</option>
                                            <option key={'installment-item-36'} value={36}>36개월</option>
                                        </CSelect>
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 할부개월을 선택해 주세요."
                                        },
                                    }}
                                />
                                {errors.installment && <CInvalidFeedback>{errors.installment.message}</CInvalidFeedback>}
                            </CInputGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol xs="12" md="12">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <CInputGroupText style={{ minWidth: 80 }}>납부일</CInputGroupText>
                                </CInputGroupPrepend>
                                <Controller
                                    name="settlementDate"
                                    key={"settlementDate" + props.dataFromParent.id}
                                    control={control}
                                    defaultValue={Helper.date.dateFormat(new Date(props.dataFromParent.settlementDate))}
                                    render={(ctrlProps) => (
                                        <CInput
                                            type="date"
                                            name="settlementDate"
                                            placeholder="납부일을 입력해 주세요."
                                            className={"form-control" + (errors.settlementDate ? " is-invalid" : " is-valid")}
                                            value={ctrlProps.value}
                                            onChange={ctrlProps.onChange}
                                        />
                                    )}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "(Req) 납부일을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "(Min) 납부일을 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "(Max) 납부일을 15자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.settlementDate && <CInvalidFeedback>{errors.settlementDate.message}</CInvalidFeedback>}
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
