import { useEffect, useState } from "react";
import styled from "styled-components";

// Temp, delete later and replace with DB images
import Hammer from "../assets/items/hammer.png";
import HandSaw from "../assets/items/hand_saw.png";
import CircularSawBlade from "../assets/items/saw-blade.png";

const Frame = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 20px;
`
const Item = styled.div`
    height: 100px;
    color: white;
    border: 2px solid white;
`

interface CartItem {
    id: number;
    description: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    totalInStock: number;
}

const CheckOut = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return (
    <>
        <Frame>
            {cartItems.map((item, index) => (
                <Item>
                    <div>{index}</div>
                    <div>{item.title}</div>
                </Item>
            ))}
        </Frame>
    </>
  )
}

export default CheckOut