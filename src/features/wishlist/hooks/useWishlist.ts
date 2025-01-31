import { useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';

export const useWishlist = () => {
    const userId = useAuthStore((state) => state.userId);
    const { wishlist, fetchWishlist, addItem, removeItem, loading, error } = useWishlistStore();
    const setWishlist = useWishlistStore.setState;

    useEffect(() => {
        if (!userId) {
            console.error("No userId provided");
            return;
        }

        const storedsetWishlist = JSON.parse(localStorage.getItem(`wishlist-${userId}`) || "[]");

        if (storedsetWishlist.length > 0) {
            setWishlist({ habits: storedsetWishlist });
        } else {
            fetchWishlist(userId);
        }
    }, [userId, fetchWishlist]);

    return {
        wishlist,
        loading,
        error,
        addItem: (item) => addItem(userId, item),
        removeItem: (itemId) => removeItem(userId, itemId),
    };
};
