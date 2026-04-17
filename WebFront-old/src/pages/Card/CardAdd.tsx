import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Utils from '../../utils/index';
import AllActions from '../../store/reducers';

const CardAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/card' : '/pds/v1/card';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();
    const bankList = useSelector(state => AllActions.bank.getBanks(state));

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
        { name: 'company', label: '카드사', type: 'text', placeholder: '카드사를 입력해 주세요.' },
        { name: 'cardName', label: '카드명', type: 'text', placeholder: '카드명을 입력해 주세요.' },
        { name: 'cardNumber', label: '카드번호', type: 'text', placeholder: '카드번호를 입력해 주세요.' },
        { name: 'cardPassword', label: '비밀번호', type: 'password', placeholder: '비밀번호(4자)를 입력해 주세요.' },
        { name: 'validYear', label: '유효년도', type: 'text', placeholder: '유효년도를 입력해 주세요.' },
        { name: 'validMonth', label: '유효월', type: 'text', placeholder: '유효월을 입력해 주세요.' },
        { name: 'chargeDate', label: '결제일', type: 'number', placeholder: '결제일을 입력해 주세요.' },
        { name: 'cvcNumber', label: 'CVC번호', type: 'number', placeholder: 'CVC번호를 입력해 주세요.' },
        { name: 'creditLimit', label: '카드한도', type: 'number', placeholder: '카드한도를 입력해 주세요.' },
        { name: 'cashAdvance', label: '현금한도', type: 'number', placeholder: '현금서비스 한도를 입력해 주세요.' },
        { name: 'cardLoan', label: '카드론', type: 'number', placeholder: '카드론 한도를 입력해 주세요.' },
        { name: 'issueDate', label: '발행일', type: 'date', placeholder: '' },
        { name: 'refreshNormal', label: '갱신일반', type: 'number', placeholder: '일반 갱신일을 입력해 주세요.' },
        { name: 'refreshShort', label: '갱신단축', type: 'number', placeholder: '단축 갱신일을 입력해 주세요.' },
        { name: 'arrange', label: '배열순서', type: 'number', placeholder: '배열순서를 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">카드 추가</div>
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
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">결제계좌</label>
                        <Controller name="bankId" control={control} defaultValue={props.dataFromParent.bankId} render={({field}) => (
                            <select {...field} className="p-2 border rounded">
                                <option value={-1}>계좌를 선택해 주세요.</option>
                                {bankList.map(data => <option key={data.id} value={data.id}>{data.bankName} - {data.accountName}</option>)}
                            </select>
                        )} />
                    </div>
                    <div className="flex gap-4">
                        <label>사용여부:</label>
                        <Controller name="notUsed" control={control} defaultValue="0" render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 사용중</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 미사용</label>
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

export default CardAdd;