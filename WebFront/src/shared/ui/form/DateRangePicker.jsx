import { Calendar } from 'lucide-react'
import { diffDateKST, getTodayKST, shiftDateKST } from '@/shared/utils/format'

/**
 * Atomic DateRangePicker
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @param {function} onChange - ({ startDate, endDate }) => void
 * @param {string} label - Input Label
 */
export const DateRangePicker = ({ startDate, endDate, onChange, label = '기간 선택', className = '', maxDays = null }) => {

    const handleStartChange = (e) => {
        const newStart = e.target.value
        if (newStart > endDate) {
            onChange({ startDate: newStart, endDate: newStart })
            return
        }

        if (maxDays) {
            const diffDays = diffDateKST(newStart, endDate)

            if (diffDays > maxDays - 1) {
                const maxEndStr = shiftDateKST(newStart, maxDays - 1)
                onChange({ startDate: newStart, endDate: maxEndStr })
                return
            }
        }

        onChange({ startDate: newStart, endDate })
    }

    const handleEndChange = (e) => {
        const newEnd = e.target.value
        if (newEnd < startDate) {
            onChange({ startDate: newEnd, endDate: newEnd })
            return
        }

        if (maxDays) {
            const diffDays = diffDateKST(startDate, newEnd)

            if (diffDays > maxDays - 1) {
                const minStartStr = shiftDateKST(newEnd, -(maxDays - 1))
                onChange({ startDate: minStartStr, endDate: newEnd })
                return
            }
        }

        onChange({ startDate, endDate: newEnd })
    }

    const setToday = () => {
        const today = getTodayKST()
        onChange({ startDate: today, endDate: today })
    }

    return (
        <div className={`space-y-1 ${className}`}>
            <div className="flex justify-between items-end mb-1">
                {label && (
                    <label className="text-xs font-bold text-zinc-500">
                        {label}
                    </label>
                )}
                <button
                    onClick={setToday}
                    className="text-[10px] text-blue-600 hover:underline px-1"
                >
                    오늘
                </button>
            </div>

            <div className="flex items-center gap-2">
                {/* Start Date */}
                <div className="relative flex-1 min-w-0 overflow-hidden">
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartChange}
                        className="w-full pl-8 pr-1 py-1.5 bg-white border border-zinc-200 rounded-lg text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <Calendar className="absolute left-2.5 top-2.5 text-zinc-400" size={14} />
                </div>

                <span className="text-zinc-400 text-sm flex-shrink-0">~</span>

                {/* End Date */}
                <div className="relative flex-1 min-w-0 overflow-hidden">
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndChange}
                        className="w-full pl-8 pr-1 py-1.5 bg-white border border-zinc-200 rounded-lg text-[13px] text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <Calendar className="absolute left-2.5 top-2.5 text-zinc-400" size={14} />
                </div>
            </div>

            {/* Helper Text for Max Range */}
            {maxDays && (
                <p className="text-[10px] text-zinc-400 text-right pt-0.5">
                    최대 {maxDays}일 조회 가능
                </p>
            )}
        </div>
    )
}
