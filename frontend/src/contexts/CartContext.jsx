import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
  const getCartKey = (u) => u ? `mini_amazon_cart_${u.email}` : 'mini_amazon_cart_guest';

  // Load cart on mount and when auth changes
  useEffect(() => {
    const loadCart = () => {
      const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
      const key = getCartKey(currentUser);
      const savedCart = localStorage.getItem(key);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to load cart', e);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    loadCart();

    const handleAuthChange = () => loadCart();
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
    const key = getCartKey(currentUser);
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => String(item.id) === String(product.id));
      if (existingItem) {
        return prevCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const normalizedId = String(productId);
    setCart((prevCart) => prevCart.filter((item) => String(item.id) !== normalizedId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const normalizedId = String(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id) === normalizedId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

