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

const Wrapper = styled.div`
	position: absolute;
	color: white;
	background-color: orange;
	margin-left: 400px;
	width: calc(100% - 400px);
	height: calc(100vh - 80px);
`;

const Store = () => {

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
	<Wrapper>
		Store
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

export default Store;
