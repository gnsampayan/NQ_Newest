import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItemType } from './Types';
import apiConfig from '../api-config';

interface CartContextType {
    cartItems: CartItemType[];
    cartCount: number;
    fetchCartItems: () => void;
    updateCartItemQuantity: (id: number, buyQuantity: number) => void;
    deleteCartItem: (id: number) => void;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

    const updateCartCount = (items: CartItemType[]) => {
        const count = items.reduce((total, item) => total + item.buyQuantity, 0);
        setCartCount(count);
    };

    const fetchCartItems = useCallback(async () => {
        const token = localStorage.getItem('token');

        if (token) {
            // Fetch items from the server for authenticated users
            try {
                const response = await fetch(`${apiConfig.API_URL}/carts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.cart.length === 0 || data.itemIdsArray.length === 0) {
                        setCartItems([]);
                        setCartCount(0);
                        return;
                    }

                    const itemCounts: { [key: number]: number } = {};
                    data.itemIdsArray.forEach((itemId: number) => {
                        itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
                    });
                    
                    // Map backend fields to frontend-friendly camelCase fields
                    const uniqueItems: CartItemType[] = data.cart.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: parseFloat(item.price), // Ensure price is a number
                        image: item.image,
                        totalInStock: item.totalInStock,
                        rating: parseFloat(item.rating), // Ensure rating is a number
                        saleBool: item.sale_bool, // Map sale_bool to saleBool
                        saleRate: parseFloat(item.sale_rate), // Ensure saleRate is a number
                        saleIsTimed: item.sale_timed, // Map sale_timed to saleIsTimed
                        saleEnd: item.sale_end,
                        tags: item.tags, // Assuming tags are stored correctly
                        buyQuantity: itemCounts[item.id],
                    }));
                    setCartItems(uniqueItems);
                    updateCartCount(uniqueItems);
                    await fetchItemImages(uniqueItems);
                } else {
                    console.error('Failed to fetch cart data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        } else {
            // Load guest cart from localStorage
            const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            // Calculate the total number of items (considering quantities)
            const totalItemCount = guestCart.reduce((total: number, item: CartItemType) => total + item.buyQuantity, 0);
        
            setCartItems(guestCart);
            setCartCount(totalItemCount);
        }
    }, []);

    const fetchItemImages = useCallback(async (items: CartItemType[]) => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const itemIds = items.map(item => item.id);
                const response = await fetch(`${apiConfig.API_URL}/items/images`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ itemIds })
                });

                if (response.ok) {
                    const images = await response.json();
                    const updatedItems = items.map(item => ({
                        ...item,
                        image: images[item.id] || item.image
                    }));
                    setCartItems(updatedItems);
                } else {
                    console.error('Failed to fetch item images');
                }
            } catch (error) {
                console.error('Error fetching item images:', error);
            }
        } else {
            // For guest users, image fetching could be handled differently or skipped if not available
            console.log("Guest users, fetching images can be handled differently.");
        }
    }, []);

    const updateCartItemQuantity = useCallback(async (id: number, newBuyQuantity: number) => {
        if (newBuyQuantity < 1) {
            console.error(`Invalid quantity ${newBuyQuantity} for item with id ${id}.`);
            return;
        }

        const token = localStorage.getItem('token');

        if (token) {
            // Update item quantity on the server for authenticated users
            try {
                const currentItem = cartItems.find(item => item.id === id);

                if (!currentItem) {
                    console.error(`Item with id ${id} not found in cart.`);
                    return;
                }

                const response = await fetch(`${apiConfig.API_URL}/carts`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: id,
                        newQuantity: newBuyQuantity,
                    }),
                });

                if (response.ok) {
                    setCartItems(prevItems => 
                        prevItems.map(item => 
                            item.id === id ? { ...item, buyQuantity: newBuyQuantity } : item
                        )
                    );
                    updateCartCount(cartItems);
                } else {
                    console.error('Failed to update item quantity in the cart:', response.status);
                }
            } catch (error) {
                console.error('Error updating item quantity in the cart:', error);
            }
        } else {
            // Update item quantity in localStorage for guest users
            const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const updatedCart = guestCart.map((item: CartItemType) => 
                item.id === id ? { ...item, buyQuantity: newBuyQuantity } : item
            );
            localStorage.setItem('guestCart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            updateCartCount(updatedCart);
        }
    }, [cartItems]);

    const deleteCartItem = useCallback(async (id: number) => {
        const token = localStorage.getItem('token');

        if (token) {
            // Delete item from the server for authenticated users
            try {
                const response = await fetch(`${apiConfig.API_URL}/carts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
                    updateCartCount(cartItems.filter(item => item.id !== id));
                } else {
                    console.error('Failed to delete item from cart');
                }
            } catch (error) {
                console.error('Error deleting item from cart:', error);
            }
        } else {
            // Delete item from localStorage for guest users
            const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const updatedCart = guestCart.filter((item: CartItemType) => item.id !== id);
            localStorage.setItem('guestCart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            updateCartCount(updatedCart);
        }
    }, [cartItems]);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items initially once
    }, [fetchCartItems]);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, fetchCartItems, updateCartItemQuantity, deleteCartItem }}>
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
