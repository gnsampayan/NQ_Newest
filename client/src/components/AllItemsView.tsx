import styled from "styled-components";
import ShopItem from "./ShopItem";

const ItemsGroup = styled.div`
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

interface Props {
	itemsList: {
		item_id: number;
		image: string;
		name: string;
		description: string;
		price: number;
	}[];
}

const AllItemsView = ({ itemsList }: Props) => {
	return (
		<>
			<ItemsGroup>
				{itemsList.map((item) => (
					<ShopItem
						key={item.item_id}
						itemImage={item.image}
						itemName={item.name}
						itemDescription={item.description}
						price={item.price}
					/>
				))}
			</ItemsGroup>
		</>
	);
};

export default AllItemsView;
