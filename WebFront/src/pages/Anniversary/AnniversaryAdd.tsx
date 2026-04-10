import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const AnniversaryAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/anniversary' : '/pds/v1/anniversary';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'POST',
            headers: Utils.auth.makeAuthHeader(),
            body: formData
        }).then(function (res) {
            if (!res.ok) throw Error("서버응답 : " + res.statusText);
            return res.json();
        }).then(function (resJson) {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            setError("title", { message: error.message });
        });
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">기념일 추가</div>
                <div className="p-6 space-y-4">
                    {[{name: 'title', label: '제목', type: 'text', placeholder: '제목을 입력해 주세요.'},
                      {name: 'adate', label: '적용일', type: 'text', placeholder: '적용일을 입력해 주세요. (월일 4자리)'}].map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={''} render={({field}) => <input {...field} type={f.type} className="p-2 border rounded" placeholder={f.placeholder} />} />
                            {errors[f.name] && <p className="text-red-500 text-xs">{String(errors[f.name]?.message)}</p>}
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <label>양음력:</label>
                        <Controller name="lunar" control={control} defaultValue="0" render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 양력</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 음력</label>
                            </div>
                        )} />
                    </div>
                    <div className="flex gap-4">
                        <label>휴무일:</label>
                        <Controller name="holiday" control={control} defaultValue="0" render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 평일</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 휴일</label>
                            </div>
                        )} />
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

export default AnniversaryAdd;
