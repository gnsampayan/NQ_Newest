import { useNavigate } from "react-router-dom";

import ShopSection from "../components/ShopSection";

import Hammer from "../assets/items/hammer.png";
import Ladder from "../assets/items/ladder.png";
import Metals from "../assets/items/metals.png";
import WireSpools from "../assets/items/wire-spools.png";
import TableSaw from "../assets/items/table-saw.png";
import SawBlade from "../assets/items/saw-blade.png";
import ElectricMotor from "../assets/items/electric-motor.png";

const NewSection = () => {
	const newItems = [
		{ name: "Hammer", image: Hammer },
		{ name: "Ladder", image: Ladder },
		{ name: "Metals", image: Metals },
		{ name: "WireSpools", image: WireSpools },
		{ name: "TableSaw", image: TableSaw },
		{ name: "SawBlade", image: SawBlade },
		{ name: "ElectricMotor", image: ElectricMotor },
	];

	const navigate = useNavigate();

	return (
		<ShopSection
			title="New Arrivals"
			subtitle="Explore the Newest Additions to Our Hardware Collection"
			itemImage={newItems.map((item) => item.image)}
			description="this is the description"
			amount={20}
			name={newItems.map((item) => item.name)}
			goToPage={() => navigate("/new")}
		/>
	);
};

export default NewSection;
