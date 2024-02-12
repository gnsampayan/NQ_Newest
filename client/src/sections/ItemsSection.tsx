import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShopSection from "../components/ShopSection";


const Wrapper = styled.div`
	z-index: 5;
`

interface Item {
	title: string;
	image: string;
	price: string;
	tags: string[];
}

const ItemsSection: React.FC = () => {

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

	const sectionText = [
		{ subtitle: "Featured Finds", title: "Browse Our Expertly Curated Selection of Must-Have Tools", description: "//add item description here" },
		{ subtitle: "New Arrivals", title: "Explore the Newest Additions to Our Hardware Collection", description: "//add item description here" },
		{ subtitle: "Best Sellers", title: "Check Out What's Trending in Hardware Today", description: "//add item description here" },
		{ subtitle: "Safety First", title: "Essential Safety Gear and Equipment for Every Task", description: "//add item description here" },
		{ subtitle: "Eco-Friendly Choices", title: "Sustainable and Green Solutions for Modern Building Needs", description: "//add item description here" }
	];

    
    const handleItemClick = (itemName: string) => {
        console.log(itemName);
    };

	const SplitSections = sectionText.map((section, index) => {
		// Filter items that include the section's subtitle in their tags
		const filteredItems = items.filter(item => item.tags && item.tags.includes(section.subtitle));

		return (
			<ShopSection
				key={index}
				title={section.title}
				subtitle={section.subtitle}
				itemImage={filteredItems.map(item => `data:image/jpeg;base64,${item.image}`)}
				description={section.description}
				amount={filteredItems.map(item => item.price)}
				name={filteredItems.map(item => item.title)}
				goToPage={() => navigate("/featured")}
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

export default ItemsSection