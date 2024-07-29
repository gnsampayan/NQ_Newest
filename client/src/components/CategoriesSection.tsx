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
`;

const GroupWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 40px;
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
	$image: string;
}

const CategoryItem = styled.div<CategoryItemProps>`
	height: 200px;
	width: 200px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: ${(props) => `url(${props.$image})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	overflow: hidden;
	border: solid 1px black;
	cursor: pointer;
	z-index: 3;
	border: 2px solid #A259FF;

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
	background-color: rgba(59, 59, 59, 0.9);
	padding: 2px 100% 8px 100%;
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
			<SectionHeadline>
				<H3>Shop By Categories</H3>
				<P>Explore Our Diverse Selection of Products</P>
          	</SectionHeadline>
			<GroupWrapper>
				<CategoriesGroup>
					{categories.map((category, index) => (
						<CategoryItem key={index} $image={category.image}>
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
