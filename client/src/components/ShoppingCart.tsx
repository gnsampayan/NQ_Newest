import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import Button from "./Buttons/Button";

import { useNavigate } from "react-router";

// Temp, delete later and replace with DB images
import Hammer from "../assets/items/hammer.png";
import HandSaw from "../assets/items/hand_saw.png";
import CircularSawBlade from "../assets/items/saw-blade.png";


const Cart = styled.div<{ isVisible: boolean }>`
    width: 600px;
    position: absolute;
    border-radius: 20px;
    top: 100px;
    right: 0;
    background: #858584;
    z-index: 999;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    flex-direction: column;
    padding: 20px;
    gap: 10px;

    user-select: none; /* Standard syntax */
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For IE and Edge */
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
    quantity: number;
    totalInStock: number;
}

const CartItemsList = ({ cartItems, onDelete, onQuantityChange }: { cartItems: CartItem[], onDelete: (id: number) => void, onQuantityChange: (id: number, quantity: number) => void }) => {
    return (
        <ItemsList>
            {cartItems.map((item, index) => (
                <ItemCard key={item.id}>
                    <Contents>
                        <ItemIndex>{index + 1}</ItemIndex>
                        <ItemImage src={item.image} alt={item.description} />
                        <ItemInfo>
                            <ItemName>{item.title}</ItemName>
                            <ItemDescription>{item.description}</ItemDescription>
                        </ItemInfo>
                    </Contents>
                    <PriceAndDelete>
                        {/* Used to prevent weird floating-point arithmetic precision behavior in JavaScript */}
                        <ItemPrice>${(Math.round(item.price * item.quantity * 100) / 100).toFixed(2)}</ItemPrice>
                        <ItemQuantity
                            type="number"
                            value={item.quantity}
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
        // Temporary data
        const data = [
            { id: 1, description: "High-quality hammer", image: Hammer, title: "Hammer", price: 20.01, quantity: 1, totalInStock: 25 },
            { id: 2, description: "Durable hand saw", image: HandSaw, title: "Hand Held Saw", price: 9.00, quantity: 1, totalInStock: 5 },
            { id: 3, description: "Sharp circular saw blade", image: CircularSawBlade, title: "Circular Saw Blade", price: 120.00, quantity: 1, totalInStock: 42 },
        ];
        setCartItems(data);
        // Uncomment the below code when using real API
        // const fetchDeliveries = async () => {
        //     const response = await fetch("/api/deliveries");
        //     const data = await response.json();
        //     setDeliveries(data);
        // };
        // fetchDeliveries();
    }, []);

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

    const handleDelete = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const goToCheckout = (items: CartItem[]) => {
        console.log('going to checkout with items:', items);
        navigate(`/check-out`);
        toggleCartVis();
    };

    return (
        <>
            <Cart ref={cartRef} isVisible={isVisible}>
                <CartItemsList cartItems={cartItems} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
                <Button
                    title={"Go to Checkout"}
                    onClick={() => goToCheckout(cartItems)}
                    bgColor={"linear-gradient(101deg, #A259FF 13.57%, #FF6250 97.65%)"}
                    fillColor="white"
                    bgHoverColor={"white"}
                    fillHoverColor={"#A259FF"}
                    textHoverColor={"#A259FF"}
                />
            </Cart>
        </>
    );
};

export default ShoppingCart;
