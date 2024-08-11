import { useEffect, useState } from "react";
import styled from "styled-components";
import apiConfig from "../api-config";
import CartItemsList from "../components/Groupings/Templates/CartItemsList";
import { CartItemType } from "../context/Types";

const Frame = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 20px;
`

const CheckOut = () => {
    
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${apiConfig.API_URL}/carts`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Raw cart data:', data.cart);
                    console.log('Raw itemIdsArray:', data.itemIdsArray);
    
                    if (data.cart.length === 0 || data.itemIdsArray.length === 0) {
                        setCartItems([]);
                        return;
                    }
    
                    // Count occurrences of each item ID in `itemIdsArray`
                    const itemCounts: { [key: number]: number } = {};
                    data.itemIdsArray.forEach((itemId: number) => {
                        itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
                    });
    
                    console.log('Item counts:', itemCounts);
    
                    // Create unique CartItems with correct `buyQuantity`
                    const uniqueItems: CartItemType[] = data.cart.map((item : CartItemType) => ({
                        ...item,
                        buyQuantity: itemCounts[item.id],
                    }));
    
                    console.log('Final unique items with buyQuantity:', uniqueItems);
    
                    setCartItems(uniqueItems);
                } else {
                    console.error('Failed to fetch cart data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCart();
    }, []);

    // New useEffect to fetch images based on item IDs
    useEffect(() => {
        const fetchItemImages = async () => {
            try {
                const itemIds = cartItems.map(item => item.id);
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
                    setCartItems(prevItems =>
                        prevItems.map(item => ({
                            ...item,
                            image: images[item.id] || item.image  // Update image if found
                        }))
                    );
                } else {
                    console.error('Failed to fetch item images');
                }
            } catch (error) {
                console.error('Error fetching item images:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchItemImages();
        }
    }, [cartItems]);
    const handleQuantityChange = (id: number, buyQuantity: number) => {
        setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, buyQuantity } : item));
    };
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${apiConfig.API_URL}/carts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            } else {
                console.error('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

  return (
    <>
        <Frame>
            <CartItemsList cartItems={cartItems} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
        </Frame>
    </>
  )
}

export default CheckOut