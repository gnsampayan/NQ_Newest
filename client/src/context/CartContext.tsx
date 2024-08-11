import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItemType } from './Types';
import apiConfig from '../api-config';

interface CartContextType {
    cartItems: CartItemType[];
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

    const fetchCartItems = useCallback(async () => {
        try {
            const response = await fetch(`${apiConfig.API_URL}/carts`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (data.cart.length === 0 || data.itemIdsArray.length === 0) {
                    setCartItems([]);
                    return;
                }

                const itemCounts: { [key: number]: number } = {};
                data.itemIdsArray.forEach((itemId: number) => {
                    itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
                });

                const uniqueItems: CartItemType[] = data.cart.map((item: CartItemType) => ({
                    ...item,
                    buyQuantity: itemCounts[item.id],
                }));

                await fetchItemImages(uniqueItems);
            } else {
                console.error('Failed to fetch cart data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }, []); // Use useCallback to memoize fetchCartItems

    const fetchItemImages = useCallback(async (items: CartItemType[]) => {
        try {
            const itemIds = items.map(item => item.id);
            const response = await fetch(`${apiConfig.API_URL}/items/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    }, []); // Use useCallback to memoize fetchItemImages

    const updateCartItemQuantity = useCallback(async (id: number, newBuyQuantity: number) => {
        try {
            const response = await fetch(`${apiConfig.API_URL}/carts`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                const currentQuantity = data.itemIdsArray.filter((itemId: number) => itemId === id).length;
                const difference = newBuyQuantity - currentQuantity;
    
                if (difference > 0) {
                    // Add items
                    const itemsToAdd = Array(difference).fill({ id });
                    const addResponse = await fetch(`${apiConfig.API_URL}/carts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ items: itemsToAdd })
                    });
    
                    if (!addResponse.ok) {
                        console.error('Failed to add items to the cart');
                    }
                } else if (difference < 0) {
                    // Remove items
                    for (let i = 0; i < -difference; i++) {
                        const deleteResponse = await fetch(`${apiConfig.API_URL}/carts/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });
    
                        if (!deleteResponse.ok) {
                            console.error('Failed to remove items from the cart');
                            break;
                        }
                    }
                }
    
                // Update local state after successful update on the server
                setCartItems(prevItems => 
                    prevItems.map(item => 
                        item.id === id ? { ...item, buyQuantity: newBuyQuantity } : item
                    )
                );
            } else {
                console.error('Failed to fetch cart data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }, [cartItems]);
    
    

    const deleteCartItem = useCallback(async (id: number) => {
        try {
            const response = await fetch(`${apiConfig.API_URL}/carts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            } else {
                console.error('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    }, []);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items initially once
    }, [fetchCartItems]);

    return (
        <CartContext.Provider value={{ cartItems, fetchCartItems, updateCartItemQuantity, deleteCartItem }}>
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
