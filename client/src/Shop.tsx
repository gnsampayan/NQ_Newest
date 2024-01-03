import styled from "styled-components";
import ItemsSection from "./sections/ItemsSection";
import CategoriesSection from "./sections/CategoriesSection";

const Wrapper = styled.div<ShopProps>`
	color: white;
	margin-left: ${props => props.margin};
	margin-right: auto;
	margin-bottom: 100px;
`;

interface ShopProps {
	margin: string;
}

const Shop: React.FC<ShopProps> = ({ margin }) => {

	return (
	<>
		<Wrapper margin={margin}>
			<CategoriesSection />
			<ItemsSection />
		</Wrapper>
	</>
	);
	
};

export default Shop;
