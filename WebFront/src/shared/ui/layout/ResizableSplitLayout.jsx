import { useState, useRef, useEffect } from 'react'

/**
 * ResizableSplitLayout
 * - Top panel: Flexible height (takes remaining space)
 * - Bottom panel: Resizable height with drag handle
 * 
 * @param {ReactNode} topContent - Content for the top panel
 * @param {ReactNode} bottomContent - Content for the bottom panel (only rendered if isBottomOpen is true)
 * @param {boolean} isBottomOpen - Controls visibility of the bottom panel
 * @param {number} initialBottomHeight - Initial height of the bottom panel (default: 400)
 * @param {number} minBottomHeight - Minimum height (default: 200)
 * @param {number} maxBottomHeight - Maximum height (default: 800)
 */
const ResizableSplitLayout = ({
    topContent,
    bottomContent,
    isBottomOpen,
    initialBottomHeight = 400,
    minBottomHeight = 200,
    maxBottomHeight = 800
}) => {
    const [bottomHeight, setBottomHeight] = useState(initialBottomHeight)
    const [isResizing, setIsResizing] = useState(false)
    const isDragging = useRef(false)
    const containerRef = useRef(null)

    const handleMouseDown = (e) => {
        e.preventDefault()
        isDragging.current = true
        setIsResizing(true)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = 'row-resize'
        document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()
        // Calculate new height: Container Bottom - Mouse Y
        let newHeight = containerRect.bottom - e.clientY

        // Clamp height
        if (newHeight < minBottomHeight) newHeight = minBottomHeight
        if (newHeight > maxBottomHeight) newHeight = maxBottomHeight

        setBottomHeight(newHeight)
    }

    const handleMouseUp = () => {
        isDragging.current = false
        setIsResizing(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
    }

    // Cleanup just in case
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <div ref={containerRef} className="h-full w-full flex flex-col overflow-hidden bg-zinc-50 relative">
            {/* Top Panel */}
            <div className="flex-1 min-h-0 flex flex-col relative z-0">
                {topContent}
            </div>

            {/* Bottom Panel (Resizable) */}
            <div
                className={`
                    flex-none bg-white border-t border-zinc-300 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.15)] flex flex-col z-10
                    ${isResizing ? '' : 'transition-[height] duration-300 ease-in-out'}
                `}
                style={{
                    height: isBottomOpen ? bottomHeight : 0,
                    overflow: 'hidden'
                }}
            >
                {/* Drag Handle */}
                <div
                    onMouseDown={handleMouseDown}
                    className="flex-none h-2 cursor-row-resize bg-zinc-100 border-b border-zinc-200 flex items-center justify-center hover:bg-zinc-200 transition-colors group"
                >
                    <div className="w-12 h-1 rounded-full bg-zinc-300 group-hover:bg-zinc-400" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-zinc-50/30 relative">
                    {bottomContent}
                </div>
            </div>
        </div>
    )
}

export default ResizableSplitLayout
