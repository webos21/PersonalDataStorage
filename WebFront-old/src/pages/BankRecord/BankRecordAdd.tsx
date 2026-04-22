import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Utils from '../../utils/index';
import AllActions from '../../store/reducers';

const BankRecordAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/bankRecord' : '/pds/v1/bankRecord';

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
        }).catch(error => setError("accountId", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">은행거래내역 추가</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계좌선택</label>
                        <Controller name="accountId" control={control} defaultValue={props.dataFromParent.accountId} render={({field}) => (
                            <select {...field} className={`p-2 border rounded ${errors.accountId ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value={-1}>계좌를 선택해 주세요.</option>
                                {bankList.map(data => <option key={data.id} value={data.id}>{data.bankName} - {data.accountName}</option>)}
                            </select>
                        )} />
                        {errors.accountId && <p className="text-red-500 text-xs">{errors.accountId.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">거래일</label>
                        <Controller name="transactionDate" control={control} defaultValue={props.dataFromParent.transactionDate} render={({field}) => <input {...field} type="date" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">적요</label>
                        <Controller name="title" control={control} defaultValue={props.dataFromParent.title} render={({field}) => <input {...field} type="text" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">입금액</label>
                        <Controller name="deposit" control={control} defaultValue={props.dataFromParent.deposit} render={({field}) => <input {...field} type="number" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">출금액</label>
                        <Controller name="withdrawal" control={control} defaultValue={props.dataFromParent.withdrawal} render={({field}) => <input {...field} type="number" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">메모</label>
                        <Controller name="memo" control={control} defaultValue={props.dataFromParent.memo} render={({field}) => <textarea {...field} className="p-2 border rounded" />} />
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

export default BankRecordAdd;