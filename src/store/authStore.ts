import { create } from 'zustand';
import createStorage from '@/features/api/storageService';
const localStore = createStorage('localStorage');

interface AuthState {
    userId: string | null;
    token: string | null;
    setUserId: (id: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userId: localStore.getItem('userId'),
    token: null,
    setUserId: (id) => {
        localStore.setItem('userId', id);
        set({ userId: id });
    },
    clearAuth: () => {
        localStore.removeItem('userId');
        set({ userId: null, token: null });
    },
}));
