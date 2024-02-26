import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShopSectionTemplate from "../components/ShopSectionTemplate";
import { sectionText } from '../components/sectionText';


const Wrapper = styled.div`
	z-index: 5;
`

interface Item {
	title: string;
	image: string;
	price: string;
	tags: string[];
	description:string;
}

const ShopSection: React.FC = () => {

	const [items, setItems] = useState<Item[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch('http://localhost:8081/api/items');
				const data = await response.json();
				// Ensure each item has a 'tags' field initialized as an array
				const itemsWithTags = data.map((item: Item) => ({
					...item,
					tags: item.tags || [] // If 'tags' is null/undefined, initialize as empty array
				}));
				setItems(itemsWithTags);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		};		
		fetchItems();
	}, []);

    const handleItemClick = (itemName: string) => {
        console.log(itemName);
    };

	const SplitSections = sectionText.map((section, index) => {
		// Filter items that include the section's subtitle in their tags
		const filteredItems = items.filter(item => item.tags && item.tags.includes(section.subtitle));

		const handleSeeAll = (filteredItems: Item[]) => {
			navigate('/filtered', { state: { filteredItems } });
		};

		return (
			<ShopSectionTemplate
				key={index}
				title={section.title}
				subtitle={section.subtitle}
				itemImage={filteredItems.map(item => `data:image/jpeg;base64,${item.image}`)}
				itemDescription={filteredItems.map(item => item.description)}
				amount={filteredItems.map(item => item.price)}
				name={filteredItems.map(item => item.title)}
				goToPage={() => handleSeeAll(filteredItems)}
				onClick={(itemName) => handleItemClick(itemName)}
			/>
		);
	});

    return (
		<Wrapper>
			{SplitSections.length > 0 ? SplitSections : <p>Loading items...</p>}
		</Wrapper>
	);
}

export default ShopSection