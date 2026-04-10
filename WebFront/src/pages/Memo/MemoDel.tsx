import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const MemoDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/memo' : '/pds/v1/memo';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();
    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => setModalShow(!modalShow);

    const onSubmit = (data, e) => {
        fetch(`${REQ_URI}?memoId=${data.memoId}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.callbackFromParent();
                toggleOpen();
            }
        }).catch(error => setError("memoId", { message: error.message }));
    };

    return (
        <span className="inline-block">
            <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600" onClick={toggleOpen}>
                삭제
            </button>
            {modalShow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden">
                        <input type="hidden" {...register('memoId')} defaultValue={props.dataFromParent.id} />
                        <div className="p-4 border-b font-bold text-lg text-red-600">메모 삭제</div>
                        <div className="p-6">
                            <p className="mb-4">다음 항목을 삭제할까요?</p>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>메모 번호 : {props.dataFromParent.id}</li>
                                <li>메모 날짜 : {Utils.date.dateFormat(new Date(props.dataFromParent.wdate))}</li>
                                <li>메모 제목 : {props.dataFromParent.title}</li>
                            </ul>
                            {errors.memoId && <p className="text-red-500 text-xs mt-1">{errors.memoId.message}</p>}
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                            <button type="button" onClick={toggleOpen} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                        </div>
                    </form>
                </div>
            )}
        </span>
    );
};

export default MemoDel;