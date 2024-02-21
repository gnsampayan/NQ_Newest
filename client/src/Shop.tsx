import styled from "styled-components";
import ShopSection from "./sections/ShopSection";
import CategoriesSection from "./sections/CategoriesSection";

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
