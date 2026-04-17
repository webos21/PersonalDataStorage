import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const RealEstateAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestate' : '/pds/v1/realestate';

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
        }).catch(error => setError("estateType", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    const fields = [
        { name: 'estateType', label: '자산유형', type: 'text', placeholder: '자산유형을 입력해 주세요.' },
        { name: 'title', label: '자산이름', type: 'text', placeholder: '자산이름을 입력해 주세요.' },
        { name: 'holder', label: '소유자명', type: 'text', placeholder: '소유자명을 입력해 주세요.' },
        { name: 'estimate', label: '예상가격', type: 'number', placeholder: '예상가격을 입력해 주세요.' },
        { name: 'loan', label: '담보대출', type: 'number', placeholder: '담보대출을 입력해 주세요.' },
        { name: 'acquisitionDate', label: '취득일자', type: 'date', placeholder: '' },
        { name: 'estimateDate', label: '산정일자', type: 'date', placeholder: '' },
        { name: 'arrange', label: '배열순서', type: 'number', placeholder: '배열순서를 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">부동산 추가</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {fields.map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={props.dataFromParent[f.name] || ''} render={({field}) => f.type === 'textarea' ? 
                                <textarea {...field} className="p-2 border rounded" placeholder={f.placeholder} /> :
                                <input {...field} type={f.type} className="p-2 border rounded" placeholder={f.placeholder} />} 
                            />
                            {errors[f.name] && <p className="text-red-500 text-xs">{String(errors[f.name]?.message)}</p>}
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">추가</button>
                    <button type="button" onClick={props.modalToggle} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default RealEstateAdd;