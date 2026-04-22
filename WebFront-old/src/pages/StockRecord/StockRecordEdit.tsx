import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';

import AllActions from '../../store/reducers';
import Utils from '../../utils/index';

const StockRecordEdit = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/stockRecord' : '/pds/v1/stockRecord';

    const { handleSubmit, formState: {errors}, setError, control } = useForm({
        submitFocusError: true,
        nativeValidation: false,
    });

    const stockList = useSelector(state => AllActions.stock.getStocks(state));

    const onDelete = () => {
        fetch(REQ_URI + '?srId=' + props.dataFromParent.id, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(error => setError("srId", { message: error.message }));
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
        }).catch(error => setError("stockId", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">카드거래내역 수정</h2>
                    <button type="button" onClick={props.modalToggle} className="text-gray-500 hover:text-black">✕</button>
                </div>
                
                <div className="p-6 space-y-4">
                    <Controller
                        name="srId"
                        control={control}
                        defaultValue={props.dataFromParent.id}
                        render={({field}) => <input type="hidden" value={field.value} onChange={field.onChange} />}
                    />
                    
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">증권ID</label>
                        <Controller
                            name="stockId"
                            control={control}
                            defaultValue={props.dataFromParent.stockId}
                            render={({field}) => (
                                <select 
                                    className={`p-2 border rounded ${errors.stockId ? 'border-red-500' : 'border-gray-300'}`}
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <option value={-1}>증권ID를 선택해 주세요.</option>
                                    {stockList.map(data => <option key={data.id} value={data.id}>[{data.company}] {data.accountName}</option>)}
                                </select>
                            )}
                        />
                        {errors.stockId && <p className="text-red-500 text-xs mt-1">{errors.stockId.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">거래일</label>
                        <Controller
                            name="transactionDate"
                            control={control}
                            defaultValue={Utils.date.dateFormat(new Date(props.dataFromParent.transactionDate))}
                            render={({field}) => (
                                <input 
                                    type="date" 
                                    className={`p-2 border rounded ${errors.transactionDate ? 'border-red-500' : 'border-gray-300'}`}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">적요</label>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={props.dataFromParent.title}
                            render={({field}) => <input type="text" className="p-2 border rounded" value={field.value} onChange={field.onChange} />}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">입금액</label>
                        <Controller
                            name="deposit"
                            control={control}
                            defaultValue={props.dataFromParent.deposit}
                            render={({field}) => <input type="number" className="p-2 border rounded" value={field.value} onChange={field.onChange} />}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">출금액</label>
                        <Controller
                            name="withdrawal"
                            control={control}
                            defaultValue={props.dataFromParent.withdrawal}
                            render={({field}) => <input type="number" className="p-2 border rounded" value={field.value} onChange={field.onChange} />}
                        />
                    </div>
                </div>

                <div className="flex justify-between p-4 bg-gray-50 border-t">
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

export default StockRecordEdit;
