import styled from "styled-components";
import ItemsSection from "./sections/ItemsSection";
import CategoriesSection from "./sections/CategoriesSection";
import heroImage from "/jelleke-vanooteghem-MohB4LCIPyM-unsplash.jpg"

const Wrapper = styled.div<ShopProps>`
	color: white;
	margin-left: ${props => props.margin};
	margin-right: auto;
	margin-bottom: 100px;
`;

// const HeroContainer = styled.div`
// 	width: 100%;
// 	height: 640px;
// 	overflow: hidden;
// 	background-image: url(${heroImage});
//     background-position: center;
// 	background-repeat: no-repeat;
// 	background-size: 200%;
// 	margin-bottom: 80px;
// 	position: absolute;
// 	z-index: 1;
// `
// const Overlay = styled.div`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	background-color: rgba(43, 43, 43, 0.8);
// `

interface ShopProps {
	margin: string;
}

const Shop: React.FC<ShopProps> = ({ margin }) => {

	return (
	<>
		{/* <HeroContainer>
			<Overlay/>
		</HeroContainer> */}
		<Wrapper margin={margin}>
			<CategoriesSection />
			<ItemsSection />
		</Wrapper>
	</>
	);
	
};

export default Shop;
