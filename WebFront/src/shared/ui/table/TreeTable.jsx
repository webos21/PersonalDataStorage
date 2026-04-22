import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { useState, useMemo, useEffect } from 'react'
import { Inbox } from 'lucide-react'

/**
 * TreeTable — Unified with DataTable styling
 *
 * Shares the same visual design system:
 * - fms-thead, fms-th, fms-tr, fms-td CSS classes
 * - Same density styles, skeleton loading, empty state
 * - Same border/hover patterns
 *
 * Unique to TreeTable:
 * - Tree expand/collapse via getSubRows
 * - Row click + selectedId highlight
 * - Auto-expand on data change
 */
const TreeTable = ({ data, columns, onRowClick, selectedId, isLoading, treeData, density = 'default' }) => {
    const [expanded, setExpanded] = useState({})

    const densityStyles = {
        compact: { padding: '6px 16px', fontSize: '12px', lineHeight: '18px' },
        default: { padding: '10px 16px', fontSize: '13px', lineHeight: '20px' },
    }
    const cellStyle = densityStyles[density] || densityStyles.default

    // Use internal data if generic data is passed, or use pre-processed treeData if provided
    const finalData = useMemo(() => treeData || data, [data, treeData])

    const table = useReactTable({
        data: finalData,
        columns,
        state: { expanded },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    // Auto-expand effect when data changes (e.g. filtering)
    useEffect(() => {
        const newExpanded = {}
        let hasExpansion = false

        const traverse = (nodes) => {
            nodes.forEach(node => {
                if (node.expanded) {
                    newExpanded[node.id] = true
                    hasExpansion = true
                }
                if (node.subRows && node.subRows.length > 0) {
                    traverse(node.subRows)
                }
            })
        }

        traverse(finalData)

        if (hasExpansion) {
            setExpanded(newExpanded)
        }
    }, [finalData])

    // Skeleton loading — same pattern as DataTable
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
                        {Array.from({ length: 6 }).map((_, i) => (
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

    // Empty state — same pattern as DataTable
    if (!finalData || finalData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 flex-1">
                <Inbox size={40} strokeWidth={1.2} className="mb-3 text-zinc-300" />
                <p className="text-sm font-medium text-zinc-500">등록된 항목이 없습니다.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto flex-1 relative">
            <table className="w-full text-left border-collapse">
                <thead className="fms-thead">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="fms-th">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            onClick={() => onRowClick && onRowClick(row.original)}
                            className={`fms-tr group border-b border-zinc-50 hover:border-zinc-200 cursor-pointer ${selectedId === row.original.id ? 'bg-blue-50/60' : ''}`}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="tabular-nums text-zinc-700 align-middle"
                                    style={{
                                        ...cellStyle,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TreeTable
