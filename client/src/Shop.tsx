// Shop.tsx
import styled from "styled-components";
import ShopSection from "./components/Shop/ShopSection";
import CategoriesSection from "./components/CategoriesSection";
import { useEffect, useState } from "react";
import config from "./config";
import { sectionText, topFilter } from "./components/Shop/shop-params";
import SmallItemGroup from "./components/Shop/itemgroup/SmallItemGroup";
import ShopItem from "./components/Shop/shop-items/ShopItem";

const Wrapper = styled.div<ShopProps>`
	color: white;
	margin-left: ${props => props.$margin};
	margin-right: auto;
	margin-bottom: 100px;
	margin-top: 20px;
`;

const Parent = styled.div`
	width: 100%;
	justify-content: center;
	display: inline-flex;	
	padding: 60px 30px 00px 20px;
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
	border: 2px solid #A259FF;
	border-radius: 20px;
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
`
const FilterColumn = styled.div`
  background-color: white;
  width: 600px;
  padding: 20px;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 20px;
  height: 100%;
  position: sticky;
  top: 0;
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

interface ShopProps {
	$margin: string;
}

interface Item {
	title: string;
	image: string;
	price: string;
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
		// Filter items that include the section's subtitle in their tags
		const filteredItems = items.filter(item => section.tags.some(tag => item.tags.includes(tag)));

		return (
			<SmallItemGroup 
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
				<ShopSection selectedSection={selectedSection} />
				<CategoriesSection />
				<Floor>
					<FilterColumn>
						<ul>
							<h5>Tools
								<h6>Wireless</h6>
								<h6>Wired</h6>
								<h6>Manual</h6>
							</h5>
							<h5>Materials
								<h6>Concrete</h6>
								<h6>Plywood</h6>
								<h6>Lumber</h6>
								<h6>Metals</h6>
								<h6>Insulation</h6>
							</h5>
						</ul>
						<h4>Brands</h4>
							<h6>Dewalt</h6>
							<h6>Milwaukee</h6>
							<h6>Bosch</h6>
							<h6>Makita</h6>
						<h4>Price</h4>
							<h6>$1 - $10</h6>
							<h6>$11 - $50</h6>
							<h6>$51 - $100</h6>
							<h6>$101 - above</h6>
						<h4>Discount</h4>
							<h6>Clearance</h6>
							<h6>Daily Deals</h6>
							<h6>On Sale</h6>
							<h6>Open Box</h6>
					</FilterColumn>
					<div >
						<SortBtn>Sort</SortBtn>
						<Items>
							{items.map((item, index) => (
								<ShopItem
									key={index}
									itemImage={`data:image/jpeg;base64,${item.image}`}
									itemName={item.title}
									itemDescription={item.description}
									price={item.price}
									itemOnClick={() => handleItemClick(item.title)}
									boxSize="medium" // Adjust size as needed
									cartVis={true} // Show cart button
								/>
							))}
						</Items>
					</div>
					
				</Floor>
			</Wrapper>
		</>
	);
};

export default Shop;
