import styled from "styled-components";
import { useCart } from "../context/CartContext";
import CartItemsList from "../components/Groupings/Templates/CartItemsList";

const Frame = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
`;

const CheckOut = () => {
    const { cartItems, updateCartItemQuantity, deleteCartItem } = useCart();

    return (
        <Frame>
            <CartItemsList cartItems={cartItems} onDelete={deleteCartItem} onQuantityChange={updateCartItemQuantity} maxHeight={"auto"} />
        </Frame>
    );
};

export default CheckOut;
