import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const AnniversaryEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

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
            console.log("MemoEdit::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(function (error) {
            console.log("MemoEdit::fetch => " + error);
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

                    <ModalHeader toggle={toggleOpen}>기념일 수정</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Col xs="12" md="12">
                                <Controller
                                    as={<Input />}
                                    type="hidden"
                                    control={control}
                                    defaultValue={props.dataFromParent.id}
                                    name="anniId"
                                    rules={{ required: true }} />
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText style={{ minWidth: 70 }}>제목</InputGroupText>
                                    </InputGroupAddon>
                                    <Controller
                                        as={<Input />}
                                        type="text"
                                        control={control}
                                        defaultValue={props.dataFromParent.title}
                                        name="title" id="title" placeholder="제목을 입력해 주세요."
                                        className={"form-control" + (errors.title ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "제목을 입력해 주세요."
                                            },
                                            minLength: {
                                                value: 1,
                                                message: "제목은 1자 이상 입니다."
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "제목은 100자 이내 입니다."
                                            }
                                        }}
                                    />
                                    {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="12">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText style={{ minWidth: 70 }}>작성일</InputGroupText>
                                    </InputGroupAddon>
                                    <Controller
                                        as={<Input />}
                                        type="date"
                                        control={control}
                                        defaultValue={dateFormat(new Date(props.dataFromParent.wdate))}
                                        name="wdate" id="wdate" placeholder="작성일를 선택해 주세요."
                                        className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "작성일를 선택해 주세요."
                                            }
                                        }}
                                    />
                                    {errors.wdate && <FormFeedback>{errors.wdate.message}</FormFeedback>}
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="12">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText style={{ minWidth: 70 }}>내용</InputGroupText>
                                    </InputGroupAddon>
                                    <Controller
                                        as={<textarea />}
                                        control={control}
                                        defaultValue={props.dataFromParent.content}
                                        name="content" id="content" placeholder="내용을 입력해 주세요."
                                        className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "내용을 입력해 주세요."
                                            }
                                        }}
                                        style={{ minHeight: 120 }}
                                    />
                                    {errors.content && <FormFeedback>{errors.content.message}</FormFeedback>}
                                </InputGroup>
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

export default AnniversaryEdit;
