import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import {dateFormat} from '../../components/Util/DateUtil'

const PbFormEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/pwbook' : '/pds/v1/pwbook';

    const cookies = new Cookies();

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShowEdit, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShowEdit);
    }

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'PUT',
            headers: new Headers({
                'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
                'Authorization': 'Basic ' + btoa('username:password'),
            }),
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
            console.log("PbFormEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("PbFormEdit::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
        });
    };

    return (
        <span>
            <Button color="warning" className="btn-sm" onClick={toggleOpen}>
                <i className="fa fa-edit"></i>&nbsp;수정</Button>
            <Modal isOpen={modalShowEdit} toggle={toggleOpen}
                className={'modal-warning ' + props.className}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={toggleOpen}>비밀번호 수정</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="siteUrl">항목 URL</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="hidden"
                                    control={control}
                                    defaultValue={props.dataFromParent.id}
                                    name="siteId"
                                    rules={{ required: true }} />
                                <Controller
                                    as={<Input />}
                                    type="url"
                                    control={control}
                                    defaultValue={props.dataFromParent.siteUrl}
                                    name="siteUrl" id="siteUrl" placeholder="항목 URL을 입력해 주세요."
                                    className={"form-control" + (errors.siteUrl ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "항목 URL을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "항목 URL은 10자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "항목 URL은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteUrl && <FormFeedback>{errors.siteUrl.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="siteName">항목 이름</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
                                    defaultValue={props.dataFromParent.siteName}
                                    name="siteName" id="siteName" placeholder="항목 이름을 입력해 주세요."
                                    className={"form-control" + (errors.siteName ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "항목 이름을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "항목 이름은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "항목 이름은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteName && <FormFeedback>{errors.siteName.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="siteName">항목 유형</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
                                    defaultValue={props.dataFromParent.siteType}
                                    name="siteType" id="siteType" placeholder="항목 유형을 입력해 주세요."
                                    className={"form-control" + (errors.siteType ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "항목 유형을 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "항목 유형은 1자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "항목 유형은 100자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.siteType && <FormFeedback>{errors.siteType.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="myId">아 이 디</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
                                    defaultValue={props.dataFromParent.myId}
                                    name="myId" id="myId" placeholder="아이디를 입력해 주세요."
                                    className={"form-control" + (errors.myId ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "아이디를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "아이디는 4자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "아이디는 50자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.myId && <FormFeedback>{errors.myId.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="myPw">비밀번호</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
                                    defaultValue={props.dataFromParent.myPw}
                                    name="myPw" id="myPw" placeholder="비밀번호를 입력해 주세요."
                                    className={"form-control" + (errors.myPw ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "비밀번호를 입력해 주세요."
                                        },
                                        minLength: {
                                            value: 4,
                                            message: "비밀번호는 4자 이상 입니다."
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "비밀번호는 50자 이내 입니다."
                                        }
                                    }}
                                />
                                {errors.myPw && <FormFeedback>{errors.myPw.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="regDate">가입일자</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="date"
                                    control={control}
                                    defaultValue={dateFormat(new Date(props.dataFromParent.regDate))}
                                    name="regDate" id="regDate" placeholder="가입일자를 선택해 주세요."
                                    className={"form-control" + (errors.regDate ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "가입일자를 선택해 주세요."
                                        }
                                    }}
                                />
                                {errors.regDate && <FormFeedback>{errors.regDate.message}</FormFeedback>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="memo">메모</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<textarea />}
                                    type="text"
                                    control={control}
                                    defaultValue={props.dataFromParent.memo}
                                    name="memo" id="memo" placeholder="메모를 입력해 주세요."
                                    className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                />
                                {errors.memo && <FormFeedback>{errors.memo.message}</FormFeedback>}
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="warning">수정</Button>{' '}
                        <Button color="secondary" onClick={toggleOpen}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </span>
    );
};

export default PbFormEdit;
