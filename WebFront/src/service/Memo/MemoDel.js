import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormFeedback, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const MemoDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/memo' : '/pds/v1/memo';

    const initValues = props.dataFromParent;
    const cookies = new Cookies();

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
        defaultValues: {
            siteId: initValues.id,
        }
    });

    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => {
        setModalShow(!modalShow);
    }

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?siteId=' + data.siteId, {
            method: 'DELETE',
            headers: new Headers({
                'X-PDS-AUTH': cookies.get("X-PDS-AUTH"),
                'Authorization': 'Basic ' + btoa('username:password'),
            }),
        }).then(function (res) {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location = "/#/logout";
                }
                throw Error("서버응답 : " + res.statusText + "(" + res.status + ")");
            }
            return res.json();
        }).then(function (resJson) {
            console.log("PbFormDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                //toggleOpen();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("PbFormDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    return (
        <span>
            <Button color="danger" className="btn-sm" onClick={toggleOpen}>
                <i className="fa fa-trash-o"></i>&nbsp;삭제</Button>
            <Modal isOpen={modalShow} toggle={toggleOpen}
                className={'modal-danger ' + props.className}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={toggleOpen}>비밀번호 삭제</ModalHeader>
                    <ModalBody>
                        <p>다음 항목을 삭제할까요?</p>
                        <ul>
                            <li>메모 번호 : {props.dataFromParent.id}</li>
                            <li>메모 날짜 : {dateFormat(new Date(props.dataFromParent.wdate))}</li>
                            <li>메모 제목 : {props.dataFromParent.title}</li>
                        </ul>
                        <FormGroup>
                            <Controller
                                as={<Input />}
                                type="hidden"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                name="memoId"
                                rules={{ required: true }} />
                            {errors.memoId && <FormFeedback>{errors.memoId.message}</FormFeedback>}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="danger">삭제</Button>{' '}
                        <Button color="secondary" onClick={toggleOpen}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </span>
    );
};

export default MemoDel;
