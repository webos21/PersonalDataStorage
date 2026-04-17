/**
 * Shared select field component matching FormField styling.
 * @param {string} label - Field label
 * @param {string} name - Input name attribute
 * @param {string} value - Current value
 * @param {function} onChange - Change handler
 * @param {Array<{value: string, label: string}>} options - Select options
 * @param {boolean} required - Whether the field is required
 */
export default function SelectField({ label, name, value, onChange, options = [], required = false }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-zinc-700">
                    {label}
                    {required && <span className="text-danger ml-0.5">*</span>}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    )
}
