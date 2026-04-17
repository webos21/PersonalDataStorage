import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    authKey: string | null;
    authVal: string | null;
    user: any | null;
    setAuth: (authKey: string, authVal: string) => void;
    setUser: (user: any) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            authKey: null,
            authVal: null,
            user: null,

            setAuth: (authKey: string, authVal: string) => set({ authKey, authVal }),

            setUser: (user: any) => set({ user }),

            logout: () => set({ authKey: null, authVal: null, user: null })
        }),
        {
            name: 'pds-auth' // localStorage key
        }
    )
);

export default useAuthStore;
