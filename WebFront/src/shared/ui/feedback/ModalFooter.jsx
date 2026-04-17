import Button from '@/shared/ui/button/Button'

/**
 * Standard modal footer with cancel + submit buttons.
 * @param {function} onCancel - Cancel button handler
 * @param {string} submitLabel - Submit button text (default: '등록')
 * @param {boolean} isPending - Disable submit while pending
 */
export default function ModalFooter({ onCancel, submitLabel = '등록', isPending = false }) {
    return (
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
            <Button type="button" variant="secondary" onClick={onCancel}>취소</Button>
            <Button type="submit" disabled={isPending}>{submitLabel}</Button>
        </div>
    )
}
