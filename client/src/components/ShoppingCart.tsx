import styled from "styled-components";
import { useEffect, useRef } from "react";
import Button from "./Buttons/Button";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
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
    max-height: 100vh;
    overflow: hidden;
`;

interface Props {
    isVisible: boolean;
    toggleCartVis: () => void;
    cartBtnRef: React.RefObject<HTMLDivElement>;
}

const ShoppingCart = ({ isVisible, toggleCartVis, cartBtnRef }: Props) => {
    const { cartItems, fetchCartItems, updateCartItemQuantity, deleteCartItem } = useCart();
    const navigate = useNavigate();
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            fetchCartItems();
        }
    }, [isVisible, fetchCartItems]);

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

    const goToCheckout = () => {
        navigate(`/check-out`);
        toggleCartVis();
    };

    return (
        <>
            {isVisible && (
                <Cart ref={cartRef}>
                    <CartItemsList cartItems={cartItems} onDelete={deleteCartItem} onQuantityChange={updateCartItemQuantity} maxHeight={"calc(100vh - 200px)"} />
                    <Button
                        title={"Go to Checkout"}
                        onClick={goToCheckout}
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
