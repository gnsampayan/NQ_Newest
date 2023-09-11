import styled from "styled-components";
import { BsFillCartPlusFill } from "react-icons/bs";

const ItemContainer = styled.div`
	width: 310px;
	height: 450px;
	border-radius: 20px;
	position: relative;
	overflow: hidden;
`;
const ImageContainer = styled.div`
	height: 300px;
	position: relative;
	overflow: hidden;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const ItemDetails = styled.div`
	background-color: #3b3b3b;
	width: 100%;
	height: 100%;
	padding: 20px 30px 25px 30px;
`;
const ItemName = styled.h1`
	font-size: 1.4em;
	color: white;
`;
const ItemDescription = styled.p`
	font-size: 0.9em;
	color: white;
	line-height: 1.2;
	font-weight: 300;
`;
const TopDetails = styled.div`
	margin-bottom: 10px;
`;
const BottomDetails = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PriceTitle = styled.h2`
	font-size: 0.9em;
	margin-bottom: 0;
	color: white;
`;
const Price = styled.h1`
	font-size: 1em;
	color: white;
`;
const AddToCartButton = styled.button`
	all: unset;
	padding: 0px 20px 0px 20px;
	font-size: 0.9em;
	color: white;
	border: solid 2px #a259ff;
	border-radius: 100vw;
	font-weight: 600;
	max-height: 42px;
	&:hover {
		background-color: rgba(162, 89, 255, 0.4);
	}
`;
const StyledCartIcon = styled(BsFillCartPlusFill)`
	all: unset;
	fill: white;
	transform: translateY(1px);
	margin-right: 10px;
`;

interface Props {
	itemImage: string;
	itemName: string;
	itemDescription: string;
	price: number;
}

const ShopItem = ({ itemImage, itemName, itemDescription, price }: Props) => {
	return (
		<ItemContainer>
			<ImageContainer>
				<Image src={itemImage} alt={itemDescription} />
			</ImageContainer>
			<ItemDetails>
				<TopDetails>
					<ItemName>{itemName}</ItemName>
					<ItemDescription>{itemDescription}</ItemDescription>
				</TopDetails>
				<BottomDetails>
					<div>
						<PriceTitle>Price</PriceTitle>
						<Price>${price.toString()}</Price>
					</div>
					<AddToCartButton>
						<StyledCartIcon />
						Add to Cart
					</AddToCartButton>
				</BottomDetails>
			</ItemDetails>
		</ItemContainer>
	);
};

export default ShopItem;
