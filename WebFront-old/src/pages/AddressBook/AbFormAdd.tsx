import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Utils from '../../utils/index';

const AbFormAdd = props => {

    const REQ_URI = (process.env.NODE_ENV !== 'production') ? 'http://' + window.location.hostname + ':28080/pds/v1/address' : '/pds/v1/address';

    const { handleSubmit, formState: {errors}, setError, control } = useForm();

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);

        fetch(REQ_URI, {
            method: 'POST',
            headers: Utils.auth.makeAuthHeader(),
            body: formData
        }).then(function (res) {
            if (!res.ok) throw Error("서버응답 : " + res.statusText);
            return res.json();
        }).then(function (resJson) {
            if (resJson.result === "OK") {
                props.modalToggle();
                props.callbackFromParent();
            }
        }).catch(function (error) {
            setError("fullName", { message: error.message });
        });
    };

    if (!props.modalFlag) return null;

    const fields = [
        { name: 'fullName', label: '이름', type: 'text', placeholder: '이름을 입력해 주세요.' },
        { name: 'mobile', label: '핸드폰', type: 'tel', placeholder: '핸드폰을 입력해 주세요.' },
        { name: 'category', label: '분류', type: 'text', placeholder: '분류를 입력해 주세요.' },
        { name: 'telephone', label: '전화번호', type: 'tel', placeholder: '전화번호를 입력해 주세요.' },
        { name: 'fax', label: 'FAX번호', type: 'tel', placeholder: 'FAX번호를 입력해 주세요.' },
        { name: 'email', label: '전자우편', type: 'email', placeholder: '전자우편을 입력해 주세요.' },
        { name: 'homepage', label: '홈페이지', type: 'url', placeholder: '홈페이지 주소를 입력해 주세요.' },
        { name: 'postcode', label: '우편번호', type: 'text', placeholder: '우편번호를 입력해 주세요.' },
        { name: 'address', label: '주소', type: 'text', placeholder: '주소를 입력해 주세요.' },
        { name: 'memo', label: '메모', type: 'textarea', placeholder: '메모를 입력해 주세요.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
                <div className="p-4 border-b font-bold text-lg">비밀번호 추가</div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {fields.map(field => (
                        <div key={field.name} className="flex flex-col">
                            <label className="text-sm font-medium">{field.label}</label>
                            <Controller
                                name={field.name}
                                control={control}
                                defaultValue={props.dataFromParent[field.name]}
                                render={({field: f}) => field.type === 'textarea' ? 
                                    <textarea {...f} className="p-2 border rounded" placeholder={field.placeholder} /> :
                                    <input {...f} type={field.type} className="p-2 border rounded" placeholder={field.placeholder} />
                                }
                            />
                            {errors[field.name] && <p className="text-red-500 text-xs">{errors[field.name].message}</p>}
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">추가</button>
                    <button type="button" onClick={props.modalToggle} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default AbFormAdd;
