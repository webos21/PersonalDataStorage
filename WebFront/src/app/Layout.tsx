// library
import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { LogOut, ChevronDown, ChevronRight, ChevronLeft, Settings } from 'lucide-react';

// in-project
import { MENU_CONFIG } from '@/app/menuConfig';
import { useAuthStore, useMenuStateStore } from '@/shared/stores';

// import UserFormModal from '@/features/system/users/components/UserFormModal';
// import { useUpdateUser } from '@/features/system/users/hooks/useUsers';

import { useToast } from '@/shared/ui/feedback/Toast';
import NotificationBell from '@/shared/ui/layout/NotificationBell';

function Layout() {
    const { logout } = useAuthStore();
    const collapsed = useMenuStateStore((state) => state.collapsed);
    const openGroups = useMenuStateStore((state) => state.openGroups);
    const toggleCollapsed = useMenuStateStore((state) => state.toggleCollapsed);
    const toggleGroup = useMenuStateStore((state) => state.toggleGroup);
    const initializeGroups = useMenuStateStore((state) => state.initializeGroups);

    const typeCode = 'admin';

    useEffect(() => {
        initializeGroups(MENU_CONFIG.map((group) => group.id));
    }, [initializeGroups]);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    // ── MyPage ──
    const [myPageOpen, setMyPageOpen] = useState<boolean>(false);
    // const updateUser = useUpdateUser();
    const { showToast } = useToast();

    const handleMyPageSubmit = async (form: any) => {
        try {
            // await updateUser.mutateAsync({ id: user.id, body: form });
            // useAuthStore.getState().setUser({ ...user, ...form });
            showToast('내 정보가 수정되었습니다.', 'success');
            setMyPageOpen(false);
        } catch (err: any) {
            showToast(err.response?.data?.message || '수정 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-zinc-100">
            {/* 사이드바 */}
            <aside
                className={`${collapsed ? 'w-16' : 'w-56'} text-white flex h-[100dvh] flex-col border-r border-neutral-700/50 bg-neutral-800 transition-all duration-300`}
            >
                {/* Logo area */}
                <div className="p-3 border-b border-neutral-700/50 flex items-center justify-between">
                    {!collapsed && (
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                            <img src="/logo.png" alt="SynergyLo" className="h-6 object-contain object-left" />
                            <p className="text-[9px] text-neutral-400 tracking-wide">Fleet Management System</p>
                        </div>
                    )}
                    <button
                        onClick={toggleCollapsed}
                        className={`p-2 rounded-md hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white ${collapsed ? 'mx-auto' : ''}`}
                        title={collapsed ? '메뉴 펼치기' : '메뉴 접기'}
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-2 space-y-2">
                    {MENU_CONFIG.map((group) => {
                        const isOpen = openGroups[group.id];
                        return (
                            <div key={group.id}>
                                {!collapsed && (
                                    <button
                                        onClick={() => toggleGroup(group.id)}
                                        className="flex items-center justify-between w-full px-2 py-1.5 mb-0.5 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider hover:text-neutral-300"
                                    >
                                        <span>{group.label}</span>
                                        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                    </button>
                                )}

                                {(collapsed || isOpen) && (
                                    <div className="space-y-0.5">
                                        {group.items
                                            .filter((item) => !item.requiredRole || item.requiredRole.includes(typeCode))
                                            .map((item) => {
                                                const Icon = item.icon;
                                                if (item.disabled) {
                                                    return (
                                                        <span
                                                            key={item.id}
                                                            title={collapsed ? item.label : '준비 중'}
                                                            className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-2.5 px-2.5 py-2 rounded-md text-sm text-neutral-500 cursor-not-allowed opacity-50`}
                                                        >
                                                            <Icon size={18} />
                                                            {!collapsed && <span className="truncate">{item.label}</span>}
                                                        </span>
                                                    );
                                                }
                                                return (
                                                    <NavLink
                                                        key={item.id}
                                                        to={item.path}
                                                        title={collapsed ? item.label : undefined}
                                                        className={({ isActive }) =>
                                                            `flex items-center ${collapsed ? 'justify-center' : ''} gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                                                                isActive
                                                                    ? 'bg-orange-600 text-white shadow-md'
                                                                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                                                            }`
                                                        }
                                                    >
                                                        <Icon size={18} />
                                                        {!collapsed && <span className="truncate">{item.label}</span>}
                                                    </NavLink>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User Profile / Footer */}
                <div className="border-t border-neutral-700/50 bg-neutral-900/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                    {!collapsed && (
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {'A'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate text-neutral-400">{'회사'}</p>
                                <p className="text-sm font-medium truncate">{'사용자'}</p>
                            </div>
                        </div>
                    )}

                    <div className={`flex ${collapsed ? 'flex-col gap-1' : 'gap-2'}`}>
                        <button
                            onClick={() => setMyPageOpen(true)}
                            className={`flex items-center whitespace-nowrap ${collapsed ? 'justify-center w-full' : ''} gap-1.5 px-2 py-1.5 rounded-md text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors`}
                            title="계정 설정"
                        >
                            <Settings size={14} />
                            {!collapsed && <span>계정 설정</span>}
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`flex items-center whitespace-nowrap ${collapsed ? 'justify-center w-full' : ''} gap-1.5 px-2 py-1.5 rounded-md text-xs text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors`}
                            title="로그아웃"
                        >
                            <LogOut size={14} />
                            {!collapsed && <span>로그아웃</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="relative flex-1 overflow-auto">
                <Outlet />
                {/* 알림 벨 — 우상단 고정 (지도 페이지에서도 떠있음) */}
                <div className="fixed top-4 right-6 z-[9998]">
                    <NotificationBell />
                </div>
            </main>

            {/* MyPage Modal */}
            {/* <UserFormModal
                isOpen={myPageOpen}
                onClose={() => setMyPageOpen(false)}
                target={user}
                onSubmit={handleMyPageSubmit}
                isPending={updateUser.isPending}
                isSelf
            /> */}
        </div>
    );
}

export default Layout;
