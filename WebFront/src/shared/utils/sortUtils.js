/**
 * TanStack sorting state를 API sort 파라미터로 변환
 *
 * TanStack: [{ id: 'license_plate', desc: false }]
 * API:      'license_plate,asc'
 *
 * @param {Array<{id: string, desc: boolean}>} sorting - TanStack sorting state
 * @returns {string|undefined} - 'column,asc' 또는 'column,desc'. 정렬 없으면 undefined
 */
export function toSortParam(sorting) {
    if (!sorting || sorting.length === 0) return undefined
    const { id, desc } = sorting[0]  // 단일 정렬만 사용
    return `${id},${desc ? 'desc' : 'asc'}`
}
