import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const ScheduleEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/schedule' : '/pds/v1/schedule';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onDelete = () => {
        fetch(`${REQ_URI}?scheduleId=${props.dataFromParent.id}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(error => setError("title", { message: error.message }));
    };

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        fetch(REQ_URI, {
            method: 'PUT',
            headers: Utils.auth.makeAuthHeader(),
            body: formData
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent(resJson.data[0]);
            }
        }).catch(error => setError("title", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <input type="hidden" {...register('scheduleId')} defaultValue={props.dataFromParent.id} />
                <div className="p-4 border-b font-bold text-lg">일정 수정</div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">제목</label>
                        <Controller name="title" control={control} defaultValue={props.dataFromParent.title} render={({field}) => <input {...field} type="text" className="p-2 border rounded" placeholder="제목을 입력해 주세요." />} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계획일시</label>
                        <Controller name="pdate" control={control} defaultValue={Utils.date.datetimeFormat(new Date(props.dataFromParent.pdate))} render={({field}) => <input {...field} type="datetime-local" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex gap-4">
                        <label>확인여부:</label>
                        <Controller name="readOk" control={control} defaultValue={"" + props.dataFromParent.readOk} render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 미확인</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 확인완료</label>
                            </div>
                        )} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">메모</label>
                        <Controller name="memo" control={control} defaultValue={props.dataFromParent.memo} render={({field}) => <textarea {...field} className="p-2 border rounded" />} />
                    </div>
                </div>
                <div className="p-4 border-t flex justify-between gap-2 bg-gray-50">
                    <button type="button" onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">수정</button>
                        <button type="button" onClick={props.modalToggle} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ScheduleEdit;