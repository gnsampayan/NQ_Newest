import styled from "styled-components";
import ShopSection from "./components/Shop/ShopSection";
import CategoriesSection from "./components/CategoriesSection";

const Wrapper = styled.div<ShopProps>`
	color: white;
	margin-left: ${props => props.$margin};
	margin-right: auto;
	margin-bottom: 100px;
`;

interface ShopProps {
	$margin: string;
}

const Shop: React.FC<ShopProps> = ({ $margin }) => {

	return (
	<>
		<Wrapper $margin={$margin}>
			<CategoriesSection />
			<ShopSection />
		</Wrapper>
	</>
	);
	
};

export default Shop;
