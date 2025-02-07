import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createHttpClient } from "@/api/httpClient";
import { storageFactory } from "@/utils/storageFactory";

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
const localStorageAPI = storageFactory(localStorage);

export const useWishlistStore = create(
  persist<WishlistStore>(
    (set) => ({
      wishlist: [],
      userId: null,
      error: null,
      loading: false,

      fetchWishlist: async (userId: string) => {
        set({ loading: true, error: null });

        try {
          const wishlist = await httpClient.get<WishlistItem[]>(`/wishlist`, {
            userId,
          });

          set({ wishlist, userId, loading: false });
          localStorageAPI.setItem(`wishlist-${userId}`, wishlist);
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      addItem: async (userId: string, item: WishlistItem) => {
        set({ error: null });

        try {
          const newItem = await httpClient.post<WishlistItem>(`/wishlist`, {
            userId,
            item,
          });

          set((state) => {
            const updatedWishlist = [...state.wishlist, newItem];

            localStorageAPI.setItem(`wishlist-${userId}`, updatedWishlist);

            return { wishlist: updatedWishlist };
          });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      removeItem: async (userId: string, itemId: string) => {
        set({ error: null });

        try {
          await httpClient.delete(`/wishlist/${itemId}`, { userId });

          set((state) => {
            const updatedWishlist = state.wishlist.filter(
              (item) => item.id !== itemId,
            );

            localStorageAPI.setItem(`wishlist-${userId}`, updatedWishlist);

            return { wishlist: updatedWishlist };
          });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
