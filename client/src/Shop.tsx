import styled from "styled-components";
import ShopSection from "./components/ShopSection";
import { useNavigate } from "react-router-dom";

import ElectricMotor from "./assets/items/electric-motor.png";
import Bolts from "./assets/items/bolts.png";
import Microchip from "./assets/items/microchip.png";
import Plywood from "./assets/items/plywood.png";
import Pipes from "./assets/items/pipes.png";
import HollowBlocks from "./assets/items/hollow-block.png";
import Cement from "./assets/items/cement.png";

const Wrapper = styled.div<ShopProps>`
	position: absolute;
	color: white;
	margin-left: ${props => props.margin};
	margin-right: auto;
	width: calc(100% - 400px);
	height: calc(100vh - 80px);
`;

interface ShopProps {
	margin: string;
}

const Shop: React.FC<ShopProps> = ({ margin }) => {

	const featuredItems = [
		{ name: "ElectricMotor", image: ElectricMotor },
		{ name: "Bolts", image: Bolts },
		{ name: "Microchip", image: Microchip },
		{ name: "Plywood", image: Plywood },
		{ name: "Pipes", image: Pipes },
		{ name: "HollowBlocks", image: HollowBlocks },
		{ name: "Cement", image: Cement },
	];

	const navigate = useNavigate();
	
	return (
	<Wrapper margin={margin}>
		Shop
		<ShopSection
			title="Featured Items"
			subtitle="Explore our top featured products"
			itemImage={featuredItems.map((item) => item.image)}
			description="this is the description"
			amount={20}
			name={featuredItems.map((item) => item.name)}
			goToPage={() => navigate("/featured")}
		/>
	</Wrapper>
	);
	
};

export default Shop;
