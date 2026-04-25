import { useMemo, useState } from 'react';
import { ClipboardType, Plus } from 'lucide-react';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import Button from '@/shared/ui/button/Button';
import { DataTable, Pagination, TableToolbar } from '@/shared/ui/table';
import AccountClassForm from './AccountClassForm';
import { FIELD_CONFIG as AccountClassFieldConfig } from './AccountClassField';
import AccountClassColumns from './AccountClassColumns';
import { usePaginationStore } from '@/shared/stores';
import api from './api';

const AccountClass = () => {
    const { pageCurrent, setPageCurrent, pageItems, setPageItems, pageKeyword, setPageKeyword } = usePaginationStore(10);
    const [formState, setFormState] = useState<{ open: boolean; mode: 'add' | 'edit' | 'delete'; currentData: any }>({
        open: false,
        mode: 'add',
        currentData: {}
    });

    const { data: listResult, isLoading } = api.useList(pageCurrent, pageItems, pageKeyword || undefined);
    const rows = listResult?.data || [];

    const labelByKey = useMemo(() => Object.fromEntries(AccountClassFieldConfig.map((field: any) => [field.name, field.label])), []);
    const tableKeys = useMemo(() => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id').slice(0, 2), [rows]);
    const formKeys = useMemo(() => Object.keys(rows?.[0] || {}).filter((key) => key !== 'acId'), [rows]);

    const openForm = (mode: 'add' | 'edit' | 'delete', row?: any) => setFormState({ open: true, mode, currentData: row || {} });
    const closeForm = () => setFormState((prev) => ({ ...prev, open: false }));

    const columns = useMemo(() => AccountClassColumns(tableKeys, labelByKey, openForm), [tableKeys, labelByKey]);

    const filterConfig = useMemo(
        () => Object.keys(rows?.[0] || {}).filter((key) => key !== 'id').slice(0, 2).map((key) => ({ id: key, label: labelByKey[key] || key, type: 'text', options: [] })),
        [rows]
    );

    return (
        <PageLayout>
            <PageHeader icon={ClipboardType} title="계정분류" desc="계정코드 중 분류 번호" iconClass="bg-blue-100 text-blue-600" />
            <div className="fms-table-wrap flex-1 flex flex-col relative">
                <TableToolbar
                    keyword={pageKeyword}
                    onKeywordChange={(v) => {
                        setPageKeyword(v);
                        setPageCurrent(1);
                    }}
                    searchPlaceholder="계정 분류 검색 (Ctrl+K)"
                    filterConfig={filterConfig}
                    activeFilters={{}}
                    onFilterChange={() => {}}
                    actions={
                        <Button type="button" onClick={() => openForm('add')}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>계정 분류 추가</span>
                        </Button>
                    }
                />

                <DataTable
                    columns={columns}
                    data={rows}
                    isLoading={isLoading}
                    emptyMessage="등록된 계정 분류가 없습니다."
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
                <AccountClassForm
                    modalFlag={formState.open}
                    modalToggle={closeForm}
                    mode={formState.mode}
                    dataFromParent={formState.currentData}
                    fieldKeys={formKeys}
                    idParam="acId"
                    entityLabel="계정 분류"
                    callbackFromParent={() => {}}
                />
            )}
        </PageLayout>
    );
};

export default AccountClass;
