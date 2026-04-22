import { useState, useEffect, useRef, useCallback } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router'
import { notificationApi } from '@/shared/api/notificationApi'

export default function NotificationBell() {
    const navigate = useNavigate()
    const [unreadCount, setUnreadCount] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [showPanel, setShowPanel] = useState(false)
    const panelRef = useRef(null)

    // polling: 15초마다 안읽은 수 조회
    useEffect(() => {
        // const fetchCount = async () => {
        //     try {
        //         const count = await notificationApi.getCount()
        //         setUnreadCount(count)
        //     } catch (e) { /* 무시 */ }
        // }
        // fetchCount()
        // const interval = setInterval(fetchCount, 15000)
        // return () => clearInterval(interval)
    }, [])

    // 벨 클릭
    const handleBellClick = useCallback(async () => {
        if (showPanel) {
            setShowPanel(false)
            return
        }
        try {
            // const list = await notificationApi.list(0, 10)
            // setNotifications(list)
        } catch (e) { /* 무시 */ }
        setShowPanel(true)
    }, [showPanel])

    // 알림 클릭 → 읽음 처리 + deeplink 이동
    const handleNotiClick = useCallback(async (noti) => {
        if (!noti.isRead) {
            await notificationApi.markAsRead(noti.id).catch(() => {})
            setUnreadCount(prev => Math.max(0, prev - 1))
        }
        setShowPanel(false)
        if (noti.deeplinkPath) {
            navigate(noti.deeplinkPath)
        }
    }, [navigate])

    // 전체 읽음
    const handleMarkAllRead = useCallback(async () => {
        await notificationApi.markAllAsRead().catch(() => {})
        setUnreadCount(0)
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    }, [])

    // 패널 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setShowPanel(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={handleBellClick}
                className="p-2 rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white transition-colors text-zinc-600 hover:text-zinc-900 relative"
                title="알림"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* 알림 드롭다운 패널 */}
            {showPanel && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-2xl z-[9999] max-h-96 overflow-hidden">
                    <div className="flex items-center justify-between p-3 border-b border-zinc-100">
                        <span className="text-sm font-semibold text-zinc-900">알림</span>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                            >
                                전체 읽음
                            </button>
                        )}
                    </div>
                    <div className="overflow-y-auto max-h-72">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-zinc-400 text-center py-8">알림이 없습니다</p>
                        ) : (
                            notifications.map(noti => (
                                <button
                                    key={noti.id}
                                    onClick={() => handleNotiClick(noti)}
                                    className={`w-full text-left px-3 py-2.5 border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                                        noti.isRead ? 'opacity-50' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {!noti.isRead && (
                                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-zinc-900 truncate">{noti.title}</p>
                                            <p className="text-xs text-zinc-500 truncate mt-0.5">{noti.message}</p>
                                            <p className="text-[10px] text-zinc-400 mt-1">
                                                {new Date(noti.createdAt).toLocaleString('ko-KR')}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
