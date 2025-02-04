import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userId: string | null;
  token: string | null;
  setUserId: (id: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userId: null,
      token: null,

      setUserId: (id: string) => {
        set({ userId: id });
      },

      clearAuth: () => {
        set({ userId: null, token: null });
      },
    }),
    { name: "auth-store" },
  ),
);
