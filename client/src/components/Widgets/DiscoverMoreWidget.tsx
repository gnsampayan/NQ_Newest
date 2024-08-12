import styled from "styled-components"
import { BsEye } from "react-icons/bs";
import ItemCard from "../Cards/ItemCard";
import { useEffect, useState } from "react";
import apiConfig from "../../api-config";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router";
import { ItemType } from "../../context/Types";
import AddToCartConfirmation from "./Modals/AddToCartConfirmation";
import { addItemToCart } from "../utilityFunctions";

const Container = styled.div`
    width: 1050px;
    height: auto;
    flex-shrink: 0;
`
const SectionHeadlineAndButton = styled.div`
    display: inline-flex;
    align-items: flex-end;
    gap: 100px;
    width: 100%;
    margin-bottom: 50px;
`
const SectionHeadline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
`
const H3 = styled.h3`
    align-self: stretch;
    color: white;
    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;
    color: white;
    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const ItemCardsRow = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: nowrap;
    gap: 30px;
    height: auto;
`
const NoItems = styled.div`
  font-size: 18px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const DiscoverMore = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${apiConfig.API_URL}/items`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    
    const shuffleArray = (array: ItemType[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const trendingItems = items.filter(i => i.tags.includes("Trending"));
    const curatedItems = shuffleArray(trendingItems).slice(0, 3);
    if (curatedItems.length < 3) {
        return <p>Not enough items in this section</p>;
    }
    const heading: string = "Discover More Items";
    const subhead: string = "Explore New and Trending Items";
	const handleSeeAll = (trendingItems: ItemType[]) => {
        navigate('/trending', { state: { relevantItems: trendingItems, heading, subhead } });
    };

    const handleAddToCartClick = async (newItem: ItemType) => {
        await addItemToCart(newItem, setConfirmationItem);
    };

    return (
        <Container>
            <SectionHeadlineAndButton>
                <SectionHeadline>
                    <H3>{heading}</H3>
                    <P>{subhead}</P>
                </SectionHeadline>
                <Button asset={BsEye} title={"See All"} onClick={() => handleSeeAll(trendingItems)} />
            </SectionHeadlineAndButton>
            <ItemCardsRow>
            {curatedItems && curatedItems.length > 0 ? (
                curatedItems.map(i => (
                <ItemCard
                    key={i.id}
                    image={i.image}
                    itemName={i.title}
                    addToCart={() => handleAddToCartClick(i)} // add addToCart funtion here
                    price={i.price}
                    rating={i.rating} 
                    boxSize={"large"}
                    />
                ))
            ) : (
                <NoItems>No items</NoItems>
            )}
            </ItemCardsRow>
            {confirmationItem && (
                <AddToCartConfirmation 
                    item={confirmationItem} 
                    onClose={() => setConfirmationItem(null)} // Close the confirmation modal
                />
            )}
        </Container>
    );
};

export default DiscoverMore;