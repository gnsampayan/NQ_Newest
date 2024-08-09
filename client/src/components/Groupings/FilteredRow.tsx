// TabSection.tsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TabWidgetParams } from '../Params/filterRowParams';
import apiConfig from "../../api-config";
import { ItemType } from "../../context/Types";
import Button from "../Buttons/Button";
import { BsEye } from "react-icons/bs";
import LargeCarousel from "./Templates/LargeCarousel";

const Wrapper = styled.div`
	z-index: 5;
	padding-bottom: 40px;
	width: 100%;
	margin-bottom: 50px;
`;

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
const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	padding: 40px 60px 0px 60px;
	margin: 0px 0px 40px 0px;
`;
const Container = styled.div<{ $stackedLayout: boolean }>`
	display: ${props => (props.$stackedLayout ? 'flex' : 'block')};
	flex-direction: column;
	align-items: center;
	width: 100%;
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
			<Container $stackedLayout={false}>
				<SectionHeader>
					<div>
						<H3>{heading}</H3>
						<P>{subhead}</P>
					</div>
					<Button 
						asset={BsEye} 
						title={"See All"} 
						onClick={() => handleSeeAll(filteredItems)}
						fillHoverColor={"white"}
						/>
				</SectionHeader>
				<LargeCarousel 	items={filteredItems}/>
			</Container>
		</Wrapper>
	);
};

export default TabSection;
