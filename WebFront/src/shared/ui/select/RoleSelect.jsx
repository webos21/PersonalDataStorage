import { useQuery } from '@tanstack/react-query'
import { userTypeApi } from '@/shared/api/userTypeApi'

/**
 * RoleSelect
 * Fetches user types (roles) from API and renders a select dropdown.
 */
const RoleSelect = ({ value, onChange, name = 'type_code', required, disabled, label = '역할' }) => {
    const { data: roles = [], isLoading } = useQuery({
        queryKey: ['user-types'],
        queryFn: userTypeApi.getAll,
        staleTime: 300_000,
    })

    return (
        <div className="space-y-1.5">
            <label htmlFor={`field-${name}`} className="block text-sm font-medium text-zinc-700">
                {label}
                {required && <span className="text-danger ml-0.5">*</span>}
            </label>
            <select
                id={`field-${name}`}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                required={required}
                disabled={disabled || isLoading}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors disabled:bg-zinc-50 disabled:text-zinc-400"
            >
                <option value="">{isLoading ? '로딩 중...' : '역할 선택'}</option>
                {roles.map((role) => (
                    <option key={role.type_code} value={role.type_code}>
                        {role.type_code} {role.description ? `(${role.description})` : ''}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default RoleSelect
