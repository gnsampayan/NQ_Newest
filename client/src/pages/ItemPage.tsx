import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Button from "../components/Buttons/Button";
import { BsCartPlus } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { ItemType } from "../context/Types";
import apiConfig from "../api-config";
import { useEffect, useState } from "react";
import AddToCartConfirmation from "../components/Widgets/Modals/AddToCartConfirmation";
import { addItemToCart } from "../utils/utilityFunctions";

const Page = styled.div`
    color: white;

    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-direction: column;
`;
const Image = styled.div<{ image: string }>`
    width: 1280px;
    height: 560px;
    background: url(${props => props.image}) lightgray center / contain  no-repeat;
`
const Frame = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 50px;
`
const NameAndButton = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 100px;
`
const ItemInfo = styled.div`
    display: flex;
    width: 599px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`
const Name = styled.h2`
    width: 510px;

    color: var(--White, #FFF);

    /* H2 - Work Sans */
    font-family: "Work Sans";
    font-size: 51px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 56.1px */
    text-transform: capitalize;
`
const Status = styled.div`
    display: flex;
    width: 510px;
    align-items: flex-start;
    gap: 20px;
`
const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
`
const Number = styled.p`
    align-self: stretch;
    color: var(--White, #FFF);

    /* H4 - Space Mono */
    font-family: "Space Mono";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 39.2px */
    text-transform: capitalize;
`
const Label = styled.p`
    align-self: stretch;
    color: var(--White, #FFF);

    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 20px;
`
const ItemPage = () => {
    const location = useLocation();
    const { image, itemName, price, rating } = location.state as {
        image: string;
        itemName: string;
        price: number;
        rating: number;
    };
    const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);
    const [item, setItem] = useState<ItemType | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${apiConfig.API_URL}/items`);
                const data = await response.json();
                const foundItem = data.find((item: ItemType) => item.title.toLowerCase() === itemName.toLowerCase());
                setItem(foundItem || null);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [itemName]);

    const handleAddToCartClick = async (newItem: ItemType) => {
        await addItemToCart(newItem, setConfirmationItem);
    };

    if (!item) {
        return <p>Loading item details...</p>;
    }

    return (
        <Page>
            <Image image={`data:image/jpeg;base64,${image}`}></Image>
            <Frame>
                <NameAndButton>
                    <ItemInfo>
                        <Name>{itemName}</Name>
                        <Status>
                            <Stat>
                                <Number>250K+</Number>
                                <Label>Sold</Label>
                            </Stat>
                            <Stat>
                                <Number>250K+</Number>
                                <Label>In Stock</Label>
                            </Stat>
                            <Stat>
                                <Number>4.5</Number>
                                <Label>Rating</Label>
                            </Stat>
                        </Status>
                    </ItemInfo>
                    <Buttons>
                        {item && (
                            <Button 
                                asset={BsCartPlus} 
                                title={"Add to Cart"} 
                                onClick={() => handleAddToCartClick(item)} // add addToCart function here
                                bgColor="#A259FF"
                                bgHoverColor="white"
                                fillColor="white"
                                fillHoverColor="#A259FF"
                                borderHoverColor="white"
                                textHoverColor="#A259FF"
                            />
                        )}
                        <Button 
                            asset={FaRegHeart} 
                            title={"Save"} 
                            onClick={() => console.log('added to wishlist')}
                        />
                    </Buttons>
                </NameAndButton>
            </Frame>
            <h1>{itemName}</h1>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
            {/* Render other item details as needed */}
            {confirmationItem && (
                <AddToCartConfirmation 
                    item={confirmationItem} 
                    onClose={() => setConfirmationItem(null)} // Close the confirmation modal
                />
            )}
        </Page>
    );
};

export default ItemPage;
