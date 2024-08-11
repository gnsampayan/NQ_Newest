import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItemType } from './Types';

interface CartContextType {
    cartItems: CartItemType[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
    updateCartItemQuantity: (id: number, buyQuantity: number) => void;
    deleteCartItem: (id: number) => void;
}

interface CartProviderProps {
    children: ReactNode; // This defines that CartProvider expects a children prop
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    const updateCartItemQuantity = (id: number, buyQuantity: number) => {
        setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, buyQuantity } : item));
    };

    const deleteCartItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, updateCartItemQuantity, deleteCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
