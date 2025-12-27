import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export function useWishlist() {
    return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
    const getWishlistKey = (u) => u ? `mini_amazon_wishlist_${u.email}` : 'mini_amazon_wishlist_guest';

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const loadWishlist = () => {
            const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
            const key = getWishlistKey(currentUser);
            try {
                const saved = localStorage.getItem(key);
                setWishlistItems(saved ? JSON.parse(saved) : []);
            } catch (e) {
                console.error("Failed to load wishlist", e);
                setWishlistItems([]);
            }
        };

        loadWishlist();
        window.addEventListener('auth-change', loadWishlist);
        return () => window.removeEventListener('auth-change', loadWishlist);
    }, []);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
        const key = getWishlistKey(currentUser);
        try {
            localStorage.setItem(key, JSON.stringify(wishlistItems));
        } catch (e) {
            console.error("Failed to save wishlist", e);
        }
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prev) => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}
