import { create } from 'zustand';

interface AuthState {
    userId: string | null;
    token: string | null;
    setUserId: (id: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userId: localStorage.getItem('userId'),
    token: null,
    setUserId: (id) => {
        localStorage.setItem('userId', id);
        set({ userId: id });
    },
    clearAuth: () => {
        localStorage.removeItem('userId');
        set({ userId: null, token: null });
    },
}));
