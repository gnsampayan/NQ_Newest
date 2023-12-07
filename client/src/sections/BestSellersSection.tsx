import { useNavigate } from "react-router-dom";

import ShopSection from "../components/ShopSection";

import ElectricMotor from "../assets/items/electric-motor.png";
import Bolts from "../assets/items/bolts.png";
import Microchip from "../assets/items/microchip.png";
import Plywood from "../assets/items/plywood.png";
import Pipes from "../assets/items/pipes.png";
import HollowBlocks from "../assets/items/hollow-block.png";
import Cement from "../assets/items/cement.png";
import styled from "styled-components";

const Wrapper = styled.div`
	z-index: 5;
`

const BestSellersSection = () => {
	const bestSellerItems = [
		{ name: "ElectricMotor", image: ElectricMotor },
		{ name: "Bolts", image: Bolts },
		{ name: "Microchip", image: Microchip },
		{ name: "Plywood", image: Plywood },
		{ name: "Pipes", image: Pipes },
		{ name: "HollowBlocks", image: HollowBlocks },
		{ name: "Cement", image: Cement },
	];

	const navigate = useNavigate();

	const handleItemClick = (itemName: string) => {
        console.log(itemName);
    };

	return (
		<Wrapper>
			<ShopSection
				title="Best Sellers"
				subtitle="Check Out What's Trending in Hardware Today"
				itemImage={bestSellerItems.map((item) => item.image)}
				description="this is the description"
				amount={20}
				name={bestSellerItems.map((item) => item.name)}
				goToPage={() => navigate("/featured")}
				onClick={(itemName: string) => handleItemClick(itemName)}
				/>
		</Wrapper>
	);
};

export default BestSellersSection;