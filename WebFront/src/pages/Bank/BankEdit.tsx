import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const BankEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bank' : '/pds/v1/bank';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onDelete = () => {
        fetch(`${REQ_URI}?bankId=${props.dataFromParent.id}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(error => setError("bankName", { message: error.message }));
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
        }).catch(error => setError("bankName", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    const fields = [
        { name: 'bankName', label: '은행명', type: 'text', placeholder: '은행명을 입력해 주세요.' },
        { name: 'accountName', label: '계좌명', type: 'text', placeholder: '계좌명을 입력해 주세요.' },
        { name: 'holder', label: '소유주', type: 'text', placeholder: '소유주를 입력해 주세요.' },
        { name: 'accountNumber', label: '계좌번호', type: 'tel', placeholder: '계좌번호를 입력해 주세요.' },
        { name: 'initialBalance', label: '초기잔고', type: 'number', placeholder: '초기잔고를 입력해 주세요.' },
        { name: 'accountPassword', label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해 주세요.' },
        { name: 'issueDate', label: '발행일', type: 'date', placeholder: '' },
        { name: 'expireDate', label: '만기일', type: 'date', placeholder: '' },
        { name: 'arrange', label: '배열순서', type: 'number', placeholder: '배열순서를 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <input type="hidden" {...register('bankId')} defaultValue={props.dataFromParent.id} />
                <div className="p-4 border-b font-bold text-lg">은행계좌 수정</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {fields.map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={props.dataFromParent[f.name]} render={({field}) => f.type === 'textarea' ? 
                                <textarea {...field} className="p-2 border rounded" placeholder={f.placeholder} /> :
                                <input {...field} type={f.type} className="p-2 border rounded" placeholder={f.placeholder} />} 
                            />
                            {errors[f.name] && <p className="text-red-500 text-xs">{String(errors[f.name]?.message)}</p>}
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <label>사용여부:</label>
                        <Controller name="notUsed" control={control} defaultValue={"" + props.dataFromParent.notUsed} render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 사용중</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 미사용</label>
                            </div>
                        )} />
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

export default BankEdit;