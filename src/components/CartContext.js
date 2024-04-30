import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as persistAddToCart, updateCartItem as persistUpdateCartItem, removeCartItem as persistRemoveCartItem, clearCart as persistClearCart } from './cartUtils'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage on initial render
    useEffect(() => {
        setCart(getCart());
    }, []);

    // Adds an item to the cart or updates quantity if it already exists
    const addToCart = (item) => {
        persistAddToCart(item);
        setCart(getCart());
    };

    // Updates an item's quantity in the cart
    const updateCartItem = (item) => {
        persistUpdateCartItem(item);
        setCart(getCart());
    };

    // Removes an item from the cart
    const removeCartItem = (name, size) => {
        persistRemoveCartItem(name, size);
        setCart(getCart());
    };

    // Clears all items from the cart
    const clearCart = () => {
        persistClearCart();
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);