import { useState, useCallback } from 'react';

interface PaginationState {
    page: number;
    setPage: (page: number) => void;
    size: number;
    setSize: (size: number) => void;
    keyword: string;
    setKeyword: (keyword: string) => void;
    handleKeywordChange: (v: string) => void;
    handlePageSizeChange: (s: number) => void;
}

/**
 * Shared pagination state hook for list pages.
 * Provides page, size, keyword state + reset-aware setters.
 *
 * @param defaultSize - Default page size (default: 10)
 * @returns Pagination state and handlers
 */
const usePaginationStore = (defaultSize: number = 10): PaginationState => {
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(defaultSize);
    const [keyword, setKeyword] = useState<string>('');

    const handleKeywordChange = useCallback((v: string) => {
        setKeyword(v);
        setPage(1);
    }, []);

    const handlePageSizeChange = useCallback((s: number) => {
        setSize(s);
        setPage(1);
    }, []);

    return {
        page,
        setPage,
        size,
        setSize,
        keyword,
        setKeyword,
        handleKeywordChange,
        handlePageSizeChange
    };
};

export default usePaginationStore;
