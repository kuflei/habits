import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import queryString from "query-string";
import { createHttpClient } from "@/features/api/httpClient";

const httpClient = createHttpClient("/api");

interface WishlistItem {
    id: string;
    name: string;
}

interface WishlistStore {
    wishlist: WishlistItem[];
    userId: string | null;
    fetchWishlist: (userId: string) => Promise<void>;
    addItem: (userId: string, item: WishlistItem) => Promise<void>;
    removeItem: (userId: string, itemId: string) => Promise<void>;
    error: string | null;
    loading: boolean;
}

export const useWishlistStore = create(
    persist<WishlistStore>(
        (set, get) => ({
            wishlist: [],
            userId: null,
            error: null,
            loading: false,

            fetchWishlist: async (userId: string) => {
                set({ loading: true, error: null });

                try {
                    const query = queryString.stringify({ userId });
                    const url = `/wishlist?${query}`;
                    const serverWishlist = await httpClient.get<WishlistItem[]>(url);

                    // 🛠 Отримуємо wishlist з `localStorage`
                    const localWishlist = JSON.parse(localStorage.getItem(`wishlist-${userId}`) || "[]");

                    // 🛠 Об'єднуємо `serverWishlist` + `localWishlist` без дублікатів
                    const mergedWishlist = [
                        ...serverWishlist,
                        ...localWishlist.filter((localItem: WishlistItem) =>
                            !serverWishlist.some((serverItem) => serverItem.id === localItem.id)
                        ),
                    ];

                    // 🛠 Зберігаємо оновлений список у Zustand і `localStorage`
                    set({ wishlist: mergedWishlist, userId, loading: false });
                    localStorage.setItem(`wishlist-${userId}`, JSON.stringify(mergedWishlist));

                } catch (error) {
                    set({ error: (error as Error).message, loading: false });
                }
            },

            addItem: async (userId: string, item: WishlistItem) => {
                set({ error: null });

                try {
                    const url = `/wishlist`;
                    const newItem = await httpClient.post<WishlistItem>(url, { userId, item });

                    set((state) => {
                        const updatedWishlist = [...state.wishlist, newItem];

                        // 🛠 Оновлюємо `localStorage`
                        localStorage.setItem(`wishlist-${userId}`, JSON.stringify(updatedWishlist));

                        return { wishlist: updatedWishlist };
                    });

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

                    set((state) => {
                        const updatedWishlist = state.wishlist.filter((item) => item.id !== itemId);

                        localStorage.setItem(`wishlist-${userId}`, JSON.stringify(updatedWishlist));

                        return { wishlist: updatedWishlist };
                    });

                } catch (error) {
                    set({ error: (error as Error).message });
                }
            },
        }),
        {
            name: "wishlist-storage",
        }
    )
);
