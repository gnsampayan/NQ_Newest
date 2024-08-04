// TabSection.tsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenericRow from "./Templates/GenericRow"
import { TabWidgetParams } from '../Params/filterRowParams';
import apiConfig from "../../api-config";
import { ItemType } from "../../context/Types";

const Wrapper = styled.div`
	z-index: 5;
	padding-bottom: 40px;
	width: 100%;
	margin-bottom: 50px;
`;

interface TabSectionProps {
	selectedSection: string;
}

const TabSection: React.FC<TabSectionProps> = ({ selectedSection }) => {
	const [items, setItems] = useState<ItemType[]>([]);
	const navigate = useNavigate();

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

	const handleItemClick = (itemName: string) => {
		console.log(itemName);
	};

	const filteredSection = TabWidgetParams.find(section => section.title === selectedSection);

	if (!filteredSection) {
		return <p>No items available for this section</p>;
	}

	const filteredItems = items.filter(item => item.tags && item.tags.includes(filteredSection.title));

	const heading : string = filteredSection.title;
	const subhead : string = filteredSection.subtitle;
	const handleSeeAll = (filteredItems: ItemType[]) => {
		navigate('/filtered', { state: { relevantItems : filteredItems, heading, subhead } });
	};

	return (
		<Wrapper>
			<GenericRow
				title={heading}
				subtitle={subhead}
				itemImage={filteredItems.map(item => `data:image/jpeg;base64,${item.image}`)}
				amount={filteredItems.map(item => item.price)}
				name={filteredItems.map(item => item.title)}
				goToPage={() => handleSeeAll(filteredItems)}
				onClick={(itemName) => handleItemClick(itemName)}
			/>
		</Wrapper>
	);
};

export default TabSection;
