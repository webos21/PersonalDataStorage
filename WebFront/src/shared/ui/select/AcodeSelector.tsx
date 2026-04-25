import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, ChevronsUpDown } from 'lucide-react';
import { useAccountCatalog } from '@/shared/stores';

type Aclass = { id: number | string; title?: string };
type Acode = { id: number | string; accountCode?: string; title?: string };

type Props = {
    value?: string;
    onChange?: (accountCode: string) => void;
    placeholder?: string;
    disabled?: boolean;
};

const baseControl =
    'w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors disabled:bg-zinc-50 disabled:text-zinc-400';

const AcodeSelector = ({ value = '', onChange, placeholder = '계정코드를 선택해 주세요.', disabled = false }: Props) => {
    const { aclasses, acodes } = useAccountCatalog();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [selectedCode, setSelectedCode] = useState(value || '');

    useEffect(() => {
        setSelectedCode(value || '');
    }, [value]);

    useEffect(() => {
        if (!open) return;
        const handleOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [open]);

    const sortedClasses = useMemo(() => {
        return [...aclasses].sort((a, b) => Number(a.id) - Number(b.id));
    }, [aclasses]);

    const normalizedSelectedClass = useMemo(() => {
        if (selectedClassId) return selectedClassId;
        if (!selectedCode) return '';

        const matched = sortedClasses
            .map((c) => `${c.id}`)
            .filter((id) => selectedCode.startsWith(id))
            .sort((a, b) => b.length - a.length)[0];

        return matched || '';
    }, [selectedClassId, selectedCode, sortedClasses]);

    const codesByClass = useMemo(() => {
        const map: Record<string, Acode[]> = {};
        sortedClasses.forEach((aclass) => {
            const key = `${aclass.id}`;
            map[key] = acodes
                .filter((code) => `${code.accountCode || ''}`.startsWith(key))
                .sort((a, b) => `${a.accountCode || ''}`.localeCompare(`${b.accountCode || ''}`));
        });
        return map;
    }, [acodes, sortedClasses]);

    const selectedClass = sortedClasses.find((c) => `${c.id}` === normalizedSelectedClass);
    const selectedCodeTitle = acodes.find((c) => c.accountCode === selectedCode)?.title || '';
    const currentCodes = normalizedSelectedClass ? codesByClass[normalizedSelectedClass] || [] : [];

    const handleSelectClass = (classId: string) => {
        setSelectedClassId(classId);
    };

    const handleSelectCode = (accountCode: string) => {
        setSelectedCode(accountCode);
        onChange?.(accountCode);
        setOpen(false);
    };

    const displayValue = selectedCode
        ? selectedCodeTitle
            ? `${selectedCode} - ${selectedCodeTitle}`
            : selectedCode
        : placeholder;

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => !disabled && setOpen((prev) => !prev)}
                disabled={disabled}
                className={`${baseControl} flex items-center justify-between text-left ${selectedCode ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
                <span className="truncate">{displayValue}</span>
                <ChevronsUpDown size={16} className="text-zinc-400 shrink-0 ml-2" />
            </button>

            {open && (
                <div className="absolute left-0 z-40 mt-2 w-full min-w-[520px] rounded-xl border border-zinc-200 bg-white shadow-xl">
                    <div className="grid grid-cols-2 divide-x divide-zinc-100">
                        <div className="max-h-72 overflow-y-auto p-2">
                            {sortedClasses.length === 0 ? (
                                <div className="px-3 py-6 text-sm text-zinc-500">계정 분류가 없습니다.</div>
                            ) : (
                                sortedClasses.map((aclass) => {
                                    const classId = `${aclass.id}`;
                                    const isSelected = classId === normalizedSelectedClass;
                                    return (
                                        <button
                                            key={classId}
                                            type="button"
                                            onClick={() => handleSelectClass(classId)}
                                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                                                isSelected ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
                                            }`}
                                        >
                                            <span className="truncate">
                                                {classId} - {aclass.title || '(이름없음)'}
                                            </span>
                                            <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-zinc-400'} />
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        <div className="max-h-72 overflow-y-auto p-2">
                            {!selectedClass ? (
                                <div className="px-3 py-6 text-sm text-zinc-500">왼쪽에서 계정 분류를 선택해 주세요.</div>
                            ) : currentCodes.length === 0 ? (
                                <div className="px-3 py-6 text-sm text-zinc-500">선택한 분류에 계정코드가 없습니다.</div>
                            ) : (
                                currentCodes.map((code) => {
                                    const codeNo = `${code.accountCode || ''}`;
                                    const isSelected = selectedCode === codeNo;
                                    return (
                                        <button
                                            key={`${code.id}-${codeNo}`}
                                            type="button"
                                            onClick={() => handleSelectCode(codeNo)}
                                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                                isSelected ? 'bg-primary text-white' : 'text-zinc-700 hover:bg-zinc-100'
                                            }`}
                                        >
                                            <span className="block truncate">{codeNo}</span>
                                            <span className={`block truncate text-xs ${isSelected ? 'text-white/90' : 'text-zinc-500'}`}>
                                                {code.title || '(이름없음)'}
                                            </span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcodeSelector;
