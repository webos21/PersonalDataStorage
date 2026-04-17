import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const PAGE_SIZE_OPTIONS = [10, 20, 50]

/**
 * Pagination v2 — Premium Sliding Window
 * - Sliding Window with Ellipsis: 1 ... 4 [5] 6 ... 20
 * - "1-20 / 342건 표시" results counter
 * - Page size selector (10/20/50)
 * - First/Last page jumps
 */
const Pagination = ({
    currentPage,
    totalPages,
    totalElements = 0,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
}) => {
    if (totalPages <= 0) return null

    // Build sliding window pages with ellipsis
    const getPages = () => {
        const pages = []

        if (totalPages <= 7) {
            for (let i = 0; i < totalPages; i++) pages.push(i)
            return pages
        }

        // Always include first page
        pages.push(0)

        if (currentPage > 2) pages.push('...')

        // Window around current
        const start = Math.max(1, currentPage - 1)
        const end = Math.min(totalPages - 2, currentPage + 1)
        for (let i = start; i <= end; i++) pages.push(i)

        if (currentPage < totalPages - 3) pages.push('...')

        // Always include last page
        pages.push(totalPages - 1)

        return pages
    }

    const start = currentPage * pageSize + 1
    const end = Math.min((currentPage + 1) * pageSize, totalElements)

    const navBtn = (disabled) =>
        `p-1.5 rounded-md transition-colors ${disabled ? 'text-zinc-300 cursor-not-allowed' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}`

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 bg-zinc-50/50 text-sm">
            {/* Left — Results counter */}
            <div className="flex items-center gap-3 text-zinc-500">
                {totalElements > 0 && (
                    <span>
                        <span className="font-medium text-zinc-700">{start}-{end}</span>
                        <span className="mx-1">/</span>
                        <span>{totalElements.toLocaleString()}건</span>
                    </span>
                )}

                {/* Page size selector */}
                {onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="px-2 py-1 text-xs border border-zinc-200 rounded-md bg-white text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <option key={size} value={size}>{size}건</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Right — Navigation */}
            <div className="flex items-center gap-0.5">
                {/* First page */}
                <button
                    className={navBtn(currentPage === 0)}
                    onClick={() => onPageChange(0)}
                    disabled={currentPage === 0}
                    title="첫 페이지"
                >
                    <ChevronsLeft size={16} />
                </button>

                {/* Prev */}
                <button
                    className={navBtn(currentPage === 0)}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    title="이전"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-0.5 mx-1">
                    {getPages().map((page, idx) =>
                        page === '...' ? (
                            <span key={`ellip-${idx}`} className="px-1.5 text-zinc-400 select-none">⋯</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${page === currentPage
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                                    }`}
                            >
                                {page + 1}
                            </button>
                        )
                    )}
                </div>

                {/* Next */}
                <button
                    className={navBtn(currentPage >= totalPages - 1)}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    title="다음"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last page */}
                <button
                    className={navBtn(currentPage >= totalPages - 1)}
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={currentPage >= totalPages - 1}
                    title="마지막 페이지"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default Pagination
