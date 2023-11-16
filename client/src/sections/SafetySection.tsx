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

const SafetySection = () => {
        const safetyItems = [
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
		<ShopSection
			title="Safety First"
			subtitle="Essential Safety Gear and Equipment for Every Task"
			itemImage={safetyItems.map((item) => item.image)}
			description="this is the description"
			amount={20}
			name={safetyItems.map((item) => item.name)}
			goToPage={() => navigate("/featured")}
		/>
	</Wrapper>
  )
}

export default SafetySection