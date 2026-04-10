import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const RegularPayDel = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/regularPay' : '/pds/v1/regularPay';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onSubmit = (data, e) => {
        fetch(`${REQ_URI}?rpId=${props.dataFromParent.id}`, {
            method: 'DELETE',
            headers: Utils.auth.makeAuthHeader(),
        }).then(res => res.json())
        .then(resJson => {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(error => setError("rpId", { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden">
                <input type="hidden" {...register('rpId')} defaultValue={props.dataFromParent.id} />
                <div className="p-4 border-b font-bold text-lg text-red-600">정기납입 삭제</div>
                <div className="p-6">
                    <p className="mb-4">다음 항목을 삭제할까요?</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>정기납ID : {props.dataFromParent.id}</li>
                        <li>정기납명 : <strong>{props.dataFromParent.title}</strong></li>
                        <li>계정분류 : {props.dataFromParent.accountCode}</li>
                        <li>입금금액 : {Utils.num.formatDecimal(props.dataFromParent.deposit)}</li>
                        <li>출금금액 : {Utils.num.formatDecimal(props.dataFromParent.withdrawal)}</li>
                    </ul>
                </div>
                <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                    <button type="button" onClick={props.modalToggle} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default RegularPayDel;