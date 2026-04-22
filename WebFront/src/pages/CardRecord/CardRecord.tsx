import { useMemo, useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import Button from '@/shared/ui/button/Button';
import { DataTable, Pagination, TableToolbar } from '@/shared/ui/table';
import CardRecordForm, { FIELD_CONFIG as CardRecordFieldConfig } from './CardRecordForm';
import CardRecordColumns from './CardRecordColumns';
import api from './api';


const CardRecord = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [formState, setFormState] = useState<{ open: boolean; mode: 'add' | 'edit' | 'delete'; currentData: any }>({
        open: false,
        mode: 'add',
        currentData: {}
    });

    const { data: listResult, isLoading } = api.useList(page, size, keyword || undefined);
    const rows = listResult?.data || [];

    const labelByKey = useMemo(
        () => Object.fromEntries(CardRecordFieldConfig.map((field: any) => [field.name, field.label])),
        []
    );

    const tableKeys = useMemo(() => Object.keys(rows?.[0] || {}).slice(0, 6), [rows]);
    const formKeys = useMemo(
        () => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id' && key !== 'brId'),
        [rows, labelByKey]
    );

    const openForm = (mode: 'add' | 'edit' | 'delete', row?: any) => {
        setFormState({ open: true, mode, currentData: row || {} });
    };

    const closeForm = () => {
        setFormState((prev) => ({ ...prev, open: false }));
    };

    const columns = useMemo(() => CardRecordColumns(tableKeys, labelByKey, openForm), [tableKeys, labelByKey]);

    const filterConfig = useMemo(
        () => Object.keys(rows?.[0] || {}).slice(0, 4).map((key) => ({ id: key, label: labelByKey[key] || key, type: 'text', options: [] })),
        [rows]
    );

    return (
        <PageLayout>
            <PageHeader icon={CreditCard} title="카드기록" desc="카드 거래 기록 관리" iconClass="bg-blue-100 text-blue-600" />
            <div className="fms-table-wrap flex-1 flex flex-col relative">
                <TableToolbar
                    keyword={keyword}
                    onKeywordChange={(v) => {
                        setKeyword(v);
                        setPage(1);
                    }}
                    searchPlaceholder="카드기록 검색 (Ctrl+K)"
                    filterConfig={filterConfig}
                    activeFilters={{}}
                    onFilterChange={() => {}}
                    actions={
                        <Button type="button" onClick={() => openForm('add')}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>카드기록 추가</span>
                        </Button>
                    }
                />

                <DataTable
                    columns={columns}
                    data={rows}
                    isLoading={isLoading}
                    emptyMessage="등록된 카드기록 데이터가 없습니다."
                    manualSorting
                />

                <Pagination
                    currentPage={Math.max((listResult?.pagination?.currentPage || 1) - 1, 0)}
                    totalPages={listResult?.pagination?.totalPages || 1}
                    totalElements={listResult?.pagination?.totalCount || 0}
                    pageSize={size}
                    onPageChange={(next) => setPage(next + 1)}
                    onPageSizeChange={(nextSize) => {
                        setSize(nextSize);
                        setPage(1);
                    }}
                />
            </div>

            {formState.open && (
                <CardRecordForm
                    modalFlag={formState.open}
                    modalToggle={closeForm}
                    mode={formState.mode}
                    dataFromParent={formState.currentData}
                    fieldKeys={formKeys}
                    idParam="brId"
                    entityLabel="카드기록"
                    callbackFromParent={() => {}}
                />
            )}
        </PageLayout>
    );
};

export default CardRecord;
