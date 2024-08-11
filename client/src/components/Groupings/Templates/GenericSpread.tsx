import styled from "styled-components";
import { useEffect, useState } from "react";
import { ItemType } from "../../../context/Types";
import apiConfig from "../../../api-config";
import ItemCard from "../../Cards/ItemCard";
import ButtonCounter from "../../Buttons/ButtonCounter";

const Spread = styled.div`
    width: 100%;
    height: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	padding-right: 60px;
	position: relative; /* Position relative to contain the dropdown */
`;

const Dropdown = styled.div<{ isVisible: boolean }>`
    position: absolute;
    top: calc(100% + 10px);
    right: 60;
    background-color: rgba(43, 43, 43, 0.8);
    border: 2px solid #858584;
    border-radius: 20px;
    width: auto;
    display: ${(props) => (props.isVisible ? 'flex' : 'none')};
    z-index: 1;
    height: auto;
    overflow: hidden;

    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 10px;

    &:hover {
        border-color: white;
        background-color: rgba(43, 43, 43, 1);
    }
`;
const Option = styled.h5`
    height: 100%;
    color: white;
    text-align: center;

    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
`
const Items = styled.div`
	background-color: none;
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
	gap: 20px;
	overflow: hidden;
`;

interface Props {
    keywords: string[];
}

const GenericSpread = ({ keywords }: Props) => {
    const [items, setItems] = useState<ItemType[]>([]);
    const [filterByKeywords, setFilterByKeywords] = useState<ItemType[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(`${apiConfig.API_URL}/items`);
				const data = await response.json();
				// Ensure each item has a 'tags' field initialized as an array
				const itemsWithTags = data.map((item: ItemType) => ({
					...item,
					tags: item.tags || [], // If 'tags' is null/undefined, initialize as empty array
				}));
				setItems(itemsWithTags);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		};
		fetchItems();
	}, []);

    useEffect(() => {
        if (items.length > 0) {
            const validateKeywords = (keywords: string[], items: ItemType[]) => {
                const lowerCaseKeywords = keywords.map(keyword => keyword.toLowerCase());
                const allTags = items.flatMap(item => item.tags.map(tag => tag.toLowerCase()));
                lowerCaseKeywords.forEach(keyword => {
                    if (keyword !== "all" && !allTags.includes(keyword)) {
                        console.log(`Keyword not valid: ${keyword}`);
                    }
                });
            };

            validateKeywords(keywords, items);

            const filteredItems = keywords.map(keyword => keyword.toLowerCase()).includes("all")
                ? items 
                : items.filter(item => 
                    item.tags.some(tag => 
                        keywords.map(keyword => keyword.toLowerCase()).includes(tag.toLowerCase())
                    )
                );
            
            setFilterByKeywords(filteredItems);
        }
    }, [items, keywords]);

    const handleOnClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

  return (
    <>
        <Spread>
            <ButtonContainer>
                <ButtonCounter onClick={handleOnClick} title={"All"} type={"default"} totalVisItemsCards={items.length} />
                <Dropdown isVisible={isDropdownVisible}>
                    {/* Add dropdown content here */}
                    <Option>Featured</Option>
                    <Option>Lowest Price</Option>
                    <Option>Highest Price</Option>
                    <Option>Best Deals</Option>
                    <Option>Best Sellers</Option>
                    <Option>Best Rating</Option>
                    <Option>Most Reviews</Option>
                    <Option>Biggest Discounts</Option>
                </Dropdown>
            </ButtonContainer>
            <Items>
                {filterByKeywords.map((item, index) => (
                    <ItemCard 
                        key={index}
                        image={item.image}
                        itemName={item.title}
                        addToCart={() => { } }
                        price={item.price}
                        rating={0} 
                        boxSize={"standard"} />
                ))}
            </Items>
        </Spread>
    </>
  );
};

export default GenericSpread;
