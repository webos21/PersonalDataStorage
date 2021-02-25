import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormFeedback, Input } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import { dateFormat } from '../../components/Util/DateUtil'

const DiaryDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/diary' : '/pds/v1/diary';

    const cookies = new Cookies();

    const { handleSubmit, errors, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const onSubmit = (data, e) => {
        fetch(REQ_URI + '?diaryId=' + data.diaryId, {
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
            console.log("DiaryDel::fetch => " + resJson.result);
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            console.log("DiaryDel::fetch => " + error);
            setError("siteId", "serverResponse", error.message);
        });
    };

    return (
        <Modal isOpen={props.modalFlag} toggle={props.modalToggle}
            className={'modal-danger ' + props.className}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={props.modalToggle}>비밀번호 삭제</ModalHeader>
                <ModalBody>
                    <p>다음 항목을 삭제할까요?</p>
                    <ul>
                        <li>일기 번호 : {props.dataFromParent.id}</li>
                        <li>일기 날짜 : {dateFormat(new Date(props.dataFromParent.wdate))}</li>
                        <li>일기 제목 : {props.dataFromParent.title}</li>
                    </ul>
                    <FormGroup>
                        <Controller
                            as={<Input />}
                            type="hidden"
                            control={control}
                            defaultValue={props.dataFromParent.id}
                            name="diaryId"
                            rules={{ required: true }} />
                        {errors.diaryId && <FormFeedback>{errors.diaryId.message}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="danger">삭제</Button>
                    <Button color="secondary" onClick={props.modalToggle}>취소</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default DiaryDel;
