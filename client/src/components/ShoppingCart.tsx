import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Button from "./Buttons/Button";

import { useNavigate } from "react-router";
import apiConfig from "../api-config";
import { CartItemType } from "../context/Types";
import CartItemsList from "./Groupings/Templates/CartItemsList";

const Cart = styled.div`
    width: 600px;
    position: fixed;
    border-radius: 20px;
    top: 100px;
    right: 0;
    background: #858584;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
`;

interface Props {
    isVisible: boolean;
    toggleCartVis: () => void;
    cartBtnRef: React.RefObject<HTMLDivElement>;
}

const ShoppingCart = ({ isVisible, toggleCartVis, cartBtnRef }: Props) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const navigate = useNavigate();
    const cartRef = useRef<HTMLDivElement>(null); // Reference to the cart div

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
    
        if (isVisible) {
            fetchCart();
        }
    }, [isVisible]);

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
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cartRef.current &&
                !cartRef.current.contains(event.target as Node) &&
                cartBtnRef.current &&
                !cartBtnRef.current.contains(event.target as Node)
            ) {
                toggleCartVis(); // Hide the cart when clicking outside
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, toggleCartVis, cartBtnRef]);

    const handleQuantityChange = (id: number, buyQuantity: number) => {
        setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, buyQuantity } : item));
    };

    const goToCheckout = (items: CartItemType[]) => {
        console.log('going to checkout with items:', items);
        navigate(`/check-out`);
        toggleCartVis();
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
            {isVisible && (
                <Cart ref={cartRef}>
                    <CartItemsList cartItems={cartItems} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
                    <Button
                        title={"Go to Checkout"}
                        onClick={() => goToCheckout(cartItems)}
                        bgColor={"white"}
                        fillColor={"#A259FF"}
                        bgHoverColor={"#A259FF"}
                        fillHoverColor={"white"}
                        textHoverColor={"white"}
                        textColor={"#A259FF"}
                    />
                </Cart>
            )}
        </>
    );
};

export default ShoppingCart;