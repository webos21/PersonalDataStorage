import { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id))
            }, duration)
        }
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {createPortal(
                <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none">
                    {toasts.map(toast => (
                        <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    )
}

const ToastItem = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle size={18} className="text-green-500" />,
        error: <AlertCircle size={18} className="text-red-500" />,
        info: <Info size={18} className="text-primary" />
    }

    const styles = {
        success: 'border-l-4 border-green-500',
        error: 'border-l-4 border-red-500',
        info: 'border-l-4 border-primary'
    }

    return (
        <div className={`bg-white shadow-lg rounded-md p-4 min-w-[300px] flex items-start gap-3 pointer-events-auto animate-in slide-in-from-right-full duration-300 ${styles[type] || styles.info}`}>
            <div className="mt-0.5">{icons[type] || icons.info}</div>
            <p className="flex-1 text-sm text-zinc-700">{message}</p>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                <X size={16} />
            </button>
        </div>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within a ToastProvider')
    return { showToast: context.addToast }
}
