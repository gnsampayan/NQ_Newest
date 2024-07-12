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
	width: 100vw;
	justify-content: center;
	display: inline-flex;	
	padding: 60px 50px 00px 20px;
`;
const Container = styled.div`
	justify-content: center;
	align-items: center;
	width: 25%;
`;
const Button = styled.button<{ isActive: boolean }>`
	width: 100%;
	min-width: 160px;
	border: none;
	padding: 10px 20px;
	margin: 5px;
	cursor: pointer;
	color: ${props => (props.isActive ? 'black' : 'white')};
	background-color: ${props => (props.isActive ? '#d3ebe8' : 'rgb(49, 46, 78)')};
	transition: background-color 0.3s, transform 0.1s;

	&:hover {
		background-color: ${props => (props.isActive ? 'rgba(162, 89, 255, 0.4)' : 'rgba(162, 89, 255, 0.4)')};
	}

	&:active {
		transform: scale(0.95);
	}
`;
const Floor = styled.div`
	background-color: aliceblue;
	width: 100vw;
	display: flex;
`
const Filter = styled.div`
	background-color: antiquewhite;
	height: auto;
	width: 400px;
`
const Items = styled.div`
	background-color: #098181;
	width: calc(100vw - 400px);
	height: auto;
	display: flex;
	flex-wrap: wrap; // Added this line to enable wrapping
	padding: 20px;
	gap: 20px;
	overflow: hidden;
`;

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
					<Filter></Filter>
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
				</Floor>
			</Wrapper>
		</>
	);
};

export default Shop;
