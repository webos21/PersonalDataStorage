import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';
import ASelector from '../../components/AcodeSelector/AcodeSelector';

const RecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/record' : '/pds/v1/record';

    const { handleSubmit, formState: {errors}, setError, setValue, control } = useForm();

    const acodeSelected = (retVal) => {
        setValue("accountCode", retVal.codeNo);
    }

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

    const fields = [
        { name: 'wdate', label: '등록일', type: 'datetime-local', placeholder: '' },
        { name: 'title', label: '적요', type: 'text', placeholder: '적요를 입력해 주세요.' },
        { name: 'deposit', label: '입금액', type: 'number', placeholder: '입금액을 입력해 주세요.' },
        { name: 'withdrawal', label: '출금액', type: 'number', placeholder: '출금액을 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">기록 추가</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {fields.map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={f.name === 'wdate' ? Utils.date.datetimeFormat(new Date(props.dataFromParent.wdate)) : props.dataFromParent[f.name] || ''} render={({field}) => f.type === 'textarea' ? 
                                <textarea {...field} className="p-2 border rounded" placeholder={f.placeholder} /> :
                                <input {...field} type={f.type} className="p-2 border rounded" placeholder={f.placeholder} />} 
                            />
                            {errors[f.name] && <p className="text-red-500 text-xs">{String(errors[f.name]?.message)}</p>}
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계정분류</label>
                        <div className="flex gap-2">
                            <Controller name="accountCode" control={control} defaultValue={props.dataFromParent.accountCode} render={({field}) => <input {...field} type="text" className="p-2 border rounded flex-grow" readOnly />} />
                            <ASelector initVal={props.dataFromParent.accountCode} accountCodeSelected={acodeSelected} />
                        </div>
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

export default RecordAdd;