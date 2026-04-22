const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20',
    secondary: 'text-zinc-600 bg-zinc-100 hover:bg-zinc-200',
    danger: 'bg-danger text-white hover:bg-danger/90',
    ghost: 'text-zinc-400 hover:text-primary hover:bg-primary/10',
}

const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    icon: 'p-2',
}

export default function Button({
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    className = '',
    ...props
}) {
    return (
        <button
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
