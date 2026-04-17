import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Utils from '../../utils/index';
import AllActions from '../../store/reducers';

const InsuranceRecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/insuranceRecord' : '/pds/v1/insuranceRecord';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();
    const insuranceList = useSelector(state => AllActions.insure.getInsurances(state));

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
        }).catch(error => setError("insuranceId", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    const fields = [
        { name: 'transactionDate', label: '거래일', type: 'date', placeholder: '' },
        { name: 'title', label: '적요', type: 'text', placeholder: '적요를 입력해 주세요.' },
        { name: 'deposit', label: '입금액', type: 'number', placeholder: '입금액을 입력해 주세요.' },
        { name: 'withdrawal', label: '출금액', type: 'number', placeholder: '출금액을 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">보험거래내역 추가</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">보험선택</label>
                        <Controller name="insuranceId" control={control} defaultValue={props.dataFromParent.insuranceId} render={({field}) => (
                            <select {...field} className={`p-2 border rounded ${errors.insuranceId ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value={-1}>보험을 선택해 주세요.</option>
                                {insuranceList.map(data => <option key={data.id} value={data.id}>{data.company} - {data.product}</option>)}
                            </select>
                        )} />
                        {errors.insuranceId && <p className="text-red-500 text-xs">{errors.insuranceId.message}</p>}
                    </div>
                    {fields.map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={f.name === 'transactionDate' ? Utils.date.dateFormat(new Date(props.dataFromParent.transactionDate)) : props.dataFromParent[f.name]} render={({field}) => f.type === 'textarea' ? 
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

export default InsuranceRecordAdd;