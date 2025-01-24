import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createHttpClient } from "@/features/api/httpClient";

interface WishlistItem {
    id: string;
    name: string;
}

interface WishlistStore {
    wishlist: WishlistItem[];
    fetchWishlist: (userId: string) => Promise<void>;
    addItem: (userId: string, item: WishlistItem) => Promise<void>;
    removeItem: (userId: string, itemId: string) => Promise<void>;
    error: string | null;
    loading: boolean;
}

const httpClient = createHttpClient('/api');

export const useWishlistStore = create(
    persist<WishlistStore>(
        (set) => ({
            wishlist: [],
            error: null,
            loading: false,

            fetchWishlist: async (userId: string) => {
                set({ loading: true, error: null });
                try {
                    const data = await httpClient.get<WishlistItem[]>(`/wishlist?userId=${userId}`);
                    set({ wishlist: data, loading: false });
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            addItem: async (userId: string, item: WishlistItem) => {
                set({ error: null });
                try {
                    const newItem = await httpClient.post<WishlistItem>(`/wishlist`, { userId, item });
                    set((state) => ({
                        wishlist: [...state.wishlist, newItem],
                    }));
                } catch (error) {
                    set({ error: (error as Error).message });
                }
            },

            removeItem: async (userId: string, itemId: string) => {
                set({ error: null });
                try {
                    await httpClient.delete(`/wishlist/${itemId}?userId=${userId}`);
                    set((state) => ({
                        wishlist: state.wishlist.filter((item) => item.id !== itemId),
                    }));
                } catch (error) {
                    set({ error: (error as Error).message });
                }
            },
        }),
        { name: 'wishlist-storage' }
    )
);
