import { create } from 'zustand';

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

export const useWishlistStore = create<WishlistStore>((set) => ({
    wishlist: [],
    error: null,
    loading: false,

    fetchWishlist: async (userId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/wishlist?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const data = await response.json();
            set({ wishlist: data, loading: false });
        } catch (err) {
            set({ error: (err as Error).message, loading: false });
        }
    },

    addItem: async (userId: string, item: WishlistItem) => {
        set({ error: null });
        try {
            const response = await fetch(`/api/wishlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, item }),
            });
            if (!response.ok) {
                throw new Error('Failed to add item');
            }
            const newItem = await response.json();
            set((state) => ({
                wishlist: [...state.wishlist, newItem],
            }));
        } catch (err) {
            set({ error: (err as Error).message });
        }
    },

    removeItem: async (userId: string, itemId: string) => {
        set({ error: null });
        try {
            const response = await fetch(`/api/wishlist/${itemId}?userId=${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove item');
            }
            set((state) => ({
                wishlist: state.wishlist.filter((item) => item.id !== itemId),
            }));
        } catch (err) {
            set({ error: (err as Error).message });
        }
    },
}));
