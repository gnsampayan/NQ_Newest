import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { BsTrash3 } from "react-icons/bs";
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router';
import { CartItemType, ItemType } from '../../../context/Types';
import AddToCartConfirmation from '../../Widgets/Elements/AddToCartConfirmation';

const ItemsList = styled.div<{ maxHeight: string }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    max-height: ${(props) => props.maxHeight};
    overflow-y: auto;
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
    cursor: pointer;
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
    maxHeight: string;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ maxHeight }) => {
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
    const { cartItems, fetchCartItems, updateCartItemQuantity, deleteCartItem } = useCart();
    const navigate = useNavigate();
    const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items initially when component mounts
    }, [fetchCartItems]);

    useEffect(() => {
        // Ensure cartItems is an array and contains valid items
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            const initialValues = cartItems.reduce((acc, item) => {
                if (item && item.id !== undefined && item.buyQuantity !== undefined) {
                    acc[item.id] = item.buyQuantity.toString();
                }
                return acc;
            }, {} as { [key: number]: string });
            setInputValues(initialValues);
        }
    }, [cartItems]);

    const handleQuantityChange = (id: number, value: string) => {
        setInputValues(prev => ({ ...prev, [id]: value }));

        const newQuantity = parseInt(value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            updateCartItemQuantity(id, newQuantity);
        }
    };

    const handleOnClick = (item: CartItemType) => {
        navigate(`/item/${encodeURIComponent(item.title)}`, {
            state: {
                image: item.image,
                itemName: item.title,
                price: item.price,
                rating: 4.5, // replace with the actual rating if available
            },
        });
    }

    const handleDelete = (item: CartItemType) => {
        deleteCartItem(item.id);
        
        // Transform CartItemType to ItemType
        const itemForConfirmation: ItemType = {
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
            quantity: item.totalInStock,
            rating: 0,
            tags: [],
            saleBool: 0,
            saleRate: 0,
            saleEnd: ''
        };
        
        setIsDelete(true);
        setConfirmationItem(itemForConfirmation);
    };

    return (
        <>
            <ItemsList maxHeight={maxHeight}>
                {cartItems.map((item, index) => (
                    item && ( // Ensure item is defined before rendering
                    <ItemCard key={item.id}>
                        <Contents>
                            <ItemIndex>{index + 1}</ItemIndex>
                            <ItemImage src={`data:image/jpeg;base64,${item.image}`} alt={item.description} />
                            <ItemInfo onClick={() => handleOnClick(item)}>
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
                            <DeleteButton onClick={() => handleDelete(item)}><BsTrash3 /></DeleteButton>
                        </PriceAndDelete>
                    </ItemCard>
                    )
                ))}
            </ItemsList>
            {confirmationItem && (
                <AddToCartConfirmation 
                    item={confirmationItem} 
                    onClose={() => setConfirmationItem(null)} // Close the confirmation modal
                    delete={isDelete} // Pass the isDelete flag
                />
            )}
        </>
    );
}

export default CartItemsList;
