import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const DiaryDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:28080/pds/v1/diary' : '/pds/v1/diary';

    const { handleSubmit, formState: { errors }, setError, control } = useForm();
    const [modalShow, setModalShow] = useState(false);

    const toggleOpen = () => setModalShow(!modalShow);

    const onSubmit = (data, e) => {
        fetch(`${REQ_URI}?diaryId=${data.diaryId}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.callbackFromParent();
                toggleOpen();
            }
        }).catch(error => setError("diaryId", { message: error.message }));
    };

    return (
        <span>
            <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600" onClick={toggleOpen}>
                삭제
            </button>
            {modalShow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden">
                        <div className="p-4 border-b font-bold text-lg text-red-600">일기 삭제</div>
                        <div className="p-6">
                            <p className="mb-4">다음 항목을 삭제할까요?</p>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>일기 번호 : {props.dataFromParent.id}</li>
                                <li>일기 날짜 : {Utils.date.dateFormat(new Date(props.dataFromParent.wdate))}</li>
                                <li>일기 제목 : {props.dataFromParent.title}</li>
                            </ul>
                            <Controller
                                name="diaryId"
                                control={control}
                                defaultValue={props.dataFromParent.id}
                                render={({field}) => <input {...field} type="hidden" />}
                            />
                            {errors.diaryId && <p className="text-red-500 text-xs">{errors.diaryId.message}</p>}
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

export default DiaryDel;