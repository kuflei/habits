import { getUserId } from '@/utils/getUserId';

export const fetchWishlist = async () => {
    const userId = getUserId();
    const storedWishList = localStorage.getItem(`wishlist_${userId}`);
    const localWishList = storedWishList ? JSON.parse(storedWishList) : [];
    const localArrayWishList = Array.isArray(localWishList) ? localWishList : [localWishList];

    const response = await fetch(`/api/wishlist?userId=${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
    }

    const apiWishList = await response.json();
    const apiArrayWishList = Array.isArray(apiWishList) ? apiWishList : [apiWishList];

    const mergedArraysWishList = [...localArrayWishList, ...apiArrayWishList];
    const uniqueWishList = mergedArraysWishList.reduce((acc, current) => {
        if (!acc.some(item => item.id === current.id)) {
            acc.push(current);
        }
        return acc;
    }, []);

    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(uniqueWishList));
    return uniqueWishList;
}

export const addToWishlist = async (item) => {
    const userId = getUserId();
    const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, item}),
    })
    if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
    }
    const updatedItem = await response.json();
    const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || `[]`);
    const updatedWishlist = Array.isArray(localWishlist) ? [...localWishlist, updatedItem] : [updatedItem];

    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
    return updatedItem;
}
export const removeFromWishlist = async (itemId) => {
    const userId = getUserId();
    const response = await fetch(`/api/wishlist/${itemId}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
    }
    const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || `[]`);
    const updatedWishlist = Array.isArray(localWishlist) ? localWishlist.filter((item) => {
        return item.id !== itemId
    }) : [];
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
    return { message: 'Item removed successfully' };
};