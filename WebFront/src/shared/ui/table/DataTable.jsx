import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from 'lucide-react'

/**
 * DataTable v5 — Refactored 2026-02-19
 *
 * Features:
 * - Row Selection (checkbox column)
 * - Column Resizing + text ellipsis + hover tooltip
 * - Sticky Actions column (always last, immovable)
 * - Density control via prop
 * - Skeleton loading + empty state
 *
 * @param {Object[]} columns - TanStack column definitions
 * @param {Object[]} data - Row data
 * @param {boolean} isLoading
 * @param {string} emptyMessage
 * @param {Object} columnVisibility - { colId: boolean }
 * @param {Function} onColumnVisibilityChange
 * @param {Object[]} sorting - TanStack sorting state
 * @param {Function} onSortingChange
 * @param {string} density - 'compact' | 'default'
 * @param {boolean} enableRowSelection - Show checkbox column
 * @param {Function} onSelectionChange - (selectedRowIds[]) => void
 * @param {boolean} enableColumnResizing
 * @param {boolean} manualSorting - true이면 서버사이드 정렬 (클라이언트 정렬 비활성)
 */
const DataTable = ({
    columns: rawColumns,
    data,
    isLoading,
    emptyMessage = '데이터가 없습니다.',
    columnVisibility = {},
    onColumnVisibilityChange,
    sorting: externalSorting,
    onSortingChange: externalOnSortingChange,
    density = 'default',
    enableRowSelection = false,
    onSelectionChange,
    enableColumnResizing = true,
    onRowClick,
    manualSorting = false,  // true: 서버사이드 정렬 (클라이언트 정렬 비활성)
}) => {
    // Internal sorting fallback if external not provided
    const [internalSorting, setInternalSorting] = useState([])
    const sorting = externalSorting ?? internalSorting
    const onSortingChange = externalOnSortingChange ?? setInternalSorting

    const [rowSelection, setRowSelection] = useState({})

    // Reset selection when data changes
    useEffect(() => {
        setRowSelection({})
    }, [data])

    // Stable ref to avoid infinite loop when parent passes inline callback
    const onSelectionChangeRef = useRef(onSelectionChange)
    onSelectionChangeRef.current = onSelectionChange

    // Notify parent of selection changes
    useEffect(() => {
        if (onSelectionChangeRef.current && data) {
            const selectedIds = Object.keys(rowSelection)
                .filter(k => rowSelection[k])
                .map(idx => data[Number(idx)]?.id)
                .filter(Boolean)
            onSelectionChangeRef.current(selectedIds)
        }
    }, [rowSelection, data])

    // Build final columns: checkbox + user columns (with actions pinned last)
    const columns = useMemo(() => {
        const cols = [...rawColumns]

        // Inject checkbox column at the start
        if (enableRowSelection) {
            cols.unshift({
                id: '_select',
                size: 40,
                minSize: 40,
                maxSize: 40,
                enableResizing: false,
                enableSorting: false,
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        className="rounded border-zinc-300 text-primary focus:ring-primary/30 w-3.5 h-3.5 cursor-pointer"
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="rounded border-zinc-300 text-primary focus:ring-primary/30 w-3.5 h-3.5 cursor-pointer"
                    />
                ),
            })
        }

        return cols
    }, [rawColumns, enableRowSelection])

    const table = useReactTable({
        data: data ?? [],
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
        onSortingChange,
        onColumnVisibilityChange,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        // manualSorting=true이면 클라이언트 정렬 비활성 (서버가 정렬)
        ...(manualSorting
            ? { manualSorting: true }
            : { getSortedRowModel: getSortedRowModel() }),
        enableMultiSort: false,
        enableColumnResizing,
        columnResizeMode: 'onChange',
    })

    // Density styles
    const densityStyles = {
        compact: { padding: '8px 16px', fontSize: '14px', lineHeight: '22px' },
        default: { padding: '12px 16px', fontSize: '15px', lineHeight: '24px' },
    }
    const cellStyle = densityStyles[density] || densityStyles.default

    // Skeleton loading
    if (isLoading) {
        const visibleCols = table.getVisibleLeafColumns()
        return (
            <div className="overflow-x-auto flex-1 relative">
                <table className="w-full text-left border-collapse">
                    <thead className="fms-thead">
                        <tr>
                            {visibleCols.map((col) => (
                                <th key={col.id} className="fms-th" style={{ width: col.getSize() }}>
                                    {typeof col.columnDef.header === 'string' ? col.columnDef.header : ''}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <tr key={i} className="border-b border-zinc-50">
                                {visibleCols.map((col) => (
                                    <td key={col.id} style={cellStyle}>
                                        <div className="skeleton-cell h-4 w-2/3" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    // Empty state
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 flex-1">
                <Inbox size={40} strokeWidth={1.2} className="mb-3 text-zinc-300" />
                <p className="text-sm font-medium text-zinc-500">{emptyMessage}</p>
            </div>
        )
    }

    // Check if a column is the actions column
    const isActionsColumn = (colId) => colId === '_actions'
    const isSelectColumn = (colId) => colId === '_select'
    const isFixedColumn = (colId) => isActionsColumn(colId) || isSelectColumn(colId)

    return (
        <div className="overflow-x-auto flex-1 relative">
            <table className="w-full text-center border-collapse" style={{ minWidth: table.getTotalSize() }}>
                <thead className="fms-thead">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isActions = isActionsColumn(header.id)
                                const isFixed = isFixedColumn(header.id)
                                return (
                                    <th
                                        key={header.id}
                                        className={`fms-th ${header.column.getCanSort() ? 'cursor-pointer hover:text-primary transition-colors' : ''} ${isActions ? 'sticky-actions-th' : ''} `}
                                        style={{
                                            width: header.getSize(),
                                            position: isActions ? 'sticky' : undefined,
                                            right: isActions ? 0 : undefined,
                                            zIndex: isActions ? 10 : undefined,
                                            background: isActions ? 'inherit' : undefined,
                                        }}
                                        onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        <div className="flex items-center justify-center gap-1.5">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <span className="text-zinc-300">
                                                    {header.column.getIsSorted() === 'asc' ? <ChevronUp size={12} className="text-primary" /> :
                                                        header.column.getIsSorted() === 'desc' ? <ChevronDown size={12} className="text-primary" /> :
                                                            <ChevronsUpDown size={12} />}
                                                </span>
                                            )}
                                        </div>
                                        {/* Column resize handle */}
                                        {enableColumnResizing && !isFixed && (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-primary/40 transition-colors ${header.column.getIsResizing() ? 'bg-primary/60' : ''}`}
                                            />
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                            className={`fms-tr group border-b border-zinc-50 hover:border-zinc-200 ${onRowClick ? 'cursor-pointer hover:bg-zinc-50' : ''} `}
                        >
                            {row.getVisibleCells().map((cell, cellIdx, cellArr) => {
                                const isActions = isActionsColumn(cell.column.id)
                                const isLast = cellIdx === cellArr.length - 1
                                const cellValue = cell.getValue?.()
                                const showTooltip = typeof cellValue === 'string' && cellValue.length > 0

                                return (
                                    <td
                                        key={cell.id}
                                        className={`tabular-nums text-zinc-800 font-medium align-middle text-center`}
                                        style={{
                                            ...cellStyle,
                                            width: cell.column.getSize(),
                                            maxWidth: cell.column.getSize(),
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            borderRight: !isLast && !isActions ? '1px solid #f3f4f6' : undefined,
                                            position: isActions ? 'sticky' : undefined,
                                            right: isActions ? 0 : undefined,
                                            zIndex: isActions ? 10 : undefined,
                                            background: isActions ? 'inherit' : undefined,
                                        }}
                                        title={showTooltip ? String(cellValue) : undefined}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
