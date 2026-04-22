const FormField = ({ label, name, type = 'text', value, onChange, required, disabled, error, placeholder, options, rows }) => {
    const inputId = `field-${name}`
    const baseInput = 'w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors disabled:bg-zinc-50 disabled:text-zinc-400'
    const errorInput = error ? 'border-danger' : 'border-zinc-200'

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    id={inputId}
                    name={name}
                    value={value ?? ''}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`${baseInput} ${errorInput}`}
                >
                    <option value="">선택하세요</option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            )
        }

        if (type === 'textarea') {
            return (
                <textarea
                    id={inputId}
                    name={name}
                    value={value ?? ''}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={rows || 3}
                    className={`${baseInput} ${errorInput} resize-none`}
                />
            )
        }

        return (
            <input
                id={inputId}
                name={name}
                type={type}
                value={value ?? ''}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`${baseInput} ${errorInput}`}
            />
        )
    }

    return (
        <div className="space-y-1.5">
            <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700">
                {label}
                {required && <span className="text-danger ml-0.5">*</span>}
            </label>
            {renderInput()}
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    )
}

export default FormField
