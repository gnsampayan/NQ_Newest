import styled from "styled-components";
import config from '../config';
import { useEffect, useState } from "react";
import ShopItem from "./Shop/shop-items/ShopItem";

const LargeItemsGroup = styled.div`
	display: grid;
	gap: 30px;
	padding: 0px 60px 0px 60px;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

	@media (max-width: 710px) {
		grid-template-columns: repeat(1, 1fr);
	}

	@media (min-width: 711px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1101px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1401px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 1681px) {
		grid-template-columns: repeat(5, 1fr);
	}

	@media (min-width: 2301px) {
		grid-template-columns: repeat(
			6,
			1fr
		); // Adjust this to fit your needs for 2300px and above
	}
`;

interface ItemsList {
	id: number;
	title: string;
	description: string;
	price: string;
	image: string; // Blob URL for the image
  }
  
  const AllItemsView = () => {
	const [itemsList, setItemsList] = useState<ItemsList[]>([]);
  
	useEffect(() => {
		const fetchItems = async () => {
		  try {
			const response = await fetch(`${config.API_URL}/items`);
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			const items = await response.json();
			setItemsList(items);
		  } catch (error) {
			console.error('Fetch error:', error);
		  }
		};
	
		fetchItems();
	  }, []);
  
	  return (
		<>
		  <LargeItemsGroup>
			{itemsList.map((item) => (
			  <ShopItem
					key={item.id}
					itemImage={`data:image/jpeg;base64,${item.image}`} // Using Base64 image
					itemName={item.title}
					itemDescription={item.description}
					price={item.price}
					itemOnClick={() => console.log('clicked all items view item', item.id)}
					boxSize={"large"} 
					cartVis={true}			  
					/>
			))}
		  </LargeItemsGroup>
		</>
	  );
	};
	
	export default AllItemsView;