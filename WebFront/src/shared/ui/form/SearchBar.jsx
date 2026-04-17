import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = ({ value = '', onChange, placeholder = '검색어를 입력하세요', debounceMs = 400 }) => {
    const [localValue, setLocalValue] = useState(value)
    const timerRef = useRef(null)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const handleChange = (e) => {
        const newValue = e.target.value
        setLocalValue(newValue)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => onChange(newValue), debounceMs)
    }

    const handleClear = () => {
        setLocalValue('')
        clearTimeout(timerRef.current)
        onChange('')
    }

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-9 pr-8 py-2 text-sm font-medium border border-zinc-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-zinc-500"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    )
}

export default SearchBar
