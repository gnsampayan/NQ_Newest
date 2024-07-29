import styled from "styled-components"
import { BsEye } from "react-icons/bs";
import ItemCard from "../Cards/ItemCard";
import { useEffect, useState } from "react";
import config from "../../config";

const Container = styled.div`
    width: 1050px;
    height: auto;
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
const EyeIcon = styled(BsEye)`
    all: unset;
    fill: #A259FF;
    margin-right: 10px;
    width: 18px;
`;
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

    &:hover {
        background: #A259FF;

        ${EyeIcon} {
            fill: #FFF;
        }
    }
`;
const ItemCardsRow = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 30px;
    height: auto;
`
const NoItems = styled.div`
  font-size: 18px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

interface Item {
    id: number;
    image: string;
    title: string;
    price: number;
    rating: number;
    tags: string[];
}


const shuffleArray = (array: Item[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const DiscoverMore = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${config.API_URL}/items`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    let trendingItems = items.filter(i => i.tags.includes("Trending"));
    trendingItems = shuffleArray(trendingItems).slice(0, 3);

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
            {trendingItems && trendingItems.length > 0 ? (
                trendingItems.map(i => (
                <ItemCard
                    key={i.id}
                    image={`data:image/jpeg;base64,${i.image}`}
                    itemName={i.title}
                    addToCart={() => { }} // add addToCart funtion here
                    price={i.price}
                    rating={i.rating}
                />
                ))
            ) : (
                <NoItems>No items</NoItems>
            )}
            </ItemCardsRow>
        </Container>
    );
};

export default DiscoverMore;