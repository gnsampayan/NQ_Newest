// Shop.tsx
import styled from "styled-components";
import FilteredRow from "../components/Groupings/FilteredRow/FilteredRow";
import CategoriesSection from "../components/Widgets/CategoriesWidget";
import { useEffect, useState } from "react";
import config from "../config";
import { sectionText, topFilter } from "../components/Groupings/FilteredRow/filterRowParams";
import SmallCarousel from "../components/Groupings/Templates/smallCarousel";
import ItemCard from "../components/Cards/ItemCard";

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
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25%;
	gap: 20px;
`;
const Button = styled.button<{ isActive: boolean }>`
	width: 100%;
	min-width: 160px;
	border: 2px;
	border-style: solid;
	border-color: #A259FF;
	border-radius: 20px 20px 0px 0px;
	border-bottom: none;
	height: 60px;
	padding: 10px 20px;
	margin: 5px;
	cursor: pointer;
	color: white;
	background-color: ${props => (props.isActive ? '#A259FF' : '#2B2B2B')};
	transition: background-color 0.3s, transform 0.1s;

	&:hover {
		background-color: ${props => (props.isActive ? 'rgba(162, 89, 255, 0.4)' : 'rgba(162, 89, 255, 0.4)')};
	}

	&:active {
		transform: scale(0.95);
	}
	text-align: center;
	font-family: "Work Sans";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 22.4px */
`;
const Floor = styled.div`
	width: 100%;
	display: flex;
	margin-top: 40px;
`
const FilterColumn = styled.div`
  width: 600px;
  padding: 20px;
  color: white;
  height: 100%;
  margin-top: 87px;
  margin-left: 20px;
  border-radius: 20px;
  background: #3B3B3B;
`;
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
const SortBtn = styled.button`
	float: right;
	background-color: #ffffff;
	margin-right: 40px;
	margin-top: 20px;
	padding: 10px;
	width: 80px;
	border-radius: 40px;
`
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
	/* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
	padding-left: 20px;
`
interface ShopProps {
	$margin: string;
}

interface Item {
	title: string;
	image: string;
	price: number;
	tags: string[];
	description: string;
}

const Shop: React.FC<ShopProps> = ({ $margin }) => {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedSection, setSelectedSection] = useState<string>(sectionText[0].subtitle);
	
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

	const SplitSections = topFilter.map((section, index) => {
		const filteredItems = items.filter(item => section.tags.some(tag => item.tags.includes(tag)));
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

	const Tabs = sectionText.map((category, index) => {
		const subtitles = topFilter[0].tags.filter(tag => category.subtitle === tag);

		return (
			<Container key={index}>
				{subtitles.map((subtitle, subIndex) => (
					<Button
						key={subIndex}
						isActive={selectedSection === subtitle}
						onClick={() => setSelectedSection(subtitle)}
					>
						{subtitle}
					</Button>
				))}
			</Container>
		);
	});

	return (
		<>
			<Wrapper $margin={$margin}>
				{SplitSections.length > 0 ? SplitSections : <p>Loading items...</p>}
				<Parent>
					{Tabs.length > 0 ? Tabs : <p>Loading items...</p>}
				</Parent>
				<FilteredRow selectedSection={selectedSection} />
				<CategoriesSection />
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
					<div >
						<SortBtn>Sort</SortBtn>
						<Items>
							{items.map((item, index) => (
								<ItemCard 
									key={index}
									image={`data:image/jpeg;base64,${item.image}`}
									itemName={item.title}
									addToCart={() => { } }
									price={item.price}
									rating={0} 
									boxSize={"standard"} />
							))}
						</Items>
					</div>
					
				</Floor>
			</Wrapper>
		</>
	);
};

export default Shop;
