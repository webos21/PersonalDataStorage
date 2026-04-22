/**
 * Small icon-only button for table row actions (edit, delete, etc).
 * @param {function} onClick - Click handler
 * @param {string} title - Tooltip title
 * @param {'default'|'danger'} variant - Color variant
 * @param {ReactNode} children - Icon element
 */
export default function IconButton({ onClick, title, variant = 'default', disabled = false, children }) {
    const styles = variant === 'danger'
        ? 'text-zinc-500 hover:text-danger hover:bg-danger/5'
        : 'text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100'

    return (
        <button
            onClick={disabled ? undefined : onClick}
            title={title}
            disabled={disabled}
            className={`p-1.5 rounded transition-colors ${styles} ${disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}`}
        >
            {children}
        </button>
    )
}
