import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShopSection from "../components/ShopSection";

import ElectricMotor from "../assets/items/electric-motor.png";
import Bolts from "../assets/items/bolts.png";
import Microchip from "../assets/items/microchip.png";
import Plywood from "../assets/items/plywood.png";
import Pipes from "../assets/items/pipes.png";
import HollowBlocks from "../assets/items/hollow-block.png";
import Cement from "../assets/items/cement.png";

const Wrapper = styled.div`
	z-index: 5;
`

const ItemsSection = () => {

    const itemsList = [
		{ name: "ElectricMotor", image: ElectricMotor },
		{ name: "Bolts", image: Bolts },
		{ name: "Microchip", image: Microchip },
		{ name: "Plywood", image: Plywood },
		{ name: "Pipes", image: Pipes },
		{ name: "HollowBlocks", image: HollowBlocks },
		{ name: "Cement", image: Cement },
	];
	const sectionText = [
		{ title: "Featured Finds", subtitle: "Browse Our Expertly Curated Selection of Must-Have Tools", description: "//add item description here" },
		{ title: "New Arrivals", subtitle: "Explore the Newest Additions to Our Hardware Collection", description: "//add item description here" },
		{ title: "Best Sellers", subtitle: "Check Out What's Trending in Hardware Today", description: "//add item description here" },
		{ title: "Safety First", subtitle: "Essential Safety Gear and Equipment for Every Task", description: "//add item description here" },
		{ title: "Eco-Friendly Choices", subtitle: "Sustainable and Green Solutions for Modern Building Needs", description: "//add item description here" }
	];

    const navigate = useNavigate();
    
    const handleItemClick = (itemName: string) => {
        console.log(itemName);
    };

	const SplitSections = sectionText.map((section, index) => (
        <ShopSection
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            itemImage={itemsList.map((item) => item.image)}
            description={section.description}
            amount={20}
            name={itemsList.map((item) => item.name)}
            goToPage={() => navigate("/featured")}
            onClick={(itemName) => handleItemClick(itemName)}
        />
    ));

    return (
		<Wrapper>
			{SplitSections}
		</Wrapper>
	);
}

export default ItemsSection