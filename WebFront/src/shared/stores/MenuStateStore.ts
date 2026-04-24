import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
    collapsed: boolean;
    openGroups: Record<string, boolean>;
    setCollapsed: (collapsed: boolean) => void;
    toggleCollapsed: () => void;
    setGroupOpen: (groupId: string, isOpen: boolean) => void;
    toggleGroup: (groupId: string) => void;
    initializeGroups: (groupIds: string[]) => void;
    resetMenuState: () => void;
}

const useMenuStateStore = create<MenuState>()(
    persist(
        (set) => ({
            collapsed: false,
            openGroups: {},

            setCollapsed: (collapsed: boolean) => set({ collapsed }),

            toggleCollapsed: () =>
                set((state) => ({
                    collapsed: !state.collapsed
                })),

            setGroupOpen: (groupId: string, isOpen: boolean) =>
                set((state) => ({
                    openGroups: {
                        ...state.openGroups,
                        [groupId]: isOpen
                    }
                })),

            toggleGroup: (groupId: string) =>
                set((state) => {
                    const current = state.openGroups[groupId] ?? true;
                    return {
                        openGroups: {
                            ...state.openGroups,
                            [groupId]: !current
                        }
                    };
                }),

            initializeGroups: (groupIds: string[]) =>
                set((state) => {
                    let changed = false;
                    const nextGroups = { ...state.openGroups };

                    groupIds.forEach((groupId) => {
                        if (nextGroups[groupId] == null) {
                            nextGroups[groupId] = true;
                            changed = true;
                        }
                    });

                    return changed ? { openGroups: nextGroups } : state;
                }),

            resetMenuState: () =>
                set({
                    collapsed: false,
                    openGroups: {}
                })
        }),
        {
            name: 'pds-menu-state'
        }
    )
);

export default useMenuStateStore;
