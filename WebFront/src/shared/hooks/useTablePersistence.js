import { useState, useEffect, useCallback } from 'react'

/**
 * useTablePersistence — 테이블 상태 통합 localStorage 저장
 * 컬럼 visibility, 정렬, 필터, density를 한 번에 관리
 *
 * @param {string} storageKey - 테이블 고유 키 (e.g. 'fms-table-vehicle')
 * @param {Object} defaults - 기본값 { columnVisibility, sorting, filters, density }
 */
export const useTablePersistence = (storageKey, defaults = {}) => {
    const {
        columnVisibility: defaultVisibility = {},
        sorting: defaultSorting = [],
        filters: defaultFilters = {},
        density: defaultDensity = 'default',
    } = defaults

    // Load from localStorage or use defaults
    const loadState = () => {
        try {
            const saved = localStorage.getItem(storageKey)
            if (saved) {
                const parsed = JSON.parse(saved)
                return {
                    columnVisibility: parsed.columnVisibility ?? defaultVisibility,
                    sorting: parsed.sorting ?? defaultSorting,
                    filters: parsed.filters ?? defaultFilters,
                    density: parsed.density ?? defaultDensity,
                }
            }
        } catch (e) {
            console.error(`[useTablePersistence] Failed to load: ${storageKey}`, e)
        }
        return {
            columnVisibility: defaultVisibility,
            sorting: defaultSorting,
            filters: defaultFilters,
            density: defaultDensity,
        }
    }

    const [state, setState] = useState(loadState)

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(state))
        } catch (e) {
            console.error(`[useTablePersistence] Failed to save: ${storageKey}`, e)
        }
    }, [storageKey, state])

    // Individual setters
    const setColumnVisibility = useCallback((v) => {
        setState(prev => ({
            ...prev,
            columnVisibility: typeof v === 'function' ? v(prev.columnVisibility) : v,
        }))
    }, [])

    const setSorting = useCallback((v) => {
        setState(prev => ({
            ...prev,
            sorting: typeof v === 'function' ? v(prev.sorting) : v,
        }))
    }, [])

    const setFilters = useCallback((v) => {
        setState(prev => ({
            ...prev,
            filters: typeof v === 'function' ? v(prev.filters) : v,
        }))
    }, [])

    const setDensity = useCallback((v) => {
        setState(prev => ({ ...prev, density: v }))
    }, [])

    const resetAll = useCallback(() => {
        setState({
            columnVisibility: defaultVisibility,
            sorting: defaultSorting,
            filters: defaultFilters,
            density: defaultDensity,
        })
        localStorage.removeItem(storageKey)
    }, [storageKey, defaultVisibility, defaultSorting, defaultFilters, defaultDensity])

    return {
        columnVisibility: state.columnVisibility,
        setColumnVisibility,
        sorting: state.sorting,
        setSorting,
        filters: state.filters,
        setFilters,
        density: state.density,
        setDensity,
        resetAll,
    }
}
