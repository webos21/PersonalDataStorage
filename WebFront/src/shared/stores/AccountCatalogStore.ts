import { useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ApiClient from '@/shared/api/ApiClient';

export type AccountClassItem = {
    id: number | string;
    title?: string;
};

export type AccountCodeItem = {
    id: number | string;
    accountCode?: string;
    title?: string;
};

interface AccountCatalogState {
    aclasses: AccountClassItem[];
    acodes: AccountCodeItem[];
    lastSyncedAt: number | null;
    isSyncing: boolean;
    syncCatalog: (force?: boolean) => Promise<void>;
    clearCatalog: () => void;
}

const shouldUseCached = (
    aclasses: AccountClassItem[],
    acodes: AccountCodeItem[],
    lastSyncedAt: number | null,
    force?: boolean
) => {
    if (force) return false;
    if (lastSyncedAt) return true;
    return aclasses.length > 0 && acodes.length > 0;
};

const useAccountCatalogStore = create<AccountCatalogState>()(
    persist(
        (set, get) => ({
            aclasses: [],
            acodes: [],
            lastSyncedAt: null,
            isSyncing: false,

            syncCatalog: async (force = false) => {
                const { aclasses, acodes, lastSyncedAt, isSyncing } = get();
                if (isSyncing) return;
                if (shouldUseCached(aclasses, acodes, lastSyncedAt, force)) return;

                set({ isSyncing: true });
                try {
                    const [aclassRes, acodeRes] = await Promise.all([
                        ApiClient.get('/accountClass', { params: { page: 1, perPage: 1000 } }),
                        ApiClient.get('/accountCode', { params: { page: 1, perPage: 3000 } })
                    ]);

                    set({
                        aclasses: aclassRes?.data?.data || [],
                        acodes: acodeRes?.data?.data || [],
                        lastSyncedAt: Date.now(),
                        isSyncing: false
                    });
                } catch (error) {
                    console.error('[useAccountCatalogStore] Failed to sync catalog', error);
                    set({ isSyncing: false });
                }
            },

            clearCatalog: () =>
                set({
                    aclasses: [],
                    acodes: [],
                    lastSyncedAt: null,
                    isSyncing: false
                })
        }),
        {
            name: 'pds-account-catalog',
            partialize: (state) => ({
                aclasses: state.aclasses,
                acodes: state.acodes,
                lastSyncedAt: state.lastSyncedAt
            })
        }
    )
);

const buildAccountCodeLabelByCode = (aclasses: AccountClassItem[], acodes: AccountCodeItem[]) => {
    const classMap = Object.fromEntries((aclasses || []).map((aclass) => [String(aclass?.id), aclass?.title || '']));
    return Object.fromEntries(
        (acodes || []).map((acode) => {
            const code = String(acode?.accountCode || '');
            const classId =
                Object.keys(classMap)
                    .filter((id) => code.startsWith(id))
                    .sort((a, b) => b.length - a.length)[0] || '';
            const classTitle = classMap[classId] || '';
            const codeTitle = acode?.title || '';
            const label = [classTitle, codeTitle].filter(Boolean).join(' / ');
            return [code, label || code];
        })
    );
};

export const useAccountCatalog = () => {
    const aclasses = useAccountCatalogStore((s) => s.aclasses);
    const acodes = useAccountCatalogStore((s) => s.acodes);
    const syncCatalog = useAccountCatalogStore((s) => s.syncCatalog);
    const isSyncing = useAccountCatalogStore((s) => s.isSyncing);
    const lastSyncedAt = useAccountCatalogStore((s) => s.lastSyncedAt);

    useEffect(() => {
        void syncCatalog(false);
    }, [syncCatalog]);

    const accountCodeLabelByCode = useMemo(() => buildAccountCodeLabelByCode(aclasses, acodes), [aclasses, acodes]);

    return {
        aclasses,
        acodes,
        accountCodeLabelByCode,
        syncCatalog,
        isSyncing,
        lastSyncedAt
    };
};

export { buildAccountCodeLabelByCode, useAccountCatalogStore };
export default useAccountCatalogStore;
