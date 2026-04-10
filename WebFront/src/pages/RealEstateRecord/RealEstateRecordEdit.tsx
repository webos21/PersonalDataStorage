import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Utils from '../../utils/index';
import AllActions from '../../store/reducers';

const RealEstateRecordEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/realestateRecord' : '/pds/v1/realestateRecord';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();
    const restateList = useSelector(state => AllActions.restate.getRealEstates(state));

    const onDelete = () => {
        fetch(`${REQ_URI}?rerId=${props.dataFromParent.id}`, {
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
                <input type="hidden" {...register('rerId')} defaultValue={props.dataFromParent.id} />
                <div className="p-4 border-b font-bold text-lg">부동산 거래내역 수정</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">부동산 선택</label>
                        <Controller name="realEstateId" control={control} defaultValue={props.dataFromParent.realEstateId} render={({field}) => (
                            <select {...field} className={`p-2 border rounded ${errors.realEstateId ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value={-1}>부동산을 선택해 주세요.</option>
                                {restateList.map(data => <option key={data.id} value={data.id}>[{data.estateType}] {data.title}</option>)}
                            </select>
                        )} />
                        {errors.realEstateId && <p className="text-red-500 text-xs">{errors.realEstateId.message}</p>}
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

export default RealEstateRecordEdit;