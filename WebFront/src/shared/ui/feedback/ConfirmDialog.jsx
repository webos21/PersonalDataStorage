import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'
import Button from '@/shared/ui/button/Button'

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title = '삭제 확인', message = '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.' }) => {
    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
                        <AlertTriangle className="text-danger" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h3>
                    <p className="text-sm text-zinc-500">{message}</p>
                </div>
                <div className="flex border-t border-zinc-100">
                    <div className="flex-1 p-2">
                        <Button variant="secondary" onClick={onCancel} className="w-full rounded-bl-lg">취소</Button>
                    </div>
                    <div className="flex-1 p-2">
                        <Button variant="danger" onClick={onConfirm} className="w-full rounded-br-lg">삭제</Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ConfirmDialog
