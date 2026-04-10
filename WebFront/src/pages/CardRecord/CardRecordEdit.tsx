import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Utils from '../../utils/index';
import AllActions from '../../store/reducers';
import ASelector from '../../components/AcodeSelector';

const CardRecordEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/cardRecord' : '/pds/v1/cardRecord';

    const { handleSubmit, formState: {errors}, setError, setValue, control } = useForm();
    const cardList = useSelector(state => AllActions.card.getCards(state));

    const acodeSelected = (retVal) => {
        setValue("accountCode", retVal.codeNo);
    }

    const onDelete = () => {
        fetch(`${REQ_URI}?brId=${props.dataFromParent.id}`, {
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
        { name: 'transactionDate', label: '거래일', type: 'datetime-local', placeholder: '' },
        { name: 'title', label: '적요', type: 'text', placeholder: '적요를 입력해 주세요.' },
        { name: 'price', label: '결제금액', type: 'number', placeholder: '결제금액을 입력해 주세요.' },
        { name: 'commission', label: '수수료', type: 'number', placeholder: '수수료를 입력해 주세요.' },
        { name: 'settlementDate', label: '납부일', type: 'date', placeholder: '' },
        { name: 'installmentId', label: '할부 ID', type: 'number', placeholder: '할부거래ID를 입력해 주세요.' },
        { name: 'installmentTurn', label: '할부회차', type: 'number', placeholder: '할부회차를 입력해 주세요.' },
        { name: 'amount', label: '납부금액', type: 'number', placeholder: '납부금액을 입력해 주세요.' },
        { name: 'remainder', label: '잔여금액', type: 'number', placeholder: '잔여금액을 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <input type="hidden" {...register('brId')} defaultValue={props.dataFromParent.id} />
                <div className="p-4 border-b font-bold text-lg">은행거래내역 수정</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계좌선택</label>
                        <Controller name="accountId" control={control} defaultValue={props.dataFromParent.accountId} render={({field}) => (
                            <select {...field} className={`p-2 border rounded ${errors.accountId ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value={-1}>계좌를 선택해 주세요.</option>
                                {cardList.map(data => <option key={data.id} value={data.id}>{data.company} - {data.cardName}</option>)}
                            </select>
                        )} />
                        {errors.accountId && <p className="text-red-500 text-xs">{errors.accountId.message}</p>}
                    </div>
                    {fields.map(f => (
                        <div key={f.name} className="flex flex-col">
                            <label className="text-sm font-medium">{f.label}</label>
                            <Controller name={f.name} control={control} defaultValue={f.name === 'transactionDate' ? Utils.date.datetimeFormat(new Date(props.dataFromParent.transactionDate)) : f.name === 'settlementDate' ? Utils.date.dateFormat(new Date(props.dataFromParent.settlementDate)) : props.dataFromParent[f.name]} render={({field}) => f.type === 'textarea' ? 
                                <textarea {...field} className="p-2 border rounded" placeholder={f.placeholder} /> :
                                <input {...field} type={f.type} className="p-2 border rounded" placeholder={f.placeholder} />} 
                            />
                            {errors[f.name] && <p className="text-red-500 text-xs">{String(errors[f.name]?.message)}</p>}
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">할부개월</label>
                        <Controller name="installment" control={control} defaultValue={props.dataFromParent.installment} render={({field}) => (
                            <select {...field} className="p-2 border rounded">
                                {[0, 2, 3, 4, 5, 6, 9, 10, 12, 15, 18, 24, 30, 36].map(m => <option key={m} value={m}>{m === 0 ? '일시불' : `${m}개월`}</option>)}
                            </select>
                        )} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계정분류</label>
                        <div className="flex gap-2">
                            <Controller name="accountCode" control={control} defaultValue={props.dataFromParent.accountCode} render={({field}) => <input {...field} type="text" className="p-2 border rounded flex-grow" readOnly />} />
                            <ASelector initVal={props.dataFromParent.accountCode} accountCodeSelected={acodeSelected} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <label>납부여부:</label>
                        <Controller name="paid" control={control} defaultValue={"" + props.dataFromParent.paid} render={({field}) => (
                            <div className="flex gap-2">
                                <label><input {...field} type="radio" value="0" checked={field.value === '0'} /> 미납부</label>
                                <label><input {...field} type="radio" value="1" checked={field.value === '1'} /> 납부완료</label>
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

export default CardRecordEdit;