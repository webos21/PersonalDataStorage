import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const DiaryAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/diary' : '/pds/v1/diary';

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

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
            console.log("DiaryAdd::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("DiaryAdd::fetch => " + error);
            setError("siteUrl", "serverResponse", error.message);
            //e.target.reset();
        });
    };

    return (
        <Modal isOpen={props.modalFlag} toggle={props.modalToggle}
            className={'modal-success ' + props.className}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={props.modalToggle}>일기 추가</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Col xs="12" md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText style={{ minWidth: 70 }}>제목</InputGroupText>
                                </InputGroupAddon>
                                <Controller
                                    as={<Input />}
                                    type="text"
                                    control={control}
                                    defaultValue={''}
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
                                    defaultValue={dateFormat(new Date(props.dataFromParent))}
                                    name="wdate" id="wdate" placeholder="작성일을 선택해 주세요."
                                    className={"form-control" + (errors.wdate ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "작성일을 선택해 주세요."
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
                                    <InputGroupText style={{ minWidth: 70 }}>날씨</InputGroupText>
                                </InputGroupAddon>
                                <Controller
                                    as={<Input>
                                        <option value={0}>눈</option>
                                        <option value={1}>맑음</option>
                                        <option value={2}>구름조금</option>
                                        <option value={3}>흐림</option>
                                        <option value={4}>비온뒤갬</option>
                                        <option value={5}>비</option>
                                    </Input>}
                                    type="select"
                                    control={control}
                                    defaultValue={1}
                                    name="weather" id="weather" placeholder="날씨를 선택해 주세요."
                                    className={"form-control" + (errors.weather ? " is-invalid" : " is-valid")}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "날씨를 선택해 주세요."
                                        }
                                    }}
                                />
                                {errors.weather && <FormFeedback>{errors.weather.message}</FormFeedback>}
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
                                    defaultValue={''}
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
                    <Button type="submit" color="success">추가</Button>{' '}
                    <Button color="secondary" onClick={props.modalToggle}>취소</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default DiaryAdd;
