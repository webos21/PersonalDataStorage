import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const InsuranceAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insurance' : '/pds/v1/insurance';

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
        }).catch(error => setError("company", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    const fields = [
        { name: 'company', label: '보험사', type: 'text', placeholder: '보험사를 입력해 주세요.' },
        { name: 'product', label: '상품명', type: 'text', placeholder: '상품명을 입력해 주세요.' },
        { name: 'insuranceType', label: '보험종류', type: 'text', placeholder: '보험종류를 입력해 주세요.' },
        { name: 'policyType', label: '정책형태', type: 'text', placeholder: '정책형태를 입력해 주세요.' },
        { name: 'contractId', label: '계약번호', type: 'text', placeholder: '계약번호를 입력해 주세요.' },
        { name: 'policyHolder', label: '보험소유', type: 'text', placeholder: '보험소유(계약자)를 입력해 주세요.' },
        { name: 'insured', label: '피보험자', type: 'text', placeholder: '피보험자를 입력해 주세요.' },
        { name: 'payCountTotal', label: '총납입수', type: 'number', placeholder: '총납입횟수를 입력해 주세요.' },
        { name: 'payCountDone', label: '납입회차', type: 'number', placeholder: '납입회차를 입력해 주세요.' },
        { name: 'premiumVolume', label: '납입금액', type: 'number', placeholder: '납입금액을 입력해 주세요.' },
        { name: 'premiumMode', label: '납입방법', type: 'text', placeholder: '납입방법을 입력해 주세요.' },
        { name: 'contractDate', label: '계약일자', type: 'date', placeholder: '' },
        { name: 'maturityDate', label: '만료일자', type: 'date', placeholder: '' },
        { name: 'arranger', label: '계약담당', type: 'text', placeholder: '계약담당을 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">보험 추가</div>
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
                    <div className="flex gap-4">
                        <label>계약상태:</label>
                        <Controller name="contractStatus" control={control} defaultValue="0" render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 정지</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 유지</label>
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

export default InsuranceAdd;