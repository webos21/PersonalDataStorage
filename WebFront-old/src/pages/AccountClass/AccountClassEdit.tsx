import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Utils from '../../utils';

const AccountClassEdit = (props) => {
    const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + ':28080/pds/v1/accountClass' : '/pds/v1/accountClass';

    const validationSchema = Yup.object().shape({
        acId: Yup.string().max(1, 'ID는 1자리 숫자입니다.').required('ID는 필수 입력입니다.'),
        title: Yup.string().max(255, '분류명은 최대 255자까지 입니다.').required('분류명은 필수 입력입니다.')
    });

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onDelete = () => {
        fetch(`${REQ_URI}?acId=${props.dataFromParent.id}`, { method: 'DELETE', headers: Utils.auth.makeAuthHeader() })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.result === 'OK') {
                    props.modalToggle();
                    props.callbackFromParent();
                }
            })
            .catch(error => setError('acId', { message: error.message }));
    };

    const onSubmit = (data, e) => {
        const formData = new FormData(e.target);
        fetch(REQ_URI, { method: 'PUT', headers: Utils.auth.makeAuthHeader(), body: formData })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.result === 'OK') {
                    props.modalToggle();
                    props.callbackFromParent(resJson.data[0]);
                }
            })
            .catch(error => setError('title', { message: error.message }));
    };

    if (!props.modalFlag) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-0 rounded-xl shadow-2xl w-[400px] overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-white border-b">
                    <h2 className="text-lg font-bold">계정분류 수정</h2>
                    <button type="button" onClick={() => props.modalToggle(false)} className="text-gray-500 hover:text-black">✕</button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">ID</label>
                        <input {...register('acId')} defaultValue={props.dataFromParent.id} className={`w-full p-2 border rounded ${errors.acId ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.acId && <p className="text-red-500 text-xs mt-1">{errors.acId.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">분류명</label>
                        <input {...register('title')} defaultValue={props.dataFromParent.title} className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                </div>
                <div className="flex justify-between gap-2 p-4 bg-white border-t">
                    <button type="button" onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded">삭제</button>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">수정</button>
                        <button type="button" onClick={() => props.modalToggle(false)} className="px-4 py-2 bg-gray-500 text-white rounded">취소</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AccountClassEdit;
