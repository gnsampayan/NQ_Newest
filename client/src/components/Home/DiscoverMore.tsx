import styled from "styled-components"
import { BsEye } from "react-icons/bs";
import ShopItem from "../Shop/shop-items/ShopItem";
import { useEffect, useState } from "react";
import config from "../../config";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 1050px;
    height: 620px;
    flex-shrink: 0;
    overflow: hidden;
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
const SeeAllButton = styled.button`
	display: flex;
    height: 60px;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    border-radius: 20px;
    border: 2px solid #A259FF;

    color: #FFF;
    text-align: center;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */

    background-color: none;
    background: none;
`;
const EyeIcon = styled(BsEye)`
	all: unset;
	fill: #A259FF;
	margin-right: 10px;
	width: 18px;
`;
const ItemCardsRow = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 30px;
`
interface Item {
	title: string;
	image: string;
	price: string;
	tags: string[];
	description: string;
}
const DiscoverMore = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${config.API_URL}/items`);
                const data = await response.json();
                const itemsWithTags = data.map((item: Item) => ({
                    ...item,
                    tags: item.tags || [], // Initialize tags as an empty array if null/undefined
                }));
                console.log('Fetched items:', itemsWithTags); // Log the items to see the structure
                setItems(itemsWithTags);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    return (
        <Container>
            <SectionHeadlineAndButton>
                <SectionHeadline>
                    <H3>Discover More Items</H3>
                    <P>Explore New and Trending Items</P>
                </SectionHeadline>
                <SeeAllButton>
                    <EyeIcon />
                    See All
                </SeeAllButton>
            </SectionHeadlineAndButton>
            <ItemCardsRow>
                {items.map((item, index) => (
                    <ShopItem 
                        key={index}
                        itemImage={`data:image/jpeg;base64,${item.image}`}
                        itemName={item.title} 
                        itemDescription={item.description} 
                        price={item.price} 
                        itemOnClick={() => { navigate('/'); }} 
                        boxSize="large" 
                        cartVis={false}
                    />
                ))}
            </ItemCardsRow>
        </Container>
    );
};

export default DiscoverMore;