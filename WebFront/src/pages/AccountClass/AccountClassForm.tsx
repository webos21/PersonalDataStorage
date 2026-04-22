// library
import { useEffect, useState } from 'react';

// in-project
import Modal from '@/shared/ui/feedback/Modal';
import FormField from '@/shared/ui/form/FormField';
import ModalFooter from '@/shared/ui/feedback/ModalFooter';
import { useToast } from '@/shared/ui/feedback/Toast';

// in-package
import api from './api';

const AccountClassForm = ({ modalFlag, modalToggle, dataFromParent, callbackFromParent }: any) => {

    const { showToast } = useToast();

    const [form, setForm] = useState(dataFromParent || { id: '', title: '' });

    const creater = api.useCreate();
    const updater = api.useUpdate();

    useEffect(() => {
        if (!modalFlag) return;
        setForm(dataFromParent || { id: '', title: '' });
    }, [modalFlag, dataFromParent]);

    // Preventing showing the modal until flag is true
    if (!modalFlag) return null;

    // Check the add or edit mode based on presence of dataFromParent
    const isEdit = !!dataFromParent;

    // Proceed the action
    const handleChange = (e: any) => {
        const { name, value } = e.target ?? {};
        if (name) setForm((p) => ({ ...p, [name]: value }));
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let data = new FormData();
        data.append('acId', form.id);
        data.append('title', form.title);

        try {
            if (isEdit) {
                const updated = await updater.mutateAsync(data);
                callbackFromParent?.(updated);
                showToast('분류가 수정되었습니다.', 'success');
            } else {
                const created = await creater.mutateAsync(data);
                callbackFromParent?.(created);
                showToast('분류가 등록되었습니다.', 'success');
            }
            modalToggle();
        } catch (err) {
            console.error('[Error] handleSubmit : ', err);
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <Modal isOpen={modalFlag} onClose={modalToggle} title={isEdit ? '분류 수정' : '분류 등록'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="분류 ID" name="id" value={form.id} onChange={handleChange} required disabled={isEdit} placeholder="0" />
                <FormField label="분류 명칭" name="title" value={form.title} onChange={handleChange} required placeholder="수입" />
                <ModalFooter onCancel={modalToggle} submitLabel={isEdit ? '수정' : '등록'} />
            </form>
        </Modal>
    );
};

export default AccountClassForm;
