import { useAuthStore } from '@/shared/stores/AuthStore'

/**
 * 권한 체크 훅 — rules.md 컨벤션: can(action, resource, row?)
 *
 * - Role-based: user, group, driver → type_code 기반
 * - Relation-based (FGA): vehicle, device → BE 응답의 permission 필드 기반
 *   row.permission: 'admin' | 'editor' | 'viewer' | undefined
 */
export function usePermission() {
    const user = useAuthStore(s => s.user)
    const typeCode = user?.type_code
    const userId = user?.id

    const isAdmin = typeCode === 'SUPER_ADMIN' || typeCode === 'ADMIN'
    const isSuperAdmin = typeCode === 'SUPER_ADMIN'

    /**
     * @param {string} action - 'create' | 'edit' | 'delete' | 'view'
     * @param {string} resource - 'user' | 'group' | 'driver' | 'vehicle' | 'device'
     * @param {object} [row] - 목록 row 객체 (vehicle/device에서 permission 필드 참조)
     */
    const can = (action, resource, row) => {
        switch (resource) {
            // Role-based resources
            case 'user':
                if (action === 'create' || action === 'edit' || action === 'delete') return isAdmin
                return true

            case 'group':
                if (action === 'create' || action === 'edit' || action === 'delete') return isAdmin
                return true

            case 'driver':
                if (action === 'create' || action === 'edit' || action === 'delete') return isSuperAdmin
                return true

            // FGA Relation-based resources (vehicle + device)
            case 'vehicle':
            case 'device':
                if (action === 'create') return isAdmin
                if (action === 'delete') {
                    if (row?.permission) return row.permission === 'admin'
                    return isAdmin
                }
                if (action === 'edit') {
                    if (row?.permission) return row.permission === 'admin' || row.permission === 'editor'
                    return isAdmin
                }
                return true

            default:
                return true
        }
    }

    return { can, isAdmin, isSuperAdmin, userId, typeCode }
}
