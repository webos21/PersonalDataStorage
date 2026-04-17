
const VARIANTS = {
    default: 'bg-zinc-100 text-zinc-800',
    primary: 'bg-blue-50 text-blue-700 border border-blue-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    outline: 'border border-zinc-200 text-zinc-600',
    ghost: 'hover:bg-zinc-100 text-zinc-600',

    // Action Variants (for edit/delete buttons in tables)
    edit: 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100',
    delete: 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100',

    // Business Logic Styles
    info: 'bg-sky-50 text-sky-700 border border-sky-100',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    violet: 'bg-violet-50 text-violet-700 border border-violet-100',
    pink: 'bg-pink-50 text-pink-700 border border-pink-100',
    teal: 'bg-teal-50 text-teal-700 border border-teal-100',
    orange: 'bg-orange-50 text-orange-700 border border-orange-100',
    cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    lime: 'bg-lime-50 text-lime-700 border border-lime-100',
    fuchsia: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100',
}

const getBadgeProps = (variant, value) => {
    // 1. Standard visual variants
    if (VARIANTS[variant]) return { className: VARIANTS[variant], label: value }

    // 2. Business Logic mapping
    let style = VARIANTS.default
    let label = value

    // 2.1 Vehicle Type (vtype)
    if (variant === 'vtype') {
        const typeMap = {
            11: '시내버스', 12: '농어촌버스', 13: '마을버스', 14: '시외버스', 15: '고속버스', 16: '전세버스', 17: '특수여객',
            21: '일반택시', 22: '개인택시',
            31: '일반화물', 32: '개별화물',
            41: '비사업용',
            51: '어린이통학',
            98: '기타1', 99: '기타2'
        }
        label = typeMap[value] || value

        const v = Number(value)
        if (v >= 11 && v <= 17) style = VARIANTS.indigo   // Bus — indigo
        else if (v >= 21 && v <= 22) style = VARIANTS.orange // Taxi — orange
        else if (v >= 31 && v <= 32) style = VARIANTS.teal   // Truck — teal
        else if (v === 41) style = VARIANTS.cyan             // Car — cyan
        else if (v === 51) style = VARIANTS.fuchsia          // School Bus — fuchsia
    }

    // 2.2 Fuel (vfuel or fuel)
    else if (variant === 'fuel' || variant === 'vfuel') {
        const fuelMap = { 0: 'NONE', 1: '경유', 2: '휘발유', 3: '전기' }
        label = fuelMap[value] || value
        if (value == 1) style = VARIANTS.default    // Diesel
        else if (value == 2) style = VARIANTS.orange // Gasoline — orange
        else if (value == 3) style = VARIANTS.teal   // Electric — teal
    }

    // 2.3 Status (Device Status, User Status)
    else if (variant === 'status') {
        // Device Status: 0:생산, 1:할당, 2:설치중, 3:운영, 4:유지보수, 5:폐기

        if (typeof value === 'number') { // Device Status
            const statusMap = { 0: '생산', 1: '할당', 2: '설치중', 3: '운영', 4: '유지보수', 5: '폐기' }
            label = statusMap[value] || value
            if (value === 0) style = VARIANTS.violet     // 생산 — violet
            else if (value === 1) style = VARIANTS.indigo // 할당 — indigo
            else if (value === 2) style = VARIANTS.orange // 설치중 — orange
            else if (value === 3) style = VARIANTS.success // 운영 — emerald
            else if (value === 4) style = VARIANTS.warning // 유지보수 — amber
            else if (value === 5) style = VARIANTS.danger  // 폐기 — rose
        } else { // String status
            if (value === 'ACTIVE') { label = '정상'; style = VARIANTS.success }
            else if (value === 'LOCK') { label = '잠김'; style = VARIANTS.warning }
            else { label = value; style = VARIANTS.default }
        }
    }

    // 2.4 Role
    else if (variant === 'role') {
        if (value === 'SUPER_ADMIN') { label = '최고관리자'; style = VARIANTS.danger }
        else if (value === 'ADMIN') { label = '관리자'; style = VARIANTS.indigo }
        else if (value === 'USER') { label = '사용자'; style = VARIANTS.default }
        else if (value === 'DRIVER') { label = '운전자'; style = VARIANTS.teal }
    }

    // Default Fallback
    else {
        style = VARIANTS.default
    }

    return { className: style, label }
}

const Badge = ({ children, variant = 'default', value, className = '', onClick }) => {
    const interactive = onClick ? 'cursor-pointer transition-colors' : ''

    // If children exists, use standard mode
    if (children) {
        return (
            <span
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-[13px] font-semibold leading-5 whitespace-nowrap ${VARIANTS[variant] || VARIANTS.default} ${interactive} ${className}`}
                onClick={onClick}
            >
                {children}
            </span>
        )
    }

    // Value mode
    const { className: styleClass, label } = getBadgeProps(variant, value)
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-[13px] font-semibold leading-5 whitespace-nowrap ${styleClass} ${interactive} ${className}`}
            onClick={onClick}
        >
            {label}
        </span>
    )
}

export default Badge
