import "bootstrap/dist/css/bootstrap.min.css";

import FeaturedSection from "./sections/FeaturedSection";
import NewSection from "./sections/NewSection";
import DeviceDetector from "./DeviceDetector";
import CategoriesSection from "./sections/CategoriesSection";

import styled from "styled-components";

import heroImage from "/jelleke-vanooteghem-MohB4LCIPyM-unsplash.jpg"
import BestSellersSection from "./sections/BestSellersSection";
import SafetySection from "./sections/SafetySection";
import EcoSection from "./sections/EcoSection";

const Wrapper = styled.div<HomePageProps>`
	position: relative;
 	margin-left: ${props => props.margin};
	margin-right: auto;
	margin-bottom: 100px;
	z-index: 20;
`;

const HeroContainer = styled.div`
	width: 100%;
	height: 640px;
	overflow: hidden;
	background-image: url(${heroImage});
    background-position: center;
	background-repeat: no-repeat;
	background-size: 200%;
	margin-bottom: 80px;
	position: absolute;
	z-index: 1;
`
const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(43, 43, 43, 0.8);
`

interface HomePageProps {
	margin: string;
}

const HomePage: React.FC<HomePageProps> = ({ margin }) => {
	return (
		<>
			<HeroContainer>
				<Overlay/>
			</HeroContainer>
			<Wrapper margin={margin} >
				<DeviceDetector />
				<CategoriesSection />
				<FeaturedSection />
				<NewSection />
				<BestSellersSection />
				<SafetySection />
				<EcoSection />
			</Wrapper>
		</>
	);
};

export default HomePage;
