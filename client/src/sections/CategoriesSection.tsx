import styled from "styled-components";

import Electrical from "../assets/items/electrical.png";
import Tools from "../assets/items/tools.png";
import Metals from "../assets/items/metals_v2.png";
import Pipes from "../assets/items/pipes.png";
import Carpentry from "../assets/items/carpentry.png";
import Masonry from "../assets/items/masonry.png";
import Fixtures from "../assets/items/fixtures.png";
import Insulation from "../assets/items/insulation.png";

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
		backdrop-filter: blur(6px);
	}
`;

const CategoryName = styled.h2`
	color: white;
	font-size: 2em;
	font-weight: 600;
	z-index: 4;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 2px 100% 8px 100%;
`;

const CategoriesSection = () => {
	const categories = [
		{ name: "Electrical", image: Electrical },
		{ name: "Metals", image: Metals },
		{ name: "Plumbing", image: Pipes },
		{ name: "Tools", image: Tools },
		{ name: "Carpentry", image: Carpentry },
		{ name: "Masonry", image: Masonry },
		{ name: "Fixtures", image: Fixtures },
		{ name: "Insulation", image: Insulation },
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
