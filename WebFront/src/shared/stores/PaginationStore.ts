import { useCallback, useEffect, useMemo, useState } from 'react';

interface PaginationState {
    pageCurrent: number;
    setPageCurrent: (value: number) => void;
    pageItems: number;
    setPageItems: (value: number) => void;
    pageKeyword: string;
    setPageKeyword: (value: string) => void;
    handlePageKeywordChange: (value: string) => void;
    handlePageItemsChange: (value: number) => void;
    resetPagination: () => void;
}

const getDefaultScopeKey = () => {
    if (typeof window === 'undefined') return 'default';
    return window.location.pathname || 'default';
};

const usePaginationStore = (defaultPageItems = 10, scopeKey?: string): PaginationState => {
    const resolvedScopeKey = scopeKey || getDefaultScopeKey();
    const storageKey = useMemo(() => `pds-pagination:${resolvedScopeKey}`, [resolvedScopeKey]);

    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [pageItems, setPageItems] = useState<number>(defaultPageItems);
    const [pageKeyword, setPageKeyword] = useState<string>('');

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (!saved) return;

            const parsed = JSON.parse(saved) as Partial<{
                pageCurrent: number;
                pageItems: number;
                pageKeyword: string;
            }>;

            if (typeof parsed.pageCurrent === 'number') setPageCurrent(parsed.pageCurrent);
            if (typeof parsed.pageItems === 'number') setPageItems(parsed.pageItems);
            if (typeof parsed.pageKeyword === 'string') setPageKeyword(parsed.pageKeyword);
        } catch (error) {
            console.error(`[usePaginationStore] Failed to load: ${storageKey}`, error);
        }
    }, [storageKey]);

    useEffect(() => {
        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify({
                    pageCurrent,
                    pageItems,
                    pageKeyword
                })
            );
        } catch (error) {
            console.error(`[usePaginationStore] Failed to save: ${storageKey}`, error);
        }
    }, [storageKey, pageCurrent, pageItems, pageKeyword]);

    const handlePageKeywordChange = useCallback((value: string) => {
        setPageKeyword(value);
        setPageCurrent(1);
    }, []);

    const handlePageItemsChange = useCallback((value: number) => {
        setPageItems(value);
        setPageCurrent(1);
    }, []);

    const resetPagination = useCallback(() => {
        setPageCurrent(1);
        setPageItems(defaultPageItems);
        setPageKeyword('');
        localStorage.removeItem(storageKey);
    }, [defaultPageItems, storageKey]);

    return {
        pageCurrent,
        setPageCurrent,
        pageItems,
        setPageItems,
        pageKeyword,
        setPageKeyword,
        handlePageKeywordChange,
        handlePageItemsChange,
        resetPagination
    };
};

export default usePaginationStore;
