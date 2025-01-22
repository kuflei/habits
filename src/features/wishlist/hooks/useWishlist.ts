import { useEffect, useState } from 'react';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../api/wishlistApi';
import { useAuthStore } from '@/store/authStore';
import { WishlistItem } from '@/types/WishlistItem';

export const useWishlist = () => {
    const userId = useAuthStore((state) => state.userId);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadWishList  = async () => {
            try {
                setLoading(true);
                const data = await fetchWishlist();
                setWishlist(data);
                setError(null);
            } catch (err){
                setError((err as Error).message)
            } finally {
                setLoading(false);
            }
        };
        /*TODO: removed userId*/
        if (userId) {
            loadWishList();
        }

    }, [userId]);

    const addItem = async (item: WishlistItem) => {
        try {
            const newItem = await addToWishlist(item);
            setWishlist((prev) => [...prev, newItem]);
            setError(null);
        } catch (err) {
            setError((err as Error).message)
        }

    }
    const removeItem = async (itemId: string) => {
        try {
            await removeFromWishlist(itemId);
            setWishlist((prev) => prev.filter((item) => item.id !== itemId));
            setError(null);
        } catch (err) {
            setError((err as Error).message)
        }
    }

    return { wishlist, loading, error, addItem, removeItem };
};

