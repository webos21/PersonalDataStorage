// library
import { ClipboardType, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

// in-project
import { STORE_KEYS, usePaginationStore, useTableStore } from '@/shared/stores';
import Button from '@/shared/ui/button/Button';
import ConfirmDialog from '@/shared/ui/feedback/ConfirmDialog';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageLayout from '@/shared/ui/layout/PageLayout';
import { DataTable, Pagination, TableToolbar } from '@/shared/ui/table';
import { useToast } from '@/shared/ui/feedback/Toast';

// in-package
import AccountClassColumns from './AccountClassColumns';
import AccountClassForm from './AccountClassForm';
import api from './api';

const AccountClass = () => {
    const FILTER_CONFIG = [
        { id: 'id', label: '계정 분류', type: 'text', options: [] },
        { id: 'title', label: '분류 명칭', type: 'text', options: [] }
    ];

    const [pageData, setPageData] = useState({
        emptyId: -1,
        currentData: { id: -1, title: '' },
        modalFlagAdd: false,
        modalFlagEdit: false,
        modalFlagDelete: false
    });

    const {
        page,
        setPage, // pagination state + setter
        size,
        setSize, // page size state + setter
        keyword,
        setKeyword, // keyword state + setter
        handleKeywordChange, // keyword change handler (resets page to 0)
        handlePageSizeChange // page size change handler (resets page to 0)
    } = usePaginationStore();

    const { showToast } = useToast();

    const { data: listResult, isLoading } = api.useList(page, size, keyword || undefined);
    const deleter = api.useDelete();

    // Table Persistence (column visibility, sorting, filters, density)
    const {
        columnVisibility,
        setColumnVisibility, // column visibility state + setter
        sorting,
        setSorting, // sorting state + setter
        filters,
        setFilters, //  filters state + setter
        density,
        setDensity, // density state + setter
        resetAll
    } = useTableStore(STORE_KEYS.TABLE.ACCOUNT_CLASS);

    // Modal toggles
    const modalToggleAdd = () => setPageData((p) => ({ ...p, modalFlagAdd: !p.modalFlagAdd }));
    const modalToggleEdit = () => setPageData((p) => ({ ...p, modalFlagEdit: !p.modalFlagEdit }));
    const modalToggleDelete = () => setPageData((p) => ({ ...p, modalFlagDelete: !p.modalFlagDelete }));

    // Click handlers
    const onClickEdit = (data: any) => {
        setPageData((p) => ({
            ...p,
            currentData: data,
            modalFlagEdit: !p.modalFlagEdit
        }));
    };
    const onClickDelete = (data: any) => {
        setPageData((p) => ({
            ...p,
            currentData: data,
            modalFlagDelete: !p.modalFlagDelete
        }));
    };

    // Data Handlers
    const dataChangedCallback = (modifiedData: any) => {
        if (modifiedData !== undefined && modifiedData !== null) {
            let newDataSet = listResult?.data?.map((ac: any) => (ac.id === modifiedData.id ? modifiedData : ac));
            //setAclasses(newDataSet);
        }
    };
    const handleSortingChange = (updater: any) => {
        setSorting(updater);
        setPage(1);
    };
    const handleAdd = () => {
        setPageData((p) => ({
            ...p,
            currentData: { id: -1, title: '' },
            modalFlagAdd: !p.modalFlagAdd
        }));
    };

    const handleDelete = async (data: any) => {
        console.log('handleDelete ### 1 : ', data);
        try {
            let deleteObj = await deleter.mutateAsync(pageData.currentData.id);
            console.log('handleDelete ### 2 : ', deleteObj);
            modalToggleDelete();
            showToast('분류가 삭제되었습니다.', 'success');
        } catch (err) {
            showToast(err?.response?.data?.message || '처리 중 오류가 발생했습니다.', 'error');
        }
    };

    // Memoized columns with action handlers
    const columns = useMemo(() => AccountClassColumns(onClickEdit, onClickDelete), [onClickEdit, onClickDelete]);

    return (
        <PageLayout>
            <PageHeader icon={ClipboardType} title="계정분류" desc="계정코드 중 분류 번호" iconClass="bg-blue-100 text-blue-600" />

            <div className="fms-table-wrap flex-1 flex flex-col relative">
                {/* Toolbar */}
                <TableToolbar
                    keyword={keyword}
                    onKeywordChange={handleKeywordChange}
                    searchPlaceholder="계정 분류 검색 (Ctrl+K)"
                    filterConfig={FILTER_CONFIG}
                    activeFilters={filters}
                    onFilterChange={setFilters}
                    density={density}
                    onDensityChange={setDensity}
                    actions={
                        <Button onClick={handleAdd}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>계정 분류 추가</span>
                        </Button>
                    }
                />

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={listResult?.data || []}
                    isLoading={isLoading}
                    emptyMessage="등록된 차량이 없습니다."
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                    density={density}
                    manualSorting
                />

                {/* Pagination */}
                <Pagination
                    currentPage={listResult?.pagination?.currentPage || 1}
                    totalPages={listResult?.pagination?.totalPages || 1}
                    totalElements={listResult?.pagination?.totalCount || 0}
                    pageSize={size}
                    onPageChange={setPageData}
                    onPageSizeChange={setPageData}
                />
            </div>

            <ConfirmDialog
                isOpen={pageData.modalFlagDelete}
                onConfirm={handleDelete}
                onCancel={modalToggleDelete}
                title="분류 삭제"
                message={`"${pageData.currentData?.title}" 계정 분류를 삭제하시겠습니까?`}
            />
            <AccountClassForm modalFlag={pageData.modalFlagAdd} modalToggle={modalToggleAdd} callbackFromParent={dataChangedCallback} />
            <AccountClassForm
                modalFlag={pageData.modalFlagEdit}
                modalToggle={modalToggleEdit}
                dataFromParent={pageData.currentData}
                callbackFromParent={dataChangedCallback}
            />
        </PageLayout>
    );
};

export default AccountClass;
