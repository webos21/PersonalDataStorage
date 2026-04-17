
const DarkModeSwitch = ({ checked, onChange }) => {
    const handleToggle = () => {
        onChange({ target: { checked: !checked } });
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label="Toggle dark mode"
            onClick={handleToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full border transition-colors ${
                checked ? 'border-slate-700 bg-slate-700' : 'border-slate-300 bg-slate-200'
            }`}
        >
            <span className="absolute left-2 text-[10px] text-amber-300">☀</span>
            <span className="absolute right-2 text-[10px] text-slate-100">☾</span>
            <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                    checked ? 'translate-x-7' : 'translate-x-1'
                }`}
            />
        </button>
    );
};

export default DarkModeSwitch;
