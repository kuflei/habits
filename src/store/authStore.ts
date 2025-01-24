import { create } from 'zustand';
import { useStorage } from '@/features/hooks/useStorage';

interface AuthState {
    userId: string | null;
    token: string | null;
    setUserId: (id: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userId: null,
    token: null,

    setUserId: (id: string) => {
        set({ userId: id });
    },

    clearAuth: () => {
        set({ userId: null, token: null });
    },
}));

export const useAuthWithStorage = () => {
    const storage = useStorage('local');
    const { userId, setUserId, clearAuth } = useAuthStore();

    const setUserIdWithStorage = (id: string) => {
        storage.setItem('userId', id);
        setUserId(id);
    };

    const clearAuthWithStorage = () => {
        storage.removeItem('userId');
        clearAuth();
    };

    return {
        userId: storage.getItem<string>('userId') || userId,
        setUserId: setUserIdWithStorage,
        clearAuth: clearAuthWithStorage,
    };
};

