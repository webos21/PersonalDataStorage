import ApiClient from '@/shared/api/ApiClient'

export const notificationApi = {
    /** 안읽은 알림 수 */
    getCount: async () => {
        const response = await ApiClient.get('/notifications/count')
        return response.data?.data?.unreadCount ?? 0
    },

    /** 알림 목록 */
    list: async (page = 0, size = 20) => {
        const response = await ApiClient.get(`/notifications?page=${page}&size=${size}`)
        return response.data?.data || []
    },

    /** 단건 읽음 처리 */
    markAsRead: (id) => ApiClient.patch(`/notifications/${id}/read`),

    /** 전체 읽음 처리 */
    markAllAsRead: () => ApiClient.patch('/notifications/read-all'),
}
