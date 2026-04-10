import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const MemoAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/memo' : '/pds/v1/memo';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        fetch(REQ_URI, {
            method: 'POST',
            headers: Utils.auth.makeAuthHeader(),
            body: formData
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(error => setError("title", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">메모 추가</div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">제목</label>
                        <Controller name="title" control={control} defaultValue={''} render={({field}) => <input {...field} type="text" className="p-2 border rounded" placeholder="제목을 입력해 주세요." />} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">작성일</label>
                        <Controller name="wdate" control={control} defaultValue={''} render={({field}) => <input {...field} type="date" className="p-2 border rounded" />} />
                        {errors.wdate && <p className="text-red-500 text-xs">{errors.wdate.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">내용</label>
                        <Controller name="content" control={control} defaultValue={''} render={({field}) => <textarea {...field} className="p-2 border rounded h-32" placeholder="내용을 입력해 주세요." />} />
                        {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">추가</button>
                    <button type="button" onClick={props.modalToggle} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default MemoAdd;