// library
import { useEffect, useState } from 'react';

// in-project
import Modal from '@/shared/ui/feedback/Modal';
import ModalFooter from '@/shared/ui/feedback/ModalFooter';
import FormField from '@/shared/ui/form/FormField';
import { useToast } from '@/shared/ui/feedback/Toast';

// in-package
import api from './api';

const AccountCodeForm = ({ modalFlag, modalToggle, dataFromParent, callbackFromParent }: any) => {
    const { showToast } = useToast();
    const creater = api.useCreate();
    const updater = api.useUpdate();

    const [form, setForm] = useState({
        accId: '',
        acodeId: '',
        title: ''
    });
    const [errors, setErrors] = useState({
        acodeId: '',
        title: ''
    });

    const isEdit = !!dataFromParent;

    useEffect(() => {
        if (!modalFlag) return;
        setForm({
            accId: dataFromParent?.id ? `${dataFromParent.id}` : '',
            acodeId: dataFromParent?.accountCode || '',
            title: dataFromParent?.title || ''
        });
        setErrors({ acodeId: '', title: '' });
    }, [modalFlag, dataFromParent]);

    if (!modalFlag) return null;

    const handleChange = (e: any) => {
        const { name, value } = e.target ?? {};
        if (name) {
            setForm((p) => ({ ...p, [name]: value }));
            setErrors((p) => ({ ...p, [name]: '' }));
        }
    };

    const validate = () => {
        const next = { acodeId: '', title: '' };

        if (!form.acodeId || form.acodeId.trim().length === 0) {
            next.acodeId = 'ID는 필수 입력입니다.';
        } else if (form.acodeId.length > 2) {
            next.acodeId = 'ID는 2자리 숫자입니다.';
        }

        if (!form.title || form.title.trim().length === 0) {
            next.title = '분류명은 필수 입력입니다.';
        } else if (form.title.length > 255) {
            next.title = '분류명은 최대 255자까지 입니다.';
        }

        setErrors(next);
        return !next.acodeId && !next.title;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = new FormData();
        if (isEdit) payload.append('accId', form.accId);
        payload.append('acodeId', form.acodeId);
        payload.append('title', form.title);

        try {
            if (isEdit) {
                const updated = await updater.mutateAsync(payload);
                callbackFromParent?.(updated);
                showToast('계정 코드가 수정되었습니다.', 'success');
            } else {
                const created = await creater.mutateAsync(payload);
                callbackFromParent?.(created);
                showToast('계정 코드가 등록되었습니다.', 'success');
            }
            modalToggle();
        } catch (err: any) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <Modal isOpen={modalFlag} onClose={modalToggle} title={isEdit ? '계정코드 수정' : '계정코드 추가'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="코드"
                    name="acodeId"
                    value={form.acodeId}
                    onChange={handleChange}
                    required
                    error={errors.acodeId}
                    placeholder="01"
                />
                <FormField
                    label="코드명"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    error={errors.title}
                    placeholder="식비"
                />
                <ModalFooter onCancel={modalToggle} submitLabel={isEdit ? '수정' : '추가'} isPending={creater.isPending || updater.isPending} />
            </form>
        </Modal>
    );
};

export default AccountCodeForm;
