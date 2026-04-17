import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const AnniversaryDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/anniversary' : '/pds/v1/anniversary';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();
    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => setModalShow(!modalShow);

    const onSubmit = (data, e) => {
        fetch(`${REQ_URI}?anniId=${data.anniId}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.callbackFromParent();
            }
        }).catch(error => setError("anniId", { message: error.message }));
    };

    if (!modalShow) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">기념일 삭제</div>
                <div className="p-6">
                    <p className="mb-4">다음 항목을 삭제할까요?</p>
                    <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
                        <li>기념일 번호 : {props.dataFromParent.id}</li>
                        <li>기념일 날짜 : {props.dataFromParent.applyDate.substring(0, 2) + '월 ' + props.dataFromParent.applyDate.substring(2, 4) + '일' + (props.dataFromParent.lunar === 1 ? '(음력)' : '')}</li>
                        <li>기념일 제목 : {props.dataFromParent.title}</li>
                    </ul>
                    <Controller
                        name="anniId"
                        control={control}
                        defaultValue={props.dataFromParent.id}
                        render={({field}) => <input {...field} type="hidden" />}
                    />
                </div>
                <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                    <button type="button" onClick={toggleOpen} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default AnniversaryDel;
