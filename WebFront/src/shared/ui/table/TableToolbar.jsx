import { useState, useRef, useEffect } from 'react'
import { Search, X, SlidersHorizontal, Download, AlignJustify, List } from 'lucide-react'

/**
 * TableToolbar v3
 *
 * - Search with debounce + Ctrl+K shortcut
 * - Dynamic filter via filterConfig prop
 * - Active filter chips displayed inline (next to search)
 * - Density toggle (compact/default)
 * - Export button (UI only)
 * - Action buttons slot
 */
const TableToolbar = ({
    keyword = '',
    onKeywordChange,
    searchPlaceholder = '검색 (Ctrl+K)',
    filterConfig = [],
    activeFilters = {},
    onFilterChange,
    density = 'default',
    onDensityChange,
    onExport,
    actions,
    dateRange,
}) => {
    const [localKeyword, setLocalKeyword] = useState(keyword)
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)
    const timerRef = useRef(null)
    const filterMenuRef = useRef(null)
    const searchRef = useRef(null)

    // Sync external keyword
    useEffect(() => { setLocalKeyword(keyword) }, [keyword])

    // Close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) setFilterMenuOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Ctrl+K shortcut
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                searchRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    const handleSearch = (e) => {
        const v = e.target.value
        setLocalKeyword(v)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => onKeywordChange?.(v), 400)
    }

    const clearSearch = () => {
        setLocalKeyword('')
        clearTimeout(timerRef.current)
        onKeywordChange?.('')
    }

    const handleFilterSelect = (filterId, value) => {
        const next = { ...activeFilters }
        if (value === '' || value === null || value === undefined) {
            delete next[filterId]
        } else {
            next[filterId] = value
        }
        onFilterChange?.(next)
    }

    const removeFilter = (filterId) => {
        const next = { ...activeFilters }
        delete next[filterId]
        onFilterChange?.(next)
    }

    const clearAllFilters = () => {
        onFilterChange?.({})
    }

    const activeFilterCount = Object.keys(activeFilters).length

    const getFilterLabel = (filterId, value) => {
        const config = filterConfig.find(f => f.id === filterId)
        if (!config) return value
        const option = config.options?.find(o => String(o.value) === String(value))
        return option?.label || value
    }

    return (
        <div className="border-b border-zinc-200 bg-zinc-50/40">
            <div className="flex items-center gap-3 px-4 py-2.5">
                {/* Date range filter (left) */}
                {dateRange}

                {/* Search (right) */}
                <div className="relative flex-shrink-0" style={{ width: '280px' }}>
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" size={15} />
                    <input
                        ref={searchRef}
                        type="text"
                        value={localKeyword}
                        onChange={handleSearch}
                        placeholder={searchPlaceholder}
                        className="w-full pl-8 pr-7 py-1.5 text-sm font-medium border border-zinc-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors placeholder:text-zinc-500"
                    />
                    {localKeyword && (
                        <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full">
                            <X size={13} />
                        </button>
                    )}
                </div>

                {/* Active filter chips */}
                {activeFilterCount > 0 && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {Object.entries(activeFilters).map(([filterId, value]) => {
                            const config = filterConfig.find(f => f.id === filterId)
                            return (
                                <span
                                    key={filterId}
                                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-primary/10 text-primary rounded-full whitespace-nowrap"
                                >
                                    {config?.label}: {getFilterLabel(filterId, value)}
                                    <button
                                        onClick={() => removeFilter(filterId)}
                                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                    >
                                        <X size={10} />
                                    </button>
                                </span>
                            )
                        })}
                        <button
                            onClick={clearAllFilters}
                            className="text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors ml-0.5 whitespace-nowrap"
                        >
                            초기화
                        </button>
                    </div>
                )}
                {/* Spacer */}
                <div className="flex-1" />
                {/* Filter dropdown — TODO: 비활성화
                {filterConfig.length > 0 && (
                    <div className="relative" ref={filterMenuRef}>
                        <button
                            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterMenuOpen ? 'bg-zinc-100 border-zinc-300 text-zinc-800' : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'}`}
                        >
                            <SlidersHorizontal size={14} />
                            필터
                            {activeFilterCount > 0 && (
                                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full leading-none">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        {filterMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 z-50 w-64 bg-white rounded-lg border border-zinc-200 shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 mb-1">
                                    필터 설정
                                </div>
                                {filterConfig.map((filter) => (
                                    <div key={filter.id} className="px-3 py-2">
                                        <label className="block text-xs font-medium text-zinc-500 mb-1">{filter.label}</label>
                                        {filter.type === 'select' && (
                                            <select
                                                value={activeFilters[filter.id] ?? ''}
                                                onChange={(e) => handleFilterSelect(filter.id, e.target.value)}
                                                className="w-full px-2 py-1.5 text-sm border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary/30 text-zinc-700"
                                            >
                                                <option value="">전체</option>
                                                {filter.options?.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                ))}
                                {activeFilterCount > 0 && (
                                    <div className="px-3 pt-1 border-t border-zinc-100 mt-1">
                                        <button
                                            onClick={clearAllFilters}
                                            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                                        >
                                            모두 초기화
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                */}

                {/* Density toggle — TODO: 비활성화
                {onDensityChange && (
                    <button
                        onClick={() => onDensityChange(density === 'default' ? 'compact' : 'default')}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border bg-white border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition-colors"
                        title={density === 'compact' ? '기본 높이' : '좁게'}
                    >
                        {density === 'compact' ? <AlignJustify size={14} /> : <List size={14} />}
                        {density === 'compact' ? '좁게' : '기본'}
                    </button>
                )}
                */}

                {/* Export button */}
                {onExport && (
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#f97316] text-white hover:bg-[#ea580c] transition-all shadow-sm shadow-orange-500/20"
                        title="내보내기"
                    >
                        <Download size={16} strokeWidth={2.5} />
                        내보내기
                    </button>
                )}


                {/* Action buttons */}
                {actions}
            </div>
        </div>
    )
}

export default TableToolbar
