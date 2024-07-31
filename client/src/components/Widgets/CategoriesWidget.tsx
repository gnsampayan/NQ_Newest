import styled from "styled-components";

import Electrical from "../../assets/items/electrical.png";
import Tools from "../../assets/items/tools.png";
import Metals from "../../assets/items/metals_v2.png";
import Pipes from "../../assets/items/pipes.png";
import Lumber from "../../assets/items/carpentry.png";
import Masonry from "../../assets/items/masonry.png";
import Fixtures from "../../assets/items/fixtures.png";
import Insulation from "../../assets/items/insulation.png";

import { IconType } from 'react-icons';
import { 
	GiElectricalResistance, 
	GiIBeam, 
	GiWarpPipe, 
	GiWoodBeam, 
	GiTrowel, 
	GiCeilingLight, 
	GiThermometerHot 
} from "react-icons/gi";
import { BsTools } from "react-icons/bs";

import CategoriesCard from "../Cards/CategoriesCard";

// Utility function to split array into chunks
import { chunkArray } from "../utilityFunctions";

const Group = styled.div`
	width: 1050px;
	height: auto;
	flex-shrink: 0;
`;
const SectionHeadline = styled.div`
	display: flex;
	width: 1050px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`
const H3 = styled.h3`
	align-self: stretch;

	color: white;

	/* H3 - Work Sans */
	font-family: "Work Sans";
	font-size: 38px;
	font-style: normal;
	font-weight: 600;
	line-height: 120%; /* 45.6px */
	text-transform: capitalize;
`
const P = styled.p`
	align-self: stretch;

	color: white;

	/* Body Text- Work Sans */
	font-family: "Work Sans";
	font-size: 22px;
	font-style: normal;
	font-weight: 400;
	line-height: 160%; /* 35.2px */
	text-transform: capitalize;
`
const CategoryCardsGrid = styled.div`
	display: flex;
	width: 1050px;
	flex-direction: column;
	align-items: flex-start;
	gap: 30px;
`;
const CategoryCardsRow = styled.h2`
	display: flex;
	align-items: flex-start;
	gap: 30px;
	align-self: stretch;
`;

  interface Category {
	name: string;
	image: string;
	icon: IconType;
  }

  const CategoriesSection: React.FC = () => {
	const categories: Category[] = [
	  { name: "Electrical", image: Electrical, icon: GiElectricalResistance },
	  { name: "Metals", image: Metals, icon: GiIBeam },
	  { name: "Plumbing", image: Pipes, icon: GiWarpPipe  },
	  { name: "Tools", image: Tools, icon: BsTools  },
	  { name: "Lumber", image: Lumber, icon: GiWoodBeam },
	  { name: "Masonry", image: Masonry, icon: GiTrowel },
	  { name: "Fixtures", image: Fixtures, icon: GiCeilingLight },
	  { name: "Insulation", image: Insulation, icon: GiThermometerHot },
	];

	// Split the categories into chunks of n
	const categoryChunks = chunkArray(categories, 4);

	return (
		<Group>
			<SectionHeadline>
				<H3>Shop By Categories</H3>
				<P>Explore Our Diverse Selection of Products</P>
          	</SectionHeadline>
			<CategoryCardsGrid>
				{categoryChunks.map((chunk, rowIndex) => (
					<CategoryCardsRow key={rowIndex}>
						{chunk.map((category, index) => (
						<CategoriesCard 
							key={index}
							image={category.image}
							categoryName={category.name}
							icon={category.icon}
						/>
						))}
					</CategoryCardsRow>
				))}
			</CategoryCardsGrid>
		</Group>
	);
};

export default CategoriesSection;