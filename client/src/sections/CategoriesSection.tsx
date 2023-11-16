import styled from "styled-components";

import ElectricMotor from "../assets/items/electric-motor.png";
import Hammer from "../assets/items/hammer.png";
import Metals from "../assets/items/metals.png";
import Pipes from "../assets/items/pipes.png";
import Plywood from "../assets/items/plywood.png";
import HollowBlock from "../assets/items/hollow-block.png";
import Ladder from "../assets/items/ladder.png";
import WireSpools from "../assets/items/wire-spools.png";

const Wrapper = styled.div`
	position: relative;
	padding: 0px 60px 0px 60px;
	z-index: 5;
	margin-bottom: 60px;
	margin-top: 80px;
`;

const GroupWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const CategoriesGroup = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 20px;
	justify-content: center;
	align-items: center;
`;

const Overlay = styled.div`
	position: absolute;
	height: 200px;
	width: 200px;
	z-index: 2;
	backdrop-filter: blur(6px);
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.2);
`;

interface CategoryItemProps {
	image: string;
}

const CategoryItem = styled.div<CategoryItemProps>`
	height: 200px;
	width: 200px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: ${(props) => `url(${props.image})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	overflow: hidden;
	border: solid 1px #a259ff;
	cursor: pointer;
	z-index: 3;

	&:hover ${Overlay} {
		background-color: rgba(162, 89, 255, 0.4);
	}
`;

const CategoryName = styled.h2`
	color: white;
	font-size: 2em;
	font-weight: 600;
	z-index: 4;
`;

const CategoriesSection = () => {
	const categories = [
		{ name: "Electronics", image: ElectricMotor },
		{ name: "Hardware", image: Metals },
		{ name: "Plumbing", image: Pipes },
		{ name: "Tools", image: Hammer },
		{ name: "Carpentry", image: Plywood },
		{ name: "Masonry", image: HollowBlock },
		{ name: "Ladders", image: Ladder },
		{ name: "Wires", image: WireSpools },
	];

	return (
		<Wrapper>
			<GroupWrapper>
				<CategoriesGroup>
					{categories.map((category, index) => (
						<CategoryItem key={index} image={category.image}>
							<CategoryName>{category.name}</CategoryName>
							<Overlay />
						</CategoryItem>
					))}
				</CategoriesGroup>
			</GroupWrapper>
		</Wrapper>
	);
};

export default CategoriesSection;
