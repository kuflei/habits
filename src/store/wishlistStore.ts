import { create } from 'zustand';
import {fetchData, addData, deleteData} from "../features/api/apiRequests";
import {persist} from "zustand/middleware";

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
                const url = `/api/wishlist?userId=${userId}`;
                await fetchData(url, set, {
                    onSuccess: (data) => set({ wishlist: data, loading: false }),
                    onError: (error) => console.error('Error fetching wishlist:', error),
                });
            },

            addItem: async (userId: string, item: WishlistItem) => {
                const url = '/api/wishlist';
                const payload = { userId, item };

                await addData(url, payload, set, {
                    onSuccess: (newItem) =>
                        set((state) => ({
                            wishlist: [...state.wishlist, newItem],
                        })),
                    onError: (error) => set({ error }),
                });
            },
            removeItem: async (userId: string, itemId: string) => {
                const url = `/api/wishlist/${itemId}?userId=${userId}`;

                await deleteData(url, set, {
                    filterState: (state) => ({
                        ...state,
                        wishlist: state.wishlist.filter((item) => item.id !== itemId),
                    }),
                    onError: (error) => set({ error }),
                });
            },

        }),
        { name: 'wishlist-storage' }
    )
);
