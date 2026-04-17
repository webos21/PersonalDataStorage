import ApiClient from '@/shared/api/ApiClient'

/**
 * 사용자 유형(역할) 조회 API
 * /user-types 엔드포인트에서 역할 목록을 가져옵니다.
 */
export const userTypeApi = {
    getAll: async () => {
        const response = await ApiClient.get('/user-types')
        const d = response.data
        if (Array.isArray(d)) return d
        if (Array.isArray(d?.data)) return d.data
        if (Array.isArray(d?.content)) return d.content
        return []
    }
}
