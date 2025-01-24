import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import queryString from 'query-string';
import { createHttpClient } from "@/features/api/httpClient";

const httpClient = createHttpClient('/api');

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

export const useWishlistStore = create(
    persist<WishlistStore>(
        (set) => ({
            wishlist: [],
            error: null,
            loading: false,

            fetchWishlist: async (userId: string) => {
                set({ loading: true, error: null });
                try {
                    const query = queryString.stringify({ userId });
                    const url = `/wishlist?${query}`;
                    const data = await httpClient.get<WishlistItem[]>(url);
                    set({ wishlist: data, loading: false });
                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            addItem: async (userId: string, item: WishlistItem) => {
                set({ error: null });
                try {
                    const url = `/wishlist`;
                    const newItem = await httpClient.post<WishlistItem>(url, { userId, item });
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
                    const query = queryString.stringify({ userId });
                    const url = `/wishlist/${itemId}?${query}`;
                    await httpClient.delete(url);
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
