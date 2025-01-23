import { useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';

export const useWishlist = () => {
    const userId = useAuthStore((state) => state.userId);
    const { wishlist, fetchWishlist, addItem, removeItem, loading, error } = useWishlistStore();

    useEffect(() => {
        if (userId) {
            fetchWishlist(userId);
        }
    }, [fetchWishlist, userId]);

    return {
        wishlist,
        loading,
        error,
        addItem: (item) => addItem(userId, item),
        removeItem: (itemId) => removeItem(userId, itemId),
    };
};
