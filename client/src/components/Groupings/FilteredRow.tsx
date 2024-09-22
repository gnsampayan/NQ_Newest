import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { useQuery } from '@tanstack/react-query';  // Import useQuery
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
const LoadingMsg = styled.div`
	color: var(--White, #FFF);
	/* H5 - Space Mono */
	font-family: "Space Mono";
	font-size: 22px;
	font-style: normal;
	font-weight: 700;
	line-height: 160%; /* 35.2px */
	text-transform: capitalize;
`

interface TabSectionProps {
	selectedSection: string;
}

const TabSection: React.FC<TabSectionProps> = ({ selectedSection }) => {
	const navigate = useNavigate();

	// Use useQuery to fetch and cache items
	const { data: items = [], isLoading, isError } = useQuery({
		queryKey: ['items'],
		queryFn: async () => {
			const response = await fetch(`${apiConfig.API_URL}/items`);
			const data = await response.json();

			// Ensure each item has a 'tags' property
			return data.map((item: ItemType) => ({
				...item,
				tags: item.tags || [],
			}));
		},
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
	});

	if (isError) {
		return <p>Error fetching items.</p>;
	}

	const filteredSection = TabWidgetParams.find(section => section.title === selectedSection);
	if (!filteredSection) {
		return <p>No items available for this section</p>;
	}

	const filteredItems = items.filter((item: ItemType) => item.tags && item.tags.includes(filteredSection.title));
	const heading: string = filteredSection.title;
	const subhead: string = filteredSection.subtitle;

	const handleSeeAll = (filteredItems: ItemType[]) => {
		navigate('/filtered', { state: { relevantItems: filteredItems, heading, subhead } });
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
				{isLoading ? <LoadingMsg>Loading items...</LoadingMsg> : <LargeCarousel items={filteredItems} />}
			</Container>
		</Wrapper>
	);
};

export default TabSection;
