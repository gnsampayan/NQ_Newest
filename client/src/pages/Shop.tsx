// Shop.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import FilteredRow from "../components/Groupings/FilteredRow";
import CategoriesSection from "../components/Widgets/CategoriesWidget";
import { TabWidgetParams, carouselSmallParams } from "../components/Params/filterRowParams";
import SmallCarousel from "../components/Groupings/Templates/SmallCarousel";
import { ItemType } from "../context/Types";
import GenericSpread from "../components/Groupings/Templates/GenericSpread";
import apiConfig from "../api-config";
import { useQuery } from '@tanstack/react-query';

const Wrapper = styled.div<ShopProps>`
	color: white;
	margin-left: ${props => props.$margin};
	margin-right: auto;
	margin-bottom: 100px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const Parent = styled.div`
	width: 100%;
	justify-content: center;
	display: inline-flex;	
	padding: 60px 20px 00px 20px;
`;
const TabButton = styled.button<{ isActive: boolean }>`
	all: unset;
	display: flex;
	height: 60px;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
	gap: 12px;

	background: none;
	color: ${props => props.isActive ? 'white' : '#858584'};
	text-align: center;
	font-family: "Work Sans";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 22.4px */

	background-color: none;
	position: relative; /* Needed for absolute positioning of the pseudo-element */

    &:hover::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${props => props.isActive ? '#858584' : '#3B3B3B'};
    }
`;
const Row = styled.div`
	width: 100%;
	margin-bottom: 40px;
`
const Number = styled.div<{ isActive: boolean }>`
    color: #FFF;

    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
	display: flex;
    padding: 5px 10px;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background:  ${props => props.isActive ? '#858584' : '#3B3B3B'};
`
const SectionHeadline = styled.div`
	display: flex;
	width: 1050px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	margin-left: 60px;
	margin-bottom: -80px;
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
const FloorSection = styled.div`
	width: 100%;
	margin-top: 100px;
`
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
interface ShopProps {
	$margin: string;
}

const Shop: React.FC<ShopProps> = ({ $margin }) => {
	const [selectedSection, setSelectedSection] = useState<string>(TabWidgetParams[0].title);
	const [visibleTitles, setVisibleTitles] = useState<string[]>([]);
	const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

	// Use React Query to fetch and cache items
	const { data: items = [], isLoading } = useQuery({
		queryKey: ['items'],
		queryFn: async () => {
			const response = await fetch(`${apiConfig.API_URL}/items`);
			const data = await response.json();
			return data.map((item: ItemType) => ({
				...item,
				tags: item.tags || [],
			}));
		},
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		const breakpoints = [
			{ width: 900, maxTitles: 3 },
			{ width: 1000, maxTitles: 4 },
			{ width: 1380, maxTitles: 5 },
		];
		const handleResize = () => {
			const width = window.innerWidth;
			let maxTitles = TabWidgetParams.length;

			for (const breakpoint of breakpoints) {
				if (width < breakpoint.width) {
					maxTitles = breakpoint.maxTitles;
					break;
				}
			}
			setVisibleTitles(TabWidgetParams.slice(0, maxTitles).map(item => item.title));
		};
		window.addEventListener('resize', handleResize);
		handleResize(); // Call initially to set up the initial state
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		// Calculate item counts for each tab whenever items change
		const counts = TabWidgetParams.reduce((acc, tab) => {
			const matchedItems = items.filter((item: ItemType) => {
				return item.tags.some(tag => {
					return tab.title.toLowerCase().includes(tag.toLowerCase());
				});
			});
			acc[tab.title] = matchedItems.length;
			return acc;
		}, {} as { [key: string]: number });

		setItemCounts(counts);
	}, [items]);

	const handleItemClick = (itemName: string) => {
		console.log(itemName);
	};

	const SplitSections = carouselSmallParams.map((section, index) => {
		const filteredItems = items.filter((item: ItemType) => section.include.some(tag => item.tags.includes(tag)));
		return (
			<SmallCarousel
				key={index}
				itemImage={filteredItems.map((item: ItemType) => item.image)}
				itemDescription={filteredItems.map((item: ItemType) => item.description)}
				amount={filteredItems.map((item: ItemType) => item.price)}
				name={filteredItems.map((item: ItemType) => item.title)}
				onClick={(itemName) => handleItemClick(itemName)}
				saleBool={filteredItems.map((item: ItemType) => item.saleBool)}
				saleRate={filteredItems.map((item: ItemType) => item.saleRate)}
			/>
		);
	});

	const Tabs = visibleTitles.map((title, index) => {
		return (
			<TabButton
				key={index}
				isActive={selectedSection === title}
				onClick={() => setSelectedSection(title)}
			>
				{title}
				<Number isActive={selectedSection === title}>{itemCounts[title]}</Number>
			</TabButton>
		)
	})

	return (
		<>
			<Wrapper $margin={$margin}>
				{isLoading ? <LoadingMsg>Loading items...</LoadingMsg> : SplitSections}
				<Parent>
					{Tabs.length > 0 ? Tabs : <p>Loading items...</p>}
				</Parent>
				<Row>
					<FilteredRow selectedSection={selectedSection} />
				</Row>
				<CategoriesSection />
				<FloorSection>
					<SectionHeadline>
						<H3>Find More Selections</H3>
						<P>Browse Through A Wide Range Of Quality Items</P>
					</SectionHeadline>
					<GenericSpread />
				</FloorSection>
			</Wrapper>
		</>
	);
};

export default Shop;
