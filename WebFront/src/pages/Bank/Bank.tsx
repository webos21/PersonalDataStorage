import { useMemo, useState } from 'react';
import { PiggyBank, Plus } from 'lucide-react';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import Button from '@/shared/ui/button/Button';
import { DataTable, Pagination, TableToolbar } from '@/shared/ui/table';
import BankForm from './BankForm';
import { FIELD_CONFIG as BankFieldConfig } from './BankField';
import BankColumns from './BankColumns';
import { usePaginationStore } from '@/shared/stores';
import api from './api';


const Bank = () => {
    const { pageCurrent, setPageCurrent, pageItems, setPageItems, pageKeyword, setPageKeyword } = usePaginationStore(10);
    const [formState, setFormState] = useState<{ open: boolean; mode: 'add' | 'edit' | 'delete'; currentData: any }>({
        open: false,
        mode: 'add',
        currentData: {}
    });

    const { data: listResult, isLoading } = api.useList(pageCurrent, pageItems, pageKeyword || undefined);
    const rows = listResult?.data || [];

    const labelByKey = useMemo(
        () => Object.fromEntries(BankFieldConfig.map((field: any) => [field.name, field.label])),
        []
    );

    const tableKeys = useMemo(() => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id').slice(0, 6), [rows]);
    const formKeys = useMemo(
        () => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id' && key !== 'bankId'),
        [rows, labelByKey]
    );

    const openForm = (mode: 'add' | 'edit' | 'delete', row?: any) => {
        setFormState({ open: true, mode, currentData: row || {} });
    };

    const closeForm = () => {
        setFormState((prev) => ({ ...prev, open: false }));
    };

    const columns = useMemo(() => BankColumns(tableKeys, labelByKey, openForm), [tableKeys, labelByKey]);

    const filterConfig = useMemo(
        () => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id').slice(0, 4).map((key) => ({ id: key, label: labelByKey[key] || key, type: 'text', options: [] })),
        [rows]
    );

    return (
        <PageLayout>
            <PageHeader icon={PiggyBank} title="계좌" desc="은행 정보 관리" iconClass="bg-blue-100 text-blue-600" />
            <div className="fms-table-wrap flex-1 flex flex-col relative">
                <TableToolbar
                    keyword={pageKeyword}
                    onKeywordChange={(v) => {
                        setPageKeyword(v);
                        setPageCurrent(1);
                    }}
                    searchPlaceholder="은행 검색 (Ctrl+K)"
                    filterConfig={filterConfig}
                    activeFilters={{}}
                    onFilterChange={() => {}}
                    actions={
                        <Button type="button" onClick={() => openForm('add')}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>계좌 추가</span>
                        </Button>
                    }
                />

                <DataTable
                    columns={columns}
                    data={rows}
                    isLoading={isLoading}
                    emptyMessage="등록된 은행 데이터가 없습니다."
                    manualSorting
                />

                <Pagination
                    currentPage={Math.max((listResult?.pagination?.currentPage || 1) - 1, 0)}
                    totalPages={listResult?.pagination?.totalPages || 1}
                    totalElements={listResult?.pagination?.totalCount || 0}
                    pageSize={pageItems}
                    onPageChange={(next) => setPageCurrent(next + 1)}
                    onPageSizeChange={(nextSize) => {
                        setPageItems(nextSize);
                        setPageCurrent(1);
                    }}
                />
            </div>

            {formState.open && (
                <BankForm
                    modalFlag={formState.open}
                    modalToggle={closeForm}
                    mode={formState.mode}
                    dataFromParent={formState.currentData}
                    fieldKeys={formKeys}
                    idParam="bankId"
                    entityLabel="계좌"
                    callbackFromParent={() => {}}
                />
            )}
        </PageLayout>
    );
};

export default Bank;
