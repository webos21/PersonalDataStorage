import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';
import ASelector from '../../components/AcodeSelector';

const BudgetAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/budget' : '/pds/v1/budget';

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">예산 추가</div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">예산월</label>
                        <Controller name="budgetDate" control={control} defaultValue={Utils.date.monthFormat(new Date(props.dataFromParent.budgetDate))} render={({field}) => <input {...field} type="month" className="p-2 border rounded" />} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">계정분류</label>
                        <div className="flex gap-2">
                            <Controller name="accountCode" control={control} defaultValue={props.dataFromParent.accountCode} render={({field}) => <input {...field} type="text" className="p-2 border rounded flex-grow" readOnly />} />
                            <ASelector accountCodeSelected={acodeSelected} />
                        </div>
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

export default BudgetAdd;
