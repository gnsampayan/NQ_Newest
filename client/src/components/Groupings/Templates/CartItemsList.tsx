import styled from "styled-components";
import { BsTrash3 } from "react-icons/bs";
import { CartItemType } from "../../../context/Types";
import { useState } from "react";

const ItemsList = styled.div<{ maxHeight : string }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    max-height: ${(props) => props.maxHeight};
    overflow-y: scroll;
    overflow-x: hidden;
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

interface CartItemsListProps {
    cartItems: CartItemType[];
    onDelete: (id: number) => void;
    onQuantityChange: (id: number, newQuantity: number) => void;
    maxHeight: string;
}

const CartItemsList = ({ cartItems, onDelete, onQuantityChange, maxHeight }: CartItemsListProps) => {
    // Define the type for inputValues
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
        cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.buyQuantity.toString() }), {})
    );

    const handleQuantityChange = (id: number, value: string) => {
        // Update local state with the new input value
        setInputValues(prev => ({ ...prev, [id]: value }));

        // If the value is a valid number and greater than 0, trigger the quantity change
        const newQuantity = parseInt(value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            onQuantityChange(id, newQuantity);
        }
    };
  return (
    <ItemsList maxHeight={maxHeight}>
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
                        value={inputValues[item.id] || ""}
                        placeholder="1"
                        min="1"
                        max={item.totalInStock}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                    <DeleteButton onClick={() => onDelete(item.id)}><BsTrash3 /></DeleteButton>
                </PriceAndDelete>
            </ItemCard>
        ))}
    </ItemsList>
  )
}

export default CartItemsList