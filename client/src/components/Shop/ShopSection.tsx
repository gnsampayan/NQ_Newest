// ShopSection.tsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShopSectionTemplate from "./ShopSectionTemplate";
import { sectionText } from './shop-params';
import config from "../../config";

const Wrapper = styled.div`
	z-index: 5;
	background-color: #d3ebe8;
	padding-bottom: 40px;
`;

interface Item {
	title: string;
	image: string;
	price: string;
	tags: string[];
	description: string;
}

interface ShopSectionProps {
	selectedSection: string;
}

const ShopSection: React.FC<ShopSectionProps> = ({ selectedSection }) => {
	const [items, setItems] = useState<Item[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(`${config.API_URL}/items`);
				const data = await response.json();
				// Ensure each item has a 'tags' field initialized as an array
				const itemsWithTags = data.map((item: Item) => ({
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

	const handleItemClick = (itemName: string) => {
		console.log(itemName);
	};

	const filteredSection = sectionText.find(section => section.subtitle === selectedSection);

	if (!filteredSection) {
		return <p>No items available for this section</p>;
	}

	const filteredItems = items.filter(item => item.tags && item.tags.includes(filteredSection.subtitle));

	const handleSeeAll = (filteredItems: Item[]) => {
		navigate('/filtered', { state: { filteredItems } });
	};

	return (
		<Wrapper>
			<ShopSectionTemplate
				title={filteredSection.title}
				subtitle={filteredSection.subtitle}
				itemImage={filteredItems.map(item => `data:image/jpeg;base64,${item.image}`)}
				itemDescription={filteredItems.map(item => item.description)}
				amount={filteredItems.map(item => item.price)}
				name={filteredItems.map(item => item.title)}
				goToPage={() => handleSeeAll(filteredItems)}
				onClick={(itemName) => handleItemClick(itemName)}
			/>
		</Wrapper>
	);
};

export default ShopSection;
