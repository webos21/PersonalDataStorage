import { useEffect, useMemo, useState } from 'react';
import Modal from '@/shared/ui/feedback/Modal';
import ModalFooter from '@/shared/ui/feedback/ModalFooter';
import FormField from '@/shared/ui/form/FormField';
import { useToast } from '@/shared/ui/feedback/Toast';
import api from './api';
import { FIELD_CONFIG } from './AccountClassField';
import type { FieldDef, FieldType } from './AccountClassField';

const EXCLUDED_KEYS = ['createdAt', 'updatedAt'];

const fallbackType = (key: string, value: unknown): FieldType => {
    const lower = key.toLowerCase();
    if (lower.includes('date')) return 'date';
    if (lower.includes('password') || lower.includes('passwd') || lower.includes('pw')) return 'password';
    if (lower.includes('memo') || lower.includes('content') || lower.includes('desc')) return 'textarea';
    if (typeof value === 'number') return 'number';
    return 'text';
};

const toFieldDef = (name: string, data: any): FieldDef => {
    const fromConfig = FIELD_CONFIG.find((f) => f.name === name);
    if (fromConfig) return fromConfig;
    return { name, label: name, type: fallbackType(name, data?.[name]), required: false };
};

const AccountClassForm = ({
    modalFlag,
    modalToggle,
    mode = 'add',
    dataFromParent,
    fieldKeys = [],
    idParam = 'acId',
    entityLabel = '계정 분류',
    callbackFromParent
}: any) => {
    const { showToast } = useToast();
    const creater = api.useCreate();
    const updater = api.useUpdate();
    const deleter = api.useDelete();

    const isDelete = mode === 'delete';
    const isEdit = mode === 'edit';
    const currentId = dataFromParent?.id ?? dataFromParent?.[idParam];

    const resolvedFields = useMemo(() => {
        const names = new Set<string>();
        FIELD_CONFIG.forEach((f) => names.add(f.name));
        fieldKeys.forEach((k: string) => names.add(k));
        Object.keys(dataFromParent || {}).forEach((k) => names.add(k));
        return [...names].filter((key) => !EXCLUDED_KEYS.includes(key) && key !== idParam).map((name) => toFieldDef(name, dataFromParent));
    }, [fieldKeys, dataFromParent, idParam]);

    const [form, setForm] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!modalFlag) return;
        const next: Record<string, string> = {};
        resolvedFields.forEach((field) => {
            const raw = dataFromParent?.[field.name];
            if (raw == null) next[field.name] = field.type === 'select' && field.options?.length ? field.options[0].value : '';
            else next[field.name] = String(raw);
        });
        setForm(next);
        setErrors({});
    }, [modalFlag, resolvedFields, dataFromParent]);

    if (!modalFlag) return null;

    const handleChange = (e: any) => {
        const { name, value } = e.target ?? {};
        if (!name) return;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        if (isDelete) return true;
        const next: Record<string, string> = {};
        resolvedFields.forEach((field) => {
            const value = (form[field.name] ?? '').trim();
            if (field.required && value.length === 0) {
                next[field.name] = '필수 입력 항목입니다.';
                return;
            }
            if (value.length === 0) return;
            if (field.maxLength && value.length > field.maxLength) {
                next[field.name] = `최대 ${field.maxLength}자까지 입력할 수 있습니다.`;
                return;
            }
            if (field.type === 'number') {
                const asNumber = Number(value);
                if (Number.isNaN(asNumber)) {
                    next[field.name] = '숫자 형식으로 입력해 주세요.';
                    return;
                }
                if (field.min != null && asNumber < field.min) {
                    next[field.name] = `${field.min} 이상의 값을 입력해 주세요.`;
                    return;
                }
                if (field.max != null && asNumber > field.max) {
                    next[field.name] = `${field.max} 이하의 값을 입력해 주세요.`;
                }
            }
        });
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (isDelete) {
                if (currentId == null) {
                    showToast('삭제할 데이터의 ID를 찾을 수 없습니다.', 'error');
                    return;
                }
                await deleter.mutateAsync(currentId);
                callbackFromParent?.();
                showToast(`${entityLabel}이(가) 삭제되었습니다.`, 'success');
                modalToggle();
                return;
            }

            const payload = new FormData();
            resolvedFields.forEach((field) => {
                if (field.name === 'id') payload.append(idParam, form[field.name] ?? '');
                else payload.append(field.name, form[field.name] ?? '');
            });

            if (isEdit) {
                await updater.mutateAsync(payload);
                showToast(`${entityLabel}이(가) 수정되었습니다.`, 'success');
            } else {
                await creater.mutateAsync(payload);
                showToast(`${entityLabel}이(가) 등록되었습니다.`, 'success');
            }
            callbackFromParent?.();
            modalToggle();
        } catch (err: any) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    const modalTitle = isDelete ? `${entityLabel} 삭제` : isEdit ? `${entityLabel} 수정` : `${entityLabel} 추가`;
    const submitLabel = isDelete ? '삭제' : isEdit ? '수정' : '추가';
    const isPending = creater.isPending || updater.isPending || deleter.isPending;

    return (
        <Modal isOpen={modalFlag} onClose={modalToggle} title={modalTitle}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {isDelete ? (
                    <div className="text-sm text-zinc-700">선택한 {entityLabel} 데이터를 삭제하시겠습니까?</div>
                ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                        {resolvedFields.map((field) => (
                            <FormField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type || 'text'}
                                value={form[field.name] ?? ''}
                                onChange={handleChange}
                                required={field.required}
                                error={errors[field.name]}
                                placeholder={field.placeholder}
                                options={field.options}
                                disabled={isEdit && field.name === 'id'}
                            />
                        ))}
                    </div>
                )}
                <ModalFooter onCancel={modalToggle} submitLabel={submitLabel} isPending={isPending} />
            </form>
        </Modal>
    );
};

export default AccountClassForm;
