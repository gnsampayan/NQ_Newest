import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import Button from "./Buttons/Button";

import { useNavigate } from "react-router";
import apiConfig from "../api-config";

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

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const ItemCard = styled.div`
    display: flex;
    background: #2B2B2B;
    border-radius: 20px;
    height: 100px;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
`;

const ItemIndex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #444;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-family: "Work Sans";
    font-size: 14px;
    font-weight: 600;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 160px;
`;

const ItemName = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
    flex: 1;
    text-align: left;
`;

const ItemDescription = styled(ItemName)`
    font-size: 12px;
`;

const ItemPrice = styled(ItemName)`
    margin-left: 20px;
`;

const ItemImage = styled.img`
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #d9d9d9;
`;

const DeleteButton = styled.button`
    all: unset;
    color: white;
    padding: 10px;
    background: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #a259ff;
    &:hover {
        background: #a259ff;
    }
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const PriceAndDelete = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
`;

const ItemQuantity = styled.input`
    width: 50px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #ccc;
    text-align: center;
`;

interface Props {
    isVisible: boolean;
    toggleCartVis: () => void;
    cartBtnRef: React.RefObject<HTMLDivElement>;
}

interface CartItem {
    id: number;
    description: string;
    image: string;
    title: string;
    price: number;
    buyQuantity: number;
    totalInStock: number;
}

const CartItemsList = ({ cartItems, onDelete, onQuantityChange }: { cartItems: CartItem[], onDelete: (id: number) => void, onQuantityChange: (id: number, buyQuantity: number) => void }) => {
    return (
        <ItemsList>
            {cartItems.map((item, index) => (
                <ItemCard key={item.id}>
                    <Contents>
                        <ItemIndex>{index + 1}</ItemIndex>
                        <ItemImage src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
                        <ItemInfo>
                            <ItemName>{item.title}</ItemName>
                            <ItemDescription>{item.description}</ItemDescription>
                        </ItemInfo>
                    </Contents>
                    <PriceAndDelete>
                        <ItemPrice>${(Math.round(item.price * item.buyQuantity * 100) / 100).toFixed(2)}</ItemPrice>
                        <ItemQuantity
                            type="number"
                            value={item.buyQuantity} // connect to DB later
                            min="1"
                            max={item.totalInStock}
                            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                        />
                        <DeleteButton onClick={() => onDelete(item.id)}><BsTrash3 /></DeleteButton>
                    </PriceAndDelete>
                </ItemCard>
            ))}
        </ItemsList>
    );
};

const ShoppingCart = ({ isVisible, toggleCartVis, cartBtnRef }: Props) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
                    const uniqueItems: CartItem[] = data.cart.map((item : CartItem) => ({
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

    const goToCheckout = (items: CartItem[]) => {
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