// Shop.tsx
import styled from "styled-components";
import FilteredRow from "../components/Groupings/FilteredRow";
import CategoriesSection from "../components/Widgets/CategoriesWidget";
import { useEffect, useState } from "react";
import { TabWidgetParams, carouselSmallParams } from "../components/Params/filterRowParams";
import SmallCarousel from "../components/Groupings/Templates/SmallCarousel";
import { ItemType } from "../context/Types";
import GenericSpread from "../components/Groupings/Templates/GenericSpread";
import apiConfig from "../api-config";
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
const Floor = styled.div`
	width: 100%;
	display: flex;
`
const FilterColumn = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px;
	color: white;
	height: 100%;
	margin-top: 80px;
	margin-left: 20px;
	border-radius: 20px;
	background: #3B3B3B;
`;
const H5 = styled.h4`
	/* H5 - Work Sans */
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
	color: #858584;
`
const Caption = styled.p`
	/* Caption - Space Mono */
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
	color: #858584;
`
const Body = styled.p`
	cursor: pointer;
	/* H5 - Work Sans */
	font-family: "Work Sans";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	padding-left: 20px;
`
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
interface ShopProps {
	$margin: string;
}

const Shop: React.FC<ShopProps> = ({ $margin }) => {
	const [items, setItems] = useState<ItemType[]>([]);
	const [selectedSection, setSelectedSection] = useState<string>(TabWidgetParams[0].title);
	const [visibleTitles, setVisibleTitles] = useState<string[]>([]);
	const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

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
				// Calculate item counts for each tab
				const counts = TabWidgetParams.reduce((acc, tab) => {
					const matchedItems = itemsWithTags.filter((item: ItemType) => {
						return item.tags.some(tag => {
							return tab.title.toLowerCase().includes(tag.toLowerCase());
						});
					});
					acc[tab.title] = matchedItems.length;
					return acc;
				}, {} as { [key: string]: number });

				setItemCounts(counts);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		};
		fetchItems();
	}, []);

	const handleItemClick = (itemName: string) => {
		console.log(itemName);
	};

	const SplitSections = carouselSmallParams.map((section, index) => {
		const filteredItems = items.filter(item => section.include.some(tag => item.tags.includes(tag)));
		return (
			<SmallCarousel 
				key={index}
				itemImage={filteredItems.map(item => `data:image/jpeg;base64,${item.image}`)}
				itemDescription={filteredItems.map(item => item.description)}
				amount={filteredItems.map(item => item.price)}
				name={filteredItems.map(item => item.title)}
				onClick={(itemName) => handleItemClick(itemName)}
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

	const KeyWords = ["trending", "tools", "NonExistentKeyword", "all"];

	return (
		<>
			<Wrapper $margin={$margin}>
				{SplitSections.length > 0 ? SplitSections : <p>Loading items...</p>}
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
					<Floor>
						<FilterColumn>
							<H5>Type</H5>
							<ul>
								<Caption>Tools</Caption>
									<Body>Wireless</Body>
									<Body>Wired</Body>
									<Body>Manual</Body>
								<Caption>Materials</Caption>
									<Body>Concrete</Body>
									<Body>Plywood</Body>
									<Body>Lumber</Body>
									<Body>Metals</Body>
									<Body>Insulation</Body>
							</ul>
							<H5>Brands</H5>
								<Body>Dewalt</Body>
								<Body>Milwaukee</Body>
								<Body>Bosch</Body>
								<Body>Makita</Body>
							<H5>Price</H5>
								<Body>$1 - $10</Body>
								<Body>$11 - $50</Body>
								<Body>$51 - $100</Body>
								<Body>$101 - above</Body>
							<H5>Discount</H5>
								<Body>Clearance</Body>
								<Body>Daily Deals</Body>
								<Body>On Sale</Body>
								<Body>Open Box</Body>
						</FilterColumn>
						<GenericSpread keywords={KeyWords} />
					</Floor>
				</FloorSection>
			</Wrapper>
		</>
	);
};

export default Shop;
