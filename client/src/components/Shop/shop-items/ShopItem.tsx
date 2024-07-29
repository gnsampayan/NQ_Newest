import styled from "styled-components";
import { BsFillCartPlusFill } from "react-icons/bs";

const styleConfig = {
	small: {
		imageHeight: '150px',
		containerHeight: '210px',
		containerWidth: '210px',
		background: "#3B3B3B",
		textColor: "white",
		fontSize: "1em",
		display: "none",
		bottom: "0px",    
		additionalStyles: {
			display: "flex",
			position: "absolute",
			bottom: "10px"
		}  
	},
	medium: {
		imageHeight: '200px',
		containerHeight: '400px',
		containerWidth: '260px',
		background: "#3B3B3B",
		textColor: "white",
		fontSize: "1.4em",
		display: "block",
		bottom: "20px",    
		additionalStyles: {
			display: "auto",
			position: "auto",
			bottom: "auto"
		}  
	},
	large: {
		imageHeight: '300px',
		containerHeight: '450px',
		containerWidth: '310px',
		background: "#3B3B3B",
		textColor: "white",
		fontSize: "1.4em",
		display: "block",
		bottom: "20px",   
		additionalStyles: {
			display: "auto",
			position: "auto",
			bottom: "auto"
		}  
	},
};

type BoxSize = 'small' | 'medium' | 'large';

const ItemContainer = styled.div<{ boxSize: BoxSize }>`
	width: ${(props) => styleConfig[props.boxSize].containerWidth};
	height: ${(props) => styleConfig[props.boxSize].containerHeight};
	border-radius: 20px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	flex-shrink: 0;
	&:hover {
	    border: solid 2px #a259ff;
	}
	border: solid 1px #000000;
`;

const ImageContainer = styled.div<{ boxSize: BoxSize }>`
	height: ${(props) => styleConfig[props.boxSize].imageHeight};
	position: relative;
	overflow: hidden;
	z-index: 4;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const ItemDetails = styled.div<{ boxSize: BoxSize }>`
	background-color: ${(props) => styleConfig[props.boxSize].background};
	width: 100%;
	height: 100%;
	padding: 20px 30px 25px 30px;
`;
const ItemName = styled.h1<{ boxSize: BoxSize }>`
	font-size: ${(props) => styleConfig[props.boxSize].fontSize};
	color: ${(props) => styleConfig[props.boxSize].textColor};
`;
const TopDetails = styled.div<{ boxSize: BoxSize }>`
	margin-bottom: 10px;
	${(props) => `
    display: ${styleConfig[props.boxSize].additionalStyles.display};
    position: ${styleConfig[props.boxSize].additionalStyles.position};
    bottom: ${styleConfig[props.boxSize].additionalStyles.bottom};
  `}
`;
const BottomDetails = styled.div<{ boxSize: BoxSize }>`
	display: flex;
	justify-content: space-between;
	position: absolute; 
	bottom: ${(props) => styleConfig[props.boxSize].bottom};    
	left: 0;            
	right: 0;           
	padding: 0 30px;
`;
const PriceTitle = styled.h2<{ boxSize: BoxSize }>`
	font-size: 0.9em;
	margin-bottom: 0;
	color: ${(props) => styleConfig[props.boxSize].textColor};
	display: ${(props) => styleConfig[props.boxSize].display};
`;
const Price = styled.h1<{ boxSize: BoxSize }>`
	font-size: 1em;
	color: ${(props) => styleConfig[props.boxSize].textColor};
`;
const AddToCartButton = styled.button<{ boxSize: BoxSize }>`
	all: unset;
	padding: 0px 20px 0px 20px;
	font-size: 0.9em;
	color: ${(props) => styleConfig[props.boxSize].textColor};
	border: solid 2px #a259ff;
	border-radius: 100vw;
	font-weight: 600;
	max-height: 42px;
	&:hover {
		background-color: rgba(162, 89, 255, 0.4);
	}
	z-index: 6;
`;
const StyledCartIcon = styled(BsFillCartPlusFill)<{ boxSize: BoxSize }>`
	all: unset;
	fill: ${(props) => styleConfig[props.boxSize].textColor};
	transform: translateY(1px);
	margin-right: 10px;
`;

interface Props {
	itemImage: string;
	itemName: string;
	itemDescription: string;
	price: string;
	itemOnClick: () => void;
    boxSize: BoxSize;
	cartVis: boolean;
}

const ShopItem = ({ itemImage, itemName, price, itemOnClick, boxSize, cartVis }: Props) => {

	return (
		<ItemContainer boxSize={boxSize}>
			<ImageContainer boxSize={boxSize} onClick={itemOnClick}>
				<Image src={itemImage} alt={itemName} />
		    </ImageContainer>
			<ItemDetails boxSize={boxSize}>
				<TopDetails boxSize={boxSize}>
					<ItemName boxSize={boxSize} onClick={itemOnClick}>{itemName}</ItemName>
				</TopDetails>
				<BottomDetails boxSize={boxSize}>
					<div>
						<PriceTitle boxSize={boxSize}>Price</PriceTitle>
						<Price boxSize={boxSize}>${price}</Price>
					</div>
					{cartVis && (
						<AddToCartButton boxSize={boxSize}>
							<StyledCartIcon boxSize={boxSize} />
							Add to Cart
						</AddToCartButton>
					)}
				</BottomDetails>
			</ItemDetails>
		</ItemContainer>
	);
};

export default ShopItem;
