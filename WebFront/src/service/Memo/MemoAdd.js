import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';

const MemoAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/memo' : '/pds/v1/memo';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        const cookies = new Cookies();

        fetch(REQ_URI, {
            method: 'POST',
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
            console.log("PbFormAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("PbFormAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <div className="pull-right">
            <Button color="success" className="btn-sm pull-right" onClick={toggleOpen}>
                <i className="fa fa-plus"></i>&nbsp;추가</Button>
            <Modal isOpen={modalShow} toggle={toggleOpen}
                className={'modal-success ' + props.className}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={toggleOpen}>메모 추가</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="title">제목</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
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
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="wdate">작성일</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<Input />}
                                    type="date"
                                    control={control}
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
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="content">내용</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Controller
                                    as={<textarea />}
                                    control={control}
                                    name="content" id="content" placeholder="내용을 입력해 주세요."
                                    className={"form-control" + (errors.memo ? " is-invalid" : " is-valid")}
                                />
                                {errors.content && <FormFeedback>{errors.content.message}</FormFeedback>}
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="success">추가</Button>{' '}
                        <Button color="secondary" onClick={toggleOpen}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};

export default MemoAdd;