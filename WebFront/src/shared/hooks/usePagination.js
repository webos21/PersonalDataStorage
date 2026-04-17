import { useState, useCallback } from 'react'

/**
 * Shared pagination state hook for list pages.
 * Provides page, size, keyword state + reset-aware setters.
 *
 * @param {number} defaultSize - Default page size (default: 10)
 * @returns {{ page, setPage, size, setSize, keyword, setKeyword, handleKeywordChange, handlePageSizeChange }}
 */
export function usePagination(defaultSize = 10) {
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(defaultSize)
    const [keyword, setKeyword] = useState('')

    const handleKeywordChange = useCallback((v) => {
        setKeyword(v)
        setPage(0)
    }, [])

    const handlePageSizeChange = useCallback((s) => {
        setSize(s)
        setPage(0)
    }, [])

    return {
        page,
        setPage,
        size,
        setSize,
        keyword,
        setKeyword,
        handleKeywordChange,
        handlePageSizeChange,
    }
}
