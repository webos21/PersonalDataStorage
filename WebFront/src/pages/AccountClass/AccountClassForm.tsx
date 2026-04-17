// library
import { useState } from 'react';

// in-project
import Modal from '@/shared/ui/feedback/Modal';
import FormField from '@/shared/ui/form/FormField';
import ModalFooter from '@/shared/ui/feedback/ModalFooter';

// in-package
import api from './api';

const AccountClassForm = ({ modalFlag, modalToggle, dataFromParent, callbackFromParent }: any) => {
    // Preventing showing the modal until flag is true, to avoid form initialization issues
    if (!modalFlag) return null;

    const [form, setForm] = useState(dataFromParent || { id: '', title: '' });

    // Check the add or edit mode based on presence of dataFromParent
    const isEdit = !!dataFromParent;

    // Proceed the action
    const handleChange = (e: any) => {
        const { name, value } = e.target ?? {};
        if (name) setForm((p) => ({ ...p, [name]: value }));
    };
    const handleSubmit = (e: any) => {
        const formData = new FormData(e.target);
    };

    return (
        <Modal isOpen={modalFlag} onClose={modalToggle} title={isEdit ? '분류 수정' : '분류 등록'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="분류 ID" name="acId" value={form.id} onChange={handleChange} required disabled={isEdit} placeholder="0" />
                <FormField label="분류 명칭" name="title" value={form.title} onChange={handleChange} required placeholder="수입" />
                <ModalFooter onCancel={modalToggle} submitLabel={isEdit ? '수정' : '등록'} />
            </form>
        </Modal>
    );
};

export default AccountClassForm;
