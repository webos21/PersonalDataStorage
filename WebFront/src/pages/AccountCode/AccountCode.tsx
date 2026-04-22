// library
import { BookType, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

// project import
import { STORE_KEYS, usePaginationStore, useTableStore } from '@/shared/stores';
import Button from '@/shared/ui/button/Button';
import ConfirmDialog from '@/shared/ui/feedback/ConfirmDialog';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import { useToast } from '@/shared/ui/feedback/Toast';
import { DataTable, Pagination, TableToolbar } from '@/shared/ui/table';

// in-package
import AccountCodeColumns from './AccountCodeColumns';
import AccountCodeForm from './AccountCodeForm';
import api from './api';

const AccountCode = () => {
    const FILTER_CONFIG = [
        { id: 'id', label: 'ID', type: 'text', options: [] },
        { id: 'accountCode', label: '계정코드', type: 'text', options: [] },
        { id: 'title', label: '코드명', type: 'text', options: [] }
    ];

    const [pageData, setPageData] = useState({
        currentData: { id: -1, accountCode: '', title: '' },
        modalFlagAdd: false,
        modalFlagEdit: false,
        modalFlagDelete: false
    });

    const {
        page,
        setPage,
        size,
        setSize,
        keyword,
        setKeyword
    } = usePaginationStore();
    const { showToast } = useToast();

    const { data: listResult, isLoading } = api.useList(page, size, keyword || undefined);
    const deleter = api.useDelete();

    const modalToggleAdd = () => setPageData((p) => ({ ...p, modalFlagAdd: !p.modalFlagAdd }));
    const modalToggleEdit = () => setPageData((p) => ({ ...p, modalFlagEdit: !p.modalFlagEdit }));
    const modalToggleDelete = () => setPageData((p) => ({ ...p, modalFlagDelete: !p.modalFlagDelete }));

    // Table Persistence (column visibility, sorting, filters, density)
    const { columnVisibility, setColumnVisibility, sorting, setSorting, filters, setFilters, density, setDensity } = useTableStore(
        STORE_KEYS.TABLE.ACCOUNT_CODE
    );

    const handleAdd = () => {
        setPageData((p) => ({
            ...p,
            currentData: { id: -1, accountCode: '', title: '' },
            modalFlagAdd: !p.modalFlagAdd
        }));
    };

    const handleEdit = (data: any) => {
        setPageData((p) => ({ ...p, currentData: data, modalFlagEdit: !p.modalFlagEdit }));
    };

    const handleOpenDelete = (data: any) => {
        setPageData((p) => ({ ...p, currentData: data, modalFlagDelete: !p.modalFlagDelete }));
    };

    const handleDelete = async () => {
        try {
            await deleter.mutateAsync(pageData.currentData.id);
            modalToggleDelete();
            showToast('계정 코드가 삭제되었습니다.', 'success');
        } catch (err: any) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleSortingChange = (updater: any) => {
        setSorting(updater);
        setPage(1);
    };

    const handleKeywordChange = (v: string) => {
        setKeyword(v);
        setPage(1);
    };

    const handlePageSizeChange = (nextSize: number) => {
        setSize(nextSize);
        setPage(1);
    };

    const columns = useMemo(() => AccountCodeColumns(handleEdit, handleOpenDelete), [handleEdit, handleOpenDelete]);

    return (
        <PageLayout>
            <PageHeader icon={BookType} title="계정코드" desc="계정 분류 하위 코드 관리" iconClass="bg-blue-100 text-blue-600" />

            <div className="fms-table-wrap flex-1 flex flex-col relative">
                <TableToolbar
                    keyword={keyword}
                    onKeywordChange={handleKeywordChange}
                    searchPlaceholder="계정 코드 검색 (Ctrl+K)"
                    filterConfig={FILTER_CONFIG}
                    activeFilters={filters}
                    onFilterChange={setFilters}
                    density={density}
                    onDensityChange={setDensity}
                    actions={
                        <Button onClick={handleAdd}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>계정 코드 추가</span>
                        </Button>
                    }
                />

                <DataTable
                    columns={columns}
                    data={listResult?.data || []}
                    isLoading={isLoading}
                    emptyMessage="등록된 계정 코드가 없습니다."
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                    density={density}
                    manualSorting
                />

                <Pagination
                    currentPage={Math.max((listResult?.pagination?.currentPage || 1) - 1, 0)}
                    totalPages={listResult?.pagination?.totalPages || 1}
                    totalElements={listResult?.pagination?.totalCount || 0}
                    pageSize={size}
                    onPageChange={(nextPageIndex) => setPage(nextPageIndex + 1)}
                    onPageSizeChange={(nextSize) => {
                        handlePageSizeChange(nextSize);
                    }}
                />
            </div>

            {pageData.modalFlagAdd && (
                <AccountCodeForm
                    modalFlag={pageData.modalFlagAdd}
                    modalToggle={modalToggleAdd}
                    callbackFromParent={() => {}}
                />
            )}
            {pageData.modalFlagEdit && (
                <AccountCodeForm
                    modalFlag={pageData.modalFlagEdit}
                    modalToggle={modalToggleEdit}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={() => {}}
                />
            )}

            <ConfirmDialog
                isOpen={pageData.modalFlagDelete}
                onConfirm={handleDelete}
                onCancel={modalToggleDelete}
                title="계정 코드 삭제"
                message={`"${pageData.currentData?.title}" 계정 코드를 삭제하시겠습니까?`}
            />
        </PageLayout>
    );
};

export default AccountCode;
