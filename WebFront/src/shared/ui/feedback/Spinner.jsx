import { Loader2 } from 'lucide-react'

const Spinner = ({ size = 'md', className = '' }) => {
    const sizeMap = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-10 h-10',
    }

    const sizeClass = sizeMap[size] || sizeMap.md

    return (
        <Loader2 
            className={`animate-spin text-blue-600 ${sizeClass} ${className}`} 
        />
    )
}

export default Spinner
