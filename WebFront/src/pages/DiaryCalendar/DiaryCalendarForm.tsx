import { useEffect, useMemo, useState } from 'react';
import Modal from '@/shared/ui/feedback/Modal';
import ConfirmDialog from '@/shared/ui/feedback/ConfirmDialog';
import FormField from '@/shared/ui/form/FormField';
import Button from '@/shared/ui/button/Button';
import { useToast } from '@/shared/ui/feedback/Toast';
import { normalizeDateInputValue, normalizeDatePayloadValue } from '@/shared/utils/DateUtil';
import api from './api';
import { FIELD_CONFIG } from './DiaryCalendarField';
import type { FieldDef, FieldType } from './DiaryCalendarField';

const EXCLUDED_KEYS = ['id', 'createdAt', 'updatedAt'];


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
    return {
        name,
        label: name,
        type: fallbackType(name, data?.[name]),
        required: false
    };
};

const normalizeFormValue = (field: FieldDef, raw: unknown): string => {
    if (raw == null) {
        return field.type === 'select' && field.options?.length ? field.options[0].value : '';
    }
    return normalizeDateInputValue(field.type, raw);
};

const DiaryCalendarForm = ({ modalFlag, modalToggle, mode = 'add', dataFromParent, fieldKeys = [], idParam = 'diaryId', entityLabel = '다이어리', callbackFromParent }: any) => {
    const { showToast } = useToast();
    const creater = api.useCreate();
    const updater = api.useUpdate();
    const deleter = api.useDelete();

    const isDelete = mode === 'delete';
    const isEdit = mode === 'edit';

    const resolvedFields = useMemo(() => {
        const names = new Set<string>();
        FIELD_CONFIG.forEach((f) => names.add(f.name));
        fieldKeys.forEach((k: string) => names.add(k));
        Object.keys(dataFromParent || {}).forEach((k) => names.add(k));

        return [...names]
            .filter((key) => !EXCLUDED_KEYS.includes(key) && key !== idParam)
            .map((name) => toFieldDef(name, dataFromParent));
    }, [fieldKeys, dataFromParent, idParam]);

    const [form, setForm] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const currentId = dataFromParent?.id ?? dataFromParent?.[idParam];

    useEffect(() => {
        if (!modalFlag) return;
        const next: Record<string, string> = {};
        resolvedFields.forEach((field) => {
            const raw = dataFromParent?.[field.name];
            next[field.name] = normalizeFormValue(field, raw);
        });
        setForm(next);
        setErrors({});
        setConfirmDeleteOpen(false);
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
                next[field.name] = '최대 ' + field.maxLength + '자까지 입력할 수 있습니다.';
                return;
            }

            if (field.type === 'number') {
                const asNumber = Number(value);
                if (Number.isNaN(asNumber)) {
                    next[field.name] = '숫자 형식으로 입력해 주세요.';
                    return;
                }
                if (field.min != null && asNumber < field.min) {
                    next[field.name] = field.min + ' 이상의 값을 입력해 주세요.';
                    return;
                }
                if (field.max != null && asNumber > field.max) {
                    next[field.name] = field.max + ' 이하의 값을 입력해 주세요.';
                    return;
                }
            }

            if (field.name === 'adate' && !/^\d{4}$/.test(value)) {
                next[field.name] = '적용일은 MMDD 형식 4자리 숫자로 입력해 주세요.';
                return;
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
                showToast(entityLabel + '이(가) 삭제되었습니다.', 'success');
                modalToggle();
                return;
            }

            const payload = new FormData();
            if (isEdit) {
                if (currentId == null) {
                    showToast('수정할 데이터의 ID를 찾을 수 없습니다.', 'error');
                    return;
                }
                payload.append(idParam, String(currentId));
            }

            resolvedFields.forEach((field) => {
                payload.append(field.name, normalizeDatePayloadValue(field.type, form[field.name] ?? ''));
            });

            if (isEdit) {
                await updater.mutateAsync(payload);
                showToast(entityLabel + '이(가) 수정되었습니다.', 'success');
            } else {
                await creater.mutateAsync(payload);
                showToast(entityLabel + '이(가) 등록되었습니다.', 'success');
            }
            callbackFromParent?.();
            modalToggle();
        } catch (err: any) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleDeleteConfirmed = async () => {
        if (currentId == null) {
            showToast('삭제할 데이터의 ID를 찾을 수 없습니다.', 'error');
            setConfirmDeleteOpen(false);
            return;
        }

        try {
            await deleter.mutateAsync(currentId);
            callbackFromParent?.();
            showToast(entityLabel + '이(가) 삭제되었습니다.', 'success');
            setConfirmDeleteOpen(false);
            modalToggle();
        } catch (err: any) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
            setConfirmDeleteOpen(false);
        }
    };

    const modalTitle = isDelete ? entityLabel + ' 삭제' : isEdit ? entityLabel + ' 수정' : entityLabel + ' 추가';
    const submitLabel = isDelete ? '삭제' : isEdit ? '수정' : '추가';
    const isPending = creater.isPending || updater.isPending || deleter.isPending;

    return (
        <Modal isOpen={modalFlag} onClose={modalToggle} title={modalTitle}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {isDelete ? (
                    <div className="text-sm text-zinc-700">
                        선택한 {entityLabel} 데이터를 삭제하시겠습니까?
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                        {resolvedFields.length === 0 ? (
                            <p className="text-sm text-zinc-500">입력 가능한 필드가 없습니다. 목록 데이터가 로드된 뒤 다시 시도해 주세요.</p>
                        ) : (
                            resolvedFields.map((field) => (
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
                                />
                            ))
                        )}
                    </div>
                )}

                <div className="flex justify-between pt-4 border-t border-zinc-100">
                    <div>
                        {isEdit && (
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => setConfirmDeleteOpen(true)}
                                disabled={isPending}
                            >
                                삭제
                            </Button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button type="button" variant="secondary" onClick={modalToggle}>
                            취소
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {submitLabel}
                        </Button>
                    </div>
                </div>
            </form>

            <ConfirmDialog
                isOpen={confirmDeleteOpen}
                onConfirm={handleDeleteConfirmed}
                onCancel={() => setConfirmDeleteOpen(false)}
                title="일기 삭제"
                message={`"${form.title || dataFromParent?.title || '선택한 일기'}"을(를) 삭제하시겠습니까?`}
            />
        </Modal>
    );
};

export default DiaryCalendarForm;
