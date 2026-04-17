import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import ApiClient from '@/shared/api/ApiClient'
import { transformToTree } from '@/shared/utils/tree'

/**
 * GroupSelect — 인라인 그룹 선택 드롭다운 (트리 형태 <optgroup> 대신 indent로 표현)
 * DashboardPage, StatisticsPage용 경량 컴포넌트
 */
export default function GroupSelect({ value, onChange, className = '' }) {
    const { data } = useQuery({
        queryKey: ['groups', 'select'],
        queryFn: () => ApiClient.get('/system/groups', { params: { page: 0, size: 2000 } }).then(r => r.data),
        staleTime: 60 * 1000,
    })

    const groups = data?.data?.content ?? []

    // Flatten tree with depth for indent display
    const options = useMemo(() => {
        const tree = transformToTree(groups)
        const result = []
        const walk = (nodes, depth = 0) => {
            for (const node of nodes) {
                result.push({ id: node.id, name: node.name, depth })
                if (node.subRows?.length) walk(node.subRows, depth + 1)
            }
        }
        walk(tree)
        return result
    }, [groups])

    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value || '')}
            className={`text-sm border border-zinc-200 rounded-lg px-2.5 py-1.5 bg-white text-zinc-700 focus:outline-none focus:border-blue-400 ${className}`}
        >
            <option value="">전체</option>
            {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                    {'　'.repeat(opt.depth)}{opt.name}
                </option>
            ))}
        </select>
    )
}
